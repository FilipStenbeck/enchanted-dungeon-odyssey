import { Character } from "@/types/character";
import { CharacterClass } from "@/types/character";
import { CharacterClass as CharacterClassEnum } from "@/enums/characterClass";


export function generateCharacter() { 
    return randomizeClass(); 
}

const randomizeClass = () => {
  const classes: CharacterClassEnum[] = [CharacterClassEnum.wizard, CharacterClassEnum.fighter, CharacterClassEnum.thief];
  const me: CharacterClassEnum = classes[Math.floor(Math.random() * classes.length)];
  
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
    case CharacterClassEnum.wizard:
      return 50;
    case  CharacterClassEnum.fighter:
      return 100;
    case CharacterClassEnum.thief:
      return 75;
  }
}

const getAttack = (me) => {
  switch (me) {
    case CharacterClassEnum.wizard:
      return 12;
    case  CharacterClassEnum.fighter:
      return 10;
    case CharacterClassEnum.thief:
      return 7;
  }
}

const getDefence = (me) => {
  switch (me) {
    case CharacterClassEnum.wizard:
      return 10;
    case  CharacterClassEnum.fighter:
      return 15;
    case CharacterClassEnum.thief:
      return 12;
  }
}

const getWeapon = (me) => {
  switch (me) {
    case CharacterClassEnum.wizard:
      return 'Staff';
    case  CharacterClassEnum.fighter:
      return 'Short Sword';
    case  CharacterClassEnum.thief:
      return 'Dagger';
  }
}

const getArmor = (me) => { 
  switch (me) {
    case CharacterClassEnum.wizard:
      return 'Robes';
    case  CharacterClassEnum.fighter:
      return 'Chainmail';
    case  CharacterClassEnum.thief:
      return 'Leather armor';
  } 
}

const getSpecialAction = (me) => {
  switch (me) {
    case CharacterClassEnum.wizard:
      return 'Fireball: Deal 20 damage to all enemies';
    case  CharacterClassEnum.fighter:
      return 'Power Attack: Deal double damage on your next attack';
    case  CharacterClassEnum.thief:
      return 'Sneak: Automatically escape from combat';
  }
}
