
import { motion } from "framer-motion";
import { useState } from "react";
import InternshipCard from "./InternshipCard";
import InternshipModal from "./InternshipModal";

interface Internship {
  id: string;
  title: string;
  company: string;
  logo: string;
  stipend: string;
  duration: string;
  type: string;
  domain: string;
  location: string;
  deadline: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
}

interface InternshipGridProps {
  searchQuery: string;
  selectedType: string;
  selectedDomain: string;
  selectedDuration: string;
}

const InternshipGrid = ({
  searchQuery,
  selectedType,
  selectedDomain,
  selectedDuration
}: InternshipGridProps) => {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  // Sample internship data
  const internships: Internship[] = [
    {
      id: "1",
      title: "Frontend Developer Intern",
      company: "TechCorp",
      logo: "💻",
      stipend: "₹25,000/month",
      duration: "3-6 months",
      type: "remote",
      domain: "tech",
      location: "Remote",
      deadline: "2024-01-15",
      description: "Join our frontend team to build amazing user experiences using React and modern web technologies.",
      requirements: ["React.js", "JavaScript", "HTML/CSS", "Git"],
      benefits: ["Flexible hours", "Mentorship", "Certificate", "PPO opportunity"],
      skills: ["React", "JavaScript", "CSS", "Git"]
    },
    {
      id: "2",
      title: "UI/UX Design Intern",
      company: "DesignStudio",
      logo: "🎨",
      stipend: "₹20,000/month",
      duration: "3-6 months",
      type: "hybrid",
      domain: "design",
      location: "Bangalore",
      deadline: "2024-01-20",
      description: "Create stunning user interfaces and experiences for our mobile and web applications.",
      requirements: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      benefits: ["Design tools access", "Portfolio building", "Networking", "Certificate"],
      skills: ["Figma", "Adobe XD", "UI Design", "UX Research"]
    },
    {
      id: "3",
      title: "Digital Marketing Intern",
      company: "MarketPro",
      logo: "📈",
      stipend: "₹18,000/month",
      duration: "1-3 months",
      type: "in-office",
      domain: "marketing",
      location: "Mumbai",
      deadline: "2024-01-25",
      description: "Learn and execute digital marketing strategies across various channels and platforms.",
      requirements: ["Social Media", "Content Creation", "Analytics", "Communication"],
      benefits: ["Hands-on experience", "Industry exposure", "Certificate", "Networking"],
      skills: ["Social Media", "SEO", "Content Marketing", "Analytics"]
    },
    {
      id: "4",
      title: "Financial Analyst Intern",
      company: "FinanceHub",
      logo: "💰",
      stipend: "₹22,000/month",
      duration: "3-6 months",
      type: "remote",
      domain: "finance",
      location: "Remote",
      deadline: "2024-02-01",
      description: "Analyze financial data and support investment decisions with detailed reports and insights.",
      requirements: ["Excel", "Financial Modeling", "Data Analysis", "Accounting"],
      benefits: ["Professional growth", "Mentorship", "Real projects", "Certificate"],
      skills: ["Excel", "Financial Analysis", "Data Modeling", "Accounting"]
    },
    {
      id: "5",
      title: "Content Writer Intern",
      company: "ContentCo",
      logo: "✍️",
      stipend: "₹15,000/month",
      duration: "1-3 months",
      type: "remote",
      domain: "content",
      location: "Remote",
      deadline: "2024-02-05",
      description: "Create engaging content for blogs, social media, and marketing campaigns.",
      requirements: ["Writing Skills", "Research", "SEO Knowledge", "Creativity"],
      benefits: ["Portfolio building", "Byline credits", "Flexible hours", "Certificate"],
      skills: ["Content Writing", "SEO", "Research", "Social Media"]
    },
    {
      id: "6",
      title: "Sales Development Intern",
      company: "SalesForce Pro",
      logo: "📞",
      stipend: "₹20,000/month + incentives",
      duration: "3-6 months",
      type: "hybrid",
      domain: "sales",
      location: "Delhi",
      deadline: "2024-02-10",
      description: "Generate leads and support the sales team in closing deals with potential clients.",
      requirements: ["Communication", "CRM Software", "Lead Generation", "Negotiation"],
      benefits: ["Performance incentives", "Sales training", "Networking", "PPO opportunity"],
      skills: ["Sales", "CRM", "Communication", "Lead Generation"]
    }
  ];

  // Filter internships based on search and filters
  const filteredInternships = internships.filter((internship) => {
    const matchesSearch = searchQuery === "" || 
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === "all" || internship.type === selectedType;
    const matchesDomain = selectedDomain === "all" || internship.domain === selectedDomain;
    const matchesDuration = selectedDuration === "all" || internship.duration.includes(selectedDuration);
    
    return matchesSearch && matchesType && matchesDomain && matchesDuration;
  });

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Available Internships ({filteredInternships.length})
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {filteredInternships.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <InternshipCard
                internship={internship}
                onClick={() => setSelectedInternship(internship)}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No internships found</h3>
            <p className="text-white/70">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Internship Detail Modal */}
      {selectedInternship && (
        <InternshipModal
          internship={selectedInternship}
          isOpen={!!selectedInternship}
          onClose={() => setSelectedInternship(null)}
        />
      )}
    </>
  );
};

export default InternshipGrid;
