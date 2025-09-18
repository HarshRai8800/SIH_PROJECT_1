import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

export interface PhysicalExerciseProps {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: "easy" | "medium" | "hard";
    steps: {
        instruction: string;
        duration?: number;
    }[];
    benefits: string[];
}

export default function PhysicalExercise({
    id,
    title,
    description,
    duration,
    difficulty,
    steps,
    benefits
}: PhysicalExerciseProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    const totalSteps = steps.length;
    const progress = Math.round((currentStep / totalSteps) * 100);

    const handleStart = () => {
        setIsStarted(true);
        setCurrentStep(0);
        setIsCompleted(false);

        // Save to local storage that this exercise has been started
        const startedExercises = JSON.parse(localStorage.getItem("startedExercises") || "{}");
        startedExercises[id] = {
            started: true,
            completed: false,
            currentStep: 0,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem("startedExercises", JSON.stringify(startedExercises));
    };

    const handleNextStep = () => {
        if (currentStep < totalSteps - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);

            // Update progress in local storage
            const startedExercises = JSON.parse(localStorage.getItem("startedExercises") || "{}");
            if (startedExercises[id]) {
                startedExercises[id].currentStep = nextStep;
                localStorage.setItem("startedExercises", JSON.stringify(startedExercises));
            }
        } else {
            setIsCompleted(true);

            // Mark as completed in local storage
            const startedExercises = JSON.parse(localStorage.getItem("startedExercises") || "{}");
            if (startedExercises[id]) {
                startedExercises[id].completed = true;
                startedExercises[id].completedAt = new Date().toISOString();
                localStorage.setItem("startedExercises", JSON.stringify(startedExercises));
            }
        }
    };

    const handleReset = () => {
        setIsStarted(false);
        setCurrentStep(0);
        setIsCompleted(false);
    };

    const getDifficultyColor = () => {
        switch (difficulty) {
            case "easy": return "text-green-500";
            case "medium": return "text-yellow-500";
            case "hard": return "text-red-500";
            default: return "text-green-500";
        }
    };

    return (
        <Card className="w-full max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-shadow border border-border/50 bg-gradient-to-br from-[#d0f0fd] via-[#e0f7fa] to-[#dcedc8] rounded-2xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Dumbbell className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl font-bold">{title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{duration}</span>
                        <span className={`ml-2 text-sm font-medium ${getDifficultyColor()}`}>
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </span>
                    </div>
                </div>
                <CardDescription className="mt-2">{description}</CardDescription>
            </CardHeader>

            <CardContent>
                {!isStarted && !isCompleted && (
                    <div className="space-y-4">
                        <h3 className="font-semibold text-md">Benefits:</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="text-sm text-muted-foreground">{benefit}</li>
                            ))}
                        </ul>
                        <Button
                            onClick={handleStart}
                            className="w-full mt-4 bg-primary hover:bg-primary/90"
                        >
                            Start Exercise
                        </Button>
                    </div>
                )}

                {isStarted && !isCompleted && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{currentStep + 1} of {totalSteps}</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>

                        <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                            <h3 className="font-semibold mb-2">Step {currentStep + 1}:</h3>
                            <p className="text-muted-foreground">{steps[currentStep].instruction}</p>
                        </div>

                        <Button
                            onClick={handleNextStep}
                            className="w-full bg-primary hover:bg-primary/90"
                        >
                            {currentStep < totalSteps - 1 ? "Next Step" : "Complete Exercise"}
                        </Button>
                    </div>
                )}

                {isCompleted && (
                    <div className="space-y-4 text-center">
                        <div className="flex justify-center">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <h3 className="font-bold text-xl">Exercise Completed!</h3>
                        <p className="text-muted-foreground">
                            Great job! You've successfully completed this mind exercise.
                        </p>
                        <div className="flex justify-center gap-2">
                            <Button
                                onClick={handleReset}
                                variant="outline"
                                className="mt-2" >
                                Start Again
                            </Button>
                            <Link to={'/exercises/mind-exercise'} replace={true}>
                                <Button variant="outline" className="mt-2">
                                    Back To Exercises
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex justify-between border-t border-border/30 pt-4">
                {isStarted && !isCompleted && (
                    <Button
                        variant="ghost"
                        onClick={handleReset}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Cancel
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}