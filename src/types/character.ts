export type CharacterClass = 'wizard' | 'fighter' | 'thief';

export interface Character {
  class: CharacterClass;
  health: number;
  maxHealth: number;
  attack: number;
  defence: number;
  weapon: string;
  armor: string;
  inventory: string[];
  specialAction: string;
}