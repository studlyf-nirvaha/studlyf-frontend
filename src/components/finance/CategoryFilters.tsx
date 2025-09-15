
import { motion } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PiggyBank, Wallet, TrendingUp } from "lucide-react";

interface CategoryFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const CategoryFilters = ({ selectedCategory, setSelectedCategory }: CategoryFiltersProps) => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <ToggleGroup 
        type="single" 
        value={selectedCategory} 
        onValueChange={(val) => val && setSelectedCategory(val)}
        className="p-1 bg-muted/30 rounded-lg border border-muted"
      >
        <ToggleGroupItem value="all" className="text-sm px-4 data-[state=on]:bg-white data-[state=on]:text-brand-purple dark:data-[state=on]:bg-brand-dark">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="investing" className="text-sm px-4 data-[state=on]:bg-white data-[state=on]:text-brand-purple dark:data-[state=on]:bg-brand-dark">
          <PiggyBank className="mr-2 h-4 w-4" />
          Investing
        </ToggleGroupItem>
        <ToggleGroupItem value="budgeting" className="text-sm px-4 data-[state=on]:bg-white data-[state=on]:text-brand-purple dark:data-[state=on]:bg-brand-dark">
          <Wallet className="mr-2 h-4 w-4" />
          Budgeting
        </ToggleGroupItem>
        <ToggleGroupItem value="insurance" className="text-sm px-4 data-[state=on]:bg-white data-[state=on]:text-brand-purple dark:data-[state=on]:bg-brand-dark">
          <TrendingUp className="mr-2 h-4 w-4" />
          Insurance
        </ToggleGroupItem>
      </ToggleGroup>
    </motion.div>
  );
};

export default CategoryFilters;
