
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface LoanEMICalculatorProps {
  onBack: () => void;
}

const LoanEMICalculator = ({ onBack }: LoanEMICalculatorProps) => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure * 12;
  const totalInterest = totalAmount - loanAmount;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="bg-gray-900 border-gray-700 rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-green-400" />
              <CardTitle className="text-white">Loan EMI Calculator</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-gray-300">Loan Amount</Label>
              <div className="flex items-center gap-2">
                <span className="text-green-400">₹</span>
                <Input 
                  type="number" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-32 text-right bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            <Slider 
              min={100000} 
              max={5000000} 
              step={50000} 
              value={[loanAmount]} 
              onValueChange={(value) => setLoanAmount(value[0])} 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-gray-300">Interest Rate</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-20 text-right bg-gray-800 border-gray-600 text-white"
                />
                <span className="text-green-400">%</span>
              </div>
            </div>
            <Slider 
              min={5} 
              max={15} 
              step={0.25} 
              value={[interestRate]} 
              onValueChange={(value) => setInterestRate(value[0])} 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-gray-300">Loan Tenure</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  value={tenure} 
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-20 text-right bg-gray-800 border-gray-600 text-white"
                />
                <span className="text-green-400">years</span>
              </div>
            </div>
            <Slider 
              min={1} 
              max={20} 
              step={1} 
              value={[tenure]} 
              onValueChange={(value) => setTenure(value[0])} 
            />
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-400">Monthly EMI</p>
                <p className="text-2xl font-bold text-green-400">₹{emi.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Interest</p>
                <p className="text-lg font-bold text-yellow-400">₹{totalInterest.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Amount</p>
                <p className="text-lg font-bold text-white">₹{totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoanEMICalculator;
