import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ExternalLink, CheckCircle, Star, Calendar, Users, Tag, Sparkles, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GradientSeparator from "@/components/GradientSeparator";
import { SplitText } from "@/components/ui/split-text";

// Student discount data
const studentDiscounts = [
    {
        id: 1,
        brand: "Canva",
        title: "Canva Pro Free for 12 Months",
        description: "Access premium templates, remove backgrounds, and collaborate with your team",
        category: "Creative Tools",
        verification: "GitHub Student Pack",
        discount: "100% OFF",
        originalPrice: "$119.99/year",
        eligibility: "Requires GitHub Student Developer Pack verification",
        instructions: "Sign up for GitHub Student Pack, then claim Canva Pro through the pack dashboard",
        link: "https://education.github.com/pack",
        verified: "2024-01-15",
        upvotes: 245,
        image: "🎨",
        tags: ["Design", "Templates", "Collaboration"],
        isLimitedTime: false,
        isPopular: true
    },
    {
        id: 2,
        brand: "Notion",
        title: "Notion Personal Pro Free",
        description: "Unlimited blocks, file uploads, and version history for students",
        category: "Productivity & Tech",
        verification: ".edu Email",
        discount: "100% OFF",
        originalPrice: "$8/month",
        eligibility: "Requires valid .edu email address",
        instructions: "Sign up with your .edu email and verify your student status",
        link: "https://www.notion.so/students",
        verified: "2024-01-20",
        upvotes: 189,
        image: "📝",
        tags: ["Notes", "Organization", "Productivity"],
        isLimitedTime: false,
        isPopular: true
    },
    {
        id: 3,
        brand: "Figma",
        title: "Figma Education Plan",
        description: "Free professional features for students and educators",
        category: "Creative Tools",
        verification: ".edu Email",
        discount: "100% OFF",
        originalPrice: "$12/month",
        eligibility: "Students and educators with .edu email",
        instructions: "Apply for education plan with your .edu email and course information",
        link: "https://www.figma.com/education/",
        verified: "2024-01-18",
        upvotes: 156,
        image: "🎯",
        tags: ["UI/UX", "Design", "Prototyping"],
        isLimitedTime: false,
        isPopular: false
    },
    {
        id: 4,
        brand: "Spotify",
        title: "Spotify Premium Student",
        description: "Ad-free music streaming with offline downloads",
        category: "Entertainment",
        verification: "UNiDAYS",
        discount: "50% OFF",
        originalPrice: "$9.99/month",
        eligibility: "Enrolled students verified through UNiDAYS",
        instructions: "Verify your student status through UNiDAYS and get 50% off",
        link: "https://www.spotify.com/student/",
        verified: "2024-01-22",
        upvotes: 298,
        image: "🎵",
        tags: ["Music", "Streaming", "Entertainment"],
        isLimitedTime: false,
        isPopular: true
    },
    {
        id: 5,
        brand: "Adobe Creative Cloud",
        title: "Creative Cloud Student Discount",
        description: "Access to all Adobe apps including Photoshop, Illustrator, and Premiere Pro",
        category: "Creative Tools",
        verification: "Student ID",
        discount: "60% OFF",
        originalPrice: "$52.99/month",
        eligibility: "Students and teachers with valid ID",
        instructions: "Verify your student status and get 60% off the first year",
        link: "https://www.adobe.com/students.html",
        verified: "2024-01-25",
        upvotes: 187,
        image: "🎨",
        tags: ["Design", "Video", "Photography"],
        isLimitedTime: false,
        isPopular: true
    },
    {
        id: 6,
        brand: "Microsoft Office 365",
        title: "Office 365 Education Free",
        description: "Word, Excel, PowerPoint, and Teams for students",
        category: "Productivity & Tech",
        verification: ".edu Email",
        discount: "100% OFF",
        originalPrice: "$69.99/year",
        eligibility: "Students with valid .edu email address",
        instructions: "Sign up with your school email to get free access",
        link: "https://www.microsoft.com/education/students",
        verified: "2024-01-12",
        upvotes: 234,
        image: "💼",
        tags: ["Office", "Productivity", "Collaboration"],
        isLimitedTime: false,
        isPopular: true
    },
    {
        id: 7,
        brand: "GitHub",
        title: "GitHub Pro Free",
        description: "Private repositories and advanced collaboration tools",
        category: "Productivity & Tech",
        verification: "GitHub Student Pack",
        discount: "100% OFF",
        originalPrice: "$4/month",
        eligibility: "Students verified through GitHub Student Pack",
        instructions: "Apply for GitHub Student Developer Pack with student verification",
        link: "https://education.github.com/pack",
        verified: "2024-01-28",
        upvotes: 167,
        image: "💻",
        tags: ["Development", "Code", "Collaboration"],
        isLimitedTime: false,
        isPopular: false
    },
    {
        id: 8,
        brand: "Coursera",
        title: "Coursera Plus Student Discount",
        description: "Access to 7,000+ courses and professional certificates",
        category: "Learning Platforms",
        verification: "StudentBeans",
        discount: "50% OFF",
        originalPrice: "$59/month",
        eligibility: "Students verified through StudentBeans",
        instructions: "Verify through StudentBeans and get 50% off annual subscription",
        link: "https://www.coursera.org/student-discount",
        verified: "2024-01-30",
        upvotes: 143,
        image: "📚",
        tags: ["Learning", "Certificates", "Skills"],
        isLimitedTime: true,
        isPopular: false
    },
    {
        id: 9,
        brand: "Zomato",
        title: "Zomato Pro Student Offer",
        description: "Free delivery and exclusive discounts on food orders",
        category: "Food & Lifestyle",
        verification: "Student ID",
        discount: "Free Delivery",
        originalPrice: "₹299/month",
        eligibility: "College students with valid ID",
        instructions: "Upload your student ID and get free Zomato Pro for 3 months",
        link: "https://www.zomato.com/student-offer",
        verified: "2024-02-01",
        upvotes: 89,
        image: "🍕",
        tags: ["Food", "Delivery", "Discounts"],
        isLimitedTime: true,
        isPopular: false
    },
    {
        id: 10,
        brand: "YouTube Premium",
        title: "YouTube Premium Student Plan",
        description: "Ad-free videos, background play, and YouTube Music",
        category: "Entertainment",
        verification: "UNiDAYS",
        discount: "50% OFF",
        originalPrice: "₹129/month",
        eligibility: "Students verified through UNiDAYS",
        instructions: "Verify your student status and get discounted premium access",
        link: "https://www.youtube.com/premium/student",
        verified: "2024-02-03",
        upvotes: 201,
        image: "📺",
        tags: ["Video", "Music", "Entertainment"],
        isLimitedTime: false,
        isPopular: true
    }
];

