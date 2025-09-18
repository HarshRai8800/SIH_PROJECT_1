import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { funGamesData } from "@/data/funGamesData";
import ReactionTimer from "@/components/FunGames/ReactionTimer";
import MemoryMatch from "@/components/FunGames/MemoryMatch";
import QuickMath from "@/components/FunGames/QuickMath";

export default function FunGameDetail() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the game by ID
    const foundGame = funGamesData.find(g => g.id === gameId);
    
    if (foundGame) {
      setGame(foundGame);
    }
    setLoading(false);
  }, [gameId]);

  const handleBackToList = () => {
    navigate("/exercises/fun-games");
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#f1f8e9]">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Game not found</h2>
          <Button onClick={handleBackToList}>Back to Games</Button>
        </div>
      </div>
    );
  }

  // Render the appropriate game component based on the ID
  const renderGame = () => {
    switch (game.id) {
      case "reaction":
        return <ReactionTimer />;
      case "memory":
        return <MemoryMatch />;
      case "math":
        return <QuickMath />;
      default:
        return <div>Game not available</div>;
    }
  };

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
          Back to games
        </Button>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Gamepad2 className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-2xl font-bold">{game.title}</h1>
          </div>
          <p className="text-muted-foreground">{game.description}</p>
          <p className="mt-2 text-sm font-medium">Instructions: {game.instructions}</p>
        </div>
        
        <div className="max-w-lg mx-auto">
          {renderGame()}
        </div>
      </div>
    </div>
  );
}