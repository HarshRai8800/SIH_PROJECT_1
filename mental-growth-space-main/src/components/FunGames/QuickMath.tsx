import { useState, useEffect } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface MathQuestion {
  a: number;
  b: number;
  sum: number;
}

export default function QuickMath() {
  const [question, setQuestion] = useState<MathQuestion>({ a: 0, b: 0, sum: 0 });
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  const newQuestion = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setQuestion({ a, b, sum: a + b });
    setAnswer("");
  };

  useEffect(() => {
    newQuestion();
  }, []);

  const check = () => {
    if (parseInt(answer, 10) === question.sum) {
      setScore((s) => s + 1);
    }
    newQuestion();
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow border border/50 bg-gradient-to-br from-[#d0f0fd] via-[#e0f7fa] to-[#dcedc8] rounded-2xl">
      <div className="p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Calculator className="h-6 w-6 text-primary mr-2" />
          <CardTitle className="text-xl font-bold">Quick Math</CardTitle>
        </div>
        
        <CardContent className="p-0 space-y-6">
          <div className="bg-white/50 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-medium">
              {question.a} + {question.b} = ?
            </p>
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            check();
          }}>
            <input
              type="number"
              className="border rounded-lg px-4 py-2 text-center w-full focus:outline-none focus:ring-2 focus:ring-primary"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              autoFocus
            />
          </form>
          
          <Button 
            onClick={check}
            className="w-full bg-primary hover:bg-primary/90 transition-colors"
          >
            Submit
          </Button>
          
          <div className="bg-white/50 p-4 rounded-lg shadow-sm">
            <p className="font-semibold">Score: {score}</p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}