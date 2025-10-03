import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Globe, FileUp, FileText, Upload, FileCheck2, FileSearch, X, User, Mail, GraduationCap, Calendar, School, Sparkles, Folder, Award, UserCog, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/ui/split-text';
import { useAuth } from '@/lib/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserProfile, updateUserProfile, ApiService } from '@/lib/api';
import Lenis from 'lenis';

interface EditProfileData {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  education: string;
  branch: string;
  year: string;
  college: string;
  city: string;
  phoneNumber: string;
  linkedin: string;
  github: string;
  website: string;
  profilePicture: string;
  skills: string;
  interests: string;
  careerGoals: string;
  dateOfBirth: string;
  resumeFiles: string[];
  projectFiles: string[];
  certificationFiles: string[];
}

export default function StudentProfileDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (editOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [editOpen]);
  const [editData, setEditData] = useState<EditProfileData>({
    displayName: '',
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    education: '',
    branch: '',
    year: '',
    college: '',
    city: '',
    phoneNumber: '',
    linkedin: '',
    github: '',
    website: '',
    profilePicture: '',
    skills: '',
    interests: '',
    careerGoals: '',
    dateOfBirth: '',
    resumeFiles: [],
    projectFiles: [],
    certificationFiles: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // Stepper state moved to top level
  const [step, setStep] = useState(0);
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(1);
  const steps = [
    'Basic Info',
    'Education & Skills',
    'Profile & Preferences',
    'Contact & Social',
    'Projects & Certificates',
  ];
  const [saving, setSaving] = useState(false);

  // Demo data for posted projects/startups (fallback)
  const postedItems = [
    {
      type: 'Startup',
      title: 'AI EdTech Platform',
      applicants: [
        { name: 'Alice Johnson', summary: 'AI/ML Intern, 2 years exp.', status: 'pending' },
        { name: 'Bob Smith', summary: 'Fullstack Dev, 1 year exp.', status: 'pending' },
      ],
    },
    {
      type: 'Project',
      title: 'Smart Builder',
      applicants: [
        { name: 'Charlie Brown', summary: 'UI/UX Designer, 3 years exp.', status: 'pending' },
      ],
    },
  ];

  // Fetch profile from backend
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getUserProfile(user.uid)
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // Lenis smooth scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      touchMultiplier: 2,
      infinite: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  // Open edit modal with prefilled data
  const handleEdit = () => {
    setEditData({
      displayName: profile?.name || user.displayName || '',
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      email: profile?.email || user.email || '',
      bio: profile?.bio || '',
      education: profile?.education || '',
      branch: profile?.branch || '',
      year: profile?.year || '',
      college: profile?.college || '',
      city: profile?.city || '',
      phoneNumber: profile?.phoneNumber || '',
      linkedin: profile?.linkedinUrl || '',
      github: profile?.githubUrl || '',
      website: profile?.portfolioUrl || '',
      profilePicture: profile?.profilePicture || '',
      skills: Array.isArray(profile?.skills) ? profile.skills.join(', ') : (profile?.skills || ''),
      interests: Array.isArray(profile?.interests) ? profile.interests.join(', ') : (profile?.interests || ''),
      careerGoals: profile?.careerGoals || '',
      dateOfBirth: profile?.dateOfBirth || '',
      resumeFiles: profile?.resumeFiles || [],
      projectFiles: profile?.projectFiles || [],
      certificationFiles: profile?.certificationFiles || [],
      // preload projects array if present
      ...(profile?.projects ? { projects: profile.projects } : {}),
    });
    // initialize visible projects based on existing projects length
    const existingCount = Array.isArray((profile as any)?.projects) ? (profile as any).projects.length : 0;
    setVisibleProjectsCount(Math.max(1, Math.min(existingCount || 1, 6)));
    setStep(0);
    setEditOpen(true);
  };

  // Save profile to backend
  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const data = {
      name: editData.displayName,
      firstName: editData.firstName,
      lastName: editData.lastName,
      email: editData.email,
      bio: editData.bio,
      education: editData.education,
      branch: editData.branch,
      year: editData.year,
      college: editData.college,
      city: editData.city,
      phoneNumber: editData.phoneNumber,
      linkedinUrl: editData.linkedin,
      githubUrl: editData.github,
      portfolioUrl: editData.website,
      profilePicture: editData.profilePicture,
      skills: Array.isArray(editData.skills) ? editData.skills : editData.skills.split(',').map(s => s.trim()).filter(Boolean),
      interests: Array.isArray(editData.interests) ? editData.interests : editData.interests.split(',').map(s => s.trim()).filter(Boolean),
      careerGoals: editData.careerGoals,
      dateOfBirth: editData.dateOfBirth,
      resumeFiles: editData.resumeFiles || [],
      projectFiles: editData.projectFiles,
      certificationFiles: editData.certificationFiles,
      isOnline: true,
      completedProfile: true
    };
    try {
      const result = await updateUserProfile(user.uid, data);
      if (result.success) {
        // Refetch profile after successful save
        const updatedProfile = await getUserProfile(user.uid);
        setProfile(updatedProfile);
        setEditOpen(false);
        alert('Profile saved successfully!');
      } else {
        alert(`Failed to save profile: ${result.error || result.message}`);
      }
    } catch (err) {
      console.error('Profile save error:', err);
      alert('Failed to save profile. Please try again later.');
    } finally {
      setSaving(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/login';
  };

  // Helper function to save step data
  const saveStepData = async (stepData) => {
    if (!user) return { success: false, error: 'No user' };
    try {
      const result = await updateUserProfile(user.uid, stepData);
      if (result.success) {
        // Refetch profile after save
        const updatedProfile = await getUserProfile(user.uid);
        setProfile(updatedProfile);
        return { success: true };
      } else {
        return {
          success: false,
          error: result.error || result.message || 'Unknown error'
        };
      }
    } catch (err) {
      console.error('Step save error:', err);
      return {
        success: false,
        error: err.message || 'Unknown error'
      };
    }
  };

  // Stepper navigation with save after each step
  const handleNextStep = async () => {
    let result;
    if (step === 0) {
      result = await saveStepData({
        name: editData.displayName,
        year: editData.year,
        college: editData.college,
        branch: editData.education,
        city: editData.city,
      });
    } else if (step === 1) {
      result = await saveStepData({
        skills: editData.skills.split(',').map(s => s.trim()).filter(Boolean),
      });
    } else if (step === 2) {
      result = await saveStepData({
        bio: editData.bio,
        careerGoals: editData.careerGoals,
        interests: editData.interests.split(',').map(s => s.trim()).filter(Boolean),
      });
    } else if (step === 3) {
      result = await saveStepData({
        email: editData.email,
        linkedinUrl: editData.linkedin,
        githubUrl: editData.github,
        portfolioUrl: editData.website,
        profilePicture: editData.profilePicture,
        phoneNumber: editData.phoneNumber,
      });
    } else if (step === 4) {
      result = await saveStepData({
        projects: (editData as any).projects || [],
        certificationFiles: (editData as any).certificationFiles || [],
      });
    }
    if (!result?.success) {
      alert('Failed to save step: ' + (result?.error || 'Unknown error'));
      return;
    }
    setStep(s => Math.min(steps.length - 1, s + 1));
  };
  const handleBackStep = () => {
    setStep(s => Math.max(0, s - 1));
  };

  if (loading) return <div className="text-white p-8">Loading profile...</div>;
  if (!user) return <div className="text-white p-8">Please log in.</div>;

  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden bg-black">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none" />
      {/* Responsive Dashboard Heading Bar */}
      <div className="w-full border-b border-[#a259ff] bg-black/90 backdrop-blur-xl rounded-b-3xl shadow-xl mb-6 relative">
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-10 pt-3 pb-3 w-full gap-y-2">
          <span className="text-2xl sm:text-5xl font-extrabold text-white tracking-wide uppercase text-center flex-1">DASHBOARD</span>
          <div className="flex gap-2 sm:gap-3 flex-shrink-0">
            <button
              className="bg-[#a259ff] hover:bg-[#ff7eb3] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg transition-all duration-200 text-base sm:text-xl"
              onClick={handleEdit}
              title="Edit Profile"
            >
              <span className="hidden sm:inline">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg transition-all duration-200 text-base sm:text-xl border-2 border-red-700"
              onClick={handleLogout}
              title="Logout"
            >
              Logout
            </button>
            <button
              className="text-white text-xl sm:text-2xl font-bold hover:text-[#a259ff] transition drop-shadow-lg flex-shrink-0 ml-2 sm:ml-3"
              onClick={() => window.history.back()}
              title="Go Back"
            >
              <X className="w-7 h-7 sm:w-10 sm:h-10" />
            </button>
          </div>
        </div>
      </div>
      {/* Main Dashboard Section */}
      <section className="w-full min-h-[90vh] px-0 sm:px-4 pt-8">
        <div className="rounded-3xl bg-black backdrop-blur-xl shadow-[0_0_32px_4px_#a259ff55] border border-white p-2 sm:p-4 md:p-6 mx-0 w-full">
          {/* Profile Card */}
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 bg-gradient-to-br from-black via-[#23272f] to-[#2d1a4a] rounded-2xl shadow-2xl p-4 sm:p-8 md:p-10 mb-6 sm:mb-10 border border-[#a259ff] hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-[#a259ff] hover:outline-[#ff7eb3] hover:shadow-[0_0_24px_4px_#a259ff99,0_0_48px_8px_#ff7eb399] backdrop-blur-2xl w-full">
            <div className="relative">
              <img src={profile?.profilePicture || 'https://placehold.co/120x120/A855F7/FFFFFF?text=User'} alt="Profile" className="h-24 w-24 rounded-full border-4 border-[#a259ff] bg-[#23272f] object-cover shadow-2xl" />
              {/* Removed year badge */}
            </div>
            <div className="flex-1 flex flex-col gap-2 items-center lg:items-start w-full max-w-2xl justify-start">
              <SplitText
                text={
                  (profile?.firstName || profile?.lastName)
                    ? `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim()
                    : (profile?.name || user.displayName || 'No Name')
                }
                className="text-xl font-extrabold bg-gradient-to-r from-brand-purple via-brand-pink to-white bg-clip-text text-transparent drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] tracking-wide text-left"
                delay={80}
                animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                easing="easeOutCubic"
                threshold={0.3}
                rootMargin="-100px"
                textAlign="left"
              />
              <span className="text-sm text-white font-extrabold drop-shadow-[0_0_4px_#fff,0_0_8px_#a259ff] w-full text-left">{profile?.email || user.email}</span>
              <div className="flex flex-row flex-wrap gap-3 mt-2 items-center w-full justify-start">
                {profile?.city && (
                  <span className="bg-black text-white px-3 py-1 rounded-full text-base font-extrabold shadow drop-shadow-[0_0_2px_#fff,0_0_4px_#a259ff]">{profile?.city}</span>
                )}
                {profile?.dateOfBirth && (
                  <span className="bg-black text-white px-3 py-1 rounded-full text-base font-extrabold shadow drop-shadow-[0_0_2px_#fff,0_0_4px_#ff7eb3]">DOB: {profile?.dateOfBirth}</span>
                )}
                {profile?.phoneNumber && (
                  <span className="bg-black text-white px-3 py-1 rounded-full text-base font-extrabold shadow drop-shadow-[0_0_2px_#fff,0_0_4px_#ff7eb3]">Phone: {profile?.phoneNumber}</span>
                )}
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
          {/* Divider */}
          <div className="w-full flex justify-center my-4">
            <div className="h-[2px] w-2/3 bg-gradient-to-r from-[#a259ff] via-[#ff7eb3] to-white rounded-full opacity-60" />
          </div>
          {/* Responsive Info Grid - 3 columns on xl, 2 on md, 1 on mobile */}
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
                  <span className={`mt-1 text-xs font-semibold tracking-wide ${profile?.linkedinUrl ? 'text-[#a259ff]' : 'text-white/40'}`}>LinkedIn</span>
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
                  <span className={`mt-1 text-xs font-semibold tracking-wide ${profile?.githubUrl ? 'text-[#a259ff]' : 'text-white/40'}`}>GitHub</span>
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
                  <span className={`mt-1 text-xs font-semibold tracking-wide ${profile?.portfolioUrl ? 'text-[#ff7eb3]' : 'text-white/40'}`}>Website</span>
                </div>
              </div>
            </div>
            {/* Education */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-3 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-2 flex items-center gap-2">Education</h3>
              <div className="mb-1 text-white/90 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-[#a259ff]" /><span className="font-semibold text-sm">Branch:</span> {profile?.branch}</div>
              <div className="mb-1 text-white/90 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#a259ff]" /><span className="font-semibold text-sm">Year:</span> {profile?.year}</div>
              <div className="mb-1 text-white/90 flex items-center gap-2"><School className="w-4 h-4 text-[#a259ff]" /><span className="font-semibold text-sm">University:</span> {profile?.university || profile?.college}</div>
            </div>
            {/* Skills */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-3 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-2 flex items-center gap-2">Skills</h3>
              {Array.isArray(profile?.skills) && profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.skills.map((skill, idx) => (
                    <span key={idx} className="bg-[#ff7eb3]/20 text-[#ff7eb3] px-3 py-1 rounded-full text-base font-semibold border border-[#ff7eb3]/40 shadow-sm">{skill}</span>
                  ))}
                </div>
              ) : <span className="text-white/60 text-sm">None</span>}
            </div>
            {/* Projects (display saved projects array) */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-3 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-2 flex items-center gap-2">Projects</h3>
              {Array.isArray((profile as any)?.projects) && (profile as any).projects.length > 0 ? (
                <ul className="space-y-2">
                  {(profile as any).projects.map((p, idx) => (
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
                <ul className="space-y-1">
                  {profile.certificationFiles.map((file, idx) => (
                    <li key={idx} className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-[#ff7eb3]" />
                      <a href={file.url || file} target="_blank" rel="noopener noreferrer" className="text-white/90 underline text-base">{file.name || file}</a>
                    </li>
                  ))}
                </ul>
              ) : <span className="text-white/60 text-sm">No certifications uploaded.</span>}
            </div>
            {/* Resume */}
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
      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl">
          <div className="w-full max-w-4xl h-full sm:h-auto flex items-center justify-center">
            <form
              onSubmit={handleSave}
              onKeyDown={e => {
                const target = e.target as HTMLElement;
                // Only prevent Enter if not in textarea
                if (
                  e.key === 'Enter' &&
                  !(target instanceof HTMLTextAreaElement)
                ) {
                  e.preventDefault();
                }
              }}
              className="bg-[#18181b] neon-border rounded-2xl shadow-2xl p-4 w-full max-w-4xl relative z-50 space-y-6 overflow-y-auto max-h-[90vh] sm:max-h-none"
              style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
            >
              <button type="button" onClick={() => !saving && setEditOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-[#a259ff] p-2 rounded-full transition" disabled={saving}><X className="w-6 h-6" /></button>
              <h2 className="text-white text-2xl font-extrabold mb-6 text-center tracking-wide">Edit Profile</h2>
              {saving && (
                <div className="flex justify-center items-center mb-3">
                  <span className="text-[#a259ff] text-xl font-bold animate-pulse">Saving your details...</span>
                </div>
              )}
              {/* Stepper logic */}
              <div className="flex items-center justify-center gap-8 mb-4"> {/* gap increased for more space between icons */}
                {steps.map((label, idx) => {
                  // Icon mapping for each step
                  const icons = [
                    <User key="user" className="w-5 h-5" />,
                    <Mail key="mail" className="w-5 h-5" />,
                    <GraduationCap key="grad" className="w-5 h-5" />,
                    <UserCog key="userCog" className="w-5 h-5" />,
                    <FileUp key="fileUp" className="w-5 h-5" />,
                  ];
                  return (
                    <div key={label} className={`flex flex-col items-center ${idx === step ? 'text-[#a259ff] font-extrabold' : 'text-white/60 font-bold'} ${window.innerWidth < 640 ? 'mx-2' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${idx === step ? 'border-[#a259ff] bg-[#a259ff22]' : 'border-white/30 bg-[#23272f]'}`}>{icons[idx]}</div>
                      <span className="text-[10px] mt-1 uppercase tracking-wide">{label}</span>
                    </div>
                  );
                })}
              </div>
              {/* Step 1: Basic Info */}
              {/* Step 1: Basic Info */}
              {step === 0 && (
                <div className="space-y-4">
                  <h3 className="text-white/90 text-lg font-extrabold mb-2 border-b border-[#a259ff44] pb-2 tracking-wide">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">First Name <span className="text-red-500">*</span></label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="First Name" value={editData.firstName} onChange={e => setEditData({ ...editData, firstName: e.target.value })} />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Last Name</label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Last Name" value={editData.lastName} onChange={e => setEditData({ ...editData, lastName: e.target.value })} />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Date of Birth</label>
                      <input type="date" className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" value={editData.dateOfBirth} onChange={e => setEditData({ ...editData, dateOfBirth: e.target.value })} />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Phone Number <span className="text-red-500">*</span></label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Phone Number" value={editData.phoneNumber} onChange={e => setEditData({ ...editData, phoneNumber: e.target.value })} />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">City</label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="City" value={editData.city} onChange={e => setEditData({ ...editData, city: e.target.value })} />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Email <span className="text-red-500">*</span></label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Email" value={editData.email} readOnly required />
                    </div>
                  </div>
                </div>
              )}
              {/* Step 2: Education & Skills */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-white/90 text-lg font-extrabold mb-2 border-b border-[#a259ff44] pb-2 tracking-wide">Education & Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Branch <span className="text-red-500">*</span></label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Branch" value={editData.branch} onChange={e => setEditData({ ...editData, branch: e.target.value })} required />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Year</label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Year" value={editData.year} onChange={e => setEditData({ ...editData, year: e.target.value })} />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">University <span className="text-red-500">*</span></label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="University" value={editData.college} onChange={e => setEditData({ ...editData, college: e.target.value })} required />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Skills (comma separated) <span className="text-red-500">*</span></label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Skills" value={editData.skills} onChange={e => setEditData({ ...editData, skills: e.target.value })} required />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Interests (comma separated)</label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Interests" value={editData.interests} onChange={e => setEditData({ ...editData, interests: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}
              {/* Step 3: Profile & Preferences */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-white/90 text-lg font-extrabold mb-2 border-b border-[#a259ff44] pb-2 tracking-wide">Profile & Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Bio</label>
                      <textarea className="p-4 rounded bg-[#23272f] text-white w-full min-h-[120px] font-semibold text-lg" placeholder="Bio" value={editData.bio} onChange={e => setEditData({ ...editData, bio: e.target.value })} />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Career Goals</label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Career Goals" value={editData.careerGoals} onChange={e => setEditData({ ...editData, careerGoals: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}
              {/* Step 4: Contact & Social */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-white/90 text-lg font-extrabold mb-2 border-b border-[#a259ff44] pb-2 tracking-wide">Contact & Social</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">LinkedIn</label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="LinkedIn" value={editData.linkedin} onChange={e => setEditData({ ...editData, linkedin: e.target.value })} />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">GitHub</label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="GitHub" value={editData.github} onChange={e => setEditData({ ...editData, github: e.target.value })} />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Website/Portfolio</label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Website/Portfolio" value={editData.website} onChange={e => setEditData({ ...editData, website: e.target.value })} />
                    </div>
                    <div className="w-full">
                      <label className="block text-white/90 mb-3 font-bold text-lg">Profile Picture URL</label>
                      <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Profile Picture URL" value={editData.profilePicture} onChange={e => setEditData({ ...editData, profilePicture: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}
              {/* Step 5: Projects & Certificates */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-white/90 text-lg font-extrabold mb-2 border-b border-[#a259ff44] pb-2 tracking-wide">Projects & Certificates</h3>
                  {/* Projects: GitHub, Live, YouTube, Description */}
                  <div className="space-y-3">
                    {Array.from({ length: Math.min(visibleProjectsCount, 6) }).map((_, idx) => (
                      <div key={idx} className="border border-[#a259ff55] rounded-lg p-3 bg-[#23272f]">
                        <div className="text-white/80 font-bold mb-2">Project {idx + 1}</div>
                        <input className="p-2 rounded bg-black/40 text-white w-full font-semibold text-sm mb-2" placeholder="GitHub URL" value={(editData as any).projects?.[idx]?.githubUrl || ''} onChange={e => {
                          const projects = [ ...((editData as any).projects || []) ];
                          projects[idx] = { ...(projects[idx] || {}), githubUrl: e.target.value };
                          setEditData({ ...(editData as any), projects });
                        }} />
                        <input className="p-2 rounded bg-black/40 text-white w-full font-semibold text-sm mb-2" placeholder="Deployed Link" value={(editData as any).projects?.[idx]?.liveUrl || ''} onChange={e => {
                          const projects = [ ...((editData as any).projects || []) ];
                          projects[idx] = { ...(projects[idx] || {}), liveUrl: e.target.value };
                          setEditData({ ...(editData as any), projects });
                        }} />
                        <input className="p-2 rounded bg-black/40 text-white w-full font-semibold text-sm mb-2" placeholder="YouTube URL" value={(editData as any).projects?.[idx]?.youtubeUrl || ''} onChange={e => {
                          const projects = [ ...((editData as any).projects || []) ];
                          projects[idx] = { ...(projects[idx] || {}), youtubeUrl: e.target.value };
                          setEditData({ ...(editData as any), projects });
                        }} />
                        <textarea className="p-2 rounded bg-black/40 text-white w-full font-semibold text-sm" placeholder="Description" rows={2} value={(editData as any).projects?.[idx]?.description || ''} onChange={e => {
                          const projects = [ ...((editData as any).projects || []) ];
                          projects[idx] = { ...(projects[idx] || {}), description: e.target.value };
                          setEditData({ ...(editData as any), projects });
                        }} />
                      </div>
                    ))}
                    {visibleProjectsCount < 6 && (
                      <button
                        type="button"
                        className="mt-1 bg-[#a259ff] text-white px-4 py-2 rounded font-extrabold hover:bg-[#7e3fff] transition text-base"
                        onClick={() => {
                          setEditData(prev => {
                            const next = { ...(prev as any) } as any;
                            const projects = [ ...(next.projects || []) ];
                            if (projects.length < visibleProjectsCount + 1) {
                              projects.push({ githubUrl: '', liveUrl: '', youtubeUrl: '', description: '' });
                            }
                            next.projects = projects;
                            return next;
                          });
                          setVisibleProjectsCount(c => Math.min(c + 1, 6));
                        }}
                      >
                        + Add Project
                      </button>
                    )}
                  </div>
                  {/* Certificates: image URLs list that open in new tab */}
                  <div className="mt-4">
                    <div className="text-white/90 font-bold mb-2">Certificates</div>
                    <div className="flex flex-wrap gap-3">
                      {Array.isArray((editData as any).certificationFiles) && (editData as any).certificationFiles.map((url, idx) => (
                        <div key={idx} className="relative">
                          <img src={url} alt={`Certificate ${idx+1}`} className="w-24 h-24 object-cover rounded border border-white/20 cursor-pointer" onClick={() => window.open(url, '_blank')} />
                          <button type="button" className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs" onClick={() => {
                            const arr = ((editData as any).certificationFiles || []).filter((_, i) => i !== idx);
                            setEditData({ ...(editData as any), certificationFiles: arr });
                          }}>×</button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <input type="file" accept="image/*" onChange={async e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const uploaded = await ApiService.uploadCertificateImage(file);
                          setEditData(prev => ({ ...(prev as any), certificationFiles: [ ...(((prev as any).certificationFiles) || []), uploaded.url ] }));
                        } catch (err) {
                          alert('Upload failed');
                        } finally {
                          e.currentTarget.value = '';
                        }
                      }} className="text-white" />
                      <span className="text-white/70 text-sm">Upload image; click thumbnail to open</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-between mt-6">
                <button type="button" className="bg-[#23272f] text-white px-6 py-2 rounded font-extrabold hover:bg-[#a259ff] transition text-base" disabled={step === 0 || saving} onClick={handleBackStep}>Back</button>
                {step < steps.length - 1 ? (
                  <button type="button" className="bg-[#a259ff] text-white px-6 py-2 rounded font-extrabold hover:bg-[#7e3fff] transition text-base" onClick={handleNextStep} disabled={saving}>Next</button>
                ) : (
                  <button type="submit" className="bg-[#a259ff] text-white px-6 py-2 rounded font-extrabold hover:bg-[#7e3fff] transition text-base" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Footer Buttons */}
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-10 pb-10 flex flex-col sm:flex-row gap-4 mt-16">
        {/* Removed Edit Profile and Logout buttons from footer */}
      </footer>
    </div>
  );
}