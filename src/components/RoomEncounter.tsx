import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Encounter } from "@/types/encounters";

interface RoomEncounterProps {
  encounter: Encounter | null;
  onClose: () => void;
  isOpen: boolean;
}

const RoomEncounter = ({ encounter, onClose, isOpen }: RoomEncounterProps) => {
  if (!encounter) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{encounter.title}</DialogTitle>
          <DialogDescription>{encounter.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-4">
          {encounter.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => {
                option.action();
                onClose();
              }}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomEncounter;