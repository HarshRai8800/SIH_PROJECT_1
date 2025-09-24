import { useState } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";

export default function ReactionTimer() {
  const [waiting, setWaiting] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const startGame = () => {
    setResult(null);
    setWaiting(true);
    const delay = Math.random() * 2000 + 2000; // 2–4 sec
    setTimeout(() => {
      setStartTime(Date.now());
      setWaiting(false);
    }, delay);
  };

  const stopGame = () => {
    if (waiting) {
      setResult("Too soon!");
    } else if (startTime) {
      setResult(`${Date.now() - startTime} ms`);
      setStartTime(null);
    }
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow border border/50 bg-gradient-to-br from-[#d0f0fd] via-[#e0f7fa] to-[#dcedc8] rounded-2xl">
      <div className="p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Timer className="h-6 w-6 text-primary mr-2" />
          <CardTitle className="text-xl font-bold">Reaction Timer</CardTitle>
        </div>
        
        <CardContent className="p-0 space-y-6">
          <p className="text-muted-foreground">Click "Start" and then click the big button as soon as it turns green.</p>
          
          <Button
            className={`w-full h-32 text-xl font-semibold transition-colors ${
              waiting ? "bg-yellow-400 hover:bg-yellow-500" : 
              startTime ? "bg-green-500 hover:bg-green-600" : 
              "bg-primary hover:bg-primary/90"
            }`}
            onClick={startTime ? stopGame : startGame}
          >
            {startTime ? "Click!" : waiting ? "Wait..." : "Start"}
          </Button>
          
          {result && (
            <div className="bg-white/50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold">Your Time: {result}</p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}