import React, { useState, useRef, useEffect } from "react";
import Orb from '../../Orb';

const classyReplies = [
    "That's interesting! Tell me more.",
    "I'm here to help you with anything you need.",
    "Could you please clarify your question?",
    "Great question! Let me think...",
    "I'm Classy, your AI assistant. How can I assist you today?",
    "Thanks for sharing!",
    "Let's work on this together!"
];

function getClassyReply(userInput: string) {
    return classyReplies[Math.floor(Math.random() * classyReplies.length)];
}

const AIBotFab: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hi! I am Classy. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const chatRef = useRef<HTMLDivElement>(null);
    const [isBotTyping, setIsBotTyping] = useState(false);

    // Close chat if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    // Handle sending a message
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages([...messages, { from: "user", text: input }]);
        setInput("");
        setIsBotTyping(true);
        setTimeout(() => {
            setMessages(msgs => [...msgs, { from: "bot", text: getClassyReply(input) }]);
            setIsBotTyping(false);
        }, 1200);
    };

    return (
        <>
            <div
                    onClick={() => setOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 1000,
                    width: 64,
                    height: 64,
                    cursor: 'pointer',
                    borderRadius: '50%',
                    boxShadow: '0 4px 24px 0 rgba(162,89,255,0.25)',
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                title="Open AI Chatbot"
            >
                <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={270}
                    forceHoverState={false}
                />
            </div>
            {open && (
                <div
                    ref={chatRef}
                    className="chatbox-animate-in"
                    style={{
                        position: 'fixed',
                        bottom: 110,
                        right: 32,
                        width: 340,
                        maxWidth: "95vw",
                        background: "#f9fafb",
                        borderRadius: "32px 32px 32px 48px/32px 32px 48px 32px",
                        boxShadow: "0 12px 40px 0 rgba(139,92,246,0.15)",
                        color: "#222",
                        border: "2px solid #a259ff",
                        overflow: "hidden",
                        transition: "all 0.4s cubic-bezier(.4,2,.6,1)",
                        backdropFilter: "blur(8px)",
                        zIndex: 1100,
                    }}
                >
                    <div className="gradient-bg py-3 px-6 flex items-center justify-between" style={{ borderBottom: "1px solid #e5e7eb", background: 'linear-gradient(90deg, #a259ff, #6a00ff, #a259ff, #e100ff)' }}>
                        <span className="text-2xl font-extrabold tracking-wide text-white drop-shadow-lg">Classy</span>
                        <button
                            aria-label="Close Classy Chatbot"
                            className="ml-2 text-white bg-brand-purple/40 rounded-full px-2 py-1 text-lg font-bold hover:bg-brand-pink/60 transition-colors"
                            onClick={() => setOpen(false)}
                        >×</button>
                    </div>
                    <div style={{ maxHeight: 220, minHeight: 120, overflowY: "auto", padding: 16, background: "#f9fafb" }}>
                        {messages.map((msg, i) => (
                            <div key={i} className={msg.from === "bot" ? "text-sm text-brand-purple mb-3 font-medium" : "text-sm text-gray-900 mb-3 text-right font-semibold"}>
                                {msg.text}
                            </div>
                        ))}
                        {isBotTyping && (
                            <div className="text-sm text-brand-purple mb-3 font-medium italic">Classy is typing...</div>
                        )}
                    </div>
                    <form
                        className="flex gap-2 p-3 bg-black border-t border-gray-200"
                        onSubmit={handleSend}
                    >
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 rounded-full px-4 py-2 text-white bg-gray-800 border border-brand-purple placeholder:text-brand-purple/60 focus:border-brand-pink focus:ring-2 focus:ring-brand-pink outline-none transition-all"
                            style={{ fontSize: 15 }}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="gradient-bg text-white rounded-full px-5 py-2 text-base font-bold border-0 shadow hover:opacity-90 transition-all"
                        >Send</button>
                    </form>
                </div>
            )}
            <style>{`
                .chatbox-animate-in {
                    animation: chatboxIn 0.4s cubic-bezier(.4,2,.6,1);
                }
                @keyframes chatboxIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.7) translateY(60px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
            `}</style>
        </>
    );
};

export default AIBotFab;
