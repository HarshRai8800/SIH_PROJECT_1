import Navbar from "@/components/Navbar/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Puzzle, Lightbulb, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample mind games data (you can expand this)
const mindGamesData = [
  {
    id: "memory-match",
    title: "Memory Match",
    icon: Brain,
    description: "Sharpen your memory by matching hidden pairs of cards.",
    difficulty: "easy",
  },
  {
    id: "logic-puzzle",
    title: "Logic Puzzle",
    icon: Lightbulb,
    description: "Test your reasoning skills with tricky logic problems.",
    difficulty: "medium",
  },
  {
    id: "pattern-finder",
    title: "Pattern Finder",
    icon: Layers,
    description: "Find hidden patterns and sequences to boost focus.",
    difficulty: "medium",
  },
  {
    id: "riddle-quest",
    title: "Riddle Quest",
    icon: Puzzle,
    description: "Solve fun riddles that challenge your creativity.",
    difficulty: "hard",
  },
];

export default function MindGamesPage() {
  const navigate = useNavigate();

  const handleGameSelect = (id: string) => {
    navigate(`/exercises/mind-games/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen mt-8 bg-gradient-to-br from-[#ede7f6] to-[#e8f5e9]">
      <Navbar />

      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-foreground">
          Challenge Your Mind
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Explore puzzles, riddles, and logic challenges designed to sharpen your
          problem-solving skills and boost mental agility.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mindGamesData.map(({ id, title, icon: Icon, description, difficulty }) => (
            <Card
              key={id}
              className="flex flex-col justify-between h-96 hover:scale-105 transition-transform border border/50 bg-gradient-to-br from-[#f3e5f5] via-[#ede7f6] to-[#e8f5e9] rounded-2xl shadow-md hover:shadow-xl"
            >
              <CardHeader className="flex flex-col items-center pt-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary/70 to-secondary/70 flex items-center justify-center mb-3">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground text-center">
                  {title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col justify-between items-center text-center text-muted-foreground flex-1 px-4 pb-6">
                <p className="mb-6">{description}</p>
                <span
                  className={`mb-4 text-sm font-medium ${
                    difficulty === "easy"
                      ? "text-green-500"
                      : difficulty === "medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </span>
                <Button
                  variant="default"
                  className="w-full hover:bg-primary/80 transition-colors"
                  onClick={() => handleGameSelect(id)}
                >
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
