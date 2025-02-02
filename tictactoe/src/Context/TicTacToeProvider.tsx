import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type TicTacToeContextProps = {
  board: (string | null)[][];
  currentPlayer: string;
  makeMove: (row: number, col: number) => void;
  drawBoard: (
    ctx: CanvasRenderingContext2D,
    size: number,
    gridSize: number
  ) => void;
  resetGame: () => void;
  gameOver: boolean;
  winner: string | null;
  xScore: number;
  oScore: number;
  compScore: number;
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
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [xScore, setXScore] = useState<number>(0);
  const [oScore, setOScore] = useState<number>(0);
  const [compScore, setCompScore] = useState<number>(0);

  const makeMove = useCallback(
    (row: number, col: number) => {
      if (gameOver || board[row][col]) {
        return;
      }

      // Update the board with the new move
      const newBoard = board.map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? currentPlayer : c)) : r
      );
      setBoard(newBoard);

      // Check for win or draw after the move is made
      if (checkWin(row, col)) {
        setGameOver(true);
        setWinner(currentPlayer);
        if (currentPlayer === "X") {
          setXScore((prev) => prev + 1);
        } else if (currentPlayer === "O") {
          setOScore((prev) => prev + 1);
        }
        console.log("win");
      } else if (newBoard.flat().every((cell) => cell !== null)) {
        setGameOver(true);
        setWinner("Draw");
        console.log("Draw");
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        console.log("Continue");
      }
    },
    [board, gameOver, currentPlayer] // makeMove depends on these states
  );

  const drawBoard = (
    ctx: CanvasRenderingContext2D,
    size: number,
    gridSize: number
  ) => {
    const lineWidth = 4;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#000";

    ctx.clearRect(0, 0, size, size);

    for (let i = 1; i < gridSize; i++) {
      const y = (i * size) / gridSize;
      const x = (i * size) / gridSize;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (board[row][col] === "X") {
          drawX(ctx, col, row, size / gridSize);
        } else if (board[row][col] === "O") {
          drawO(ctx, col, row, size / gridSize);
        }
      }
    }
  };

  const drawX = (
    ctx: CanvasRenderingContext2D,
    col: number,
    row: number,
    cellSize: number
  ) => {
    const padding = 25;
    const x1 = col * cellSize + padding;
    const y1 = row * cellSize + padding;
    const x2 = (col + 1) * cellSize - padding;
    const y2 = (row + 1) * cellSize - padding;

    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.moveTo(x2, y1);
    ctx.lineTo(x1, y2);
    ctx.stroke();
  };

  const drawO = (
    ctx: CanvasRenderingContext2D,
    col: number,
    row: number,
    cellSize: number
  ) => {
    const centerX = col * cellSize + cellSize / 2;
    const centerY = row * cellSize + cellSize / 2;
    const radius = (cellSize - 50) / 2;

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const resetGame = () => {
    setBoard(
      Array(3)
        .fill(null)
        .map(() => Array(3).fill(null))
    );
    setCurrentPlayer("X");
    setGameOver(false);
    setWinner(null);
  };

  const checkWin = (row: number, col: number): boolean => {
    const player = board[row][col];

    if (board[row].every((cell) => cell === player)) return true;

    if (board.every((r) => r[col] === player)) return true;

    if (row === col && board.every((r, i) => r[i] === player)) return true;
    if (row + col === 2 && board.every((r, i) => r[2 - i] === player))
      return true;

    return false;
  };

  return (
    <TicTacToeContext.Provider
      value={{
        board,
        currentPlayer,
        makeMove,
        drawBoard,
        resetGame,
        gameOver,
        winner,
        xScore,
        oScore,
        compScore,
      }}
    >
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
