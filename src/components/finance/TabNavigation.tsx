
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calculator, Lightbulb } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  return (
    <TabsList className="grid w-full grid-cols-3 mb-8 p-1 bg-muted/30">
      <TabsTrigger 
        value="learn" 
        onClick={() => setActiveTab("learn")}
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white"
      >
        <BookOpen className="h-4 w-4 mr-2" /> Learn
      </TabsTrigger>
      <TabsTrigger 
        value="tools" 
        onClick={() => setActiveTab("tools")}
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white"
      >
        <Calculator className="h-4 w-4 mr-2" /> Tools & Calculators
      </TabsTrigger>
      <TabsTrigger 
        value="recommendations" 
        onClick={() => setActiveTab("recommendations")}
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white"
      >
        <Lightbulb className="h-4 w-4 mr-2" /> Recommendations
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
