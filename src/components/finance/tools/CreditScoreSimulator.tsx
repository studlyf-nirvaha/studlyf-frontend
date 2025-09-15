
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard, ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface CreditScoreSimulatorProps {
  onBack: () => void;
}

const CreditScoreSimulator = ({ onBack }: CreditScoreSimulatorProps) => {
  const [currentScore, setCurrentScore] = useState(650);
  const [paymentHistory, setPaymentHistory] = useState(80);
  const [creditUtilization, setCreditUtilization] = useState(30);
  const [creditLength, setCreditLength] = useState(24);
  const [newCredit, setNewCredit] = useState(2);

  const calculateScore = () => {
    let score = 300;
    
    // Payment history (35% weight)
    score += (paymentHistory / 100) * 350 * 0.35;
    
    // Credit utilization (30% weight)
    const utilizationScore = Math.max(0, (100 - creditUtilization) / 100);
    score += utilizationScore * 350 * 0.30;
    
    // Credit length (15% weight)
    const lengthScore = Math.min(1, creditLength / 120); // 10 years = max
    score += lengthScore * 350 * 0.15;
    
    // New credit (10% weight)
    const newCreditScore = Math.max(0, (12 - newCredit) / 12);
    score += newCreditScore * 350 * 0.10;
    
    // Credit mix (10% weight) - simplified
    score += 0.10 * 350;
    
    return Math.round(Math.min(850, Math.max(300, score)));
  };

  const simulatedScore = calculateScore();
  const scoreDifference = simulatedScore - currentScore;

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-green-400";
    if (score >= 650) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreRating = (score: number) => {
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Fair";
    if (score >= 600) return "Poor";
    return "Very Poor";
  };

  const recommendations = [
    {
      condition: paymentHistory < 95,
      text: "Make all payments on time to improve payment history",
      impact: "High Impact"
    },
    {
      condition: creditUtilization > 30,
      text: "Keep credit utilization below 30% of available credit",
      impact: "High Impact"
    },
    {
      condition: creditUtilization > 10,
      text: "Aim for credit utilization below 10% for excellent scores",
      impact: "Medium Impact"
    },
    {
      condition: creditLength < 60,
      text: "Keep old credit accounts open to increase average age",
      impact: "Medium Impact"
    },
    {
      condition: newCredit > 3,
      text: "Avoid opening too many new credit accounts",
      impact: "Low Impact"
    }
  ];

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
              <CreditCard className="h-6 w-6 text-teal-400" />
              <CardTitle className="text-white">Credit Score Simulator</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <Label className="text-gray-300">Current Credit Score</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input 
                    type="number" 
                    value={currentScore} 
                    onChange={(e) => setCurrentScore(Number(e.target.value))}
                    className="w-24 text-right bg-gray-800 border-gray-600 text-white"
                    min={300}
                    max={850}
                  />
                  <span className="text-teal-400">/ 850</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-gray-300">Payment History</Label>
                  <span className="text-teal-400">{paymentHistory}%</span>
                </div>
                <Slider 
                  min={0} 
                  max={100} 
                  step={5} 
                  value={[paymentHistory]} 
                  onValueChange={(value) => setPaymentHistory(value[0])} 
                />
                <p className="text-xs text-gray-400">35% of credit score</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-gray-300">Credit Utilization</Label>
                  <span className="text-teal-400">{creditUtilization}%</span>
                </div>
                <Slider 
                  min={0} 
                  max={100} 
                  step={5} 
                  value={[creditUtilization]} 
                  onValueChange={(value) => setCreditUtilization(value[0])} 
                />
                <p className="text-xs text-gray-400">30% of credit score</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-gray-300">Credit History Length</Label>
                  <span className="text-teal-400">{creditLength} months</span>
                </div>
                <Slider 
                  min={0} 
                  max={120} 
                  step={6} 
                  value={[creditLength]} 
                  onValueChange={(value) => setCreditLength(value[0])} 
                />
                <p className="text-xs text-gray-400">15% of credit score</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-gray-300">New Credit Accounts (last 12 months)</Label>
                  <span className="text-teal-400">{newCredit}</span>
                </div>
                <Slider 
                  min={0} 
                  max={10} 
                  step={1} 
                  value={[newCredit]} 
                  onValueChange={(value) => setNewCredit(value[0])} 
                />
                <p className="text-xs text-gray-400">10% of credit score</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-gradient-to-r from-teal-500/20 to-green-500/20 border border-teal-500/30">
                <h3 className="text-lg font-semibold text-white mb-4">Simulated Score</h3>
                <div className="text-center">
                  <p className={`text-4xl font-bold ${getScoreColor(simulatedScore)}`}>
                    {simulatedScore}
                  </p>
                  <p className="text-gray-300 mt-1">{getScoreRating(simulatedScore)}</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {scoreDifference > 0 ? (
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    ) : scoreDifference < 0 ? (
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    ) : (
                      <Minus className="h-5 w-5 text-gray-400" />
                    )}
                    <span className={`font-semibold ${
                      scoreDifference > 0 ? 'text-green-400' : 
                      scoreDifference < 0 ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {scoreDifference > 0 ? '+' : ''}{scoreDifference} points
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={(simulatedScore - 300) / 550 * 100} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>300</span>
                    <span>850</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Recommendations</h4>
                <div className="space-y-3">
                  {recommendations
                    .filter(rec => rec.condition)
                    .map((rec, index) => (
                      <div key={index} className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm text-gray-300">{rec.text}</p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            rec.impact === 'High Impact' ? 'bg-red-500/20 text-red-400' :
                            rec.impact === 'Medium Impact' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {rec.impact}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Credit Score Ranges</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Excellent:</span>
                    <span className="text-green-400">750-850</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Good:</span>
                    <span className="text-yellow-400">700-749</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Fair:</span>
                    <span className="text-orange-400">650-699</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Poor:</span>
                    <span className="text-red-400">600-649</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Very Poor:</span>
                    <span className="text-red-500">300-599</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreditScoreSimulator;
