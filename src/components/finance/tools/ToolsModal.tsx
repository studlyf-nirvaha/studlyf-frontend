
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AnimatePresence } from "framer-motion";
import SIPCalculator from "./SIPCalculator";
import LoanEMICalculator from "./LoanEMICalculator";
import BudgetPlanner from "./BudgetPlanner";
import TaxCalculator from "./TaxCalculator";
import GoalTracker from "./GoalTracker";
import ExpenseTracker from "./ExpenseTracker";
import CreditScoreSimulator from "./CreditScoreSimulator";
import CompoundInterestCalculator from "./CompoundInterestCalculator";

interface ToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolType: string | null;
}

const ToolsModal = ({ isOpen, onClose, toolType }: ToolsModalProps) => {
  const renderTool = () => {
    switch (toolType) {
      case "sip":
        return <SIPCalculator onBack={onClose} />;
      case "loan":
        return <LoanEMICalculator onBack={onClose} />;
      case "budget":
        return <BudgetPlanner onBack={onClose} />;
      case "tax":
        return <TaxCalculator onBack={onClose} />;
      case "goals":
        return <GoalTracker onBack={onClose} />;
      case "expense":
        return <ExpenseTracker onBack={onClose} />;
      case "credit":
        return <CreditScoreSimulator onBack={onClose} />;
      case "compound":
        return <CompoundInterestCalculator onBack={onClose} />;
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-400">Tool coming soon...</p>
          </div>
        );
    }
  };

  const getToolName = () => {
    switch (toolType) {
      case "sip": return "SIP Calculator";
      case "loan": return "Loan EMI Calculator";
      case "budget": return "Budget Planner";
      case "tax": return "Tax Calculator";
      case "goals": return "Goal Tracker";
      case "expense": return "Expense Tracker";
      case "credit": return "Credit Score Simulator";
      case "compound": return "Compound Interest Calculator";
      default: return "Financial Tool";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-y-auto bg-black border-gray-700 p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{getToolName()}</DialogTitle>
          <DialogDescription>
            Interactive financial calculator to help you plan your finances
          </DialogDescription>
        </DialogHeader>
        <div className="p-2 sm:p-4 md:p-6">
          <AnimatePresence mode="wait">
            {renderTool()}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolsModal;
