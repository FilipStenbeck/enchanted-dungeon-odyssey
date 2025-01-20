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
import { log } from "console";

const Index = () => {
  const [dungeon, setDungeon] = useState<Dungeon | null>(null);
  const [currentEncounter, setCurrentEncounter] = useState<Encounter | null>(null);
  const { toast } = useToast();
  const [character] = useState<Character>(generateCharacter());

  useEffect(() => {
    const newDungeon = generateDungeon(5, 5);
    setDungeon(newDungeon);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!dungeon) return;

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
          toast({
            title: `Entered ${newRoom.type} room!`,
            description: newRoom.description,
          });
          
          const handleRunAway = () => {
            toast({
              title: "You ran away!",
              description: "You lost 5 health.",
            });
            character.health -= 5;
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
  }, [dungeon, toast]);

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
    </div>
  );
};

export default Index;