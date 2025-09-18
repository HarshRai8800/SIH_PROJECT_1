import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mindExercisesData } from "@/data/mindExercisesData";

// Using the imported mind exercises data from the central data file

export default function MindExercisePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Load completed exercises from localStorage
    const startedExercises = JSON.parse(localStorage.getItem("startedExercises") || "{}");
    const completed: Record<string, boolean> = {};
    
    Object.keys(startedExercises).forEach(id => {
      if (startedExercises[id].completed) {
        completed[id] = true;
      }
    });
    
    setCompletedExercises(completed);
  }, []);

  const handleExerciseSelect = (exerciseId: string) => {
    navigate(`/exercises/mind-exercise/${exerciseId}`);
    window.scrollTo(0, 0);
  };

  const filteredExercises = mindExercisesData.filter(exercise => {
    if (activeTab === "completed") {
      return completedExercises[exercise.id];
    } else if (activeTab === "incomplete") {
      return !completedExercises[exercise.id];
    } else {
      return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#f1f8e9]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Brain className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-3xl font-bold text-foreground">Mind Exercises</h1>
        </div>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          These exercises are designed to help improve mental well-being and reduce symptoms of depression and anxiety. 
          Regular practice can help build resilience and develop healthier thought patterns.
        </p>
        
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Exercises</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="incomplete">Not Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredExercises.map((exercise) => (
                <Card 
                  key={exercise.id}
                  className={`cursor-pointer hover:shadow-lg transition-shadow border border-border/50 ${
                    completedExercises[exercise.id] 
                      ? "bg-gradient-to-br from-[#e0f7fa] to-[#c8e6c9]" 
                      : "bg-gradient-to-br from-[#d0f0fd] via-[#e0f7fa] to-[#dcedc8]"
                  }`}
                  onClick={() => handleExerciseSelect(exercise.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <Brain className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-semibold text-lg">{exercise.title}</h3>
                      </div>
                      {completedExercises[exercise.id] && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {exercise.description}
                    </p>
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{exercise.steps ? `${exercise.steps.length} steps` : 'Duration not specified'}</span>
                      <span className={`font-medium ${
                        exercise.difficulty === "easy" ? "text-green-500" :
                        exercise.difficulty === "medium" ? "text-yellow-500" : "text-red-500"
                      }`}>
                        {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}