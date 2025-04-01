
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, TooltipProps } from 'recharts';

const DashboardChart = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Generate sample data for the chart
    const generateData = () => {
      const days = 30;
      const result = [];
      
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        
        result.push({
          date: date.toISOString().split('T')[0],
          threats: Math.floor(Math.random() * 6),
          scans: Math.floor(Math.random() * 3) + 1,
          issues: Math.floor(Math.random() * 2),
        });
      }
      
      return result;
    };
    
    setData(generateData());
  }, []);
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };
  
  // Custom tooltip with proper type annotations
  const CustomTooltip = ({ 
    active, 
    payload, 
    label 
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatDate} 
          tick={{ fontSize: 12 }}
          stroke="#888888"
        />
        <YAxis 
          tickCount={6} 
          tick={{ fontSize: 12 }}
          stroke="#888888"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="threats" 
          name="Threats Detected" 
          stroke="#7c3aed" 
          fillOpacity={1} 
          fill="url(#colorThreats)" 
        />
        <Area 
          type="monotone" 
          dataKey="scans" 
          name="Security Scans" 
          stroke="#3b82f6" 
          fillOpacity={1} 
          fill="url(#colorScans)" 
        />
        <Area 
          type="monotone" 
          dataKey="issues" 
          name="Issues Found" 
          stroke="#f59e0b" 
          fillOpacity={1} 
          fill="url(#colorIssues)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
