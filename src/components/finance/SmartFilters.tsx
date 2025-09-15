
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, PiggyBank, Wallet, TrendingUp, RotateCcw, Filter, SortAsc } from "lucide-react";

interface SmartFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const SmartFilters = ({ 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery,
  sortBy,
  setSortBy
}: SmartFiltersProps) => {
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <motion.div 
      className="space-y-6 md:space-y-8 w-full overflow-x-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Search Bar - Prominent */}
      <div className="relative max-w-2xl mx-auto px-4 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl md:rounded-2xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-xl md:rounded-2xl p-1 shadow-lg border border-purple-500/30 w-full">
          <div className="relative w-full">
            <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Type to find topics, tools, or questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 text-base md:text-lg bg-transparent border-0 focus:ring-0 placeholder:text-gray-400 w-full text-white focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col gap-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-700/50 mx-4 w-[calc(100%-2rem)] max-w-none">
        {/* Category Filters */}
        <div className="w-full overflow-x-hidden">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Filter className="h-4 w-4 md:h-5 md:w-5 text-purple-400 flex-shrink-0" />
            <span className="font-semibold text-white text-sm md:text-base">Categories</span>
          </div>
          <ToggleGroup 
            type="single" 
            value={selectedCategory} 
            onValueChange={(val) => val && setSelectedCategory(val)}
            className="grid grid-cols-2 gap-2 w-full"
          >
            <ToggleGroupItem 
              value="all" 
              className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-purple-500 data-[state=on]:to-pink-500 data-[state=on]:text-white border-gray-600 hover:border-purple-400 transition-all duration-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 text-xs md:text-sm min-h-[44px] w-full bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            >
              <RotateCcw className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
              All Topics
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="investing" 
              className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-purple-500 data-[state=on]:to-pink-500 data-[state=on]:text-white border-gray-600 hover:border-purple-400 transition-all duration-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 text-xs md:text-sm min-h-[44px] w-full bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            >
              <PiggyBank className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
              Investing
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="budgeting" 
              className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-purple-500 data-[state=on]:to-pink-500 data-[state=on]:text-white border-gray-600 hover:border-purple-400 transition-all duration-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 text-xs md:text-sm min-h-[44px] w-full bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            >
              <Wallet className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
              Budgeting
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="insurance" 
              className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-purple-500 data-[state=on]:to-pink-500 data-[state=on]:text-white border-gray-600 hover:border-purple-400 transition-all duration-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 text-xs md:text-sm min-h-[44px] w-full bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            >
              <TrendingUp className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
              Insurance
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        {/* Sort Options */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-600 md:pl-6 w-full">
          <div className="flex items-center gap-2 flex-shrink-0">
            <SortAsc className="h-4 w-4 text-purple-400 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-300 whitespace-nowrap">Sort by</span>
          </div>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full md:w-40 rounded-lg md:rounded-xl border-gray-600 hover:border-purple-400 transition-colors min-h-[44px] bg-gray-800/50 text-gray-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-lg md:rounded-xl border-gray-600 bg-gray-800 text-gray-300 z-50">
              <SelectItem value="popular">🔥 Popular</SelectItem>
              <SelectItem value="recent">⏰ Recent</SelectItem>
              <SelectItem value="recommended">⭐ Recommended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default SmartFilters;
