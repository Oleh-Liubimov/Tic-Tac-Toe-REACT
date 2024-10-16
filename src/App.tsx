import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import { Space } from "lucide-react";

export type Player = {
  symbol: "cross" | "circle";
};

export default function App() {
  const [gameActive, setGameActive] = useState(false);
  const [usedCards, setUsedCards] = useState<number>(0);
  const [winner, setWinner] = useState<"cross" | "circle" | null>(null);

  const handleAddUsedCard = () => {
    setUsedCards((prevUsedCards) => prevUsedCards + 1);
  };

  const handleSetWinner = (symbol: "cross" | "circle" | null) => {
    setWinner(symbol);
    setGameActive(false);
  };

  const handleStartGame = () => {
    setWinner(null);
    setUsedCards(0);
    setGameActive(true);
  };

  useEffect(() => {
    if (usedCards >= 9) {
      setGameActive(false);
      setUsedCards(0);
    }
  }, [usedCards]);

  return (
    <div className="w-screen h-screen flex items-center justify-center gap-10 flex-col relative bg-gradient-to-br from-blue-600  to-yellow-400 bg-200% animate-gradient-x">
      <h1 className="text-center text-[48px] font-mono fixed top-40 ">
        TIC TAC TOE game
      </h1>
      {winner && (
        <span className="text-6xl text-green-700">
          PLayer {winner} is WIN !
        </span>
      )}
      {gameActive && (
        <GameBoard
          setWinner={handleSetWinner}
          addUsedCards={handleAddUsedCard}
          isGameActive={gameActive}
        />
      )}
      {!gameActive && (
        <button
          onClick={() => handleStartGame()}
          className="px-8 py-6 bg-red-800 text-white text-2xl rounded-3xl hover:bg-red-700"
        >
          {!winner ? "Start game" : "Restart game"}
        </button>
      )}
    </div>
  );
}
