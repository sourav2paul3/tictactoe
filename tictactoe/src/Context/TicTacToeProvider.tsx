import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

interface TicTacToeContextProps {
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
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  switchMode: (mode: string) => void;
  triggerComputerMove: () => void;
}

const TicTacToeContext = createContext<TicTacToeContextProps | undefined>(
  undefined
);

export const TicTacToeProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<(string | null)[][]>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [mode, setMode] = useState<string>("comp");

  const makeMove = useCallback(
    (row: number, col: number) => {
      if (gameOver || board[row][col]) return;

      const newBoard = board.map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? currentPlayer : c)) : r
      );
      setBoard(newBoard);

      if (checkWin(row, col, newBoard)) {
        setGameOver(true);
        setWinner(currentPlayer);
        currentPlayer === "X"
          ? setXScore((prev) => prev + 1)
          : setOScore((prev) => prev + 1);
      } else if (newBoard.flat().every((cell) => cell !== null)) {
        setGameOver(true);
        setWinner("Draw");
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
      console.log("make move");
      console.log(board);
    },
    [board, gameOver, currentPlayer]
  );

  const triggerComputerMove = () => {
    console.log("Trigger computer move");
    console.log(board);
    const possibleMoves: [number, number][] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          possibleMoves.push([i, j]);
        }
      }
    }

    console.log("Possible moves:", possibleMoves);
    for (const [i, j] of possibleMoves) {
      const tempBoard = board.map((row) => [...row]);
      tempBoard[i][j] = "O";
      if (checkWin(i, j, tempBoard)) {
        console.log("Computer wins by moving at", i, j);
        handleMove(tempBoard, "O", i, j);
        return;
      }
    }

    for (const [i, j] of possibleMoves) {
      const tempBoard = board.map((row) => [...row]);
      tempBoard[i][j] = "X";
      if (checkWin(i, j, tempBoard)) {
        console.log("Blocking player X's win at", i, j);
        handleMove(tempBoard, "O", i, j);
        return;
      }
    }
    const [x, y] =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    console.log("Making random move at", x, y);
    const tempBoard = board.map((row) => [...row]);
    handleMove(tempBoard, "O", x, y);
  };

  useEffect(() => {
    if (mode === "comp" && currentPlayer === "O" && !gameOver) {
      // setTimeout(() => {
      triggerComputerMove();
      // });
    }
  }, [board, currentPlayer, mode, gameOver, triggerComputerMove]);

  const handleMove = (
    newBoard: (string | null)[][],
    player: string,
    row: number,
    col: number
  ) => {
    newBoard[row][col] = player;
    setBoard([...newBoard]); // Make sure to set the board immutably

    if (checkWin(row, col, newBoard)) {
      setGameOver(true);
      setWinner(player);
      player === "O"
        ? setOScore((prev) => prev + 1)
        : setXScore((prev) => prev + 1);
    } else if (newBoard.flat().every((cell) => cell !== null)) {
      setGameOver(true);
      setWinner("Draw");
    } else {
      setCurrentPlayer(player === "X" ? "O" : "X");
    }
  };

  const switchMode = (mode: string) => {
    resetGame();
    setXScore(0);
    setOScore(0);
    setMode(mode);
  };

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
      const pos = (i * size) / gridSize;
      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(size, pos);
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, size);
      ctx.stroke();
    }

    board.forEach((row, rIdx) =>
      row.forEach((cell, cIdx) => {
        if (cell === "X") drawX(ctx, cIdx, rIdx, size / gridSize);
        if (cell === "O") drawO(ctx, cIdx, rIdx, size / gridSize);
      })
    );
  };

  const drawX = (
    ctx: CanvasRenderingContext2D,
    col: number,
    row: number,
    cellSize: number
  ) => {
    const padding = 25;
    const x1 = col * cellSize + padding,
      y1 = row * cellSize + padding;
    const x2 = (col + 1) * cellSize - padding,
      y2 = (row + 1) * cellSize - padding;

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
    const centerX = col * cellSize + cellSize / 2,
      centerY = row * cellSize + cellSize / 2;
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

  const checkWin = (
    row: number,
    col: number,
    newBoard: (string | null)[][]
  ): boolean => {
    const player = newBoard[row][col];

    return (
      newBoard[row].every((cell) => cell === player) || // Check row
      newBoard.every((r) => r[col] === player) || // Check column
      (row === col && newBoard.every((r, i) => r[i] === player)) || // Check diagonal 1
      (row + col === 2 && newBoard.every((r, i) => r[2 - i] === player)) // Check diagonal 2
    );
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
        mode,
        setMode,
        switchMode,
        triggerComputerMove,
      }}
    >
      {children}
    </TicTacToeContext.Provider>
  );
};

export const useTicTacToe = (): TicTacToeContextProps => {
  const context = useContext(TicTacToeContext);
  if (!context) {
    throw new Error("useTicTacToe must be used within a TicTacToeProvider");
  }
  return context;
};
