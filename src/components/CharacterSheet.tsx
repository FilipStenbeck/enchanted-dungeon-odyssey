import React from 'react';
import { Character } from '../types/character';
import { Shield, Sword, Heart, Backpack, Wand, Coins } from 'lucide-react';

interface CharacterSheetProps {
  character: Character;
}

const CharacterSheet = ({ character }: CharacterSheetProps) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white w-64 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">
        Character Sheet
      </h2>

      <div className="space-y-2">
        <div className="text-xl font-semibold text-center capitalize mb-4">
          {character.class}
        </div>

        <div className="flex items-center gap-2">
          <Heart className="text-red-500" size={20} />
          <div>Health: {character.health}/{character.maxHealth}</div>
        </div>

        <div className="flex items-center gap-2">
          <Sword className="text-gray-300" size={20} />
          <div>Attack: {character.attack}</div>
        </div>

        <div className="flex items-center gap-2">
          <Shield className="text-gray-300" size={20} />
          <div>Defence: {character.defence}</div>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-600">
        <div>
          <div className="text-gray-400 mb-1">Weapon</div>
          <div className="pl-2">{character.weapon}</div>
        </div>

        <div>
          <div className="text-gray-400 mb-1">Armor</div>
          <div className="pl-2">{character.armor}</div>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-600">
        <div className="flex items-center gap-2">
          <Backpack className="text-gray-300" size={20} />
          <div className="text-gray-400">Inventory</div>
        </div>
        <ul className="pl-4 space-y-1">
          {character.inventory.map((item, index) => (
            <li key={index} className="text-sm">{item}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-600">
        <div className="flex items-center gap-2">
          <Coins className="text-gray-300" size={20} />
          <div className="text-gray-400">Gold</div>
        </div>
        <ul className="pl-4 space-y-1">
          {character.gold}
        </ul>
      </div>

      <div className="pt-4 border-t border-gray-600">
        <div className="flex items-center gap-2 mb-2">
          <Wand className="text-purple-400" size={20} />
          <div className="text-gray-400">Special Action</div>
        </div>
        <div className="pl-2 text-sm">{character.specialAction}</div>
      </div>
    </div>
  );
};

export default CharacterSheet;