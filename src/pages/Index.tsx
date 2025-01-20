import { useState, useEffect } from "react";
import { generateDungeon } from "../utils/dungeonGenerator";
import { Dungeon } from "../types/game";
import { useToast } from "@/hooks/use-toast";
import RoomEncounter from "@/components/RoomEncounter";
import { Encounter } from "@/types/encounters";
import CharacterSheet from "@/components/CharacterSheet";
import { Character } from "@/types/character";
import { generateCharacter } from "@/utils/charachterGenerator";
import DungeonMap from "@/components/DungeonMap";
import { generateEncounter } from "@/components/EncounterManager";
import GameOver from "@/components/GameOver";

const Index = () => {
  const [dungeon, setDungeon] = useState<Dungeon | null>(null);
  const [currentEncounter, setCurrentEncounter] = useState<Encounter | null>(null);
  const { toast } = useToast();
  const [character, setCharacter] = useState<Character>(generateCharacter());
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (character.health <= 0 && !isGameOver) {
      setIsGameOver(true);
      toast({
        title: "Game Over!",
        description: "Your health has dropped to 0!",
        variant: "destructive",
      });
    }
  }, [character.health, isGameOver, toast]);

  const startNewGame = () => {
    const newDungeon = generateDungeon(5, 5);
    setDungeon(newDungeon);
    setCharacter(generateCharacter());
    setIsGameOver(false);
    setScore(0);
    setCurrentEncounter(null);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Check if movement should be blocked
      if (!dungeon || isGameOver || currentEncounter !== null) return;

      const currentRoomId = dungeon.currentRoom;
      const currentRoom = dungeon.rooms.find(room => room.id === currentRoomId);
      
      if (!currentRoom) return;
      
      let newRoomId = currentRoomId;
      
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          if (currentRoom.connections.north) {
            newRoomId = `${currentRoom.x}-${currentRoom.y - 1}`;
          }
          break;
        case 's':
        case 'arrowdown':
          if (currentRoom.connections.south) {
            newRoomId = `${currentRoom.x}-${currentRoom.y + 1}`;
          }
          break;
        case 'a':
        case 'arrowleft':
          if (currentRoom.connections.west) {
            newRoomId = `${currentRoom.x - 1}-${currentRoom.y}`;
          }
          break;
        case 'd':
        case 'arrowright':
          if (currentRoom.connections.east) {
            newRoomId = `${currentRoom.x + 1}-${currentRoom.y}`;
          }
          break;
      }

      if (newRoomId !== currentRoomId) {
        const newRoom = dungeon.rooms.find(room => room.id === newRoomId);
        if (newRoom && !newRoom.visited) {
          setScore(prev => prev + 1);
          toast({
            title: `Entered ${newRoom.type} room!`,
            description: newRoom.description,
          });
          
          const handleRunAway = () => {
            toast({
              title: "You ran away!",
              description: "You lost 5 health.",
            });
            setCharacter(prev => ({
              ...prev,
              health: prev.health - 5
            }));
            setDungeon({
              ...dungeon,
              rooms: dungeon.rooms.map(room => 
                room.id === newRoomId ? { ...room, visited: false } : room
              )
            });
          };

          setCurrentEncounter(generateEncounter(newRoom, handleRunAway));
        }
        setDungeon({
          ...dungeon,
          currentRoom: newRoomId,
          currentRoomDescription: newRoom?.description || "",
          rooms: dungeon.rooms.map(room => 
            room.id === newRoomId ? { ...room, visited: true } : room
          )
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dungeon, toast, isGameOver, currentEncounter]);

  if (!dungeon) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Enchanted Dungeon</h1>
      <p className="text-gray-400 mb-8 text-center">{dungeon.currentRoomDescription}</p>
      
      <div className="flex justify-center gap-16">
        <div>
          <div className="mb-4 text-center">
            <p>Use WASD or arrow keys to move</p>
          </div>
          <DungeonMap rooms={dungeon.rooms} currentRoom={dungeon.currentRoom} />
        </div>

        <CharacterSheet character={character} />
      </div>

      <RoomEncounter 
        encounter={currentEncounter}
        isOpen={currentEncounter !== null}
        onClose={() => setCurrentEncounter(null)}
      />

      <GameOver 
        isOpen={isGameOver}
        score={score}
        onRestart={startNewGame}
      />
    </div>
  );
};

export default Index;