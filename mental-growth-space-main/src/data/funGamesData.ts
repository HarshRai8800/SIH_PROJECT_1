export interface FunGame {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: "easy" | "medium" | "hard";
  instructions: string;
}

export const funGamesData: FunGame[] = [
  {
    id: "reaction",
    title: "Reaction Timer",
    description: "Test your reaction speed by clicking as soon as the color changes.",
    icon: "Zap",
    difficulty: "easy",
    instructions: "Click 'Start' and then click the big button as soon as it turns green."
  },
  {
    id: "memory",
    title: "Memory Match",
    description: "Find matching pairs of cards to test your memory.",
    icon: "Brain",
    difficulty: "medium",
    instructions: "Click on cards to flip them and find matching pairs."
  },
  {
    id: "math",
    title: "Quick Math",
    description: "Solve simple math problems to improve mental calculation speed.",
    icon: "Calculator",
    difficulty: "medium",
    instructions: "Solve the math problem and enter your answer."
  }
];