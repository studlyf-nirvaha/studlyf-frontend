
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Calendar, PieChart, FileText, ArrowRight, Zap, TrendingUp, Banknote, CreditCard, Target, Percent, DollarSign } from "lucide-react";
import ToolsModal from "./tools/ToolsModal";

const SmartTools = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tools = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "SIP Calculator",
      description: "Calculate returns on your monthly investments with compound interest",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      popular: true,
      category: "Investment",
      toolKey: "sip"
    },
    {
      icon: <Calculator className="h-8 w-8" />, 
      title: "Loan EMI Calculator", 
      description: "Plan your education loan repayments and compare different options",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      popular: false,
      category: "Loans",
      toolKey: "loan"
    },
    {
      icon: <PieChart className="h-8 w-8" />,
      title: "Budget Planner",
      description: "Track expenses, set savings goals and plan monthly spending",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      popular: true,
      category: "Budgeting",
      toolKey: "budget"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Tax Calculator",
      description: "Calculate tax liability and discover deductions for students",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      popular: false,
      category: "Tax",
      toolKey: "tax"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Goal Tracker",
      description: "Set and track financial goals like emergency fund, gadgets, etc.",
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-500/20 to-purple-500/20",
      borderColor: "border-indigo-500/30",
      popular: true,
      category: "Goals",
      toolKey: "goals"
    },
    {
      icon: <Banknote className="h-8 w-8" />,
      title: "Expense Tracker",
      description: "Monitor daily expenses and categorize spending patterns",
      color: "from-yellow-500 to-amber-500",
      bgColor: "from-yellow-500/20 to-amber-500/20",
      borderColor: "border-yellow-500/30",
      popular: false,
      category: "Tracking",
      toolKey: "expense"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Credit Score Simulator",
      description: "Understand credit scores and simulate improvement strategies",
      color: "from-teal-500 to-green-500",
      bgColor: "from-teal-500/20 to-green-500/20",
      borderColor: "border-teal-500/30",
      popular: true,
      category: "Credit",
      toolKey: "credit"
    },
    {
      icon: <Percent className="h-8 w-8" />,
      title: "Compound Interest Calculator",
      description: "See the power of compound interest on your investments",
      color: "from-rose-500 to-pink-500",
      bgColor: "from-rose-500/20 to-pink-500/20",
      borderColor: "border-rose-500/30",
      popular: false,
      category: "Investment",
      toolKey: "compound"
    }
  ];

  const openTool = (toolKey: string) => {
    setSelectedTool(toolKey);
    setIsModalOpen(true);
  };

  const closeTool = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Smart Financial Tools
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Interactive calculators and planners designed specifically for students
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="group cursor-pointer"
          >
            <Card className={`h-full overflow-hidden border ${tool.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm relative rounded-2xl`}>
              {/* Popular Badge */}
              {tool.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Popular
                  </div>
                </div>
              )}
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full border border-gray-600/50">
                  {tool.category}
                </div>
              </div>
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
              
              {/* Glowing Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
              
              <CardHeader className="text-center pb-4 relative z-10 pt-12">
                <motion.div 
                  className={`mx-auto p-6 bg-gradient-to-br ${tool.color} rounded-3xl mb-4 w-fit shadow-lg text-white`}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {tool.icon}
                </motion.div>
                <CardTitle className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {tool.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="text-center pb-6 relative z-10">
                <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                  {tool.description}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => openTool(tool.toolKey)}
                  className="group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300 rounded-xl font-medium text-gray-200 hover:text-white border border-gray-600 hover:border-transparent"
                >
                  Open Tool
                  <motion.span
                    className="ml-2"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Tools Modal */}
      <ToolsModal 
        isOpen={isModalOpen}
        onClose={closeTool}
        toolType={selectedTool}
      />
    </motion.div>
  );
};

export default SmartTools;
