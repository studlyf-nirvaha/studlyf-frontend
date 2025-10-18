import { University } from 'lucide-react';
import React, { useState } from 'react';
import { User, User2, UserRound } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { updateUserProfile } from '@/lib/api';

const skillOptions = [
  'Python', 'JavaScript', 'React', 'Node.js', 'C++', 'Java', 'UI/UX', 'Machine Learning', 'Data Science', 'SQL', 'AWS', 'Docker', 'Figma', 'Public Speaking', 'Leadership', 'Marketing', 'Design'
];

interface SmallProfileFormProps {
  onClose: () => void;
  forceRequired?: boolean;
}

export default function SmallProfileForm({ onClose, forceRequired }: SmallProfileFormProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    education: '',
    branch: '',
    year: '',
    skills: [] as string[],
    skillInput: '',
    bio: '',
    college: '',
    city: '',
    phoneNumber: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    profilePicture: '',
    interests: [] as string[],
    careerGoals: '',
    dateOfBirth: '',
    resumeFiles: [] as string[],
    projectFiles: [] as string[],
    certificationFiles: [] as string[],
    projects: Array.from({ length: 1 }).map(() => ({ githubUrl: '', liveUrl: '', youtubeUrl: '', description: '' })),
  });
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRadio = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleSave = () => { onClose(); };
  const handleSkillToggle = (skill: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };
  const handleSkillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, skillInput: e.target.value });
  };
  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !form.skills.includes(trimmed) && form.skills.length < 4) {
      setForm({ ...form, skills: [...form.skills, trimmed], skillInput: '' });
    }
  };
  const canSubmit = form.firstName && form.lastName && form.age && form.college && form.bio && form.gender && form.branch && form.year && form.skills.length > 0;
  // Icon selection logic
  let genderIcon = <UserRound className="w-16 h-16 mx-auto mb-4 text-brand-purple" />;
  if (form.gender === 'Male') genderIcon = <User className="w-16 h-16 mx-auto mb-4 text-brand-purple" />;
  if (form.gender === 'Female') genderIcon = <User2 className="w-16 h-16 mx-auto mb-4 text-brand-pink" />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      const payload = {
        name: form.firstName + ' ' + form.lastName,
        firstName: form.firstName,
        lastName: form.lastName,
        bio: form.bio,
        branch: form.branch,
        year: form.year,
        college: form.college,
        city: form.city || '',
        phoneNumber: form.phoneNumber || '',
        linkedinUrl: form.linkedinUrl || '',
        githubUrl: form.githubUrl || '',
        portfolioUrl: form.portfolioUrl || '',
        profilePicture: form.profilePicture || '',
        skills: Array.isArray(form.skills) ? form.skills : [],
        interests: Array.isArray(form.interests) ? form.interests : [],
        careerGoals: form.careerGoals || '',
        dateOfBirth: form.dateOfBirth || '',
        resumeFiles: form.resumeFiles || [],
        projectFiles: form.projectFiles || [],
        certificationFiles: form.certificationFiles || [],
        projects: (form.projects || []).slice(0, 6),
        isOnline: true,
        completedProfile: true
      };
      const result = await updateUserProfile(user.uid, payload);
      if (result.success) {
        setLoading(false);
        onClose();
      } else {
        setError(result.error || result.message || 'Unable to save profile at this time. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Profile save error:', error);
      setError('Unable to save profile at this time. Please try again.');
      setLoading(false);
    }
  };
  return (
    <form
      className="flex flex-col gap-2 bg-white text-black rounded-2xl shadow-2xl w-full max-w-sm px-2 py-2 sm:px-4 sm:py-4 mx-auto relative overflow-y-auto max-h-[90vh]"
      style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
      onSubmit={handleSubmit}
    >
      {genderIcon}
      {step === 1 && (
        <>
          <label className="text-black font-semibold">First Name
            <input name="firstName" value={form.firstName} onChange={handleChange} required className="block w-full mt-1 p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base" />
          </label>
          <label className="text-black font-semibold">Last Name
            <input name="lastName" value={form.lastName} onChange={handleChange} required className="block w-full mt-1 p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base" />
          </label>
          <label className="text-black font-semibold">Tagline (One Sentence, max 50 chars)
            <input name="bio" value={form.bio} onChange={handleChange} maxLength={50} required placeholder="e.g. Passionate coder and designer" className="block w-full mt-1 p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base" />
            <div className="text-xs text-right text-gray-500 mt-1">{form.bio.length}/50</div>
          </label>
          <label className="text-black font-semibold">Age
            <input name="age" type="number" value={form.age} onChange={handleChange} required className="block w-full mt-1 p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base" />
          </label>
          <label className="text-black font-semibold">University
            <input name="college" value={form.college} onChange={handleChange} placeholder="e.g. IIT Bombay" required className="block w-full mt-1 p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base" />
          </label>
          <div className="text-black font-semibold">Gender
            <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 mt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded hover:bg-gray-100">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === 'Male'}
                  onChange={() => handleRadio('gender', 'Male')}
                  required
                  className="accent-brand-purple w-4 h-4"
                />
                <span className="ml-1">Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded hover:bg-gray-100">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === 'Female'}
                  onChange={() => handleRadio('gender', 'Female')}
                  required
                  className="accent-brand-pink w-4 h-4"
                />
                <span className="ml-1">Female</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded hover:bg-gray-100">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === 'Other'}
                  onChange={() => handleRadio('gender', 'Other')}
                  required
                  className="accent-gray-500 w-4 h-4"
                />
                <span className="ml-1">Other</span>
              </label>
            </div>
          </div>
          <button type="button" className="mt-4 bg-brand-purple text-white rounded-full px-6 py-2 font-bold hover:bg-brand-pink transition w-full" onClick={handleNext} disabled={forceRequired && !(form.firstName && form.lastName && form.age && form.college && form.bio && form.gender)}>Next</button>
        </>
      )}
      {step === 2 && (
        <>
          <div className="mt-4">
            <div className="text-black font-semibold mb-2">Projects (up to 6)</div>
            {(form.projects || []).slice(0, Math.min(visibleProjectsCount, 6)).map((p, idx) => (
              <div key={idx} className="border border-black rounded-lg p-2 mb-2 bg-white">
                <div className="text-xs text-black/70 mb-1">Project {idx + 1}</div>
                <input placeholder="GitHub URL" value={p.githubUrl} onChange={e => {
                  const projects = [...form.projects];
                  projects[idx] = { ...(projects[idx] || { githubUrl: '', liveUrl: '', youtubeUrl: '', description: '' }), githubUrl: e.target.value };
                  setForm({ ...form, projects });
                }} className="block w-full mt-1 p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base" />
                <input placeholder="Deployed Link" value={p.liveUrl} onChange={e => {
                  const projects = [...form.projects];
                  projects[idx] = { ...(projects[idx] || { githubUrl: '', liveUrl: '', youtubeUrl: '', description: '' }), liveUrl: e.target.value };
                  setForm({ ...form, projects });
                }} className="block w-full mt-2 p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base" />
                <input placeholder="YouTube URL" value={p.youtubeUrl} onChange={e => {
                  const projects = [...form.projects];
                  projects[idx] = { ...(projects[idx] || { githubUrl: '', liveUrl: '', youtubeUrl: '', description: '' }), youtubeUrl: e.target.value };
                  setForm({ ...form, projects });
                }} className="block w-full mt-2 p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base" />
                <textarea placeholder="Description" value={p.description} onChange={e => {
                  const projects = [...form.projects];
                  projects[idx] = { ...(projects[idx] || { githubUrl: '', liveUrl: '', youtubeUrl: '', description: '' }), description: e.target.value };
                  setForm({ ...form, projects });
                }} className="block w-full mt-2 p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base" rows={2} />
              </div>
            ))}
            {visibleProjectsCount < 6 && (
              <button
                type="button"
                className="bg-brand-purple text-white rounded-full px-4 py-2 font-bold hover:bg-brand-pink transition"
                onClick={() => {
                  setForm(prev => {
                    const next = { ...prev } as typeof form;
                    if ((next.projects || []).length < visibleProjectsCount + 1) {
                      next.projects = [...next.projects, { githubUrl: '', liveUrl: '', youtubeUrl: '', description: '' }];
                    }
                    return next;
                  });
                  setVisibleProjectsCount(c => Math.min(c + 1, 6));
                }}
              >
                Add Project
              </button>
            )}
          </div>
          <label className="text-black font-semibold">Branch
            <input name="branch" value={form.branch} onChange={handleChange} required className="block w-full mt-1 p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base" />
          </label>
          <label className="text-black font-semibold">Year of Study
            <input name="year" type="number" value={form.year} onChange={handleChange} required className="block w-full mt-1 p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base" />
          </label>
          <div className="text-black font-semibold">Skills
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {skillOptions.map(skill => (
                <span
                  key={skill}
                  onClick={() => form.skills.length < 4 ? handleSkillToggle(skill) : undefined}
                  className={`cursor-pointer select-none px-3 py-1 rounded-full border text-xs font-semibold transition ${form.skills.includes(skill) ? 'bg-brand-purple/20 border-brand-purple text-brand-purple' : 'bg-white border-black text-black hover:bg-black/10'} ${form.skills.length >= 4 && !form.skills.includes(skill) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ minWidth: '80px', textAlign: 'center' }}
                >
                  {skill}
                </span>
              ))}
            </div>
            {form.skills.length >= 4 && (
              <div className="text-xs text-red-500 mt-1">You can select up to 4 skills only.</div>
            )}
            <div className="flex flex-col xs:flex-row gap-2 mt-2">
              <input
                type="text"
                value={form.skillInput}
                onChange={handleSkillInput}
                className="block w-full p-2 rounded bg-white text-black border border-black focus:ring-2 focus:ring-brand-purple text-base"
                placeholder="Type and press Enter to add skill"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(form.skillInput);
                  }
                }}
                required={forceRequired && !form.skills.length}
                disabled={form.skills.length >= 4}
              />
              <button type="button" className="bg-brand-purple text-white rounded-full px-4 py-2 font-bold hover:bg-brand-pink transition w-full xs:w-auto" onClick={() => addSkill(form.skillInput)} disabled={form.skills.length >= 4}>Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.skills.map(skill => (
                <span key={skill} className="bg-brand-purple/20 text-brand-purple px-3 py-1 rounded-full text-xs font-semibold border border-brand-purple/40 flex items-center gap-1">
                  {skill}
                  <button type="button" className="ml-1 text-brand-pink hover:text-black" onClick={() => handleSkillToggle(skill)}>×</button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 mt-4">
            <button type="button" className="bg-white text-black border border-black rounded-full px-6 py-2 font-bold hover:bg-gray-200 transition w-full xs:w-auto" onClick={handleBack}>Back</button>
            <button type="submit" className="bg-brand-purple text-white rounded-full px-6 py-2 font-bold hover:bg-brand-pink transition w-full xs:w-auto" disabled={forceRequired && !canSubmit || loading}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </>
      )}
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      {loading && <div className="text-brand-purple text-center">Saving...</div>}
    </form>
  );
} 