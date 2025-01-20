import { Room } from "@/types/game";

interface DungeonMapProps {
  rooms: Room[];
  currentRoom: string;
}

const DungeonMap = ({ rooms, currentRoom }: DungeonMapProps) => {
  return (
    <div className="grid gap-1" style={{
      gridTemplateColumns: `repeat(${Math.sqrt(rooms.length)}, minmax(0, 1fr))`,
    }}>
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`w-24 h-24 border-2 ${
            room.id === currentRoom
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
  );
};

export default DungeonMap;