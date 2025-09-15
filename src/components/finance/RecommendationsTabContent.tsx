
import { motion } from "framer-motion";
import { PiggyBank, TrendingUp, ChartBar } from "lucide-react";
import RecommendationCard from "@/components/RecommendationCard";

interface RecommendationsTabContentProps {
  selectedCategory: string;
}

const RecommendationsTabContent = ({ selectedCategory }: RecommendationsTabContentProps) => {
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

  const recommendationCards = [
    {
      title: "Student-Friendly SIPs",
      items: [
        { label: "SEBI Mutual Funds List", url: "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doListMutualFund=yes" },
        { label: "AMFI India Mutual Fund Info", url: "https://www.amfiindia.com/" },
        { label: "Nippon India Mutual Fund", url: "https://mf.nipponindiaim.com/" },
        { label: "SBI Mutual Fund", url: "https://www.sbimf.com/" },
        { label: "HDFC Mutual Fund", url: "https://www.hdfcfund.com/" }
      ],
      icon: <PiggyBank />,
      category: "investing"
    },
    {
      title: "Best Insurance Plans",
      items: [
        { label: "IRDAI Insurance Portal", url: "https://www.irdai.gov.in/" },
        { label: "LIC of India", url: "https://licindia.in/" },
        { label: "New India Assurance", url: "https://www.newindia.co.in/portal/" },
        { label: "Max Life Insurance", url: "https://www.maxlifeinsurance.com/" },
        { label: "HDFC Life Insurance", url: "https://www.hdfclife.com/" }
      ],
      icon: <TrendingUp />,
      category: "insurance"
    },
    {
      title: "Top Investing Apps",
      items: [
        { label: "Groww (Play Store)", url: "https://play.google.com/store/apps/details?id=com.nextbillion.groww" },
        { label: "Zerodha Kite (Web)", url: "https://kite.zerodha.com/" },
        { label: "Upstox (Play Store)", url: "https://play.google.com/store/apps/details?id=in.upstox.pro" },
        { label: "ET Money (Play Store)", url: "https://play.google.com/store/apps/details?id=com.etmoney.india" },
        { label: "Paytm Money (Play Store)", url: "https://play.google.com/store/apps/details?id=com.paytmmoney.app" }
      ],
      icon: <ChartBar />,
      category: "investing"
    }
  ];

  const filteredCards = recommendationCards.filter(card => 
    selectedCategory === "all" || card.category === selectedCategory
  );

  return (
    <motion.div
      key="recommendations"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mt-0"
    >
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {filteredCards.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={fadeInUp}
          >
            <RecommendationCard 
              title={item.title} 
              items={item.items}
              icon={item.icon}
              withLinks={true}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecommendationsTabContent;
