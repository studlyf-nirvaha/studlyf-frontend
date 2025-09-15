
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChartBar, TrendingUp, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const InvestmentChart = () => {
  const [chartPeriod, setChartPeriod] = useState("5years");
  const [chartType, setChartType] = useState("area");

  // Generate more accurate data for different investment types over time
  const generateData = (years: number) => {
    const data = [];
    const months = years * 12;
    
    // Starting values
    const equityStart = 10000;
    const debtStart = 10000;
    const goldStart = 10000;
    
    // Annual returns based on historical data (simplified)
    const equityAnnualReturn = 0.12; // 12% annually
    const debtAnnualReturn = 0.07; // 7% annually
    const goldAnnualReturn = 0.08; // 8% annually
    
    // Convert to monthly
    const equityMonthlyReturn = Math.pow(1 + equityAnnualReturn, 1/12) - 1;
    const debtMonthlyReturn = Math.pow(1 + debtAnnualReturn, 1/12) - 1;
    const goldMonthlyReturn = Math.pow(1 + goldAnnualReturn, 1/12) - 1;
    
    let equityValue = equityStart;
    let debtValue = debtStart;
    let goldValue = goldStart;
    
    // Market volatility factors
    const equityVolatility = 0.06; // Higher volatility
    const debtVolatility = 0.02;   // Lower volatility
    const goldVolatility = 0.04;   // Medium volatility
    
    for (let i = 0; i <= months; i += Math.max(1, Math.floor(months / 10))) {
      const month = Math.round(i);
      const yearFraction = month / 12;
      
      // Base compound returns
      equityValue = equityStart * Math.pow(1 + equityMonthlyReturn, month);
      debtValue = debtStart * Math.pow(1 + debtMonthlyReturn, month);
      goldValue = goldStart * Math.pow(1 + goldMonthlyReturn, month);
      
      // Add realistic market cycles
      const marketCycle = Math.sin(yearFraction / 3 * Math.PI) * 0.1;
      
      // Add randomness for realism with different volatility factors
      const equityRandomness = 1 + (Math.random() * 2 - 1) * equityVolatility + marketCycle;
      const debtRandomness = 1 + (Math.random() * 2 - 1) * debtVolatility + marketCycle * 0.3;
      const goldRandomness = 1 + (Math.random() * 2 - 1) * goldVolatility - marketCycle * 0.5; // Often counter-cyclical
      
      data.push({
        month: `${Math.floor(month / 12)}Y ${month % 12}M`,
        Equity: Math.round(equityValue * equityRandomness),
        Debt: Math.round(debtValue * debtRandomness),
        Gold: Math.round(goldValue * goldRandomness),
      });
    }
    
    return data;
  };

  const getDataForPeriod = () => {
    switch (chartPeriod) {
      case "1year": return generateData(1);
      case "3years": return generateData(3);
      case "5years": return generateData(5);
      case "10years": return generateData(10);
      default: return generateData(5);
    }
  };

  const data = getDataForPeriod();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg border-none bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-brand-purple" />
              <CardTitle>Investment Growth Comparison</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs flex items-center gap-1">
                <Download className="h-3 w-3" /> Export
              </Button>
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs flex items-center gap-1">
                <Share2 className="h-3 w-3" /> Share
              </Button>
            </div>
          </div>
          <CardDescription>
            Compare different investment assets over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <ToggleGroup type="single" value={chartPeriod} onValueChange={(val) => val && setChartPeriod(val)} className="justify-start">
              <ToggleGroupItem value="1year" className="text-xs px-3">1Y</ToggleGroupItem>
              <ToggleGroupItem value="3years" className="text-xs px-3">3Y</ToggleGroupItem>
              <ToggleGroupItem value="5years" className="text-xs px-3">5Y</ToggleGroupItem>
              <ToggleGroupItem value="10years" className="text-xs px-3">10Y</ToggleGroupItem>
            </ToggleGroup>
            
            <ToggleGroup type="single" value={chartType} onValueChange={(val) => val && setChartType(val)} className="justify-start">
              <ToggleGroupItem value="area" className="text-xs px-3">Area</ToggleGroupItem>
              <ToggleGroupItem value="line" className="text-xs px-3">Line</ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8E44AD" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8E44AD" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498DB" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3498DB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F1C40F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F1C40F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
                  animationDuration={300}
                />
                <Legend />
                <Area 
                  type={chartType === "line" ? "monotone" : "monotone"} 
                  dataKey="Equity" 
                  stroke="#8E44AD" 
                  strokeWidth={2}
                  fillOpacity={chartType === "line" ? 0.1 : 1} 
                  fill="url(#colorEquity)" 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Area 
                  type={chartType === "line" ? "monotone" : "monotone"} 
                  dataKey="Debt" 
                  stroke="#3498DB" 
                  strokeWidth={2}
                  fillOpacity={chartType === "line" ? 0.1 : 1} 
                  fill="url(#colorDebt)" 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Area 
                  type={chartType === "line" ? "monotone" : "monotone"} 
                  dataKey="Gold" 
                  stroke="#F1C40F" 
                  strokeWidth={2}
                  fillOpacity={chartType === "line" ? 0.1 : 1} 
                  fill="url(#colorGold)" 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-md bg-brand-purple/10 border border-brand-purple/20">
              <p className="font-medium">Equity</p>
              <p className="text-xs text-muted-foreground mb-1">High risk, high return</p>
              <p className="text-lg font-bold text-brand-purple">12% <span className="text-xs font-normal">p.a.</span></p>
            </div>
            <div className="p-3 rounded-md bg-blue-500/10 border border-blue-500/20">
              <p className="font-medium">Debt</p>
              <p className="text-xs text-muted-foreground mb-1">Medium risk, stable</p>
              <p className="text-lg font-bold text-blue-500">7% <span className="text-xs font-normal">p.a.</span></p>
            </div>
            <div className="p-3 rounded-md bg-yellow-500/10 border border-yellow-500/20">
              <p className="font-medium">Gold</p>
              <p className="text-xs text-muted-foreground mb-1">Inflation hedge</p>
              <p className="text-lg font-bold text-yellow-500">8% <span className="text-xs font-normal">p.a.</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InvestmentChart;
