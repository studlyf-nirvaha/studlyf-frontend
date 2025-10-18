import SmallProfileForm from "@/components/profile/SmallProfileForm";
import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserProfileCard from "@/components/network/UserProfileCard";
import ChatModal from "@/components/network/ChatModal";
import ChatSidebar from "@/components/network/ChatSidebar";
import NetworkFilters from "@/components/network/NetworkFilters";
import ConnectionRequests from "@/components/network/ConnectionRequests";
import { SplitText } from "@/components/ui/split-text";
import { MessageSquare, Bell, Filter, Users, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/lib/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getAllUsers,
  getUserConnections,
  getConnectionRequests,
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  ApiService
} from '@/lib/api';
import { initSocket, getSocket } from '@/lib/socket';
import { Helmet } from "react-helmet-async";

type NetworkUser = {
  _id: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  college?: string;
  year?: string;
  branch?: string;
  skills?: string[];
  bio?: string;
  isOnline?: boolean;
  gender?: string;
  interests?: string[];
};

const INITIAL_VISIBLE = 3;

const Network = () => {
  const { user: currentUser } = useAuth();
  const userId = currentUser ? (currentUser as any)?.uid : undefined;
  const [profileData, setProfileData] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  useEffect(() => {
    if (!userId) return;
    setProfileLoading(true);
    import('@/lib/api').then(api => {
      api.getUserProfile(userId)
        .then(data => {
          setProfileData(data);
          setProfileLoading(false);
        })
        .catch(() => {
          setProfileData(null);
          setProfileLoading(false);
        });
    });
  }, [userId]);
  const isProfileComplete = useMemo(() => {
    if (!profileData) return false;
    const { firstName, lastName, college, skills } = profileData;
    return Boolean(firstName && lastName && college && Array.isArray(skills) && skills.length > 0);
  }, [profileData]);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("All Interests");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [connectionView, setConnectionView] = useState('public');
  const [users, setUsers] = useState<NetworkUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [peerUnreadMap, setPeerUnreadMap] = useState<Record<string, number>>({});
  const [connections, setConnections] = useState<string[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<string[]>([]);
  const [showConnectionsOnly, setShowConnectionsOnly] = useState(false);
  const [visibleRemaining, setVisibleRemaining] = useState(INITIAL_VISIBLE);
  const [visibleRecommended, setVisibleRecommended] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    setVisibleRemaining(INITIAL_VISIBLE);
    setVisibleRecommended(INITIAL_VISIBLE);
  }, [users, searchTerm, selectedInterest, selectedSkills, selectedStatuses, showConnectionsOnly, profileData]);

  const filteredUsers = useMemo(() => {
    let baseUsers: NetworkUser[];
    if (connectionView === 'connections' || showConnectionsOnly) {
      baseUsers = users.filter(user => connections.includes(user._id));
    } else {
      baseUsers = users.filter(user => user._id !== userId && !connections.includes(user._id));
    }
    const noFilters = !searchTerm && selectedInterest === "All Interests" && selectedSkills.length === 0 && selectedStatuses.length === 0;
    if (noFilters) return baseUsers;
    const safe = (val: any) => typeof val === 'string' ? val : '';
    return baseUsers.filter((user: NetworkUser) => {
      const matchesSearch = safe(user.firstName).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesInterest = selectedInterest === "All Interests" ||
        (user.interests && user.interests.some(interest => interest === selectedInterest));
      const matchesSkills = selectedSkills.length === 0 ||
        (user.skills && user.skills.some(skill => selectedSkills.includes(skill)));
      const matchesStatus = selectedStatuses.length === 0 ||
        selectedStatuses.includes(user.year);
      return matchesSearch && matchesInterest && matchesSkills && matchesStatus;
    });
  }, [users, searchTerm, selectedInterest, selectedSkills, selectedStatuses, connectionView, showConnectionsOnly, connections, userId]);

  const baseUsers = useMemo(() => {
    const base = showConnectionsOnly
      ? users.filter(u => connections.includes(u._id))
      : filteredUsers;
    return base.filter((user: NetworkUser) => Boolean(user.firstName && user.skills && user.skills.length > 0 && user.college));
  }, [users, filteredUsers, showConnectionsOnly, connections]);

  const { recommendedUsers, remainingUsers } = useMemo(() => {
    const currentCollege = (profileData?.college || '').trim().toLowerCase();
    const mySkills: string[] = Array.isArray(profileData?.skills) ? (profileData.skills as string[]) : [];
    const mySkillSet = new Set(mySkills.map(s => (s || '').toLowerCase()));

    const sameCollege: NetworkUser[] = [];
    const sameSkillsAtLeastTwo: NetworkUser[] = [];
    const seen = new Set<string>();

    for (const u of baseUsers) {
      const uid = u._id;
      if (!uid) continue;
      const uCollege = (u.college || '').trim().toLowerCase();
      const uSkills: string[] = Array.isArray(u.skills) ? u.skills : [];
      const overlap = uSkills.reduce((acc, s) => acc + (mySkillSet.has((s || '').toLowerCase()) ? 1 : 0), 0);

      if (currentCollege && uCollege === currentCollege) {
        sameCollege.push(u);
        seen.add(uid);
        continue;
      }

      if (mySkillSet.size > 0 && overlap >= 2) {
        sameSkillsAtLeastTwo.push(u);
        seen.add(uid);
      }
    }

    const remaining = baseUsers.filter(u => !seen.has(u._id));
    return {
      recommendedUsers: [...sameCollege, ...sameSkillsAtLeastTwo],
      remainingUsers: remaining,
    };
  }, [baseUsers, profileData]);

  useEffect(() => {
    setLoadingUsers(true);
    setUserError(null);

    getAllUsers()
      .then(data => {
        const userList = data.map(user => ({
          _id: user._id,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          profilePicture: user.profilePicture || '',
          college: user.college || '',
          year: user.year || '',
          branch: user.branch || '',
          skills: user.skills || [],
          bio: user.bio || '',
          isOnline: user.isOnline || false,
          gender: user.gender || '',
        }));
        setUsers(userList);
        setLoadingUsers(false);
      })
      .catch(() => {
        setUserError('Unable to load users at this time. Please try again later.');
        setLoadingUsers(false);
      });
  }, []);

  useEffect(() => {
    if (!userId) return;

    getUserConnections(userId)
      .then(conns => {
        const connectionIds = conns.map(conn =>
          conn.fromUid === userId ? conn.toUid : conn.fromUid
        );
        setConnections(connectionIds);
      })
      .catch(() => { });

    getConnectionRequests(userId)
      .then(reqs => setIncomingRequests(reqs))
      .catch(() => { });
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    const apiBase = (ApiService as any).getBaseUrl ? (ApiService as any).getBaseUrl() : (
      (import.meta as any).env?.VITE_API_BASE_URL
        ? (import.meta as any).env.VITE_API_BASE_URL
        : ((import.meta as any).env?.PROD ? 'https://studlyf.in' : 'http://localhost:3000')
    );
    const socket = initSocket(apiBase, userId);

    ApiService.getUnreadCounts(userId).then((counts) => {
      setPeerUnreadMap(counts || {});
      const peersWithUnread = Object.values(counts || {}).filter((v: number) => (v || 0) > 0).length;
      setUnreadMessages(peersWithUnread);
    }).catch(() => {});

    const onNewMessage = (msg: any) => {
      if (msg && msg.to === userId && msg.from) {
        setPeerUnreadMap(prev => {
          const next = { ...prev, [msg.from]: (prev[msg.from] || 0) + 1 } as Record<string, number>;
          const peersWithUnread = Object.values(next).filter((v) => (v || 0) > 0).length;
          setUnreadMessages(peersWithUnread);
          return next;
        });
      }
    };
    const onRead = (payload: any) => {
      const peer = payload?.peer;
      const by = payload?.by;
      if (!peer || !by) return;
      if (by === userId) {
        setPeerUnreadMap(prev => {
          if (!prev[peer]) return prev;
          const next: Record<string, number> = { ...prev };
          delete next[peer];
          const peersWithUnread = Object.values(next).filter((v) => (v || 0) > 0).length;
          setUnreadMessages(peersWithUnread);
          return next;
        });
      }
    };

    socket.on('message:new', onNewMessage);
    socket.on('message:read', onRead);

    return () => {
      const s = getSocket();
      if (s) {
        s.off('message:new', onNewMessage);
        s.off('message:read', onRead);
      }
    };
  }, [userId]);

  const handleMessageClick = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatOpen(false);
    setSelectedUser(null);
  };

  const handleAcceptRequest = (fromUserId: string) => {
    if (!userId) return;
    acceptConnectionRequest(fromUserId, userId)
      .then(() => {
        setConnections(prev => [...prev, fromUserId]);
        setIncomingRequests(prev => prev.filter(r => r.from !== fromUserId));
      })
      .catch(() => { });
  };

  const handleDeclineRequest = (fromUserId: string) => {
    if (!userId) return;
    rejectConnectionRequest(fromUserId, userId)
      .then(() => {
        setIncomingRequests(prev => prev.filter(r => r.from !== fromUserId));
      })
      .catch(() => { });
  };

  const toggleChatSidebar = () => {
    setIsChatSidebarOpen(prev => !prev);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedInterest("All Interests");
    setSelectedSkills([]);
    setSelectedStatuses([]);
  };

  const getConnectionStatus = useCallback((userId: string) => {
    if (connections.includes(userId)) return 'connected';
    if (pendingRequests.includes(userId)) return 'pending';
    return 'none';
  }, [connections, pendingRequests]);

  const handleConnect = (targetUserId: string) => {
    if (!userId) return;
    sendConnectionRequest(userId, targetUserId)
      .then(() => {
        setPendingRequests(prev => [...prev, targetUserId]);
      })
      .catch(() => {
        setUserError('Unable to send connection request at this time. Please try again later.');
      });
  };

  const handleConnectionsClick = () => {
    setShowConnectionsOnly(prev => !prev);
  };

  const handleChatButtonClick = () => {
    setIsChatListOpen(true);
  };

  const handleChatUserSelect = (user: NetworkUser) => {
    setSelectedChatUser({
      id: String(user._id),
      name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : `${user.firstName || ''}`.trim(),
      profilePicture: user.profilePicture,
      isOnline: user.isOnline || false,
    });
    setIsChatListOpen(false);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedChatUser(null);
  };

  useEffect(() => {
    if (isChatSidebarOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100vw';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, -parseInt(scrollY || '0'));
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, -parseInt(scrollY || '0'));
      }
    };
  }, [isChatSidebarOpen]);

  return (
    <>
      <Helmet>
        <title>Network | StudLyF – Connect with Peers</title>
        <meta name="description" content="Expand your professional and social network. Connect with students, mentors, and industry experts on StudLyF." />
      </Helmet>
      <div className="seo-links" style={{ display: 'none' }}>
        <a href="/finance">Finance</a>
        <a href="/events">Events</a>
        <a href="/project-hunt">Project Hunt</a>
        <a href="/startups">Startups</a>
      </div>
      <div className={`min-h-screen bg-black text-white overflow-x-hidden${isChatSidebarOpen ? ' pointer-events-none' : ''}`}>
        {!isProfileComplete && !profileLoading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-lg bg-black/60">
            <div className="rounded-xl shadow-lg p-4 flex flex-col items-center" style={{ background: 'none' }}>
              <div className="text-xl font-bold text-brand-purple mb-4 text-center">Complete your profile first, then start networking.</div>
              <div className="w-full max-w-xs">
                <SmallProfileForm onClose={() => window.location.reload()} forceRequired />
              </div>
            </div>
          </div>
        )}
        {isChatSidebarOpen && (
          <div
            className="fixed inset-0 z-40 backdrop-blur-md bg-black/30 transition-all duration-300"
            aria-hidden="true"
          />
        )}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-brand-purple/20 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-brand-pink/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <Navbar />

        <ChatModal
          isOpen={isChatOpen}
          onClose={handleCloseChatModal}
          user={selectedUser}
        />

        <div className="fixed top-[80px] sm:top-[120px] left-0 z-50 w-full flex justify-center" style={{ height: '0', pointerEvents: 'none' }}>
          <div className={`relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${isChatSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <ChatSidebar isOpen={isChatSidebarOpen} onClose={toggleChatSidebar} />
          </div>
        </div>

        <main className={`relative z-10 pt-16 sm:pt-20 lg:pt-28${!isProfileComplete ? ' pointer-events-none blur-sm select-none' : ''}`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8 lg:mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex-1">
                <SplitText
                  key={showConnectionsOnly ? "connected" : "network"}
                  text={showConnectionsOnly ? "Connected" : "Network & Connections"}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 text-white leading-tight"
                  textAlign="left"
                />
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-3xl leading-relaxed">
                  {showConnectionsOnly
                    ? "Here are the people you are connected with. Stay in touch and grow your network!"
                    : "Connect with students, founders, and mentors in your network"}
                </p>
              </div>
              <Button
                onClick={handleChatButtonClick}
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 shadow-lg p-0 relative flex items-center justify-center flex-shrink-0"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                {unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] sm:text-xs rounded-full min-w-[16px] h-4 sm:h-5 px-1 flex items-center justify-center ring-2 ring-black">
                    {unreadMessages}
                  </span>
                )}
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-4 sm:gap-6 lg:gap-8 items-start">
              <aside className="sticky top-20 sm:top-28 self-start z-10 w-full flex flex-col gap-4 sm:gap-6 order-2 xl:order-1">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div
                    className={`bg-white/5 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 border text-center flex flex-col items-center justify-center cursor-pointer transition-colors
        ${showConnectionsOnly ? 'border-brand-purple bg-brand-purple/10' : 'border-white/10 hover:bg-white/10'}`}
                    onClick={handleConnectionsClick}
                  >
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <Users className={`w-5 h-5 sm:w-6 sm:h-6 ${showConnectionsOnly ? 'text-brand-purple' : 'text-brand-purple'}`} />
                      <span className="text-xl sm:text-2xl font-bold text-white">{connections.length}</span>
                      {showConnectionsOnly && <span className="ml-1 sm:ml-2 text-brand-purple">✔</span>}
                    </div>
                    <div className="text-xs mt-1" style={{ color: showConnectionsOnly ? '#a259ff' : 'rgba(255,255,255,0.7)' }}>
                      {showConnectionsOnly ? 'Connected' : 'Connections'}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 border border-white/10 text-center flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-brand-pink" />
                      <span className="text-xl sm:text-2xl font-bold text-white">{connectionRequests.length}</span>
                    </div>
                    <div className="text-xs text-white/70 mt-1">Requests</div>
                  </div>
                </div>
                <ConnectionRequests
                  requests={incomingRequests.map(r => {
                    const fromUser = users.find(u => u._id === r.from) as Partial<NetworkUser & { connections?: string[] }> || {};
                    const fromUserConnections = fromUser?.connections || [];
                    const mutualConnections = Array.isArray(fromUserConnections) && Array.isArray(connections)
                      ? fromUserConnections.filter((id: string) => connections.includes(id)).length
                      : 0;
                    let timeAgo = '';
                    if (r.createdAt) {
                      const created = new Date(r.createdAt);
                      const now = new Date();
                      const diffMs = now.getTime() - created.getTime();
                      const diffMins = Math.floor(diffMs / 60000);
                      if (diffMins < 1) timeAgo = 'just now';
                      else if (diffMins < 60) timeAgo = `${diffMins} min ago`;
                      else if (diffMins < 1440) timeAgo = `${Math.floor(diffMins / 60)} hr ago`;
                      else timeAgo = `${Math.floor(diffMins / 1440)}d ago`;
                    }
                    return {
                      id: r.from,
                      name: (fromUser?.firstName ? `${fromUser?.firstName} ${fromUser?.lastName || ''}`.trim() : ''),
                      profilePicture: fromUser?.profilePicture || '',
                      role: fromUser?.branch || '',
                      school: fromUser?.college || '',
                      mutualConnections,
                      timeAgo,
                    };
                  })}
                  onAccept={handleAcceptRequest}
                  onDecline={handleDeclineRequest}
                />
                <div className="sticky top-6 h-fit w-full p-3 sm:p-4 space-y-4 sm:space-y-6 rounded-xl sm:rounded-2xl shadow-xl backdrop-blur-lg bg-white/10 border border-white/10">
                  <div className="flex items-center justify-between mb-2 flex-col sm:flex-row gap-2 sm:gap-0">
                    <div className="font-semibold text-base sm:text-lg text-white flex items-center gap-2 order-2 sm:order-1">
                      <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-brand-purple" />
                      <span>Filters</span>
                    </div>
                  </div>
                  <NetworkFilters
                    onSearchChange={setSearchTerm}
                    onInterestChange={setSelectedInterest}
                    onSkillChange={setSelectedSkills}
                    onStatusChange={setSelectedStatuses}
                    searchValue={searchTerm}
                    selectedInterest={selectedInterest}
                    selectedSkills={selectedSkills}
                    selectedStatuses={selectedStatuses}
                    onClearAll={clearAllFilters}
                  />
                </div>
              </aside>
              <section className="order-1 xl:order-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 order-2 sm:order-1">
                    <span>{(showConnectionsOnly
                      ? users.filter(u => connections.includes(u._id)).length
                      : filteredUsers.length)} <span className="hidden sm:inline">People Found</span><span className="sm:hidden">Found</span></span>
                    {(selectedInterest !== "All Interests" || selectedSkills.length > 0) && (
                      <Badge className="bg-brand-purple/20 text-brand-purple border border-brand-purple/40 text-xs">
                        Filtered
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 items-center order-1 sm:order-2 justify-between w-full sm:w-auto">
                    <Button
                      onClick={toggleChatSidebar}
                      className="rounded-full w-10 h-10 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 shadow-lg p-0 flex items-center justify-center sm:hidden"
                    >
                      <MessageSquare className="w-5 h-5" />
                      {unreadMessages > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center ring-2 ring-black">
                          {unreadMessages}
                        </span>
                      )}
                    </Button>
                    <select
                      className="rounded-full px-3 py-1 border border-brand-purple bg-black text-white transition focus:ring-2 focus:ring-brand-purple ml-2 w-full sm:w-auto text-sm"
                      value={showConnectionsOnly ? 'connections' : 'public'}
                      onChange={e => setShowConnectionsOnly(e.target.value === 'connections')}
                    >
                      <option value="public">Public</option>
                      <option value="connections">Your Connections</option>
                    </select>
                  </div>
                </div>
                {loadingUsers && <div className="text-white/60 text-center py-8">Loading users...</div>}
                {userError && <div className="text-red-400 text-center py-8">{userError}</div>}
                {viewMode === 'grid' ? (
                  (baseUsers.length === 0 ? (
                    <div className="text-center text-white/70 py-12 text-lg">
                      Only users who have filled their First Name, Skills, and College will be visible here.<br />
                      Please complete your profile to appear in the network.
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 sm:mb-8">
                        <div className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">General Profiles</div>
                        {recommendedUsers.length === 0 ? (
                          <div className="text-white/50 text-sm">No recommendations based on your college or skills.</div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                              {recommendedUsers.slice(0, visibleRecommended).map((user: NetworkUser, index) => (
                                <motion.div
                                  key={user._id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.6, delay: index * 0.05 }}
                                >
                                  <UserProfileCard
                                    user={{
                                      id: user._id,
                                      name: `${user.firstName} ${user.lastName || ''}`.trim(),
                                      profilePicture: user.profilePicture || '',
                                      college: user.college,
                                      year: user.year,
                                      branch: user.branch,
                                      skills: user.skills,
                                      bio: user.bio,
                                      isOnline: user.isOnline,
                                      gender: user.gender,
                                      firstName: user.firstName,
                                      lastName: user.lastName,
                                    }}
                                    getConnectionStatus={getConnectionStatus}
                                    onConnect={handleConnect}
                                    unreadCount={peerUnreadMap[user._id] || 0}
                                  />
                                </motion.div>
                              ))}
                            </div>
                            {visibleRecommended < recommendedUsers.length && (
                              <div className="flex justify-center mt-4">
                                <Button
                                  onClick={() => setVisibleRecommended(v => Math.min(v + INITIAL_VISIBLE, recommendedUsers.length))}
                                  className="bg-brand-purple/80 hover:bg-brand-purple text-white rounded-full px-6 py-2 shadow"
                                >
                                  Show More
                                </Button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      {/* All Remaining Profiles Section */}
                      <div className="mt-6 sm:mt-8">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="text-base sm:text-lg font-semibold text-white">
                           
                          </div>
                          {visibleRemaining < remainingUsers.length && (
                            <Button
                              onClick={() => setVisibleRemaining(v => Math.min(v + INITIAL_VISIBLE, remainingUsers.length))}
                              className="bg-brand-purple/80 hover:bg-brand-purple text-white rounded-full px-6 py-2 shadow"
                            >
                              Show More
                            </Button>
                          )}
                        </div>
                        {remainingUsers.length === 0 ? (
                          <div className="text-white/50 text-sm">No more profiles to show.</div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-16">
                            {remainingUsers.slice(0, visibleRemaining).map((user: NetworkUser, index) => (
                              <motion.div
                                key={user._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                              >
                                <UserProfileCard
                                  user={{
                                    id: user._id,
                                    name: `${user.firstName} ${user.lastName || ''}`.trim(),
                                    profilePicture: user.profilePicture || '',
                                    college: user.college,
                                    year: user.year,
                                    branch: user.branch,
                                    skills: user.skills,
                                    bio: user.bio,
                                    isOnline: user.isOnline,
                                    gender: user.gender,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                  }}
                                  getConnectionStatus={getConnectionStatus}
                                  onConnect={handleConnect}
                                  unreadCount={peerUnreadMap[user._id] || 0}
                                />
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ))
                ) : (
                  <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-16">
                    {[...recommendedUsers, ...remainingUsers].map((user: NetworkUser, index) => (
                      <motion.div
                        key={user._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className="bg-gradient-to-br from-black via-gray-900 to-purple-900/30 border border-white/10 rounded-xl p-3 sm:p-4 hover:border-brand-purple/40 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={user.profilePicture}
                            alt={user.firstName}
                            className="w-16 h-16 rounded-full border-2 border-brand-purple/40 object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${user.isOnline ? "bg-green-500" : "bg-gray-500"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white">{user.firstName}</span>
                              <span className="text-xs text-white/60">{user.year}</span>
                            </div>
                            <p className="text-sm text-white/70 truncate">{user.bio}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
        <Footer />
        <ChatSidebar
          isOpen={isChatSidebarOpen}
          onClose={() => setIsChatSidebarOpen(false)}
        />
        {isChatListOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-black border border-purple-900 shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col rounded-xl sm:rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 bg-black border-b border-purple-900">
                <div className="text-white text-base sm:text-lg font-semibold">Chats</div>
                <button
                  onClick={() => setIsChatListOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-purple-900/30 rounded-full p-1"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto bg-black">
                {connections.length === 0 ? (
                  <div className="text-purple-300 text-center py-8 text-sm sm:text-base">No connections to chat with</div>
                ) : (
                  users
                    .filter(user => connections.includes(user._id))
                    .map((user) => (
                      <div
                        key={user._id}
                        onClick={() => handleChatUserSelect(user)}
                        className="flex items-center gap-3 p-3 sm:p-4 border-b border-purple-900 cursor-pointer hover:bg-purple-900/20 transition-colors"
                      >
                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-purple-500">
                          <AvatarImage src={user.profilePicture} alt={user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : `${user.firstName || ''}`.trim()} />
                          <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                            <User className="w-5 h-5 sm:w-6 sm:h-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold truncate text-sm sm:text-base">
                            {user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : `${user.firstName || ''}`.trim()}
                          </div>
                          <div className="text-xs text-purple-300 truncate">
                            {user.isOnline ? "online" : "offline"}
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}
        {selectedChatUser && (
          <ChatModal
            isOpen={isChatOpen}
            onClose={handleCloseChat}
            user={selectedChatUser}
          />
        )}
      </div>
    </>
  );
};

export default Network;