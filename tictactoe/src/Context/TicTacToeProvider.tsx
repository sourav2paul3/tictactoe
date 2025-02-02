import { createContext, useContext, useState, ReactNode } from "react";

type TicTacToeContextProps = {
  board: (string | null)[][];
  currentPlayer: string;
  makeMove: (row: number, col: number) => void;
};

const TicTacToeContext = createContext<TicTacToeContextProps | undefined>(
  undefined
);

export const TicTacToeProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const makeMove = (row: number, col: number) => {
    if (!board[row][col]) {
      const newBoard = board.map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? currentPlayer : c)) : r
      );
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  return (
    <TicTacToeContext.Provider value={{ board, currentPlayer, makeMove }}>
      {children}
    </TicTacToeContext.Provider>
  );
};

export const useTicTacToe = () => {
  const context = useContext(TicTacToeContext);
  if (!context) {
    throw new Error("useTicTacToe must be used within a TicTacToeProvider");
  }
  return context;
};
