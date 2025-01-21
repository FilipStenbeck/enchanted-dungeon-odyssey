import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Monster } from "@/types/monsters";
import { Sword, ArrowLeft, Star, Archive } from "lucide-react";

interface FightDialogProps {
  monster: Monster;
  isOpen: boolean;
  onClose: () => void;
  onRunAway: () => void;
}

const FightDialog = ({ monster, isOpen, onClose, onRunAway }: FightDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-800 border-2 border-gray-700 text-white max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-amber-100">
            Combat with {monster.name}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="my-6 p-4 bg-gray-900/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Monster Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-red-400">Health: {monster.health}</p>
              <p className="text-yellow-400">Attack: {monster.attack}</p>
            </div>
            <div>
              <p className="text-blue-400">Defense: {monster.defense}</p>
              <p className="text-purple-400">XP Value: {monster.experience}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="secondary"
            className="bg-red-900/50 hover:bg-red-800 border border-red-700"
            onClick={() => console.log("Attack!")}
          >
            <Sword className="mr-2" />
            Attack
          </Button>
          <Button 
            variant="secondary"
            className="bg-yellow-900/50 hover:bg-yellow-800 border border-yellow-700"
            onClick={() => console.log("Special ability used!")}
          >
            <Star className="mr-2" />
            Special
          </Button>
          <Button 
            variant="secondary"
            className="bg-blue-900/50 hover:bg-blue-800 border border-blue-700"
            onClick={() => console.log("Opening inventory...")}
          >
            <Archive className="mr-2" />
            Inventory
          </Button>
          <Button 
            variant="secondary"
            className="bg-gray-700 hover:bg-gray-600 border border-gray-600"
            onClick={onRunAway}
          >
            <ArrowLeft className="mr-2" />
            Run Away
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FightDialog;