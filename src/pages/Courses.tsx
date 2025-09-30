import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Crown, Code } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";

const Courses = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO: Update title and description here for Courses page */}
      <Helmet>
        <title>Courses | StudLyF – Learn New Skills</title>
        <meta name="description" content="Browse and enroll in courses to enhance your skills. StudLyF offers curated learning opportunities for students and professionals." />
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SplitText
              text="Courses"
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              easing="easeOutCubic"
              threshold={0.3}
              rootMargin="-100px"
            />
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Enhance your skills with our comprehensive course offerings
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {/* Certifications Card */}
            <Card className="bg-gradient-to-br from-yellow-400/10 to-green-400/10 border-4 border-yellow-400 hover:border-yellow-400 transition-all duration-300 rounded-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full w-fit">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Certifications</CardTitle>
                <CardDescription className="text-white/70">
                  Explore free certification courses from top platforms across the internet. Boost your resume with recognized credentials at no cost.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-white/80 mb-6 space-y-2">
                  <li>• Free certifications from leading providers</li>
                  <li>• Industry-recognized credentials</li>
                  <li>• Self-paced online learning</li>
                  <li>• Courses from Coursera, edX, Google, and more</li>
                </ul>
                <Link to="/certifications">
                  <Button className="bg-gradient-to-r from-yellow-400 to-green-400 hover:opacity-90 w-full">
                    View Certifications
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Free Courses Card */}
            <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-4 border-green-500 hover:border-green-500 transition-all duration-300 rounded-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full w-fit">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Free Courses</CardTitle>
                <CardDescription className="text-white/70">
                  Access quality education at no cost with our free course offerings
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-white/80 mb-6 space-y-2">
                  <li>• Self-paced learning</li>
                  <li>• Community support</li>
                  <li>• Basic materials</li>
                  <li>• Lifetime access</li>
                </ul>
                <Link to="/free-courses">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 w-full">
                    View Free Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Projects Card */}
            <Card className="bg-gradient-to-br from-purple-400/10 to-pink-400/10 border-4 border-purple-400 hover:border-purple-400 transition-all duration-300 rounded-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-fit">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Projects</CardTitle>
                <CardDescription className="text-white/70">
                  Build real-world projects and contribute to open-source to sharpen your skills and showcase your work.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-white/80 mb-6 space-y-2">
                  <li>• Top real-life project ideas with implementation guides</li>
                  <li>• Curated open-source projects to contribute to</li>
                  <li>• Beginner-friendly and advanced tracks</li>
                  <li>• Contribution tips and community links</li>
                </ul>
                <Link to="/Projects">
                  <Button className="bg-gradient-to-r from-purple-400 to-pink-400 hover:opacity-90 w-full">
                    Explore Projects
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
