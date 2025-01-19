import { Character } from "@/types/character";
import { CharacterClass } from "@/types/character";
import { get } from "http";

export function generateCharacter() { 
    return randomizeClass(); 
}


const randomizeClass = () => {
  const classes = ['wizard', 'fighter', 'thief'];
  const me =  classes[Math.floor(Math.random() * classes.length)];
  return <Character> {
    class: me,
    health: getHealth(me),
    maxHealth: getHealth(me),
    attack: 7,
    defence: 10,
    weapon: 'Short Sword',
    armor: 'Leather armor',
    inventory: ['Health Potion', 'Torch', 'Rope'],
    specialAction: 'Power Attack: Deal double damage on your next attack'
  };
}

const getHealth = (me) => {
  switch (me) {
    case 'wizard':
      return 50;
    case  'fighter':
      return 100;
    case 'thief':
      return 75;
  }
}