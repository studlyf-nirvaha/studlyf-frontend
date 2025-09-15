
import { motion } from "framer-motion";
import FinancialCalculator from "@/components/FinancialCalculator";
import InvestmentChart from "@/components/InvestmentChart";

const ToolsTabContent = () => {
  return (
    <motion.div
      key="tools"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mt-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FinancialCalculator />
        <InvestmentChart />
      </div>
    </motion.div>
  );
};

export default ToolsTabContent;
