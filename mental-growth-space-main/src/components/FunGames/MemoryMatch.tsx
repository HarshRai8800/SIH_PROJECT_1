import { useState, useEffect } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export default function MemoryMatch() {
  const initialCards = ["🐱", "🐱", "🐶", "🐶"];
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    setCards([...initialCards].sort(() => Math.random() - 0.5));
  }, []);

  const flipCard = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      if (cards[a] === cards[b]) {
        setMatched([...matched, a, b]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow border border-border/50 bg-gradient-to-br from-[#d0f0fd] via-[#e0f7fa] to-[#dcedc8] rounded-2xl">
      <div className="p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Brain className="h-6 w-6 text-primary mr-2" />
          <CardTitle className="text-xl font-bold">Mini Memory Match</CardTitle>
        </div>
        
        <CardContent className="p-0 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            {cards.map((emoji, idx) => (
              <Button
                key={idx}
                onClick={() => flipCard(idx)}
                className={`h-16 text-2xl transition-all ${
                  matched.includes(idx) 
                    ? "bg-green-100 hover:bg-green-200 text-green-800" 
                    : flipped.includes(idx)
                    ? "bg-blue-100 hover:bg-blue-200 text-blue-800"
                    : "bg-primary/90 hover:bg-primary text-white"
                }`}
              >
                {flipped.includes(idx) || matched.includes(idx) ? emoji : "❓"}
              </Button>
            ))}
          </div>
          
          {matched.length === cards.length && (
            <div className="bg-white/50 p-4 rounded-lg shadow-sm mt-4">
              <p className="font-semibold text-green-600">You matched all cards!</p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}