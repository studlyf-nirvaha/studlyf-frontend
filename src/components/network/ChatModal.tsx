
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, X, User } from "lucide-react";
import { useAuth } from '@/lib/AuthContext';
import { ApiService } from '@/lib/api';
import { getSocket } from '@/lib/socket';
import { useNavigate } from "react-router-dom";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    _id?: string;
    name: string;
    profilePicture: string;
    isOnline: boolean;
  } | null;
}

const ChatModal = ({ isOpen, onClose, user }: ChatModalProps) => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !user || !currentUser) return;
    setLoading(true);
    setError(null);
    ApiService.getMessages(currentUser.uid, String(user._id || user.id))
      .then((msgs) => {
        setMessages(msgs || []);
        setLoading(false);
        // mark read
        ApiService.markMessagesRead(String(user._id || user.id)).catch(() => {});
      })
      .catch(() => {
        setError('Unable to load messages at this time.');
        setLoading(false);
      });

    const socket = getSocket();
    if (!socket) return;
    const onNew = (msg: any) => {
      if (!msg) return;
      const peerId = String(user._id || user.id);
      if ((msg.from === currentUser.uid && msg.to === peerId) || (msg.from === peerId && msg.to === currentUser.uid)) {
        setMessages(prev => [...prev, msg]);
      }
    };
    socket.on('message:new', onNew);
    return () => {
      socket.off('message:new', onNew);
    };
  }, [isOpen, user, currentUser]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, user]);

  const handleSendMessage = async () => {
    if (!user || !currentUser) return;
    if (attachment) {
      try {
        const msg = await ApiService.sendImageMessage(currentUser.uid, String(user._id || user.id), attachment);
        setMessages(prev => [...prev, msg]);
        setAttachment(null);
      } catch (err: any) {
        setError('Unable to send image at this time.');
      }
      return;
    }
    if (newMessage.trim()) {
      const messageToSend = newMessage.trim();
      setNewMessage("");
      setError(null);
      try {
        const msg = await ApiService.sendMessage(currentUser.uid, String(user._id || user.id), messageToSend);
        setMessages(prev => [...prev, msg]);
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

  const handleProfileClick = () => {
    navigate(`/profile/${user._id || user.id}`);
  };

  const handleClearChat = async () => {
    // Optional: implement a delete endpoint later
    setMessages([]);
  };

  if (!isOpen || !user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-purple-900 shadow-2xl w-full max-w-sm sm:max-w-md mx-2 sm:mx-auto max-h-[85vh] sm:max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-xl sm:rounded-2xl animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-3 sm:px-4 py-3 bg-black rounded-t-xl sm:rounded-t-2xl border-b border-purple-900">
          <div className="flex items-center gap-2 sm:gap-3">
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-purple-500 shadow-md cursor-pointer" onClick={handleProfileClick}>
              <AvatarImage src={user.profilePicture} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    </AvatarFallback>
                  </Avatar>
            <div>
              <div className="text-white text-sm sm:text-base font-semibold leading-tight">{user.name}</div>
              <div className="text-xs text-purple-200 font-normal">{user.isOnline ? "online" : "offline"}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
                  onClick={handleClearChat}
              className="text-red-400 hover:text-white hover:bg-red-500/20 border border-red-400 rounded-full px-2 sm:px-3 py-1 text-xs transition-colors"
                >
              Clear
            </button>
            <button
                      onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-purple-900/30 rounded-full p-1"
                    >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
            {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-2 flex flex-col bg-black" ref={messagesContainerRef}>
          {loading && <div className="text-purple-300 text-center text-sm">Loading messages...</div>}
          {error && <div className="text-red-400 text-center text-sm">{error}</div>}
          {messages.map((message: any) => (
            <div
                      key={message._id || message.id}
                      className={`flex ${message.from === currentUser?.uid ? "justify-end" : "justify-start"}`}
                    >
              <div
                className={`rounded-xl px-3 sm:px-4 py-2 shadow text-xs sm:text-sm relative break-words whitespace-pre-line max-w-full"
                  ${message.from === currentUser?.uid
                    ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-br-none border border-purple-700"
                    : "bg-black text-white rounded-bl-none border border-purple-900"}
                `}
                style={{ maxWidth: '85%' }}
              >
                {message.type === 'image' && message.mediaUrl ? (
                  <img src={message.mediaUrl} alt="attachment" className="max-w-full rounded-md border border-purple-900" />
                ) : (
                  <span>{message.text || message.content}</span>
                )}
                <span className="block text-[8px] sm:text-[10px] text-purple-200 text-right mt-1">
                            {message.createdAt ? new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                    </span>
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-3 bg-black border-t border-purple-900 rounded-b-xl sm:rounded-b-2xl">
          <label className="cursor-pointer text-white/80 hover:text-white hover:bg-purple-900/30 rounded-full p-1" title="Attach image">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setAttachment(e.target.files?.[0] || null)} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M9 12.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Z" />
              <path fillRule="evenodd" d="M3.374 7.126a4.5 4.5 0 0 1 6.364 0l7.136 7.137a3 3 0 1 1-4.243 4.243l-5.303-5.303a1.5 1.5 0 0 1 2.121-2.121l4.243 4.243a.75.75 0 1 0 1.06-1.06l-4.242-4.244a3 3 0 1 0-4.243 4.243l5.303 5.303a4.5 4.5 0 1 0 6.364-6.364L9.738 5.005a6 6 0 1 0-8.485 8.485l5.304 5.303a.75.75 0 1 0 1.06-1.06L2.313 12.43a4.5 4.5 0 0 1 0-6.364Z" clipRule="evenodd" />
            </svg>
          </label>
                  <Input
                    value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
            className="flex-1 bg-black border border-purple-900 text-white placeholder:text-purple-400 focus:ring-2 focus:ring-brand-purple rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm shadow-sm"
                  />
          <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() && !attachment || loading}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
                      >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 text-brand-purple" fill="currentColor" />
          </button>
          </div>
        </DialogContent>
    </Dialog>
  );
};

export default ChatModal;

/*
.animate-fade-in { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
*/