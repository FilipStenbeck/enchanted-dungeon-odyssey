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
    attack: getAttack(me),
    defence: getDefence(me),
    weapon: getWeapon(me),
    armor: getArmor(me),
    inventory: ['Health Potion', 'Torch', 'Rope'],
    specialAction: getSpecialAction(me),
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

const getAttack = (me) => {
  switch (me) {
    case 'wizard':
      return 12;
    case  'fighter':
      return 10;
    case 'thief':
      return 7;
  }
}

const getDefence = (me) => {
  switch (me) {
    case 'wizard':
      return 10;
    case  'fighter':
      return 15;
    case 'thief':
      return 12;
  }
}

const getWeapon = (me) => {
  switch (me) {
    case 'wizard':
      return 'Staff';
    case  'fighter':
      return 'Short Sword';
    case 'thief':
      return 'Dagger';
  }
}

const getArmor = (me) => { 
  switch (me) {
    case 'wizard':
      return 'Robes';
    case  'fighter':
      return 'Chainmail';
    case 'thief':
      return 'Leather armor';
  } 
}

const getSpecialAction = (me) => {
  switch (me) {
    case 'wizard':
      return 'Fireball: Deal 20 damage to all enemies';
    case  'fighter':
      return 'Power Attack: Deal double damage on your next attack';
    case 'thief':
      return 'Sneak: Automatically escape from combat';
  }
}
