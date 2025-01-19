import { useState, useEffect } from "react";
import { generateDungeon } from "../utils/dungeonGenerator";
import { Dungeon, Room } from "../types/game";
import { useToast } from "@/components/ui/use-toast";
import RoomEncounter from "@/components/RoomEncounter";
import { Encounter } from "@/types/encounters";
import CharacterSheet from "@/components/CharacterSheet";
import { Character } from "@/types/character";

const generateEncounter = (room: Room): Encounter => {
  switch (room.type) {
    case 'monster':
      return {
        type: 'monster',
        title: "Monster Encounter!",
        description: "A fearsome creature blocks your path!",
        options: [
          {
            label: "Fight",
            action: () => console.log("Fighting monster...")
          },
          {
            label: "Run",
            action: () => console.log("Running away...")
          }
        ]
      };
    case 'treasure':
      return {
        type: 'treasure',
        title: "Treasure Found!",
        description: "You've discovered a treasure chest!",
        options: [
          {
            label: "Open",
            action: () => console.log("Opening chest...")
          },
          {
            label: "Leave",
            action: () => console.log("Leaving treasure...")
          }
        ]
      };
    case 'shop':
      return {
        type: 'shop',
        title: "Merchant's Shop",
        description: "A mysterious merchant offers their wares.",
        options: [
          {
            label: "Browse",
            action: () => console.log("Browsing shop...")
          },
          {
            label: "Leave",
            action: () => console.log("Leaving shop...")
          }
        ]
      };
    case 'boss':
      return {
        type: 'boss',
        title: "Boss Battle!",
        description: "A powerful enemy awaits...",
        options: [
          {
            label: "Fight",
            action: () => console.log("Fighting boss...")
          },
          {
            label: "Retreat",
            action: () => console.log("Retreating...")
          }
        ]
      };
    default:
      return {
        type: 'empty',
        title: "Empty Room",
        description: "This room appears to be empty.",
        options: [
          {
            label: "Continue",
            action: () => console.log("Continuing...")
          }
        ]
      };
  }
};

const Index = () => {
  const [dungeon, setDungeon] = useState<Dungeon | null>(null);
  const [currentEncounter, setCurrentEncounter] = useState<Encounter | null>(null);
  const { toast } = useToast();

  // Initialize character state
  const [character] = useState<Character>({
    class: 'fighter',
    health: 100,
    maxHealth: 100,
    attack: 15,
    defence: 10,
    weapon: 'Long Sword',
    armor: 'Chain Mail',
    inventory: ['Health Potion', 'Torch', 'Rope'],
    specialAction: 'Power Attack: Deal double damage on your next attack'
  });

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
            description: "Prepare for what awaits...",
          });
          setCurrentEncounter(generateEncounter(newRoom));
        }
        setDungeon({
          ...dungeon,
          currentRoom: newRoomId,
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
      
      <div className="flex justify-center gap-8">
        <div>
          <div className="mb-4 text-center">
            <p>Use WASD or arrow keys to move</p>
            <p className="text-gray-400">Current Room: {dungeon.currentRoom}</p>
          </div>
          
          <div 
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${dungeon.size.width}, minmax(0, 1fr))`,
            }}
          >
            {dungeon.rooms.map((room) => (
              <div
                key={room.id}
                className={`w-16 h-16 border-2 ${
                  room.id === dungeon.currentRoom
                    ? "border-yellow-400"
                    : "border-gray-600"
                } relative`}
              >
                <div className={`
                  w-full h-full flex items-center justify-center
                  ${room.visited ? `
                    ${room.type === 'monster' ? 'bg-red-900' : ''}
                    ${room.type === 'treasure' ? 'bg-yellow-900' : ''}
                    ${room.type === 'shop' ? 'bg-blue-900' : ''}
                    ${room.type === 'boss' ? 'bg-purple-900' : ''}
                    ${room.type === 'empty' ? 'bg-gray-800' : ''}
                  ` : 'bg-gray-700'}
                  opacity-100
                `}>
                  {room.visited ? room.type.charAt(0).toUpperCase() : '?'}
                </div>

                {room.connections.north && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-gray-600" />
                )}
                {room.connections.south && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-gray-600" />
                )}
                {room.connections.east && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-600" />
                )}
                {room.connections.west && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-600" />
                )}
              </div>
            ))}
          </div>
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
