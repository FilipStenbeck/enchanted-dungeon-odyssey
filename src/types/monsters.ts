export type MonsterSize = 'small' | 'medium' | 'large';

export interface Monster {
  name: string;
  size: MonsterSize;
  health: number;
  attack: number;
  defense: number;
  experience: number;
  description: string;
}