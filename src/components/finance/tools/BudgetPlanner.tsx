
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PieChart, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface BudgetPlannerProps {
  onBack: () => void;
}

interface BudgetItem {
  id: number;
  category: string;
  amount: number;
  color: string;
}

const BudgetPlanner = ({ onBack }: BudgetPlannerProps) => {
  const [income, setIncome] = useState(50000);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: 1, category: "Food", amount: 15000, color: "bg-red-500" },
    { id: 2, category: "Transportation", amount: 8000, color: "bg-blue-500" },
    { id: 3, category: "Entertainment", amount: 5000, color: "bg-green-500" },
    { id: 4, category: "Savings", amount: 15000, color: "bg-purple-500" },
  ]);

  const totalExpenses = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remaining = income - totalExpenses;

  const addBudgetItem = () => {
    const colors = ["bg-yellow-500", "bg-pink-500", "bg-indigo-500", "bg-orange-500"];
    const newItem: BudgetItem = {
      id: Date.now(),
      category: "New Category",
      amount: 0,
      color: colors[budgetItems.length % colors.length]
    };
    setBudgetItems([...budgetItems, newItem]);
  };

  const updateBudgetItem = (id: number, field: keyof BudgetItem, value: string | number) => {
    setBudgetItems(items => 
      items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeBudgetItem = (id: number) => {
    setBudgetItems(items => items.filter(item => item.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-gray-900 border-gray-700">
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
              <PieChart className="h-6 w-6 text-purple-400" />
              <CardTitle className="text-white">Budget Planner</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Monthly Income</Label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-purple-400">₹</span>
                  <Input 
                    type="number" 
                    value={income} 
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-gray-300">Budget Categories</Label>
                  <Button 
                    size="sm" 
                    onClick={addBudgetItem}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                
                {budgetItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <Input 
                      value={item.category}
                      onChange={(e) => updateBudgetItem(item.id, 'category', e.target.value)}
                      className="flex-1 bg-gray-700 border-gray-600 text-white"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-purple-400">₹</span>
                      <Input 
                        type="number"
                        value={item.amount}
                        onChange={(e) => updateBudgetItem(item.id, 'amount', Number(e.target.value))}
                        className="w-24 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => removeBudgetItem(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-4">Budget Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Income:</span>
                    <span className="text-green-400 font-semibold">₹{income.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Expenses:</span>
                    <span className="text-blue-400 font-semibold">₹{totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-600 pt-2">
                    <span className="text-gray-300">Remaining:</span>
                    <span className={`font-semibold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ₹{remaining.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-medium">Category Breakdown</h4>
                {budgetItems.map((item) => {
                  const percentage = income > 0 ? (item.amount / income) * 100 : 0;
                  return (
                    <div key={item.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.category}</span>
                        <span className="text-white">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${item.color.replace('bg-', 'bg-')}`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BudgetPlanner;
