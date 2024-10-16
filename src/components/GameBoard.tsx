import { useState } from "react";
import { Player } from "../App";
import Card from "./Card";
import { Circle, XIcon } from "lucide-react";
import calculateWinner from "../helpers/calculateWinner";

export interface GameBoardProps {
  isGameActive: boolean;
  addUsedCards: () => void;
  setWinner: (symbol: "cross" | "circle" | null) => void;
}
export interface CardState {
  symbol: "cross" | "circle" | null;
}

export default function GameBoard({
  isGameActive,
  addUsedCards,
  setWinner,
}: GameBoardProps) {
  const [activePlayer, setActivePlayer] = useState<Player>({
    symbol: "cross",
  });
  const [cards, setCards] = useState<CardState[]>(
    Array.from({ length: 9 }, () => ({ symbol: null }))
  );

  const handleChangePlayer = (index: number) => {
    if (cards[index].symbol) return;
    const updateCards = cards.map((card, i) =>
      i === index ? { symbol: activePlayer.symbol } : card
    );

    setCards(updateCards);

    addUsedCards();

    const potentialWWinner = calculateWinner(updateCards);
    if (potentialWWinner) {
      setWinner(potentialWWinner);
    } else {
      setActivePlayer((prevPlayer) => ({
        symbol: prevPlayer.symbol === "cross" ? "circle" : "cross",
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <span className="flex text-2xl gap-6">
        {activePlayer.symbol === "circle" ? (
          <Circle className="size-10" />
        ) : (
          <XIcon className="size-10" />
        )}
        player turn
      </span>
      <div className="w-[500px] h-[500px] flex justify-center items-center">
        {isGameActive && (
          <div className="grid grid-cols-3 grid-rows-3 gap-2">
            {cards.map((card, index) => (
              <Card
                symbol={card.symbol}
                onPlayerChange={() => handleChangePlayer(index)}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
