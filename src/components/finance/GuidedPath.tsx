
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, ArrowRight } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const GuidedPath = () => {
  const { toast } = useToast();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="bg-gradient-to-r from-brand-purple/5 to-brand-pink/5 border-brand-purple/20 overflow-hidden rounded-2xl">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-purple to-brand-pink rounded-full mb-4"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Rocket className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Not sure where to start?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Answer 3 quick questions and we'll build a personalized finance plan just for you.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg"
                  onClick={() => toast({ title: 'Coming Soon', description: 'This feature will be available soon!' })}
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Build My Plan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
            <div className="flex-shrink-0">
              <motion.div 
                className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <motion.div 
                  className="w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-brand-purple/30 to-brand-pink/30 rounded-full flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <Rocket className="w-12 h-12 md:w-16 md:h-16 text-brand-purple" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GuidedPath;
