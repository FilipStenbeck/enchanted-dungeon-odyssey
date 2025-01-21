import { Button } from "@/components/ui/button";
import { Encounter } from "@/types/encounters";
import { useState } from "react";
import FightDialog from "./FightDialog";

interface RoomEncounterProps {
  encounter: Encounter | null;
  onClose: () => void;
  isOpen: boolean;
}

const RoomEncounter = ({ encounter, onClose, isOpen }: RoomEncounterProps) => {
  const [showFightDialog, setShowFightDialog] = useState(false);

  const handleFightClick = () => {
    if (encounter?.type === 'monster' && encounter.monster) {
      setShowFightDialog(true);
    }
  };

  return (
    <>
      <div className="relative bg-gray-800 p-6 mb-4 min-h-[200px] 
        before:absolute before:inset-0 before:bg-gray-900/50 before:blur-sm before:-z-10
        border-t-4 border-l-4 border-r-4 border-b-4 border-gray-700/50
        shadow-[inset_0_2px_20px_rgba(0,0,0,0.4)]">
        {encounter && isOpen ? (
          <>
            <h2 className="text-xl font-bold mb-2 text-amber-100">{encounter.title}</h2>
            <p className="text-gray-300 mb-4 drop-shadow-lg">{encounter.description}</p>
            <div className="flex flex-col gap-2">
              {encounter.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    if (option.label === "Fight") {
                      handleFightClick();
                    } else {
                      option.action();
                      onClose();
                    }
                  }}
                  variant="secondary"
                  className="text-gray-300 bg-gray-700 hover:bg-gray-600 border border-gray-600 shadow-md"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Exploring the dungeon...
          </div>
        )}
      </div>

      {encounter?.type === 'monster' && encounter.monster && (
        <FightDialog
          monster={encounter.monster}
          isOpen={showFightDialog}
          onClose={() => setShowFightDialog(false)}
          onRunAway={() => {
            setShowFightDialog(false);
            encounter.options.find(opt => opt.label === "Run")?.action();
            onClose();
          }}
        />
      )}
    </>
  );
};

export default RoomEncounter;