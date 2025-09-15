import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, PiggyBank, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FinancialCalculator = () => {
  // SIP Calculator state
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipYears, setSipYears] = useState(10);
  const [sipReturn, setSipReturn] = useState(12);
  
  // Insurance Calculator state
  const [age, setAge] = useState(22);
  const [coverage, setCoverage] = useState(2500000);
  const [term, setTerm] = useState(30);

  // Calculate SIP returns
  const calculateSIP = () => {
    const monthlyRate = sipReturn / 12 / 100;
    const months = sipYears * 12;
    const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return Math.round(futureValue);
  };

  // Calculate insurance premium (simplified)
  const calculateInsurance = () => {
    const baseRate = 0.5;
    const ageMultiplier = 1 + Math.max(0, (age - 20) * 0.03);
    const termFactor = 1 + (term > 20 ? (term - 20) * 0.01 : 0);
    
    const annualPremium = (coverage / 1000) * baseRate * ageMultiplier * termFactor;
    return Math.round(annualPremium / 12);
  };

  const totalInvestment = sipAmount * sipYears * 12;
  const sipTotal = calculateSIP();
  const wealthGain = sipTotal - totalInvestment;
  const insurancePremium = calculateInsurance();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="shadow-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm h-full relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center mb-2">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3"
            >
              <Calculator className="h-6 w-6 text-white" />
            </motion.div>
            <CardTitle className="text-white group-hover:text-purple-300 transition-colors">Financial Calculators</CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            Plan your investments and insurance with these interactive calculators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <Tabs defaultValue="sip" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-800/50 border border-gray-700">
              <TabsTrigger value="sip" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white text-gray-300">
                <PiggyBank className="h-4 w-4" /> SIP Calculator
              </TabsTrigger>
              <TabsTrigger value="insurance" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white text-gray-300">
                <Shield className="h-4 w-4" /> Insurance Calculator
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sip" className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="sip-amount" className="text-sm font-medium text-gray-300">Monthly Investment</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-medium">₹</span>
                    <Input 
                      id="sip-amount-input"
                      type="number" 
                      value={sipAmount} 
                      onChange={(e) => setSipAmount(Number(e.target.value))}
                      className="w-28 text-right h-8 text-sm bg-gray-800/50 border-gray-600 text-white focus:border-purple-500" 
                    />
                  </div>
                </div>
                <div className="px-2 py-4">
                  <Slider 
                    id="sip-amount"
                    min={500} 
                    max={50000} 
                    step={500} 
                    value={[sipAmount]} 
                    onValueChange={(value) => setSipAmount(value[0])} 
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-2">
                  <span>₹500</span>
                  <span>₹50,000</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="sip-years" className="text-sm font-medium text-gray-300">Investment Period</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="sip-years-input"
                      type="number" 
                      value={sipYears} 
                      onChange={(e) => setSipYears(Number(e.target.value))}
                      className="w-20 text-right h-8 text-sm bg-gray-800/50 border-gray-600 text-white focus:border-purple-500" 
                    />
                    <span className="text-purple-400 font-medium text-sm">years</span>
                  </div>
                </div>
                <div className="px-2 py-4">
                  <Slider 
                    id="sip-years"
                    min={1} 
                    max={30} 
                    step={1} 
                    value={[sipYears]} 
                    onValueChange={(value) => setSipYears(value[0])} 
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-2">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="sip-return" className="text-sm font-medium text-gray-300">Expected Return</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="sip-return-input"
                      type="number" 
                      value={sipReturn} 
                      onChange={(e) => setSipReturn(Number(e.target.value))}
                      className="w-20 text-right h-8 text-sm bg-gray-800/50 border-gray-600 text-white focus:border-purple-500" 
                    />
                    <span className="text-purple-400 font-medium text-sm">%</span>
                  </div>
                </div>
                <div className="px-2 py-4">
                  <Slider 
                    id="sip-return"
                    min={5} 
                    max={18} 
                    step={0.5} 
                    value={[sipReturn]} 
                    onValueChange={(value) => setSipReturn(value[0])} 
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-2">
                  <span>5%</span>
                  <span>18%</span>
                </div>
              </div>
              
              <motion.div 
                className="mt-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Invested Amount</p>
                    <p className="text-lg font-bold text-white">₹{totalInvestment.toLocaleString()}</p>
                  </div>
                  <div className="text-center border-x border-gray-600/30">
                    <p className="text-xs text-gray-400">Wealth Gain</p>
                    <p className="text-lg font-bold text-purple-400">₹{wealthGain.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Estimated Value</p>
                    <p className="text-lg font-bold text-pink-400">₹{sipTotal.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-600/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">Return on Investment</span>
                    <span className="font-medium text-purple-400">{Math.round((wealthGain / totalInvestment) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700/30 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" 
                      style={{width: `${Math.min(100, Math.round((wealthGain / totalInvestment) * 100))}%`}}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.round((wealthGain / totalInvestment) * 100))}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
              
              <div className="text-center pt-2">
                <Button variant="outline" size="sm" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border-purple-500/30 text-purple-300 hover:text-white transition-all duration-300">
                  Save calculation
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="insurance" className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="age" className="text-sm font-medium text-gray-300">Your Age</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="age-input"
                      type="number" 
                      value={age} 
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-20 text-right h-8 text-sm bg-gray-800/50 border-gray-600 text-white focus:border-purple-500" 
                    />
                    <span className="text-purple-400 font-medium text-sm">years</span>
                  </div>
                </div>
                <div className="px-2 py-4">
                  <Slider 
                    id="age"
                    min={18} 
                    max={60} 
                    step={1} 
                    value={[age]} 
                    onValueChange={(value) => setAge(value[0])} 
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-2">
                  <span>18 yrs</span>
                  <span>60 yrs</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="coverage" className="text-sm font-medium text-gray-300">Coverage Amount</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-medium">₹</span>
                    <Input 
                      id="coverage-input"
                      type="number" 
                      value={coverage} 
                      onChange={(e) => setCoverage(Number(e.target.value))}
                      className="w-32 text-right h-8 text-sm bg-gray-800/50 border-gray-600 text-white focus:border-purple-500" 
                    />
                  </div>
                </div>
                <div className="px-2 py-4">
                  <Slider 
                    id="coverage"
                    min={1000000} 
                    max={10000000} 
                    step={500000} 
                    value={[coverage]} 
                    onValueChange={(value) => setCoverage(value[0])} 
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-2">
                  <span>₹10 Lakh</span>
                  <span>₹1 Crore</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="term" className="text-sm font-medium text-gray-300">Policy Term</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="term-input"
                      type="number" 
                      value={term} 
                      onChange={(e) => setTerm(Number(e.target.value))}
                      className="w-20 text-right h-8 text-sm bg-gray-800/50 border-gray-600 text-white focus:border-purple-500" 
                    />
                    <span className="text-purple-400 font-medium text-sm">years</span>
                  </div>
                </div>
                <div className="px-2 py-4">
                  <Slider 
                    id="term"
                    min={5} 
                    max={40} 
                    step={5} 
                    value={[term]} 
                    onValueChange={(value) => setTerm(value[0])} 
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-2">
                  <span>5 yrs</span>
                  <span>40 yrs</span>
                </div>
              </div>
              
              <motion.div 
                className="mt-6 p-6 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Estimated Monthly Premium</p>
                  <p className="text-3xl font-bold text-purple-400">₹{insurancePremium.toLocaleString()}</p>
                  <div className="flex items-center justify-center mt-3 gap-2">
                    <Shield className="h-4 w-4 text-pink-400" />
                    <p className="text-xs text-gray-400">Coverage: ₹{(coverage/100000).toFixed(1)} Lakh for {term} years</p>
                  </div>
                </div>
                
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <Button variant="outline" size="sm" className="text-xs bg-gray-800/50 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white transition-all duration-300">
                    Compare plans
                  </Button>
                  <Button size="sm" className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300">
                    Get quotes
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4 text-center">*Premium is an estimate. Actual rates may vary based on health and other factors.</p>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FinancialCalculator;
