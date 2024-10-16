import { Circle, XIcon } from "lucide-react";

export interface CardProps {
  symbol: "cross" | "circle" | null;
  onPlayerChange: () => void;
}

export default function Card({ symbol, onPlayerChange }: CardProps) {
  return (
    <div
      onClick={() => onPlayerChange()}
      className=" flex justify-center items-center w-40 h-40 bg-purple-800 rounded-2xl cursor-pointer"
    >
      {symbol === "cross" && <XIcon className="size-32" color="red" />}
      {symbol === "circle" && <Circle className="size-32" color="orange" />}
    </div>
  );
}
