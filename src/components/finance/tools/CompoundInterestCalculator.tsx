
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Percent, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface CompoundInterestCalculatorProps {
  onBack: () => void;
}

const CompoundInterestCalculator = ({ onBack }: CompoundInterestCalculatorProps) => {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(8);
  const [timePeriod, setTimePeriod] = useState(5);
  const [compoundFrequency, setCompoundFrequency] = useState("12");

  const calculateCompoundInterest = () => {
    const P = principal;
    const r = interestRate / 100;
    const n = parseInt(compoundFrequency);
    const t = timePeriod;
    
    const amount = P * Math.pow((1 + r / n), n * t);
    return Math.round(amount);
  };

  const calculateSimpleInterest = () => {
    const P = principal;
    const r = interestRate / 100;
    const t = timePeriod;
    
    return Math.round(P * (1 + r * t));
  };

  const compoundAmount = calculateCompoundInterest();
  const simpleAmount = calculateSimpleInterest();
  const compoundInterest = compoundAmount - principal;
  const simpleInterest = simpleAmount - principal;
  const compoundAdvantage = compoundAmount - simpleAmount;

  const getCompoundingText = (frequency: string) => {
    switch (frequency) {
      case "1": return "Annually";
      case "2": return "Semi-annually";
      case "4": return "Quarterly";
      case "12": return "Monthly";
      case "365": return "Daily";
      default: return "Monthly";
    }
  };

  const generateYearlyBreakdown = () => {
    const breakdown = [];
    let currentAmount = principal;
    const r = interestRate / 100;
    const n = parseInt(compoundFrequency);
    
    for (let year = 1; year <= Math.min(timePeriod, 10); year++) {
      currentAmount = principal * Math.pow((1 + r / n), n * year);
      breakdown.push({
        year,
        amount: Math.round(currentAmount),
        interest: Math.round(currentAmount - principal)
      });
    }
    
    return breakdown;
  };

  const yearlyBreakdown = generateYearlyBreakdown();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
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
              <Percent className="h-6 w-6 text-rose-400" />
              <CardTitle className="text-white">Compound Interest Calculator</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-gray-300">Principal Amount</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400">₹</span>
                    <Input 
                      type="number" 
                      value={principal} 
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-32 text-right bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Slider 
                  min={10000} 
                  max={1000000} 
                  step={10000} 
                  value={[principal]} 
                  onValueChange={(value) => setPrincipal(value[0])} 
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-gray-300">Annual Interest Rate</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={interestRate} 
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-20 text-right bg-gray-800 border-gray-600 text-white"
                      step={0.1}
                    />
                    <span className="text-rose-400">%</span>
                  </div>
                </div>
                <Slider 
                  min={1} 
                  max={20} 
                  step={0.5} 
                  value={[interestRate]} 
                  onValueChange={(value) => setInterestRate(value[0])} 
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-gray-300">Time Period</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={timePeriod} 
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-20 text-right bg-gray-800 border-gray-600 text-white"
                    />
                    <span className="text-rose-400">years</span>
                  </div>
                </div>
                <Slider 
                  min={1} 
                  max={30} 
                  step={1} 
                  value={[timePeriod]} 
                  onValueChange={(value) => setTimePeriod(value[0])} 
                />
              </div>

              <div className="space-y-4">
                <Label className="text-gray-300">Compounding Frequency</Label>
                <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Annually</SelectItem>
                    <SelectItem value="2">Semi-annually</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                    <SelectItem value="365">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30">
                <h3 className="text-lg font-semibold text-white mb-4">Results</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Principal Amount:</span>
                    <span className="text-white font-semibold">₹{principal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Compound Interest:</span>
                    <span className="text-rose-400 font-semibold">₹{compoundInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-600 pt-2">
                    <span className="text-gray-300">Final Amount:</span>
                    <span className="text-green-400 font-bold text-xl">₹{compoundAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="text-white font-semibold mb-3">Compound vs Simple Interest</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Simple Interest:</span>
                    <span className="text-gray-400">₹{simpleInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Compound Interest:</span>
                    <span className="text-rose-400">₹{compoundInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-gray-600 pt-2">
                    <span className="text-green-300">Extra Earnings:</span>
                    <span className="text-green-400">₹{compoundAdvantage.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="text-white font-semibold mb-3">Calculation Details</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Principal: ₹{principal.toLocaleString()}</p>
                  <p>Rate: {interestRate}% per annum</p>
                  <p>Time: {timePeriod} years</p>
                  <p>Compounding: {getCompoundingText(compoundFrequency)}</p>
                  <p className="text-xs mt-2 text-gray-400">
                    Formula: A = P(1 + r/n)^(nt)
                  </p>
                </div>
              </div>

              {yearlyBreakdown.length > 0 && (
                <div className="p-4 bg-gray-800 rounded-lg max-h-60 overflow-y-auto">
                  <h4 className="text-white font-semibold mb-3">Yearly Breakdown</h4>
                  <div className="space-y-2">
                    {yearlyBreakdown.map((year) => (
                      <div key={year.year} className="flex justify-between text-sm">
                        <span className="text-gray-300">Year {year.year}:</span>
                        <span className="text-rose-400">₹{year.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompoundInterestCalculator;
