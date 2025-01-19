import { Character } from "@/types/character";

export function generateCharacter() { 
    return <Character> {
        health: 100,
        maxHealth: 100,
        attack: 15,
        defence: 10,
        weapon: 'Short Sword',
        armor: 'Leather armor',
        inventory: ['Health Potion', 'Torch', 'Rope'],
        specialAction: 'Power Attack: Deal double damage on your next attack'
      };
}