const categories = ["All", "Creative Tools", "Productivity & Tech", "Learning Platforms", "Entertainment", "Food & Lifestyle"];
const verificationTypes = ["All", ".edu Email", "UNiDAYS", "StudentBeans", "GitHub Student Pack", "Student ID"];
const sortOptions = ["Popular", "New", "Verified Recently", "Limited Time"];

const StudentDiscounts = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedVerification, setSelectedVerification] = useState("All");
    const [sortBy, setSortBy] = useState("Popular");
    const [selectedDiscount, setSelectedDiscount] = useState<typeof studentDiscounts[0] | null>(null);

    const filteredAndSortedDiscounts = useMemo(() => {
        let filtered = studentDiscounts.filter(discount => {
            const matchesSearch = discount.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                discount.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                discount.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || discount.category === selectedCategory;
            const matchesVerification = selectedVerification === "All" || discount.verification === selectedVerification;

            return matchesSearch && matchesCategory && matchesVerification;
        });

        // Sort the filtered results
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "Popular":
                    return b.upvotes - a.upvotes;
                case "New":
                    return new Date(b.verified).getTime() - new Date(a.verified).getTime();
                case "Verified Recently":
                    return new Date(b.verified).getTime() - new Date(a.verified).getTime();
                case "Limited Time":
                    return (b.isLimitedTime ? 1 : 0) - (a.isLimitedTime ? 1 : 0);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [searchTerm, selectedCategory, selectedVerification, sortBy]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6
            }
        }
    };

    const filterButtonVariants = {
        inactive: { scale: 1, opacity: 0.7 },
        active: {
            scale: 1.05,
            opacity: 1,
            transition: { duration: 0.2 }
        },
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Enhanced Animated Background */}
            <div className="relative">
              <div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center">
                <div className="w-[90vw] max-w-5xl h-[340px] mx-auto bg-grid-white/10 rounded-3xl" style={{ zIndex: 1, position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }} />
              </div>

                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-brand-purple/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}

                {/* Enhanced gradient orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                    animate={{
                        background: [
                            "radial-gradient(circle, rgba(142, 68, 173, 0.4), transparent)",
                            "radial-gradient(circle, rgba(240, 98, 146, 0.4), transparent)",
                            "radial-gradient(circle, rgba(142, 68, 173, 0.4), transparent)",
                        ],
                        scale: [1, 1.3, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                    animate={{
                        background: [
                            "radial-gradient(circle, rgba(240, 98, 146, 0.4), transparent)",
                            "radial-gradient(circle, rgba(142, 68, 173, 0.4), transparent)",
                            "radial-gradient(circle, rgba(240, 98, 146, 0.4), transparent)",
                        ],
                        scale: [1.2, 1, 1.2],
                        x: [0, -50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5
                    }}
                />

                {/* Animated border gradients */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-px"
                    animate={{
                        background: [
                            "linear-gradient(90deg, transparent, rgba(142, 68, 173, 0.5), transparent)",
                            "linear-gradient(90deg, transparent, rgba(240, 98, 146, 0.5), transparent)",
                            "linear-gradient(90deg, transparent, rgba(142, 68, 173, 0.5), transparent)",
                        ]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <Navbar />

            <div className="container mx-auto px-4 py-8 mt-20">
                {/* Enhanced Header and Stats */}
                <div>
                  <div className="text-center mb-12">
                <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                      <SplitText
                        text="Student Discounts"
                        className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
                        delay={50}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                        easing="easeOutCubic"
                        threshold={0.3}
                        rootMargin="-100px"
                      />
                      <p className="text-white/70 text-lg max-w-3xl mx-auto">
                        Unlock exclusive deals and save money on tools, apps, and services that support your academic journey
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Enhanced Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mb-8 space-y-6"
                >
                    {/* Enhanced Filter Tabs */}
                </motion.div>

                {/* Enhanced Results Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="text-center mb-8"
                >
                    <p className="text-white/60 text-lg">
                        Showing <span className="text-brand-purple font-semibold">{filteredAndSortedDiscounts.length}</span> verified student {filteredAndSortedDiscounts.length === 1 ? 'discount' : 'discounts'}
                    </p>
                </motion.div>

                {/* Enhanced Discount Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredAndSortedDiscounts.map((discount, index) => (
                            <motion.div
                                key={discount.id}
                                variants={itemVariants}
                                layout
                                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                                whileHover={{
                                    scale: 1.03,
                                    y: -8,
                                    transition: { duration: 0.3 }
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1
                                }}
                            >
                                <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 hover:border-brand-purple/30 transition-all duration-500 h-full group cursor-pointer relative overflow-hidden rounded-2xl">
                                    {/* Animated background gradient */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                        animate={{
                                            background: [
                                                "linear-gradient(45deg, rgba(142, 68, 173, 0.1), transparent)",
                                                "linear-gradient(45deg, rgba(240, 98, 146, 0.1), transparent)",
                                                "linear-gradient(45deg, rgba(142, 68, 173, 0.1), transparent)",
                                            ]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />

                                    <CardHeader className="pb-3 relative z-10">
                                        <div className="flex items-start justify-between mb-2">
                                            <motion.div
                                                className="text-4xl"
                                                whileHover={{
                                                    scale: 1.2,
                                                    rotate: [0, -10, 10, 0]
                                                }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {discount.image}
                                            </motion.div>
                                            <div className="flex flex-col items-end gap-1">
                                                {discount.isPopular && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <Badge className="bg-brand-purple/20 text-brand-purple border-brand-purple/30">
                                                            <Star className="w-3 h-3 mr-1" />
                                                            Popular
                                                        </Badge>
                                                    </motion.div>
                                                )}
                                                {discount.isLimitedTime && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.3 }}
                                                    >
                                                        <Badge className="bg-red-500/20 text-red-300 border-red-400/30 animate-pulse">
                                                            Limited Time
                                                        </Badge>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                        <CardTitle className="text-white group-hover:text-brand-purple transition-colors duration-300">
                                            {discount.title}
                                        </CardTitle>
                                        <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                                            {discount.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4 relative z-10">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className="border-green-400/30 text-green-300 bg-green-400/10">
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                {discount.discount}
                                            </Badge>
                                            <span className="text-white/50 text-sm line-through">
                                                {discount.originalPrice}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-white/60">
                                                <Tag className="w-4 h-4 text-brand-pink" />
                                                <span>{discount.verification}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-white/60">
                                                <Users className="w-4 h-4 text-brand-purple" />
                                                <span>{discount.upvotes} students helped</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-white/60">
                                                <Calendar className="w-4 h-4 text-brand-pink" />
                                                <span>Verified {new Date(discount.verified).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1">
                                            {discount.tags.map((tag, tagIndex) => (
                                                <motion.div
                                                    key={tag}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.1 * tagIndex }}
                                                >
                                                    <Badge variant="secondary" className="text-xs bg-white/5 text-white/60 hover:bg-brand-purple/20 hover:text-brand-purple transition-all duration-300">
                                                        {tag}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 border-white/20 text-white/70 hover:bg-white/10 hover:border-brand-purple/30 hover:text-white transition-all duration-300"
                                                        onClick={() => setSelectedDiscount(discount)}
                                                    >
                                                        How to Claim
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="bg-black/95 border-white/20 text-white backdrop-blur-xl">
                                                    <DialogHeader>
                                                        <DialogTitle className="flex items-center gap-2">
                                                            <span className="text-2xl">{discount.image}</span>
                                                            <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
                                                                {discount.title}
                                                            </span>
                                                        </DialogTitle>
                                                        <DialogDescription className="text-white/70">
                                                            {discount.description}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <h4 className="font-semibold mb-2 text-brand-purple">Eligibility:</h4>
                                                            <p className="text-white/80">{discount.eligibility}</p>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold mb-2 text-brand-pink">How to Claim:</h4>
                                                            <p className="text-white/80">{discount.instructions}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2 pt-2">
                                                            <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                                Verified
                                                            </Badge>
                                                            <span className="text-white/60 text-sm">
                                                                Last verified: {new Date(discount.verified).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    size="sm"
                                                    className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
                                                    onClick={() => window.open(discount.link, '_blank')}
                                                >
                                                    <ExternalLink className="w-4 h-4 mr-1" />
                                                    Get Deal
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Enhanced No Results */}
                {filteredAndSortedDiscounts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center py-16"
                    >
                        <motion.div
                            className="text-8xl mb-6"
                            animate={{
                                rotate: [0, -10, 10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            🔍
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-4">No discounts found</h3>
                        <p className="text-white/60 mb-6 text-lg">Try adjusting your search or filters to discover more deals</p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                    setSelectedVerification("All");
                                    setSortBy("Popular");
                                }}
                                className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 px-8 py-3 text-lg"
                            >
                                Clear All Filters
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default StudentDiscounts;