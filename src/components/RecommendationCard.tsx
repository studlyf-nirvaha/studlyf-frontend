
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  items: Array<{ label: string; url?: string } | string>;
  icon: ReactNode;
  withLinks?: boolean;
}

const RecommendationCard = ({ title, items, icon, withLinks }: RecommendationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background via-background/80 to-background/50 backdrop-blur-md h-full relative group">
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-brand-purple/5 to-brand-pink/5 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        
        <CardHeader className="pb-3 flex flex-row items-center space-x-2 bg-gradient-to-r from-brand-purple/10 to-brand-pink/10">
          <motion.div 
            className="text-brand-purple bg-brand-purple/10 p-3 rounded-full"
            whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
          >
            {icon}
          </motion.div>
          <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-6 relative z-10">
          <ul className="space-y-3 mb-5">
            {items.map((item, index) => {
              const label = typeof item === 'string' ? item : item.label;
              const url = typeof item === 'string' ? undefined : item.url;
              return (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.span 
                    className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs mr-2 mt-0.5 shadow-md"
                    whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                  >
                    {index + 1}
                  </motion.span>
                  {url && (typeof url === 'string') && (typeof label === 'string') && (typeof withLinks !== 'undefined' && withLinks) ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline text-brand-purple hover:text-brand-pink"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm">{label}</span>
                  )}
                </motion.li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between mt-2">
            <motion.div whileHover={{ x: 5 }}>
              <Button 
                variant="link" 
                className="px-0 text-brand-purple hover:text-brand-pink transition-colors group"
              >
                <span className="relative">
                  See detailed comparison 
                  <motion.span 
                    className="inline-block ml-1"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-pink group-hover:w-full transition-all duration-300"></span>
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-muted-foreground hover:text-brand-purple" 
              >
                <ExternalLink className="w-3 h-3 mr-1" /> Learn more
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecommendationCard;
