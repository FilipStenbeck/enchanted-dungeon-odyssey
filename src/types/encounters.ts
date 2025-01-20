import { Monster } from "./monsters";

export type EncounterType = 'monster' | 'treasure' | 'shop' | 'boss' | 'empty';

export interface Encounter {
  type: EncounterType;
  title: string;
  description: string;
  options: EncounterOption[];
  monster?: Monster; // Add monster property for monster encounters
}

export interface EncounterOption {
  label: string;
  action: () => void;
}