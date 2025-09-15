
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface SIPCalculatorProps {
  onBack: () => void;
}

const SIPCalculator = ({ onBack }: SIPCalculatorProps) => {
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipYears, setSipYears] = useState(10);
  const [sipReturn, setSipReturn] = useState(12);

  const calculateSIP = () => {
    const monthlyRate = sipReturn / 12 / 100;
    const months = sipYears * 12;
    const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return Math.round(futureValue);
  };

  const totalInvestment = sipAmount * sipYears * 12;
  const sipTotal = calculateSIP();
  const wealthGain = sipTotal - totalInvestment;

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
              <Calendar className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-white">SIP Calculator</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-gray-300">Monthly Investment</Label>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">₹</span>
                <Input 
                  type="number" 
                  value={sipAmount} 
                  onChange={(e) => setSipAmount(Number(e.target.value))}
                  className="w-28 text-right bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            <Slider 
              min={500} 
              max={50000} 
              step={500} 
              value={[sipAmount]} 
              onValueChange={(value) => setSipAmount(value[0])} 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-gray-300">Investment Period</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  value={sipYears} 
                  onChange={(e) => setSipYears(Number(e.target.value))}
                  className="w-20 text-right bg-gray-800 border-gray-600 text-white"
                />
                <span className="text-blue-400">years</span>
              </div>
            </div>
            <Slider 
              min={1} 
              max={30} 
              step={1} 
              value={[sipYears]} 
              onValueChange={(value) => setSipYears(value[0])} 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-gray-300">Expected Return</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  value={sipReturn} 
                  onChange={(e) => setSipReturn(Number(e.target.value))}
                  className="w-20 text-right bg-gray-800 border-gray-600 text-white"
                />
                <span className="text-blue-400">%</span>
              </div>
            </div>
            <Slider 
              min={5} 
              max={18} 
              step={0.5} 
              value={[sipReturn]} 
              onValueChange={(value) => setSipReturn(value[0])} 
            />
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-400">Invested Amount</p>
                <p className="text-lg font-bold text-white">₹{totalInvestment.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Wealth Gain</p>
                <p className="text-lg font-bold text-blue-400">₹{wealthGain.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Value</p>
                <p className="text-lg font-bold text-cyan-400">₹{sipTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SIPCalculator;
