import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { funGamesData } from "@/data/funGamesData";

export default function FunGamesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [completedGames, setCompletedGames] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Load completed games from localStorage
    const startedGames = JSON.parse(localStorage.getItem("startedGames") || "{}");
    const completed: Record<string, boolean> = {};
    
    Object.keys(startedGames).forEach(id => {
      if (startedGames[id].completed) {
        completed[id] = true;
      }
    });
    
    setCompletedGames(completed);
  }, []);

  const handleGameSelect = (gameId: string) => {
    navigate(`/exercises/fun-games/${gameId}`);
    window.scrollTo(0, 0);
  };

  const filteredGames = funGamesData.filter(game => {
    if (activeTab === "completed") {
      return completedGames[game.id];
    } else if (activeTab === "incomplete") {
      return !completedGames[game.id];
    } else {
      return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#f1f8e9]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Gamepad2 className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-3xl font-bold text-foreground">Fun Games</h1>
        </div>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Play quick, brain-boosting games to sharpen memory, reflexes, and
          problem-solving skills while having fun.
        </p>
        
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          {/* <TabsList className="mb-4">
            <TabsTrigger value="all">All Games</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="incomplete">Not Completed</TabsTrigger>
          </TabsList> */}
          
          <TabsContent value={activeTab} className="mt-0 ">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGames.map((game) => (
                <Card 
                  key={game.id}
                  className={`cursor-pointer hover:shadow-lg transition-shadow border border/50 ${
                    completedGames[game.id] 
                      ? "bg-gradient-to-br from-[#e0f7fa] to-[#c8e6c9]" 
                      : "bg-gradient-to-br from-[#d0f0fd] via-[#e0f7fa] to-[#dcedc8]"
                  }`}
                  onClick={() => handleGameSelect(game.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <Gamepad2 className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-semibold text-lg">{game.title}</h3>
                      </div>
                      {completedGames[game.id] && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {game.description}
                    </p>
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Interactive Game</span>
                      <span className={`font-medium ${
                        game.difficulty === "easy" ? "text-green-500" :
                        game.difficulty === "medium" ? "text-yellow-500" : "text-red-500"
                      }`}>
                        {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
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