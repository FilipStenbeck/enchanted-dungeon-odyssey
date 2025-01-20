import { Monster, MonsterSize } from "@/types/monsters";

const monsterTemplates: Monster[] = [
  // Small monsters (common) - 60% chance
  {
    name: "Giant Rat",
    size: "small",
    health: 15,
    attack: 3,
    defense: 2,
    experience: 10,
    description: "A large, aggressive rodent with sharp teeth."
  },
  {
    name: "Giant Spider",
    size: "small",
    health: 12,
    attack: 4,
    defense: 1,
    experience: 15,
    description: "A venomous arachnid that lurks in the shadows."
  },
  {
    name: "Feral Dog",
    size: "small",
    health: 20,
    attack: 4,
    defense: 2,
    experience: 20,
    description: "A rabid dog with matted fur and sharp fangs."
  },
  // Medium monsters (uncommon) - 30% chance
  {
    name: "Skeleton Warrior",
    size: "medium",
    health: 30,
    attack: 6,
    defense: 4,
    experience: 35,
    description: "An animated skeleton wielding rusty weapons."
  },
  {
    name: "Orc Scout",
    size: "medium",
    health: 35,
    attack: 7,
    defense: 5,
    experience: 40,
    description: "A green-skinned humanoid with crude weapons."
  },
  {
    name: "Cave Troll",
    size: "medium",
    health: 40,
    attack: 8,
    defense: 3,
    experience: 45,
    description: "A brutish creature with thick, leathery skin."
  },
  // Large monsters (rare) - 10% chance
  {
    name: "Werewolf",
    size: "large",
    health: 50,
    attack: 10,
    defense: 6,
    experience: 60,
    description: "A fearsome beast that combines human and wolf features."
  },
  {
    name: "Minotaur",
    size: "large",
    health: 60,
    attack: 12,
    defense: 8,
    experience: 75,
    description: "A massive bull-headed humanoid wielding a giant axe."
  },
  {
    name: "Ancient Golem",
    size: "large",
    health: 70,
    attack: 9,
    defense: 12,
    experience: 80,
    description: "A towering construct made of stone and magic."
  }
];

export const generateMonster = (): Monster => {
  // Generate a random number between 0 and 100
  const roll = Math.random() * 100;
  
  // Determine monster size based on probability
  let size: MonsterSize;
  if (roll < 60) {
    size = 'small';
  } else if (roll < 90) {
    size = 'medium';
  } else {
    size = 'large';
  }
  
  // Filter monsters by size
  const possibleMonsters = monsterTemplates.filter(monster => monster.size === size);
  
  // Select a random monster from the filtered list
  const selectedMonster = possibleMonsters[Math.floor(Math.random() * possibleMonsters.length)];
  
  // Return a new instance of the monster (to avoid modifying the template)
  return { ...selectedMonster };
};

// Helper function to get monster by name (useful for specific encounters)
export const getMonsterByName = (name: string): Monster | undefined => {
  const monster = monsterTemplates.find(m => m.name === name);
  return monster ? { ...monster } : undefined;
};