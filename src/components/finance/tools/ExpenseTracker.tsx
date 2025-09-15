
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Banknote, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface ExpenseTrackerProps {
  onBack: () => void;
}

interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const ExpenseTracker = ({ onBack }: ExpenseTrackerProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, amount: 250, category: "Food", description: "Lunch", date: "2024-05-29" },
    { id: 2, amount: 500, category: "Transportation", description: "Bus pass", date: "2024-05-28" },
    { id: 3, amount: 1200, category: "Entertainment", description: "Movie tickets", date: "2024-05-27" },
  ]);

  const [newExpense, setNewExpense] = useState({
    amount: 0,
    category: "Food",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ["Food", "Transportation", "Entertainment", "Shopping", "Bills", "Education", "Health", "Other"];

  const addExpense = () => {
    if (newExpense.amount > 0 && newExpense.description.trim()) {
      const expense: Expense = {
        id: Date.now(),
        ...newExpense
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({
        amount: 0,
        category: "Food",
        description: "",
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses => expenses.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const getCategoryTotal = (category: string) => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Food": "bg-red-500",
      "Transportation": "bg-blue-500",
      "Entertainment": "bg-green-500",
      "Shopping": "bg-purple-500",
      "Bills": "bg-yellow-500",
      "Education": "bg-indigo-500",
      "Health": "bg-pink-500",
      "Other": "bg-gray-500"
    };
    return colors[category] || "bg-gray-500";
  };

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
              <Banknote className="h-6 w-6 text-yellow-400" />
              <CardTitle className="text-white">Expense Tracker</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Add New Expense</h3>
              <div className="p-4 bg-gray-800 rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Amount</Label>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400">₹</span>
                      <Input 
                        type="number"
                        value={newExpense.amount || ""}
                        onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Category</Label>
                    <Select 
                      value={newExpense.category} 
                      onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Description</Label>
                  <Input 
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    placeholder="What did you spend on?"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Date</Label>
                  <Input 
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <Button 
                  onClick={addExpense}
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                  disabled={!newExpense.amount || !newExpense.description.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Expense
                </Button>
              </div>

              <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Total Expenses</h4>
                <p className="text-2xl font-bold text-yellow-400">₹{totalExpenses.toLocaleString()}</p>
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  {categories.slice(0, 4).map(category => {
                    const total = getCategoryTotal(category);
                    return total > 0 ? (
                      <div key={category} className="flex justify-between">
                        <span className="text-gray-300">{category}:</span>
                        <span className="text-white">₹{total}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Recent Expenses</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className={`w-4 h-4 rounded-full ${getCategoryColor(expense.category)}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-medium">{expense.description}</p>
                          <p className="text-gray-400 text-sm">{expense.category} • {expense.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-yellow-400 font-semibold">₹{expense.amount}</p>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => removeExpense(expense.id)}
                            className="text-red-400 hover:text-red-300 p-1 h-auto"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {expenses.length === 0 && (
                <div className="text-center py-8">
                  <Banknote className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">No expenses recorded yet.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExpenseTracker;
