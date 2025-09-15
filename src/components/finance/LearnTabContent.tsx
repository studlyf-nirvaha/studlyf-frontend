
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiggyBank, ChartBar, TrendingUp, Wallet, ArrowRight } from "lucide-react";

interface LearnTabContentProps {
  selectedCategory: string;
}

const LearnTabContent = ({ selectedCategory }: LearnTabContentProps) => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  const learnCards = [
    {
      title: "SIPs & Mutual Funds",
      description: "Start investing with as little as ₹500 per month",
      icon: <PiggyBank className="h-10 w-10 text-brand-purple" />,
      category: "investing"
    },
    {
      title: "Stock Market Basics",
      description: "Learn how to analyze and pick winning stocks",
      icon: <ChartBar className="h-10 w-10 text-brand-purple" />,
      category: "investing"
    },
    {
      title: "Health & Term Insurance",
      description: "Protect yourself with the right coverage",
      icon: <TrendingUp className="h-10 w-10 text-brand-purple" />,
      category: "insurance"
    },
    {
      title: "Budgeting for College",
      description: "Smart tips to manage expenses while studying",
      icon: <Wallet className="h-10 w-10 text-brand-purple" />,
      category: "budgeting"
    }
  ];

  const filteredCards = learnCards.filter(card => 
    selectedCategory === "all" || card.category === selectedCategory
  );

  return (
    <motion.div
      key="learn"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mt-0"
    >
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {filteredCards.map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm h-full">
              <CardHeader className="pb-2">
                <motion.div 
                  className="mb-2"
                  whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
                >
                  {card.icon}
                </motion.div>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/70">{card.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0 text-brand-purple group">
                  <span className="inline-flex items-center">
                    Learn more 
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="ml-1"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LearnTabContent;
