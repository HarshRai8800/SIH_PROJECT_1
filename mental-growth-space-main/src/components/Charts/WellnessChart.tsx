import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', students: 120, sessions: 85 },
  { name: 'Feb', students: 145, sessions: 102 },
  { name: 'Mar', students: 190, sessions: 134 },
  { name: 'Apr', students: 210, sessions: 147 },
  { name: 'May', students: 185, sessions: 129 },
  { name: 'Jun', students: 165, sessions: 115 },
];

export const WellnessChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
          />
          <Bar 
            dataKey="students" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            name="Active Students"
          />
          <Bar 
            dataKey="sessions" 
            fill="hsl(var(--secondary))" 
            radius={[4, 4, 0, 0]}
            name="Sessions Completed"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};