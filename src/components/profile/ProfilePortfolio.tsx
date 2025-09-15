import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin, Github, Globe, FileText, Mail, Phone, MapPin, User, BookOpen, Award, Zap, Edit, X, Plus, Trophy } from 'lucide-react';

const initialProfile = {
  name: 'John Smith',
  tagline: 'Aspiring AI Researcher & Startup Founder',
  about: 'I am a passionate computer science student at IIT Bombay, focused on AI, product building, and open-source. I love collaborating on innovative projects and sharing knowledge with the community.',
  location: 'Mumbai, India',
  email: 'john.smith@email.com',
  phone: '+91-9876543210',
  gender: 'Male',
  dob: '2003-05-12',
  age: 21,
  nationality: 'Indian',
  languages: ['English', 'Hindi', 'French'],
  college: 'IIT Bombay',
  degree: 'B.Tech, Computer Science',
  year: '3rd Year',
  cgpa: '8.7 / 10',
  pastEducation: '12th: Delhi Public School, 94% | 10th: Delhi Public School, 96%',
  technicalSkills: [
    { name: 'Python', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'SQL', level: 75 },
    { name: 'Machine Learning', level: 70 },
  ],
  softSkills: ['Leadership', 'Communication', 'Teamwork'],
  aspirations: 'AI Researcher, Startup Founder',
  interests: 'Data Science, Product Management',
  industries: 'Technology, Consulting',
  projects: [
    {
      name: 'AI Chatbot',
      desc: 'A chatbot for student queries.',
      stack: '[React, Node.js, OpenAI]',
      github: 'https://github.com/johnsmith/aichatbot',
      live: 'https://aichatbot.live',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
      tags: ['AI', 'Chatbot', 'React'],
    },
    {
      name: 'Portfolio Website',
      desc: 'Personal portfolio and blog.',
      stack: '[Next.js, Tailwind]',
      github: 'https://github.com/johnsmith/portfolio',
      live: 'https://johnsmith.dev',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      tags: ['Web', 'Portfolio', 'Next.js'],
    },
  ],
  certifications: [
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon', date: 'Jan 2024', proof: '#' },
    { name: 'Google Data Analytics', issuer: 'Google', date: 'Dec 2023', proof: '#' },
  ],
  links: {
    linkedin: 'https://linkedin.com/in/johnsmith',
    github: 'https://github.com/johnsmith',
    website: 'https://johnsmith.dev',
  },
};

