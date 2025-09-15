
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, ArrowLeft, Plus, Target, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface GoalTrackerProps {
  onBack: () => void;
}

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  color: string;
}

const GoalTracker = ({ onBack }: GoalTrackerProps) => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, name: "Emergency Fund", targetAmount: 100000, currentAmount: 35000, deadline: "2024-12-31", color: "bg-red-500" },
    { id: 2, name: "New Laptop", targetAmount: 80000, currentAmount: 45000, deadline: "2024-08-15", color: "bg-blue-500" },
    { id: 3, name: "Vacation", targetAmount: 50000, currentAmount: 20000, deadline: "2024-10-01", color: "bg-green-500" },
  ]);

  const addGoal = () => {
    const colors = ["bg-purple-500", "bg-yellow-500", "bg-pink-500", "bg-indigo-500"];
    const newGoal: Goal = {
      id: Date.now(),
      name: "New Goal",
      targetAmount: 10000,
      currentAmount: 0,
      deadline: "2024-12-31",
      color: colors[goals.length % colors.length]
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (id: number, field: keyof Goal, value: string | number) => {
    setGoals(goals => 
      goals.map(goal => 
        goal.id === id ? { ...goal, [field]: value } : goal
      )
    );
  };

  const removeGoal = (id: number) => {
    setGoals(goals => goals.filter(goal => goal.id !== id));
  };

  const calculateProgress = (current: number, target: number) => {
    return target > 0 ? Math.min((current / target) * 100, 100) : 0;
  };

  const calculateTimeLeft = (deadline: string) => {
    const now = new Date();
    const target = new Date(deadline);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
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
              <TrendingUp className="h-6 w-6 text-indigo-400" />
              <CardTitle className="text-white">Goal Tracker</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Your Financial Goals</h3>
            <Button 
              onClick={addGoal}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Goal
            </Button>
          </div>

          <div className="space-y-4">
            {goals.map((goal) => {
              const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
              const timeLeft = calculateTimeLeft(goal.deadline);
              const remaining = goal.targetAmount - goal.currentAmount;
              
              return (
                <div key={goal.id} className="p-4 bg-gray-800 rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${goal.color}`}></div>
                    <Input 
                      value={goal.name}
                      onChange={(e) => updateGoal(goal.id, 'name', e.target.value)}
                      className="flex-1 bg-gray-700 border-gray-600 text-white font-medium"
                    />
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => removeGoal(goal.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-400 text-sm">Target Amount</Label>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-indigo-400">₹</span>
                        <Input 
                          type="number"
                          value={goal.targetAmount}
                          onChange={(e) => updateGoal(goal.id, 'targetAmount', Number(e.target.value))}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-400 text-sm">Current Amount</Label>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-indigo-400">₹</span>
                        <Input 
                          type="number"
                          value={goal.currentAmount}
                          onChange={(e) => updateGoal(goal.id, 'currentAmount', Number(e.target.value))}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-400 text-sm">Deadline</Label>
                      <Input 
                        type="date"
                        value={goal.deadline}
                        onChange={(e) => updateGoal(goal.id, 'deadline', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Progress: {progress.toFixed(1)}%</span>
                      <span className="text-gray-300">{timeLeft}</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">₹{goal.currentAmount.toLocaleString()}</span>
                      <span className="text-red-400">₹{remaining.toLocaleString()} remaining</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {goals.length === 0 && (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">No goals yet. Add your first financial goal!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GoalTracker;
