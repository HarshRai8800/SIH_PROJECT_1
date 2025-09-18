export interface PhysicalExercise {
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

export const physicalExercisesData: PhysicalExercise[] = [
  {
    id: "stretching",
    title: "Gentle Stretching",
    description: "Simple stretches to release muscle tension and improve flexibility.",
    icon: "StretchHorizontal",
    difficulty: "easy",
    steps: [
      { instruction: "Stand up tall and roll your shoulders back", duration: 30 },
      { instruction: "Reach your arms overhead and stretch upwards", duration: 60 },
      { instruction: "Gently bend to each side, stretching your torso", duration: 60 },
      { instruction: "Stretch your neck by tilting side to side", duration: 60 },
      { instruction: "Hold each stretch and breathe deeply", duration: 120 }
    ],
    benefits: ["Relieves tension", "Improves flexibility", "Reduces stiffness", "Promotes relaxation"]
  },
  {
    id: "walking",
    title: "Mindful Walking",
    description: "A calm walk with awareness of movement and surroundings.",
    icon: "Footprints",
    difficulty: "easy",
    steps: [
      { instruction: "Find a safe space to walk slowly", duration: 30 },
      { instruction: "Pay attention to each step you take", duration: 120 },
      { instruction: "Notice your breathing as you walk", duration: 120 },
      { instruction: "Observe your surroundings calmly", duration: 180 },
      { instruction: "Continue walking for 5–10 minutes", duration: 300 }
    ],
    benefits: ["Boosts mood", "Improves circulation", "Increases mindfulness", "Reduces fatigue"]
  },
  {
    id: "yoga-poses",
    title: "Basic Yoga Poses",
    description: "A sequence of beginner yoga postures to relax the body and mind.",
    icon: "Flower2",
    difficulty: "medium",
    steps: [
      { instruction: "Begin with Mountain Pose: stand tall, feet together, deep breaths", duration: 60 },
      { instruction: "Move to Child’s Pose: kneel and stretch arms forward", duration: 120 },
      { instruction: "Transition to Cat-Cow: alternate arching and rounding the back", duration: 120 },
      { instruction: "Hold Downward Dog: lift hips up, press hands into the floor", duration: 120 },
      { instruction: "Finish in Corpse Pose: lie down, arms relaxed, eyes closed", duration: 180 }
    ],
    benefits: ["Reduces stress", "Improves flexibility", "Calms the mind", "Strengthens the body"]
  },
  {
    id: "progressive-relaxation",
    title: "Progressive Muscle Relaxation",
    description: "A technique where you tense and relax each muscle group in sequence.",
    icon: "Activity",
    difficulty: "medium",
    steps: [
      { instruction: "Sit or lie in a comfortable position", duration: 30 },
      { instruction: "Tense your feet muscles for 5 seconds, then release", duration: 30 },
      { instruction: "Move upward: tense and relax legs, abdomen, arms, shoulders", duration: 240 },
      { instruction: "Focus on the feeling of relaxation spreading", duration: 120 },
      { instruction: "Finish by taking slow, deep breaths", duration: 60 }
    ],
    benefits: ["Relieves stress", "Increases body awareness", "Reduces muscle tension", "Improves relaxation"]
  },
  {
    id: "tai-chi",
    title: "Tai Chi Flow",
    description: "A slow, flowing movement practice that combines balance and breathing.",
    icon: "Infinity",
    difficulty: "hard",
    steps: [
      { instruction: "Stand with feet shoulder-width apart, knees slightly bent", duration: 30 },
      { instruction: "Move arms slowly in circular motions, synchronized with breath", duration: 120 },
      { instruction: "Shift weight gently from one foot to the other", duration: 120 },
      { instruction: "Focus on balance, flow, and calm breathing", duration: 180 },
      { instruction: "Continue the slow sequence for 5 minutes", duration: 300 }
    ],
    benefits: ["Improves balance", "Reduces anxiety", "Enhances body control", "Promotes mindfulness"]
  }
];
