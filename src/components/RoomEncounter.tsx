import { Button } from "@/components/ui/button";
import { Encounter } from "@/types/encounters";

interface RoomEncounterProps {
  encounter: Encounter | null;
  onClose: () => void;
  isOpen: boolean;
}

const RoomEncounter = ({ encounter, onClose, isOpen }: RoomEncounterProps) => {
  if (!encounter || !isOpen) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700 mb-4">
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
    </div>
  );
};

export default RoomEncounter;