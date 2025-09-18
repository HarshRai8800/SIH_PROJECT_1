import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import PhysicalExercise from "@/components/PhysicalExercise/PhysicalExercise";
import { Button } from "@/components/ui/button";
import { ArrowLeft, StretchHorizontal } from "lucide-react";
import { physicalExercisesData } from "@/data/physicalExerciseData";

export default function PhysicalExerciseDetail() {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the exercise by ID
    const foundExercise = physicalExercisesData.find(ex => ex.id === exerciseId);
    
    if (foundExercise) {
      setExercise(foundExercise);
    }
    setLoading(false);
  }, [exerciseId]);

  const handleBackToList = () => {
    navigate("/exercises/physical-exercise");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#f1f8e9]">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center">
          <p className="text-lg">Loading exercise...</p>
        </div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#f1f8e9]">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center"
            onClick={handleBackToList}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to exercises
          </Button>
          
          <div className="flex flex-col items-center justify-center py-12">
            <StretchHorizontal className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Exercise Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Sorry, we couldn't find the exercise you're looking for.
            </p>
            <Button onClick={handleBackToList}>
              Return to Breathing Exercises
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#f1f8e9]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center"
          onClick={handleBackToList}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to exercises
        </Button>
        
        <PhysicalExercise {...exercise} />
      </div>
    </div>
  );
}