import { useRef, useEffect } from "react";
import { useTicTacToe } from "../Context/TicTacToeProvider";

const TictactoeBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { board, makeMove } = useTicTacToe();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const size = 300;
        canvas.width = size;
        canvas.height = size;

        const gridSize = 3;
        const lineWidth = 4;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "#000";

        drawBoard(ctx, size, gridSize);
      }
    }
  }, [board]);

  const drawBoard = (
    ctx: CanvasRenderingContext2D,
    size: number,
    gridSize: number
  ) => {
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

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const cellSize = canvas.width / 3;

      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);

      makeMove(row, col);
    }
  };

  return (
    <div className="flex items-center justify-center h-[450px]">
      <canvas
        ref={canvasRef}
        className="h-[250px] w-[250px]"
        onClick={handleClick}
      ></canvas>
    </div>
  );
};

export default TictactoeBoard;
