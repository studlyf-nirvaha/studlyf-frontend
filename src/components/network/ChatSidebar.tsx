import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    MessageSquare,
    User,
    X,
    Send,
    Search,
    ChevronLeft,
    MoreVertical,
    Phone,
    Video,
    Image,
    Paperclip,
    Smile
} from "lucide-react";
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, addDoc, serverTimestamp, onSnapshot, getDocs } from 'firebase/firestore';
import { useAuth } from '@/lib/AuthContext';

interface ChatUser {
    id: number;
    name: string;
    profilePicture: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    isOnline: boolean;
}

interface Message {
    id: number;
    text: string;
    sender: "me" | "other";
    timestamp: Date;
}

interface ChatSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatSidebar = ({ isOpen, onClose }: ChatSidebarProps) => {
    const { user: currentUser } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [chatUsers, setChatUsers] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [visibleCount, setVisibleCount] = useState(4);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch chat users (all users the current user has messaged with)
    useEffect(() => {
        if (!currentUser) return;
        setLoading(true);
        setError(null);
        // Query all messages where current user is a participant
        const q = query(
            collection(db, 'messages'),
            where('participants', 'array-contains', currentUser.uid)
        );
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            // Group messages by the other participant
            const userMap: Record<string, any> = {};
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                const otherId = data.participants.find((id: string) => id !== currentUser.uid);
                if (!otherId) return;
                if (!userMap[otherId]) {
                    userMap[otherId] = {
                        id: otherId,
                        lastMessage: data.content,
                        lastMessageTime: data.timestamp,
                        unreadCount: 0,
                        profilePicture: '', // You can fetch user profile if you store it elsewhere
                        name: otherId, // Placeholder, ideally fetch user name
                        isOnline: false, // Placeholder
                    };
                }
                // Update last message if newer
                if (!userMap[otherId].lastMessageTime || (data.timestamp && data.timestamp.toMillis() > userMap[otherId].lastMessageTime.toMillis())) {
                    userMap[otherId].lastMessage = data.content;
                    userMap[otherId].lastMessageTime = data.timestamp;
                }
                // Count unread messages
                if (data.receiverId === currentUser.uid && !data.read) {
                    userMap[otherId].unreadCount += 1;
                }
            });
            setChatUsers(Object.values(userMap));
            setLoading(false);
        }, (err) => {
            setError('Unable to load chats at this time.');
            setLoading(false);
        });
        return () => unsubscribe();
    }, [currentUser]);

    // Fetch messages for selected user
    useEffect(() => {
        if (!selectedUser || !currentUser) {
            setMessages([]);
            return;
        }
        setLoading(true);
        setError(null);
        const q = query(
            collection(db, 'messages'),
            where('participants', 'array-contains', currentUser.uid),
            orderBy('timestamp', 'asc')
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messageList = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter((msg: any) =>
                    Array.isArray(msg.participants) &&
                    msg.participants.includes(selectedUser._id) &&
                    msg.participants.includes(currentUser.uid)
                );
            setMessages(messageList);
            setLoading(false);
        }, (err) => {
            setError('Unable to load messages at this time.');
            setLoading(false);
        });
        return () => unsubscribe();
    }, [selectedUser, currentUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = 0;
        }
    }, [messages, selectedUser]);

    const handleSendMessage = async () => {
        if (newMessage.trim() && selectedUser && currentUser) {
            setError(null);
            try {
                await addDoc(collection(db, 'messages'), {
                    senderId: currentUser.uid,
                    receiverId: selectedUser._id,
                    participants: [currentUser.uid, selectedUser._id],
                    content: newMessage,
                    timestamp: serverTimestamp(),
                    read: false,
                });
                setNewMessage("");
            } catch (err: any) {
                setError('Unable to send message at this time. Please try again.');
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleUserSelect = (user: any) => {
        setSelectedUser(user);
    };

    const handleBackToList = () => {
        setSelectedUser(null);
    };

    // Filter chat users by search
    const filteredUsers = chatUsers.filter(user =>
        typeof user.name === 'string' && user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const visibleUsers = filteredUsers.slice(0, visibleCount);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="mx-auto mt-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-black border border-white/10 shadow-2xl rounded-xl sm:rounded-2xl flex flex-col overflow-hidden"
                    style={{ position: 'relative', top: 0, right: 0, zIndex: 50 }}
                >
                    {/* Header */}
                    <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-gray-900 to-black">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={selectedUser ? handleBackToList : onClose}
                                className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                                {selectedUser ? <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> : <X className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </Button>
                            <h2 className="text-lg sm:text-xl font-bold text-white">
                                {selectedUser ? selectedUser.name : "Messages"}
                            </h2>
                        </div>
                    </div>

                    {!selectedUser ? (
                        <>
                            {/* Search */}
                            <div className="p-3 sm:p-4 border-b border-white/10">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                                    <Input
                                        type="text"
                                        placeholder="Search messages..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8 sm:pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* Chat List */}
                            <div
                                className="flex-1 overflow-y-auto"
                                style={{ maxHeight: 350 }}
                                onScroll={e => {
                                    const el = e.currentTarget;
                                    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10 && visibleCount < filteredUsers.length) {
                                        setVisibleCount(v => Math.min(v + 4, filteredUsers.length));
                                    }
                                }}
                            >
                                {loading && <div className="text-white/60 text-center text-sm">Loading chats...</div>}
                                {error && <div className="text-red-400 text-center text-sm">{error}</div>}
                                {visibleUsers.length > 0 ? (
                                    visibleUsers.map((user) => (
                                        <div
                                            key={user._id}
                                            onClick={() => handleUserSelect(user)}
                                            className="p-3 sm:p-4 border-b border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="relative">
                                                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-brand-purple/40">
                                                        <AvatarImage src={user.profilePicture} alt={user.name} />
                                                        <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                                                            <User className="w-5 h-5 sm:w-6 sm:h-6" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div
                                                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${user.isOnline ? "bg-green-500" : "bg-gray-500"}`}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-semibold text-white text-sm sm:text-base">{user.name}</span>
                                                        <span className="text-xs text-white/60">{user.lastMessageTime ? (user.lastMessageTime.toDate ? user.lastMessageTime.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : user.lastMessageTime) : ''}</span>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-white/70 truncate">{user.lastMessage}</p>
                                                </div>
                                                {user.unreadCount > 0 && (
                                                    <div className="bg-brand-purple text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                                                        {user.unreadCount}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 sm:p-8 text-center text-white/60">
                                        <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                                        <p className="text-sm sm:text-base">No conversations found</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 flex flex-col-reverse" ref={messagesEndRef}>
                                {loading && <div className="text-white/60 text-center text-sm">Loading messages...</div>}
                                {error && <div className="text-red-400 text-center text-sm">{error}</div>}
                                <AnimatePresence>
                                    {[...messages].reverse().map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className={`flex ${message.senderId === currentUser?.uid ? "justify-end" : "justify-start"}`}
                                        >
                                            {message.senderId !== currentUser?.uid && (
                                                <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mr-2 self-end mb-1">
                                                    <AvatarImage src={selectedUser.profilePicture} alt={selectedUser.name} />
                                                    <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                                                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div
                                                className={`max-w-[75%] p-2 sm:p-3 rounded-xl sm:rounded-2xl ${message.senderId === currentUser?.uid
                                                    ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                                                    : "bg-white/10 text-white border border-white/20"
                                                    }`}
                                            >
                                                <p className="text-xs sm:text-sm">{message.content}</p>
                                                <p className="text-[10px] sm:text-xs opacity-70 mt-1">
                                                    {message.timestamp?.toDate ? message.timestamp.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ''}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {/* ref moved to container for scroll control */}
                            </div>

                            {/* Message Input */}
                            <div className="p-3 sm:p-4 border-t border-white/10 bg-gradient-to-r from-gray-900 to-black">
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-brand-purple/50 text-sm"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim() || loading}
                                        className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 h-8 w-8 sm:h-10 sm:w-10 p-0"
                                    >
                                        <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatSidebar;