import { motion } from "framer-motion";
import { ExternalLink, CheckCircle, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Featured student discounts for preview
const featuredDiscounts = [
    {
        id: 1,
        brand: "Canva",
        title: "Free Canva Pro for Students",
        description: "Access premium templates, remove backgrounds, and collaborate with your team",
        verification: "GitHub Student Pack",
        discount: "100% OFF",
        image: "🎨",
        isPopular: true,
        tags: ["Design", "Templates"]
    },
    {
        id: 2,
        brand: "Notion",
        title: "Notion Personal Pro Free",
        description: "Unlimited blocks, file uploads, and version history for students",
        verification: ".edu Email",
        discount: "100% OFF",
        image: "📝",
        isPopular: true,
        tags: ["Notes", "Productivity"]
    },
    {
        id: 3,
        brand: "Spotify",
        title: "Spotify Premium Student",
        description: "Ad-free music streaming with offline downloads",
        verification: "UNiDAYS",
        discount: "50% OFF",
        image: "🎵",
        isPopular: true,
        tags: ["Music", "Entertainment"]
    },
    {
        id: 4,
        brand: "Adobe Creative Cloud",
        title: "Creative Cloud Student Discount",
        description: "Access to all Adobe apps including Photoshop, Illustrator, and Premiere Pro",
        verification: "Student ID",
        discount: "60% OFF",
        image: "🎨",
        isPopular: false,
        tags: ["Design", "Video"]
    }
];

const StudentDiscountPreview = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="relative bg-black py-16 px-4 overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 50%, rgba(209, 58, 255, 0.1), transparent 50%)",
                        "radial-gradient(circle at 80% 50%, rgba(255, 77, 160, 0.1), transparent 50%)",
                        "radial-gradient(circle at 20% 50%, rgba(209, 58, 255, 0.1), transparent 50%)",
                    ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold text-white mb-4 relative"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        style={{
                            background: "linear-gradient(90deg, #ffffff, #d13aff, #ff4da0, #ffffff)",
                            backgroundSize: "200% 100%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Discover Verified Student Deals 💡
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Explore tools, apps, and services offering exclusive benefits for students
                    </motion.p>

                    {/* Animated underline */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-4 rounded-full"
                    />
                </motion.div>

                {/* Featured Discount Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                    {featuredDiscounts.map((discount, index) => (
                        <motion.div
                            key={discount.id}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                            className="group cursor-pointer"
                        >
                            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 hover:border-purple-400/30 transition-all duration-300 h-full relative overflow-hidden">
                                {/* Hover glow effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/5 group-hover:to-pink-400/5 transition-all duration-300 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                />

                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="text-3xl">{discount.image}</div>
                                        {discount.isPopular && (
                                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs">
                                                <Star className="w-3 h-3 mr-1" />
                                                Popular
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-white group-hover:text-purple-200 transition-colors text-lg">
                                        {discount.title}
                                    </CardTitle>
                                    <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors text-sm">
                                        {discount.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            {discount.discount}
                                        </Badge>
                                    </div>

                                    <div className="text-xs text-white/60">
                                        ✅ Verified via {discount.verification}
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {discount.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs bg-white/5 text-white/50">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <motion.div
                                        className="pt-2"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Button
                                            size="sm"
                                            className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300"
                                        >
                                            Learn How to Claim →
                                        </Button>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={() => navigate('/student-discounts')}
                            size="lg"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <span className="mr-2">View All Student Offers</span>
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-white/50 text-sm mt-3"
                    >
                        50+ verified discounts available
                    </motion.p>
                </motion.div>

                {/* Floating elements for visual appeal */}
                <motion.div
                    className="absolute top-10 right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-10 left-10 w-16 h-16 bg-pink-500/10 rounded-full blur-xl"
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>
        </section>
    );
};

export default StudentDiscountPreview;