import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, ChartBar, TrendingUp, Wallet, ArrowRight, BookOpen, Clock, Users } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface LearningCardsProps {
  selectedCategory: string;
}

const LearningCards = ({ selectedCategory }: LearningCardsProps) => {
  const [openSIPModal, setOpenSIPModal] = useState(false);
  const [openStockModal, setOpenStockModal] = useState(false);
  const [openInsuranceModal, setOpenInsuranceModal] = useState(false);
  const [openBudgetModal, setOpenBudgetModal] = useState(false);
  const learningCards = [
    {
      icon: <PiggyBank className="h-6 w-6 md:h-8 md:w-8" />,
      title: "SIPs & Mutual Funds",
      summary: "Invest from just ₹500/month",
      description: "Safe, long-term growth strategy perfect for beginners. Learn how to build wealth systematically.",
      category: "investing",
      badge: "Beginner Friendly",
      badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
      duration: "15 min",
      students: "2.5k",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      icon: <ChartBar className="h-6 w-6 md:h-8 md:w-8" />,
      title: "Stock Market Basics",
      summary: "Learn to analyze stocks",
      description: "Real examples & tools for smart investing. Understand market fundamentals and trading strategies.",
      category: "investing",
      badge: "Practical",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      duration: "20 min",
      students: "1.8k",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: <TrendingUp className="h-6 w-6 md:h-8 md:w-8" />,
      title: "Health & Term Insurance",
      summary: "Protect yourself & family",
      description: "Understand coverage options, benefits, and how to choose the right insurance plan.",
      category: "insurance",
      badge: "Essential",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      duration: "12 min",
      students: "1.2k",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      icon: <Wallet className="h-6 w-6 md:h-8 md:w-8" />,
      title: "Budgeting for College",
      summary: "Smart monthly planning",
      description: "Spend better, save more with proven strategies. Master the art of student budgeting.",
      category: "budgeting",
      badge: "Student Favorite",
      badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      duration: "18 min",
      students: "3.1k",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30"
    }
  ];

  const filteredCards = learningCards.filter(card => 
    selectedCategory === "all" || card.category === selectedCategory
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6 md:space-y-8 px-4"
      >
        <div className="text-center space-y-3 md:space-y-4">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Core Learning Cards
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Essential financial knowledge made simple and actionable for students like you
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="h-full group cursor-pointer"
            >
              <Card className={`h-full overflow-hidden border ${card.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm relative rounded-2xl`}>
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
                {/* Glowing Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                <CardHeader className="pb-3 md:pb-4 relative z-10">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <motion.div 
                      className={`p-3 md:p-4 bg-gradient-to-br ${card.gradient} rounded-xl md:rounded-2xl text-white shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {card.icon}
                    </motion.div>
                    <Badge className={`${card.badgeColor} border font-medium text-xs md:text-sm`}>
                      {card.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-purple-400 font-semibold text-sm md:text-base">
                    {card.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3 md:pb-4 relative z-10">
                  <p className="text-gray-300 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                    {card.description}
                  </p>
                  {/* Stats */}
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 md:h-4 md:w-4" />
                      {card.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 md:h-4 md:w-4" />
                      {card.students} learning
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 relative z-10">
                  {card.title === "SIPs & Mutual Funds" ? (
                    <Button
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300 rounded-lg md:rounded-xl text-sm md:text-base text-gray-200 hover:text-white border border-gray-600 hover:border-transparent"
                      variant="ghost"
                      onClick={() => setOpenSIPModal(true)}
                    >
                      <BookOpen className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      Start Learning
                      <motion.span
                        className="ml-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                      </motion.span>
                    </Button>
                  ) : card.title === "Stock Market Basics" ? (
                    <Button
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300 rounded-lg md:rounded-xl text-sm md:text-base text-gray-200 hover:text-white border border-gray-600 hover:border-transparent"
                      variant="ghost"
                      onClick={() => setOpenStockModal(true)}
                    >
                      <BookOpen className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      Start Learning
                      <motion.span
                        className="ml-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                      </motion.span>
                    </Button>
                  ) : card.title === "Health & Term Insurance" ? (
                    <Button
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300 rounded-lg md:rounded-xl text-sm md:text-base text-gray-200 hover:text-white border border-gray-600 hover:border-transparent"
                      variant="ghost"
                      onClick={() => setOpenInsuranceModal(true)}
                    >
                      <BookOpen className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      Start Learning
                      <motion.span
                        className="ml-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                      </motion.span>
                    </Button>
                  ) : card.title === "Budgeting for College" ? (
                    <Button
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300 rounded-lg md:rounded-xl text-sm md:text-base text-gray-200 hover:text-white border border-gray-600 hover:border-transparent"
                      variant="ghost"
                      onClick={() => setOpenBudgetModal(true)}
                    >
                      <BookOpen className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      Start Learning
                      <motion.span
                        className="ml-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                      </motion.span>
                    </Button>
                  ) : (
                    <Button
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300 rounded-lg md:rounded-xl text-sm md:text-base text-gray-200 hover:text-white border border-gray-600 hover:border-transparent"
                      variant="ghost"
                    >
                      <BookOpen className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      Start Learning
                      <motion.span
                        className="ml-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                      </motion.span>
                    </Button>
                  )}
                </CardFooter>
              </Card>
              {/* Mini modal for SIPs & Mutual Funds */}
              {card.title === "SIPs & Mutual Funds" && (
                <Dialog open={openSIPModal} onOpenChange={setOpenSIPModal}>
                  <DialogContent className="max-w-6xl w-full bg-black border border-gray-700 p-0">
                    <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                      <iframe
                        src="https://www.youtube.com/embed/videoseries?list=PL3uUjzLk6Puky6IlCLShDJK4nSFYII5Xx"
                        title="SIP & Mutual Funds Playlist"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full rounded-xl"
                        style={{ background: 'black', minHeight: 640 }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {/* Mini modal for Stock Market Basics */}
              {card.title === "Stock Market Basics" && (
                <Dialog open={openStockModal} onOpenChange={setOpenStockModal}>
                  <DialogContent className="max-w-6xl w-full bg-black border border-gray-700 p-0">
                    <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                      <iframe
                        src="https://www.youtube.com/embed/videoseries?list=PLxNHpNhDaEFJsuzKNrMbr_SESDCCLmSu4"
                        title="Stock Market Playlist"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full rounded-xl"
                        style={{ background: 'black', minHeight: 640 }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {/* Mini modal for Health & Term Insurance */}
              {card.title === "Health & Term Insurance" && (
                <Dialog open={openInsuranceModal} onOpenChange={setOpenInsuranceModal}>
                  <DialogContent className="max-w-6xl w-full bg-black border border-gray-700 p-0">
                    <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                      <iframe
                        src="https://www.youtube.com/embed/jpAY1f_1A5M?start=120"
                        title="Insurance Video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full rounded-xl"
                        style={{ background: 'black', minHeight: 640 }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {/* Mini modal for Budgeting for College */}
              {card.title === "Budgeting for College" && (
                <Dialog open={openBudgetModal} onOpenChange={setOpenBudgetModal}>
                  <DialogContent className="max-w-6xl w-full bg-black border border-gray-700 p-0">
                    <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                      <iframe
                        src="https://www.youtube.com/embed/MVd0SOappiQ"
                        title="Budgeting for College Video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full rounded-xl"
                        style={{ background: 'black', minHeight: 640 }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default LearningCards;