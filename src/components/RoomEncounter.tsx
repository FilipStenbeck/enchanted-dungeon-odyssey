import { Button } from "@/components/ui/button";
import { Encounter } from "@/types/encounters";

interface RoomEncounterProps {
  encounter: Encounter | null;
  onClose: () => void;
  isOpen: boolean;
}

const RoomEncounter = ({ encounter, onClose, isOpen }: RoomEncounterProps) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700 mb-4 min-h-[200px]">
      {encounter && isOpen ? (
        <>
          <h2 className="text-xl font-bold mb-2">{encounter.title}</h2>
          <p className="text-gray-300 mb-4">{encounter.description}</p>
          <div className="flex flex-col gap-2">
            {encounter.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => {
                  option.action();
                  onClose();
                }}
                variant="secondary"
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
  );
};

export default RoomEncounter;