export interface BreathingExercise {
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

export const breathingExercisesData: BreathingExercise[] = [
  {
    id: "deep-breathing",
    title: "Deep Breathing",
    description: "A simple technique to relax your body and mind by slowing down your breath.",
    icon: "Wind",
    difficulty: "easy",
    steps: [
      { instruction: "Sit or lie down in a comfortable position", duration: 30 },
      { instruction: "Inhale slowly through your nose for 4 seconds", duration: 60 },
      { instruction: "Hold your breath for 2 seconds", duration: 30 },
      { instruction: "Exhale slowly through your mouth for 6 seconds", duration: 90 },
      { instruction: "Repeat this cycle for 5 minutes", duration: 300 }
    ],
    benefits: ["Reduces anxiety", "Lowers stress levels", "Improves oxygen intake", "Promotes relaxation"]
  },
  {
    id: "box-breathing",
    title: "Box Breathing",
    description: "A controlled breathing technique often used by athletes and military personnel to stay calm and focused.",
    icon: "Square",
    difficulty: "medium",
    steps: [
      { instruction: "Inhale deeply through your nose for 4 seconds", duration: 60 },
      { instruction: "Hold your breath for 4 seconds", duration: 60 },
      { instruction: "Exhale slowly through your mouth for 4 seconds", duration: 60 },
      { instruction: "Hold your breath again for 4 seconds", duration: 60 },
      { instruction: "Repeat the cycle for 5 rounds", duration: 300 }
    ],
    benefits: ["Increases focus", "Calms the nervous system", "Improves emotional control", "Helps manage stress"]
  },
  {
    id: "4-7-8-breathing",
    title: "4-7-8 Breathing",
    description: "A rhythmic breathing exercise that helps induce relaxation and prepare for sleep.",
    icon: "Moon",
    difficulty: "medium",
    steps: [
      { instruction: "Sit comfortably and exhale completely through your mouth", duration: 30 },
      { instruction: "Inhale quietly through your nose for 4 seconds", duration: 60 },
      { instruction: "Hold your breath for 7 seconds", duration: 120 },
      { instruction: "Exhale completely through your mouth for 8 seconds", duration: 120 },
      { instruction: "Repeat this cycle up to 4 times", duration: 240 }
    ],
    benefits: ["Promotes better sleep", "Reduces stress", "Slows heart rate", "Calms the mind"]
  },
  {
    id: "alternate-nostril",
    title: "Alternate Nostril Breathing",
    description: "A traditional yogic breathing practice (Nadi Shodhana) to balance body and mind.",
    icon: "Infinity",
    difficulty: "hard",
    steps: [
      { instruction: "Sit in a comfortable position with your spine straight", duration: 30 },
      { instruction: "Close your right nostril with your thumb and inhale through your left nostril for 4 seconds", duration: 60 },
      { instruction: "Close your left nostril with your ring finger and hold your breath for 4 seconds", duration: 60 },
      { instruction: "Exhale through your right nostril for 6 seconds", duration: 90 },
      { instruction: "Inhale through your right nostril for 4 seconds", duration: 60 },
      { instruction: "Close your right nostril, hold for 4 seconds, then exhale through your left nostril for 6 seconds", duration: 90 },
      { instruction: "Repeat the cycle for 5 minutes", duration: 300 }
    ],
    benefits: ["Balances energy", "Improves focus", "Reduces anxiety", "Enhances lung capacity"]
  },
  {
    id: "pursed-lip-breathing",
    title: "Pursed Lip Breathing",
    description: "A technique to slow down exhalation and improve oxygen exchange, often used for stress relief and lung health.",
    icon: "Circle",
    difficulty: "easy",
    steps: [
      { instruction: "Inhale slowly through your nose for 2 seconds", duration: 30 },
      { instruction: "Purse your lips as if you are about to whistle", duration: 15 },
      { instruction: "Exhale gently and slowly through pursed lips for 4 seconds", duration: 60 },
      { instruction: "Continue the cycle for 5–10 minutes", duration: 600 }
    ],
    benefits: ["Improves breathing efficiency", "Relieves shortness of breath", "Promotes relaxation", "Strengthens lungs"]
  }
];