const ProfilePortfolio: React.FC = () => {
  const [profile] = useState(initialProfile);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a2e] pb-24">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto pt-16 pb-12 flex flex-col items-center text-center">
        <div className="relative group mb-6">
          <Avatar className="w-40 h-40 border-4 border-gradient-to-r from-brand-purple to-brand-pink shadow-xl mx-auto">
            <AvatarFallback className="text-6xl font-bold bg-gradient-to-r from-brand-purple to-brand-pink">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink mb-2">{profile.name}</h1>
        <div className="text-2xl text-white/80 font-medium mb-2">{profile.tagline}</div>
        <div className="text-lg text-white/70 mb-4 flex flex-col sm:flex-row gap-2 items-center justify-center">
          <span><MapPin className="inline w-5 h-5 mr-1 text-brand-pink" /> {profile.location}</span>
          <span className="hidden sm:inline">|</span>
          <span><BookOpen className="inline w-5 h-5 mr-1 text-brand-purple" /> {profile.year}, {profile.degree}</span>
        </div>
        <p className="text-white/80 max-w-2xl mx-auto mb-6 text-lg">{profile.about}</p>
        <div className="flex gap-4 justify-center mb-6">
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 hover:bg-brand-purple/30 p-3 transition"><Linkedin className="w-6 h-6 text-brand-purple" /></a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 hover:bg-brand-pink/30 p-3 transition"><Github className="w-6 h-6 text-brand-pink" /></a>
          <a href={profile.links.website} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 hover:bg-brand-purple/30 p-3 transition"><Globe className="w-6 h-6 text-brand-purple" /></a>
          <a href={`mailto:${profile.email}`} className="rounded-full bg-white/10 hover:bg-brand-purple/30 p-3 transition"><Mail className="w-6 h-6 text-brand-purple" /></a>
        </div>
        <div className="flex gap-4 justify-center mb-2">
          <Button className="bg-gradient-to-r from-brand-purple to-brand-pink text-white px-8 py-3 rounded-full text-lg shadow">Download Resume</Button>
          <Button variant="outline" className="border-brand-purple text-brand-purple px-8 py-3 rounded-full text-lg">Contact</Button>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-5xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profile.projects.map((proj, i) => (
            <Card key={i} className="glass-card border-none shadow-xl hover:scale-[1.02] transition-transform">
              <img src={proj.image} alt={proj.name} className="w-full h-48 object-cover rounded-t-2xl" />
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-white mb-1">{proj.name}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-2">
                  {proj.tags.map(tag => (
                    <Badge key={tag} className="bg-gradient-to-r from-brand-purple to-brand-pink text-white border-none px-3 py-1 text-xs">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-2">{proj.desc} <span className="ml-2 text-white/50 text-xs">{proj.stack}</span></p>
                <div className="flex gap-3">
                  <a href={proj.github} className="text-brand-purple underline text-sm hover:text-brand-pink transition" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={proj.live} className="text-brand-pink underline text-sm hover:text-brand-purple transition" target="_blank" rel="noopener noreferrer">Live</a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills & Tools */}
      <section className="max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Skills & Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
            <div className="space-y-4">
              {profile.technicalSkills.map(skill => (
                <div key={skill.name} className="flex items-center gap-4">
                  <span className="w-32 text-white/80 font-medium">{skill.name}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-purple to-brand-pink h-3 rounded-full" style={{ width: `${skill.level}%` }} />
                  </div>
                  <span className="text-white/60 w-10 text-right">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Soft Skills & Languages</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.softSkills.map(skill => (
                <Badge key={skill} className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-none px-3 py-1 text-base hover:scale-105 transition-transform">{skill}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map(lang => (
                <Badge key={lang} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none px-3 py-1 text-base hover:scale-105 transition-transform">{lang}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="max-w-3xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Education</h2>
        <div className="relative border-l-4 border-brand-purple/30 pl-8 space-y-8">
          <div className="absolute left-0 top-0 w-4 h-4 bg-brand-purple rounded-full -ml-2" />
          <div>
            <div className="text-xl font-bold text-white">{profile.college}</div>
            <div className="text-white/80 mb-1">{profile.degree} ({profile.year})</div>
            <div className="text-white/60 mb-1">CGPA: {profile.cgpa}</div>
            <div className="text-white/60">{profile.pastEducation}</div>
          </div>
        </div>
      </section>

      {/* Certifications & Achievements */}
      <section className="max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Certifications & Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profile.certifications.map((cert, i) => (
            <Card key={i} className="glass-card border-none shadow-lg flex flex-row items-center gap-4 p-6">
              <Award className="w-10 h-10 text-green-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-bold text-white text-lg mb-1">{cert.name}</div>
                <div className="text-white/70 text-sm mb-1">{cert.issuer} | {cert.date}</div>
                <a href={cert.proof} className="text-brand-purple underline text-sm hover:text-brand-pink transition" target="_blank" rel="noopener noreferrer">Proof</a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact / Call to Action */}
      <section className="max-w-2xl mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Let’s Connect!</h2>
        <p className="text-white/80 mb-8 text-lg">Interested in collaborating, mentoring, or hiring? Reach out and let’s build something amazing together.</p>
        <a href={`mailto:${profile.email}`} className="inline-block bg-gradient-to-r from-brand-purple to-brand-pink text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg hover:scale-105 transition-transform">Contact Me</a>
      </section>
    </div>
  );
};

export default ProfilePortfolio; 