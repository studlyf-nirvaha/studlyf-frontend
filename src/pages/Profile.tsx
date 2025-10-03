import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Linkedin, Github, Globe, FileText, Award, Target, GraduationCap, Calendar, School, X, Share2 } from 'lucide-react';
import { SplitText } from '@/components/ui/split-text';
import { getUserProfile, getUserPublicProfile } from '@/lib/api';
import { auth } from '@/lib/firebase';

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUid, setLoggedInUid] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        setLoggedInUid(user?.uid || null);
        let data;
        if (user && user.uid === id) {
          data = await getUserProfile(id!);
        } else {
          data = await getUserPublicProfile(id!);
        }
        setProfile(data);
      } catch (e) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProfile();
  }, [id]);

  if (loading) return <div className="text-white p-8">Loading profile...</div>;
  if (!profile) return <div className="text-white p-8">Profile not found.</div>;

  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden bg-black">
      <div className="fixed inset-0 -z-10 pointer-events-none" />
      <div className="w-full flex items-center px-4 sm:px-10 pt-3 pb-3 border-b border-[#a259ff] bg-black/90 backdrop-blur-xl rounded-b-3xl shadow-xl mb-6 relative">
        {/* Share Icon - moved to left top side */}
        <button
          className="mr-2 text-white hover:text-[#ff7eb3] transition drop-shadow-lg flex-shrink-0"
          title="Share Profile"
          style={{ position: 'relative', zIndex: 1 }}
          onClick={() => {
            const url = window.location.href;
            if (navigator.clipboard) {
              navigator.clipboard.writeText(url);
              alert('Profile link copied to clipboard!');
            } else {
              window.prompt('Copy this link:', url);
            }
          }}
        >
          <Share2 className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <span className="mx-auto text-2xl sm:text-5xl font-extrabold text-white tracking-wide uppercase text-center block w-full">PROFILE</span>
        {/* Show edit button only for own profile */}
        {loggedInUid === profile.uid && (
          <button
            className="ml-4 px-4 py-2 bg-[#a259ff] text-white rounded-lg font-bold hover:bg-[#ff7eb3] transition"
            onClick={() => window.location.href = '/profile'}
          >
            Edit Profile
          </button>
        )}
        <button
          className="text-white text-2xl font-bold hover:text-[#a259ff] transition drop-shadow-lg flex-shrink-0 ml-3"
          onClick={() => window.history.back()}
          title="Go Back"
        >
          <X className="w-8 h-8 sm:w-10 sm:h-10" />
        </button>
      </div>
      <section className="w-full min-h-[90vh] px-0 sm:px-4 pt-8">
        <div className="rounded-3xl bg-black backdrop-blur-xl shadow-[0_0_32px_4px_#a259ff55] border border-white p-2 sm:p-4 md:p-6 mx-0 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 bg-gradient-to-br from-black via-[#23272f] to-[#2d1a4a] rounded-2xl shadow-2xl p-4 sm:p-8 md:p-10 mb-6 sm:mb-10 border border-[#a259ff] hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-[#a259ff] hover:outline-[#ff7eb3] hover:shadow-[0_0_24px_4px_#a259ff99,0_0_48px_8px_#ff7eb399] backdrop-blur-2xl w-full">
            <div className="relative">
              <img src={profile?.profilePicture || 'https://placehold.co/120x120/A855F7/FFFFFF?text=User'} alt="Profile" className="h-32 w-32 rounded-full border-4 border-[#a259ff] bg-[#23272f] object-cover shadow-2xl" />
            </div>
            <div className="flex-1 flex flex-col gap-2 items-center lg:items-start w-full max-w-2xl justify-start">
              <SplitText
                text={profile?.firstName ? `${profile.firstName} ${profile.lastName || ''}`.trim() : (profile?.name || 'No Name')}
                className="text-xl font-extrabold bg-gradient-to-r from-brand-purple via-brand-pink to-white bg-clip-text text-transparent drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] tracking-wide text-left"
                delay={80}
                animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                easing="easeOutCubic"
                threshold={0.3}
                rootMargin="-100px"
                textAlign="left"
              />
              {profile?.gender && (
                <span className={`ml-2 text-sm font-semibold ${profile.gender === 'Male' ? 'text-blue-400' : profile.gender === 'Female' ? 'text-pink-400' : 'text-white/80'}`}>{profile.gender}</span>
              )}
              {profile?.college && (
                <div className="text-sm text-white/80 mt-1">{profile.college}</div>
              )}
              <span className="text-sm text-white font-extrabold drop-shadow-[0_0_4px_#fff,0_0_8px_#a259ff] w-full text-left">{profile?.email}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 w-full">
                <div className="flex flex-row gap-2 flex-wrap w-full justify-start items-center">
                  <span className="bg-gradient-to-r from-[#2d1a4a] to-[#23272f] text-white px-3 py-1 rounded-full text-xs font-extrabold shadow w-fit" style={{ backgroundColor: 'rgba(20,20,30,0.7)', textShadow: '0 1px 4px #000' }}> {profile?.city} </span>
                  <span className="bg-gradient-to-r from-[#23272f] to-[#2d1a4a] text-white px-3 py-1 rounded-full text-xs font-extrabold shadow w-fit" style={{ backgroundColor: 'rgba(20,20,30,0.7)', textShadow: '0 1px 4px #000' }}> DOB: {profile?.dateOfBirth || 'N/A'} </span>
                  <span className="bg-gradient-to-r from-[#2d1a4a] to-[#23272f] text-white px-3 py-1 rounded-full text-xs font-extrabold shadow w-fit" style={{ backgroundColor: 'rgba(20,20,30,0.7)', textShadow: '0 1px 4px #000' }}> Phone: {profile?.phoneNumber || 'N/A'} </span>
                </div>
              </div>
              {profile?.bio && (
                <div className="mt-2 w-full">
                  <p className="text-white font-semibold bg-[#23272f]/80 rounded-xl px-3 py-2 border border-[#a259ff]/40 shadow-inner text-base text-left w-full">
                    {profile.bio || 'This is a temporary bio. Update your profile to add your own bio!'}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex justify-center my-4">
            <div className="h-[2px] w-2/3 bg-gradient-to-r from-[#a259ff] via-[#ff7eb3] to-white rounded-full opacity-60" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-2">
            {/* Contact & Social */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-3 flex flex-col items-center border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-2 flex items-center gap-2">Contact & Social</h3>
              <div className="w-full flex justify-center my-3">
                <div className="h-[1.5px] w-2/3 bg-gradient-to-r from-[#a259ff] via-[#ff7eb3] to-white rounded-full" />
              </div>
              <div className="flex items-end gap-10 mt-2 px-2 py-2 rounded-xl bg-black/30 backdrop-blur-md shadow-lg border border-[#a259ff]/30">
                {/* LinkedIn */}
                <div className="flex flex-col items-center group">
                  <a
                    href={profile?.linkedinUrl || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    aria-label="LinkedIn"
                    className={`relative z-10 transition-transform duration-200 ${profile?.linkedinUrl ? 'hover:scale-125 hover:drop-shadow-[0_0_8px_#a259ff] hover:text-[#a259ff] cursor-pointer' : 'text-white/30 cursor-not-allowed'}`}
                    tabIndex={profile?.linkedinUrl ? 0 : -1}
                    onClick={e => { if (!profile?.linkedinUrl) e.preventDefault(); }}
                  >
                    <Linkedin className="w-7 h-7" />
                  </a>
                  <span className={`mt-1 text-xs font-semibold tracking-wide uppercase ${profile?.linkedinUrl ? 'text-[#a259ff]' : 'text-white/40'}`}>LinkedIn</span>
                </div>
                {/* GitHub */}
                <div className="flex flex-col items-center group">
                  <a
                    href={profile?.githubUrl || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    aria-label="GitHub"
                    className={`relative z-10 transition-transform duration-200 ${profile?.githubUrl ? 'hover:scale-125 hover:drop-shadow-[0_0_8px_#a259ff] hover:text-[#a259ff] cursor-pointer' : 'text-white/30 cursor-not-allowed'}`}
                    tabIndex={profile?.githubUrl ? 0 : -1}
                    onClick={e => { if (!profile?.githubUrl) e.preventDefault(); }}
                  >
                    <Github className="w-7 h-7" />
                  </a>
                  <span className={`mt-1 text-xs font-semibold tracking-wide uppercase ${profile?.githubUrl ? 'text-[#a259ff]' : 'text-white/40'}`}>GitHub</span>
                </div>
                {/* Website */}
                <div className="flex flex-col items-center group">
                  <a
                    href={profile?.portfolioUrl || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Website"
                    aria-label="Website"
                    className={`relative z-10 transition-transform duration-200 ${profile?.portfolioUrl ? 'hover:scale-125 hover:drop-shadow-[0_0_8px_#ff7eb3] hover:text-[#ff7eb3] cursor-pointer' : 'text-white/30 cursor-not-allowed'}`}
                    tabIndex={profile?.portfolioUrl ? 0 : -1}
                    onClick={e => { if (!profile?.portfolioUrl) e.preventDefault(); }}
                  >
                    <Globe className="w-7 h-7" />
                  </a>
                  <span className={`mt-1 text-xs font-semibold tracking-wide uppercase ${profile?.portfolioUrl ? 'text-[#ff7eb3]' : 'text-white/40'}`}>Website</span>
                </div>
              </div>
            </div>
            {/* Education */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-3 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-2 flex items-center gap-2">Education</h3>
              <div className="mb-1 text-white/90 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-[#a259ff]" /><span className="font-semibold text-sm">Branch:</span> {profile?.branch}</div>
              <div className="mb-1 text-white/90 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#a259ff]" /><span className="font-semibold text-sm">Year:</span> {profile?.year}</div>
              <div className="mb-1 text-white/90 flex items-center gap-2"><School className="w-4 h-4 text-[#a259ff]" /><span className="font-semibold text-sm">College:</span> {profile?.college}</div>
            </div>
            {/* Skills */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-3 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-2 flex items-center gap-2">Skills</h3>
              {Array.isArray(profile?.skills) && profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.skills.slice(0, 8).map((skill, idx) => (
                    <span key={idx} className="bg-[#ff7eb3]/20 text-[#ff7eb3] px-3 py-1 rounded-full text-base font-semibold border border-[#ff7eb3]/40 shadow-sm">{skill}</span>
                  ))}
                </div>
              ) : <span className="text-white/60 text-sm">None</span>}
            </div>
            {/* Projects */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-3 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-2 flex items-center gap-2">Projects</h3>
              {Array.isArray(profile?.projects) && profile.projects.length > 0 ? (
                <ul className="space-y-2">
                  {profile.projects.map((p, idx) => (
                    <li key={idx} className="text-white/90 text-sm border border-white/10 rounded p-2">
                      <div className="font-bold mb-1">Project {idx + 1}</div>
                      <div className="flex flex-wrap gap-3">
                        {p.githubUrl && <a className="underline text-[#a259ff]" href={p.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
                        {p.liveUrl && <a className="underline text-[#ff7eb3]" href={p.liveUrl} target="_blank" rel="noopener noreferrer">Live</a>}
                        {p.youtubeUrl && <a className="underline text-white/80" href={p.youtubeUrl} target="_blank" rel="noopener noreferrer">YouTube</a>}
                      </div>
                      {p.description && <div className="text-white/70 mt-1">{p.description}</div>}
                    </li>
                  ))}
                </ul>
              ) : <span className="text-white/60 text-sm">No projects added.</span>}
            </div>
            {/* Certifications */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-3 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-2 flex items-center gap-2">Certifications</h3>
              {Array.isArray(profile?.certificationFiles) && profile.certificationFiles.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {profile.certificationFiles.map((url, idx) => (
                    <img key={idx} src={url.url || url} alt={`Certificate ${idx+1}`} className="w-20 h-20 object-cover rounded border border-white/20 cursor-pointer" onClick={() => window.open(url.url || url, '_blank')} />
                  ))}
                </div>
              ) : <span className="text-white/60 text-sm">No certifications uploaded.</span>}
            </div>
            {/* Profile & Preferences */}
            <div className="rounded-2xl bg-[#18181b] shadow-2xl p-6 w-full border-2 border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-4 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_24px_4px_#a259ff99,0_0_48px_8px_#ff7eb399] xl:col-span-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-4 flex items-center gap-2">Profile & Preferences</h3>
              <div className="flex flex-col gap-4 w-full">
                <div className="w-full">
                  <span className="flex items-center gap-2 font-semibold text-lg text-white mb-1"><FileText className="w-6 h-6 text-[#a259ff]" /> Bio:</span>
                  <p className="text-white font-semibold bg-[#23272f]/80 rounded-xl px-4 py-3 border border-[#a259ff]/40 shadow-inner text-base text-left w-full">
                    {profile?.bio || 'This is a temporary bio. Update your profile to add your own bio!'}
                  </p>
                </div>
                <div className="w-full">
                  <span className="flex items-center gap-2 font-semibold text-lg text-white mb-1"><Target className="w-6 h-6 text-[#ff7eb3]" /> Career Goals:</span>
                  <p className="text-white font-semibold bg-[#23272f]/80 rounded-xl px-4 py-3 border border-[#ff7eb3]/40 shadow-inner text-base text-left w-full">
                    {profile?.careerGoals || 'No career goals set.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}