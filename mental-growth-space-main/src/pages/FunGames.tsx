import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar/Navbar";
import ReactionTimer from "@/components/FunGames/ReactionTimer";
import MemoryMatch from "@/components/FunGames/MemoryMatch";
import QuickMath from "@/components/FunGames/QuickMath";

export default function FunGames() {
  const [current, setCurrent] = useState("reaction");

  const games = {
    reaction: <ReactionTimer />,
    memory: <MemoryMatch />,
    math: <QuickMath />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#f1f8e9]">
      <Navbar />
      <section className="container mx-auto px-4 pt-24 pb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Fun Games
        </h1>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          Play quick, brain-boosting games to sharpen memory, reflexes, and
          problem-solving skills.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={current === "reaction" ? "default" : "outline"}
            onClick={() => setCurrent("reaction")}
          >
            Reaction
          </Button>
          <Button
            variant={current === "memory" ? "default" : "outline"}
            onClick={() => setCurrent("memory")}
          >
            Memory
          </Button>
          <Button
            variant={current === "math" ? "default" : "outline"}
            onClick={() => setCurrent("math")}
          >
            Quick Math
          </Button>
        </div>

        <div className="max-w-lg mx-auto">{games[current]}</div>
      </section>
    </div>
  );
}
