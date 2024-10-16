import { Player } from "../App";
import { CardState } from "../components/GameBoard";

export default function calculateWinner(
  cards: CardState[]
): "cross" | "circle" | null {
  const winningCombinations = [
    [0, 1, 2], // верхній рядок
    [3, 4, 5], // середній рядок
    [6, 7, 8], // нижній рядок
    [0, 3, 6], // ліва колонка
    [1, 4, 7], // середня колонка
    [2, 5, 8], // права колонка
    [0, 4, 8], // діагональ зліва направо
    [2, 4, 6], // діагональ справа налів
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cards[a].symbol &&
      cards[a].symbol === cards[a].symbol &&
      cards[b].symbol === cards[a].symbol &&
      cards[c].symbol
    ) {
      return cards[a].symbol;
    }
  }
  return null;
}
