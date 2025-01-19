import { Character } from "@/types/character";

export function generateCharacter() { 
    return <Character> {
        health: 100,
        maxHealth: 100,
        attack: 15,
        defence: 10,
        weapon: 'Long Sword',
        armor: 'Chain Mail',
        inventory: ['Health Potion', 'Torch', 'Rope'],
        specialAction: 'Power Attack: Deal double damage on your next attack'
      };
}