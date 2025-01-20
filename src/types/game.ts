export type RoomType = 'monster' | 'treasure' | 'shop' | 'empty' | 'boss';

export interface Room {
  id: string;
  type: RoomType;
  visited: boolean;
  description: string;
  x: number;
  y: number;
  connections: {
    north: boolean;
    south: boolean;
    east: boolean;
    west: boolean;
  };
}

export interface Dungeon {
  rooms: Room[];
  currentRoom: string;
  currentRoomDescription: string;
  level: number;
  size: {
    width: number;
    height: number;
  };
}