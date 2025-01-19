export type EncounterType = 'monster' | 'treasure' | 'shop' | 'boss' | 'empty';

export interface Encounter {
  type: EncounterType;
  title: string;
  description: string;
  options: EncounterOption[];
}

export interface EncounterOption {
  label: string;
  action: () => void;
}