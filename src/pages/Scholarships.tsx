import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Calendar, Users, DollarSign } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";

const scholarships = [
  {
    id: 1,
    title: 'TVS Cheema Scholarship Foundation',
    description: 'Scholarships for meritorious students from economically weaker sections, provided by TVS Cheema Scholarship Foundation.',
    link: 'https://www.tvscsf.com/'
  },
  {
    id: 2,
    title: 'ICF Foundation Scholarship',
    description: 'ICF Foundation offers scholarships to support students in their academic pursuits. Application is open for eligible candidates.',
    link: 'https://foundationoficf.org/news/icf-foundation-scholarship-application-open/?gad_source=1&gad_campaignid=9268899598&gbraid=0AAAAACnqSymVqNQDngJ-lfJ0crfJC8RBN&gclid=CjwKCAjwvuLDBhAOEiwAPtF0Vm-6clMzobA661OnYMihFGTDTIFYLgq2RqM68Uqc1ZUc1WwELLIquRoCB5IQAvD_BwE'
  },
  {
    id: 3,
    title: 'Sitaram Jindal Foundation Scholarships',
    description: 'Scholarships for students in Bangalore and across India, supporting various levels of education.',
    link: 'https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php'
  },
  {
    id: 4,
    title: 'Prime Minister’s Scholarship Scheme (PMSS)',
    description: 'A government initiative to provide financial assistance to dependent wards of ex-servicemen/ex-coast guard personnel.',
    link: 'https://www.myscheme.gov.in/schemes/pmss'
  },
  {
    id: 5,
    title: 'Indira Gandhi Single Girl Child Scholarship',
    description: 'Scholarship for single girl children pursuing higher education, aimed at promoting education among girls.',
    link: 'https://www.buddy4study.com/article/indira-gandhi-single-girl-child-scholarship'
  },
  {
    id: 6,
    title: 'Infosys STEM Stars Scholarship',
    description: 'Infosys Foundation offers scholarships to support girls pursuing STEM education in India.',
    link: 'https://www.buddy4study.com/page/infosys-stem-stars-scholarship'
  },
];

// Additional scholarships from user
const additionalScholarships = [
  {
    title: 'TVS Cheema Scholarship Foundation',
    description: 'Scholarships for meritorious students from economically weaker sections, provided by TVS Cheema Scholarship Foundation.',
    link: 'https://www.tvscsf.com/'
  },
  {
    title: 'ICF Foundation Scholarship',
    description: 'ICF Foundation offers scholarships to support students in their academic pursuits. Application is open for eligible candidates.',
    link: 'https://foundationoficf.org/news/icf-foundation-scholarship-application-open/?gad_source=1&gad_campaignid=9268899598&gbraid=0AAAAACnqSymVqNQDngJ-lfJ0crfJC8RBN&gclid=CjwKCAjwvuLDBhAOEiwAPtF0Vm-6clMzobA661OnYMihFGTDTIFYLgq2RqM68Uqc1ZUc1WwELLIquRoCB5IQAvD_BwE'
  },
  {
    title: 'Sitaram Jindal Foundation Scholarships',
    description: 'Scholarships for students in Bangalore and across India, supporting various levels of education.',
    link: 'https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php'
  },
  {
    title: 'Prime Minister’s Scholarship Scheme (PMSS)',
    description: 'A government initiative to provide financial assistance to dependent wards of ex-servicemen/ex-coast guard personnel.',
    link: 'https://www.myscheme.gov.in/schemes/pmss'
  },
  {
    title: 'Indira Gandhi Single Girl Child Scholarship',
    description: 'Scholarship for single girl children pursuing higher education, aimed at promoting education among girls.',
    link: 'https://www.buddy4study.com/article/indira-gandhi-single-girl-child-scholarship'
  },
  {
    title: 'Infosys STEM Stars Scholarship',
    description: 'Infosys Foundation offers scholarships to support girls pursuing STEM education in India.',
    link: 'https://www.buddy4study.com/page/infosys-stem-stars-scholarship'
  },
];

const Scholarships = () => {
  // Removed filter state and logic since not needed

  return (
    <div className="min-h-screen bg-black text-white">
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
              text="Scholarships"
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              easing="easeOutCubic"
              threshold={0.3}
              rootMargin="-100px"
            />
            <p className="text-xl text-white max-w-2xl mx-auto">
              Find national and international scholarships to fund your education and dreams.
            </p>
          </motion.div>

          {/* Scholarships Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {scholarships.map((scholarship) => (
              <Card key={scholarship.id || scholarship.title} className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-brand-purple/40 transition-all duration-300 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">{scholarship.title}</CardTitle>
                  <CardDescription className="text-white">{scholarship.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {scholarship.link && (
                    <a href={scholarship.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-brand-purple font-semibold hover:underline">Learn More</a>
                  )}
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Scholarships;
