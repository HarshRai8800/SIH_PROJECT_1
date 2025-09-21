import Navbar from "@/components/Navbar/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Brain, Wind, Gamepad2, Smile, MoreHorizontal } from "lucide-react";
import { Link} from "react-router-dom";

const exercisesData = [
    {
        title: "Mind Exercises",
        icon: Brain,
        description:
            "Daily cognitive workouts to enhance focus, memory, and mental agility.",
        link:"/exercises/mind-exercise"
    },
    {
        title: "Breathing Exercises",
        icon: Wind,
        description:
            "Relaxing breathing techniques to reduce stress and improve lung capacity.",
            link:"/exercises/breathing-exercise"
    },
    {
        title: "Physical Exercises",
        icon: Dumbbell,
        description:
            "Simple stretches and movements to keep your body active and energized.",
            link:"/exercises/physical-exercise"
    },
    {
        title: "Brain Games",
        icon: Gamepad2,
        description:
            "Fun puzzles and brain teasers to sharpen problem-solving skills.",
            link:"/exercises/brain-games"
    },
    {
        title: "Fun Games",
        icon: Smile,
        description:
            "Light-hearted activities designed to lift your mood and spark joy.",
            link:"/exercises/fun-games"
    },
    {
        title: "More Coming Soon",
        icon: MoreHorizontal,
        description:
            "Stay tuned for exciting new exercises and wellness activities!",
            link:"/exercises/comming-soon"
    },
];

export default function Exercises() {

    return (
        <div className="min-h-screen mt-8 bg-gradient-to-br from-[#e0f7fa] to-[#f1f8e9]">
            <Navbar />

            <section className="container mx-auto px-4 py-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-foreground">
                    Explore Wellness Activities
                </h1>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
                    Boost your mental and physical health with these curated exercises and activities.
                    Choose any card to learn more and begin your journey to a healthier mind and body.
                </p>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {exercisesData.map(({ title, icon: Icon, description ,link }) => (
                        <Link to={link}>
                            <Card
                            key={title}
                            className="flex flex-col justify-between h-96 hover:scale-105 transition-transform border border-border/50 bg-gradient-to-br from-[#d0f0fd] via-[#e0f7fa] to-[#dcedc8] rounded-2xl shadow-md hover:shadow-xl"
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
                                <Button
                                    variant="default"
                                    className="w-full hover:bg-primary/80 transition-colors"
                                >
                                    Start Exercise
                                </Button>
                            </CardContent>
                        </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}