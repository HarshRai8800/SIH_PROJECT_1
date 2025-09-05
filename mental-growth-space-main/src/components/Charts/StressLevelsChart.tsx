import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'Week 1', stress: 65, anxiety: 58, mood: 72 },
  { week: 'Week 2', stress: 62, anxiety: 55, mood: 75 },
  { week: 'Week 3', stress: 58, anxiety: 52, mood: 78 },
  { week: 'Week 4', stress: 55, anxiety: 48, mood: 82 },
  { week: 'Week 5', stress: 52, anxiety: 45, mood: 85 },
  { week: 'Week 6', stress: 48, anxiety: 42, mood: 88 },
];

export const StressLevelsChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
          <XAxis 
            dataKey="week" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            domain={[30, 100]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="stress" 
            stroke="hsl(var(--destructive))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
            name="Stress Level"
          />
          <Line 
            type="monotone" 
            dataKey="anxiety" 
            stroke="hsl(var(--accent))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
            name="Anxiety Level"
          />
          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="hsl(var(--wellness))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--wellness))', strokeWidth: 2, r: 4 }}
            name="Mood Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};