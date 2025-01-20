import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GameOverProps {
  isOpen: boolean;
  score: number;
  onRestart: () => void;
}

const GameOver = ({ isOpen, score, onRestart }: GameOverProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-red-500">Game Over</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <p className="text-lg">Your final score: {score}</p>
          <Button onClick={onRestart} className="w-full">Start New Game</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameOver;