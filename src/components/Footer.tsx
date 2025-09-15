

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, BookOpen, Briefcase, Calendar, GraduationCap, Building, Trophy, Mail, Heart, Shield, FileText } from "lucide-react";
import "./ui/FooterPremium.css";

const Footer = () => {
  return (
    <footer className="premium-footer relative">
      <div className="premium-footer-outline" />
      <div className="premium-footer-texture" />
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img
                src="/logo3.png"
                alt="StudLYF Logo"
                style={{ height: '40px', width: 'auto', objectFit: 'contain', display: 'block', borderRadius: '10px' }}
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering Every Student's Journey – Learn. Build. Connect. Track your progress, find opportunities, and grow your skills with our comprehensive platform.
            </p>

            {/* WhatsApp Group Button */}
            <div className="w-full flex justify-center mb-4 sm:mb-6">
              <a
                href="https://chat.whatsapp.com/DmhWQGDBA7ZDr5xoWTu4Xa?mode=r_t"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg text-base transition-all duration-200"
                  style={{ minWidth: 240 }}
                >
                  Join us in the WhatsApp group
                </button>
              </a>
            </div>
            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4 justify-center">
              <a href="https://www.instagram.com/guide.bazaar?igsh=d3RuemhmaGszcXk2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/guidebazaar/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Learning & Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Learning Hub
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-800/30">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/course-materials" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-800/30">
                  <FileText className="w-4 h-4 text-blue-400" />
                  Course Materials
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-800/30">
                  <BookOpen className="w-4 h-4 text-green-400" />
                  Blogs & Articles
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-800/30">
                  <GraduationCap className="w-4 h-4 text-yellow-400" />
                  Scholarships
                </Link>
              </li>
            </ul>
          </div>

          {/* Career & Opportunities */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              Career Path
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/startups" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-800/30">
                  <Building className="w-4 h-4 text-orange-400" />
                  Startups
                </Link>
              </li>
              <li>
                <Link to="/startup-schemes" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-800/30">
                  <Building className="w-4 h-4 text-red-400" />
                  Startup Schemes
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-800/30">
                  <Calendar className="w-4 h-4 text-pink-400" />
                  Events & Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Tools & Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/finance" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-800/30">
                  <BookOpen className="w-4 h-4 text-green-400" />
                  Finance Tools
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-800/30">
                  <Building className="w-4 h-4 text-purple-400" />
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-800/30">
                  <User className="w-4 h-4 text-blue-400" />
                  My Profile
                </Link>
              </li>
              <li>
                <a href="#support" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-800/30">
                  <Heart className="w-4 h-4 text-red-400" />
                  Help & Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-center" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
          <p className="text-gray-400 text-xs sm:text-sm mb-3 md:mb-0">
            © {new Date().getFullYear()} StudLYF. All rights reserved. Made with <Heart className="w-4 h-4 inline text-red-400" /> for students.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-6">
            <a href="#privacy" className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Privacy Policy
            </a>
            <a href="#terms" className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Terms of Service
            </a>
            <a href="#contact" className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3" />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
