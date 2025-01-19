import { Character } from "@/types/character";
import { CharacterClass } from "@/types/character";

export function generateCharacter() { 
    return <Character> {
        class: randomizeClass(),
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



const randomizeClass = () => {
  const classes = ['wizard', 'fighter', 'thief'];
  return classes[Math.floor(Math.random() * classes.length)];
}