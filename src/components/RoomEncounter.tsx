import { Button } from "@/components/ui/button";
import { Encounter } from "@/types/encounters";

interface RoomEncounterProps {
  encounter: Encounter | null;
  onClose: () => void;
  isOpen: boolean;
}

const RoomEncounter = ({ encounter, onClose, isOpen }: RoomEncounterProps) => {
  return (
    <div className="relative bg-gray-800 p-6 mb-4 min-h-[200px] 
      [clip-path:polygon(0%_10%,5%_0%,25%_0%,30%_2%,40%_0%,60%_0%,65%_2%,75%_0%,85%_0%,95%_2%,100%_0%,100%_90%,98%_100%,85%_98%,70%_100%,55%_98%,40%_100%,25%_98%,15%_100%,0%_90%)]
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
                  option.action();
                  onClose();
                }}
                variant="secondary"
                className="bg-gray-700 hover:bg-gray-600 border border-gray-600 shadow-md"
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