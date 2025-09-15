
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface TaxCalculatorProps {
  onBack: () => void;
}

const TaxCalculator = ({ onBack }: TaxCalculatorProps) => {
  const [income, setIncome] = useState(500000);
  const [regime, setRegime] = useState("new");
  const [deductions, setDeductions] = useState(50000);

  const calculateTax = () => {
    if (regime === "new") {
      // New Tax Regime (simplified)
      if (income <= 250000) return 0;
      if (income <= 500000) return (income - 250000) * 0.05;
      if (income <= 750000) return 12500 + (income - 500000) * 0.1;
      if (income <= 1000000) return 37500 + (income - 750000) * 0.15;
      if (income <= 1250000) return 75000 + (income - 1000000) * 0.2;
      if (income <= 1500000) return 125000 + (income - 1250000) * 0.25;
      return 187500 + (income - 1500000) * 0.3;
    } else {
      // Old Tax Regime (simplified)
      const taxableIncome = Math.max(0, income - deductions);
      if (taxableIncome <= 250000) return 0;
      if (taxableIncome <= 500000) return (taxableIncome - 250000) * 0.05;
      if (taxableIncome <= 1000000) return 12500 + (taxableIncome - 500000) * 0.2;
      return 112500 + (taxableIncome - 1000000) * 0.3;
    }
  };

  const tax = Math.round(calculateTax());
  const netIncome = income - tax;
  const effectiveRate = income > 0 ? (tax / income) * 100 : 0;

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
              <FileText className="h-6 w-6 text-orange-400" />
              <CardTitle className="text-white">Tax Calculator</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-gray-300">Annual Income</Label>
              <div className="flex items-center gap-2">
                <span className="text-orange-400">₹</span>
                <Input 
                  type="number" 
                  value={income} 
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-32 text-right bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            <Slider 
              min={100000} 
              max={2000000} 
              step={50000} 
              value={[income]} 
              onValueChange={(value) => setIncome(value[0])} 
            />
          </div>

          <div className="space-y-4">
            <Label className="text-gray-300">Tax Regime</Label>
            <Select value={regime} onValueChange={setRegime}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Tax Regime</SelectItem>
                <SelectItem value="old">Old Tax Regime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {regime === "old" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300">Deductions (80C, etc.)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-orange-400">₹</span>
                  <Input 
                    type="number" 
                    value={deductions} 
                    onChange={(e) => setDeductions(Number(e.target.value))}
                    className="w-32 text-right bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
              <Slider 
                min={0} 
                max={150000} 
                step={10000} 
                value={[deductions]} 
                onValueChange={(value) => setDeductions(value[0])} 
              />
            </div>
          )}

          <div className="p-6 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-400">Tax Amount</p>
                <p className="text-2xl font-bold text-orange-400">₹{tax.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Net Income</p>
                <p className="text-lg font-bold text-green-400">₹{netIncome.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Effective Rate</p>
                <p className="text-lg font-bold text-white">{effectiveRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaxCalculator;
