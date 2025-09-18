export interface MindExercise {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: "easy" | "medium" | "hard";
  steps: {
    instruction: string;
    duration?: number;
  }[];
  benefits: string[];
}

export const mindExercisesData: MindExercise[] = [
  {
    id: "mindful-breathing",
    title: "Mindful Breathing",
    description: "A simple breathing exercise to calm your mind and reduce stress",
    icon: "Lungs",
    difficulty: "easy",
    steps: [
      { instruction: "Find a comfortable seated position", duration: 30 },
      { instruction: "Close your eyes and take a deep breath in through your nose", duration: 60 },
      { instruction: "Hold your breath for a moment", duration: 30 },
      { instruction: "Exhale slowly through your mouth", duration: 60 },
      { instruction: "Repeat the breathing cycle, focusing on each breath", duration: 180 }
    ],
    benefits: ["Reduces stress and anxiety", "Improves focus", "Lowers heart rate", "Promotes relaxation"]
  },
  {
    id: "body-scan",
    title: "Body Scan Meditation",
    description: "A progressive relaxation technique to release tension throughout your body",
    icon: "Scan",
    difficulty: "medium",
    steps: [
      { instruction: "Lie down in a comfortable position", duration: 30 },
      { instruction: "Close your eyes and take a few deep breaths", duration: 60 },
      { instruction: "Focus your attention on your feet, noticing any sensations", duration: 60 },
      { instruction: "Slowly move your attention up through your legs, torso, arms, and head", duration: 240 },
      { instruction: "Notice and release any tension you find in each area", duration: 120 }
    ],
    benefits: ["Reduces physical tension", "Improves body awareness", "Promotes better sleep", "Decreases stress"]
  },
  {
    id: "gratitude-practice",
    title: "Gratitude Practice",
    description: "Cultivate appreciation for the positive aspects of your life",
    icon: "Heart",
    difficulty: "easy",
    steps: [
      { instruction: "Find a quiet place to sit or write", duration: 30 },
      { instruction: "Think of three things you're grateful for today", duration: 120 },
      { instruction: "For each item, reflect on why it brings you gratitude", duration: 180 },
      { instruction: "Notice how you feel as you acknowledge these positive elements", duration: 60 }
    ],
    benefits: ["Increases positive emotions", "Improves self-esteem", "Enhances empathy", "Reduces negative thinking"]
  },
  {
    id: "thought-defusion",
    title: "Thought Defusion",
    description: "Learn to observe thoughts without being caught up in them",
    icon: "Brain",
    difficulty: "hard",
    steps: [
      { instruction: "Notice a troubling thought that you're experiencing", duration: 60 },
      { instruction: "Imagine the thought as text on a screen or billboard", duration: 90 },
      { instruction: "Create distance by saying 'I'm having the thought that...'", duration: 90 },
      { instruction: "Watch the thought without judging or engaging with it", duration: 120 },
      { instruction: "Notice how the thought's intensity changes as you observe it", duration: 60 }
    ],
    benefits: ["Reduces emotional reactivity", "Increases psychological flexibility", "Decreases rumination", "Improves mental clarity"]
  },
  {
    id: "loving-kindness",
    title: "Loving-Kindness Meditation",
    description: "Develop compassion for yourself and others through guided meditation",
    icon: "Heart",
    difficulty: "medium",
    steps: [
      { instruction: "Sit comfortably and take a few deep breaths", duration: 60 },
      { instruction: "Bring to mind someone you care about deeply", duration: 60 },
      { instruction: "Silently repeat phrases like 'May you be happy, may you be healthy'", duration: 120 },
      { instruction: "Extend these wishes to yourself, then to others in widening circles", duration: 180 },
      { instruction: "Notice how you feel as you send these positive intentions", duration: 60 }
    ],
    benefits: ["Increases positive emotions", "Builds compassion", "Reduces self-criticism", "Improves relationships"]
  }
];