import { useState, useEffect } from "react";
import { generateDungeon } from "../utils/dungeonGenerator";
import { Dungeon, Room } from "../types/game";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [dungeon, setDungeon] = useState<Dungeon | null>(null);
  const { toast } = useToast();

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
      
      <div className="grid place-items-center">
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
              {/* Room content */}
              <div className={`
                w-full h-full flex items-center justify-center
                ${room.type === 'monster' ? 'bg-red-900' : ''}
                ${room.type === 'treasure' ? 'bg-yellow-900' : ''}
                ${room.type === 'shop' ? 'bg-blue-900' : ''}
                ${room.type === 'boss' ? 'bg-purple-900' : ''}
                ${room.type === 'empty' ? 'bg-gray-800' : ''}
                ${room.visited ? 'opacity-100' : 'opacity-50'}
              `}>
                {room.type.charAt(0).toUpperCase()}
              </div>

              {/* Room connections */}
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
    </div>
  );
};

export default Index;