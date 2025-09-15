
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Heart, User, Send, Check, BadgeCheck, GraduationCap, Briefcase, Calendar, MapPin as MapPinIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatModal from "./ChatModal";

interface UserProfileCardProps {
  user: {
    id: string;
    _id?: string;
    name: string;
    profilePicture: string;
    college?: string;
    year?: string;
    branch?: string;
    skills?: string[];
    bio?: string;
    isOnline?: boolean;
    gender?: string; // Added gender to the interface
    firstName?: string; // Added firstName to the interface
    lastName?: string; // Added lastName to the interface
  };
  // onMessageClick?: () => void; // REMOVE
  getConnectionStatus: (userId: string) => 'none' | 'pending' | 'connected';
  onConnect: (userId: string) => void;
}

const UserProfileCard = ({ user, getConnectionStatus, onConnect }: UserProfileCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleNameClick = () => {
    navigate(`/profile/${user._id || user.id}`);
  };

  // Gender icon logic
  let genderIcon = null;
  if (user.gender === 'Male') genderIcon = <User className="w-5 h-5 text-blue-400" />;
  if (user.gender === 'Female') genderIcon = <User className="w-5 h-5 text-pink-400" />;

  return (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card className="w-full max-w-xs min-w-[240px] sm:min-w-[260px] h-[360px] sm:h-[400px] flex flex-col border-2 border-white/10 bg-gradient-to-br from-black via-gray-900 to-purple-950 rounded-xl sm:rounded-2xl shadow-xl hover:border-brand-purple/60 transition-all duration-300 p-0">
        <CardContent className="flex flex-col h-full p-0">
          {/* Top Section: Avatar, Name, Gender */}
          <div className="flex flex-col items-center w-full pt-4 sm:pt-6">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 ring-4 ring-brand-purple/40 shadow-lg mb-2 cursor-pointer" onClick={handleNameClick}>
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                <User className="w-8 h-8 sm:w-10 sm:h-10" />
              </AvatarFallback>
            </Avatar>
            <h2
              className="text-lg sm:text-xl font-bold text-white text-center cursor-pointer hover:underline flex items-center gap-2 break-words whitespace-normal mt-1 px-2"
              title={user.name}
              onClick={handleNameClick}
            >
              {user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.name}
              {genderIcon}
            </h2>
            {/* Optionally show a verified badge */}
            {/* <BadgeCheck className="w-5 h-5 text-brand-purple" /> */}
            {/* Academic Info Section */}
            {user.college && (
              <div className="flex items-center gap-1 text-xs sm:text-sm text-white/80 mt-1 px-2">
                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 text-brand-purple/80" />
                <span className="break-words whitespace-normal text-center">{user.college}</span>
              </div>
            )}
            {(user.branch || user.year) && (
              <div className="flex items-center gap-1 sm:gap-2 text-xs text-white/60 mt-1 px-2">
                {user.branch && <><Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-brand-purple/60" /><span>{user.branch}</span></>}
                {user.branch && user.year && <span className="mx-1">•</span>}
                {user.year && <><Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-brand-purple/60" /><span>{user.year}</span></>}
              </div>
            )}
          </div>
          {/* Bio Section */}
          {user.bio && (
            <div className="w-full px-4 sm:px-6 mt-3 sm:mt-4 mb-2 text-center overflow-y-auto max-h-12 sm:max-h-16">
              <p className={`text-xs sm:text-sm text-white/80 ${showFullBio ? '' : 'line-clamp-2'}`}>{user.bio}</p>
              {user.bio.length > 80 && (
                <button
                  className="text-xs text-brand-purple hover:underline mt-1"
                  onClick={() => setShowFullBio(v => !v)}
                >
                  {showFullBio ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          )}
          {/* Skills Section */}
          {user.skills && user.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center w-full px-4 sm:px-6 mb-2">
              {Array.isArray(user.skills) && user.skills.slice(0, 4).map((skill, idx) => (
                <span key={idx} className="rounded-full px-2 sm:px-3 py-1 text-xs font-semibold border border-brand-purple bg-brand-purple/10 text-brand-purple/90 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          )}
          {/* Spacer to push action buttons to bottom */}
          <div className="flex-1" />
          {/* Action Buttons Section pinned to bottom */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center w-full px-4 sm:px-6 pb-4 sm:pb-6 mt-3 sm:mt-4">
            {getConnectionStatus && getConnectionStatus(user._id || user.id) === 'none' && (
              <Button
                className="w-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white font-medium rounded-full py-2 text-sm sm:text-base shadow-lg"
                onClick={() => onConnect(user._id || user.id)}
              >
                Connect
              </Button>
            )}
            {getConnectionStatus && getConnectionStatus(user._id || user.id) === 'pending' && (
              <div className="w-full flex items-center justify-center gap-2 bg-orange-500/90 text-white font-medium rounded-full py-2 text-sm sm:text-base shadow-lg">
                <Send className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                Request Sent
              </div>
            )}
            {getConnectionStatus && getConnectionStatus(user._id || user.id) === 'connected' && (
              <div className="w-full flex flex-col gap-2 items-center justify-center">
                <Button
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white font-medium rounded-full flex items-center justify-center gap-2 py-2 text-sm sm:text-base shadow-lg"
                  onClick={() => setIsChatOpen(true)}
                >
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                  Message
                </Button>
                <ChatModal
                  isOpen={isChatOpen}
                  onClose={() => setIsChatOpen(false)}
                  user={{
                    id: Number(user._id || user.id),
                    name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.name,
                    profilePicture: user.profilePicture,
                    isOnline: user.isOnline || false,
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfileCard;
