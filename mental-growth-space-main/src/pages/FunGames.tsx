import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar/Navbar";

/* ── Mini-Games ────────────────────────────────────────── */

// ✅ 1. Reaction Timer
function ReactionTimer() {
  const [waiting, setWaiting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);

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
    <Card className="p-6 text-center space-y-4">
      <CardTitle>Reaction Timer</CardTitle>
      <p>Click “Start” and then click the big button as soon as it turns green.</p>
      <Button
        className={`w-full h-32 text-xl ${
          waiting ? "bg-yellow-400" : startTime ? "bg-green-500" : "bg-primary"
        }`}
        onClick={startTime ? stopGame : startGame}
      >
        {startTime ? "Click!" : waiting ? "Wait..." : "Start"}
      </Button>
      {result && <p className="font-semibold">Your Time: {result}</p>}
    </Card>
  );
}

// ✅ 2. Memory Match (tiny 4-card version)
function MemoryMatch() {
  const initialCards = ["🐱", "🐱", "🐶", "🐶"];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    setCards([...initialCards].sort(() => Math.random() - 0.5));
  }, []);

  const flipCard = (idx) => {
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
    <Card className="p-6 text-center">
      <CardTitle>Mini Memory Match</CardTitle>
      <div className="grid grid-cols-4 gap-3 mt-4">
        {cards.map((emoji, idx) => (
          <Button
            key={idx}
            onClick={() => flipCard(idx)}
            className="h-16 text-2xl"
          >
            {flipped.includes(idx) || matched.includes(idx) ? emoji : "❓"}
          </Button>
        ))}
      </div>
      {matched.length === cards.length && (
        <p className="mt-4 font-semibold">You matched all cards!</p>
      )}
    </Card>
  );
}

// ✅ 3. Quick Math Quiz (fixed)
function QuickMath() {
  // Safe initial question to avoid undefined properties
  const [question, setQuestion] = useState({ a: 0, b: 0, sum: 0 });
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
    <Card className="p-6 text-center space-y-4">
      <CardTitle>Quick Math</CardTitle>
      <p className="text-lg">
        {question.a} + {question.b} = ?
      </p>
      <input
        type="number"
        className="border rounded px-2 py-1 text-center"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button onClick={check}>Submit</Button>
      <p>Score: {score}</p>
    </Card>
  );
}

/* ── Main Page ─────────────────────────────────────────── */

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
      <section className="container mx-auto px-4  pt-24 pb-10">
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
