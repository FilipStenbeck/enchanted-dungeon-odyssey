import { Room } from "@/types/game";
import { Encounter } from "@/types/encounters";
import { generateMonster } from "@/utils/monsterGenerator";

export const generateEncounter = (room: Room, onRunAway: () => void, onFightwon: () => void): Encounter => {
  switch (room.type) {
    case 'monster': {
      const monster = generateMonster();
      return {
        type: 'monster',
        title: `${monster.name} Appears!`,
        description: monster.description,
        monster: monster,
        options: [
          {
            label: "Fight",
            action: onFightwon
          },
          {
            label: "Run",
            action: onRunAway
          }
        ]
      };
    }
    case 'treasure':
      return {
        type: 'treasure',
        title: "Treasure Found!",
        description: "You've discovered a treasure chest!",
        options: [
          {
            label: "Open",
            action: () => console.log("Opening chest...")
          },
          {
            label: "Leave",
            action: () => console.log("Leaving treasure...")
          }
        ]
      };
    case 'shop':
      return {
        type: 'shop',
        title: "Merchant's Shop",
        description: "A mysterious merchant offers their wares.",
        options: [
          {
            label: "Browse",
            action: () => console.log("Browsing shop...")
          },
          {
            label: "Leave",
            action: () => console.log("Leaving shop...")
          }
        ]
      };
    case 'boss':
      return {
        type: 'boss',
        title: "Boss Battle!",
        description: "A powerful enemy awaits...",
        options: [
          {
            label: "Fight",
            action: () => console.log("Fighting boss...")
          },
          {
            label: "Retreat",
            action: () => console.log("Retreating...")
          }
        ]
      };
    default:
      return {
        type: 'empty',
        title: "Empty Room",
        description: "This room appears to be empty.",
        options: [
          {
            label: "Continue",
            action: () => console.log("Continuing...")
          }
        ]
      };
  }
};