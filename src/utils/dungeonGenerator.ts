import { Room, Dungeon, RoomType } from '../types/game';

const ROOM_TYPES: RoomType[] = ['monster', 'treasure', 'shop', 'empty', 'boss'];

function generateRandomRoomType(): RoomType {
  const weights = {
    monster: 0.4,
    treasure: 0.2,
    shop: 0.1,
    empty: 0.25,
    boss: 0.05,
  };

  const random = Math.random();
  let sum = 0;
  for (const [type, weight] of Object.entries(weights)) {
    sum += weight;
    if (random <= sum) {
      return type as RoomType;
    }
  }
  return 'empty';
}

export function generateDungeon(width: number = 5, height: number = 5): Dungeon {
  const rooms: Room[] = [];
  
  // Create rooms
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const room: Room = {
        id: `${x}-${y}`,
        type: generateRandomRoomType(),
        visited: false,
        x,
        y,
        connections: {
          north: false,
          south: false,
          east: false,
          west: false,
        },
      };
      rooms.push(room);
    }
  }

  // Connect rooms
  rooms.forEach((room) => {
    const { x, y } = room;
    
    // Connect to east
    if (x < width - 1 && Math.random() > 0.3) {
      room.connections.east = true;
      const eastRoom = rooms.find(r => r.x === x + 1 && r.y === y);
      if (eastRoom) eastRoom.connections.west = true;
    }
    
    // Connect to south
    if (y < height - 1 && Math.random() > 0.3) {
      room.connections.south = true;
      const southRoom = rooms.find(r => r.x === x && r.y === y + 1);
      if (southRoom) southRoom.connections.north = true;
    }
  });

  // Ensure all rooms are accessible using DFS
  const visited = new Set<string>();
  const startRoom = rooms[0];
  
  function dfs(room: Room) {
    visited.add(room.id);
    const { x, y } = room;
    
    // Check all adjacent rooms
    if (room.connections.north) {
      const northRoom = rooms.find(r => r.x === x && r.y === y - 1);
      if (northRoom && !visited.has(northRoom.id)) dfs(northRoom);
    }
    if (room.connections.south) {
      const southRoom = rooms.find(r => r.x === x && r.y === y + 1);
      if (southRoom && !visited.has(southRoom.id)) dfs(southRoom);
    }
    if (room.connections.east) {
      const eastRoom = rooms.find(r => r.x === x + 1 && r.y === y);
      if (eastRoom && !visited.has(eastRoom.id)) dfs(eastRoom);
    }
    if (room.connections.west) {
      const westRoom = rooms.find(r => r.x === x - 1 && r.y === y);
      if (westRoom && !visited.has(westRoom.id)) dfs(westRoom);
    }
  }

  dfs(startRoom);

  // Connect unvisited rooms
  rooms.forEach((room) => {
    if (!visited.has(room.id)) {
      const { x, y } = room;
      const adjacentRooms = rooms.filter(r => 
        (Math.abs(r.x - x) === 1 && r.y === y) || 
        (Math.abs(r.y - y) === 1 && r.x === x)
      );
      
      const connectedRoom = adjacentRooms.find(r => visited.has(r.id));
      if (connectedRoom) {
        if (connectedRoom.x === x + 1) {
          room.connections.east = true;
          connectedRoom.connections.west = true;
        } else if (connectedRoom.x === x - 1) {
          room.connections.west = true;
          connectedRoom.connections.east = true;
        } else if (connectedRoom.y === y + 1) {
          room.connections.south = true;
          connectedRoom.connections.north = true;
        } else if (connectedRoom.y === y - 1) {
          room.connections.north = true;
          connectedRoom.connections.south = true;
        }
      }
    }
  });

  return {
    rooms,
    currentRoom: '0-0',
    level: 1,
    size: { width, height }
  };
}