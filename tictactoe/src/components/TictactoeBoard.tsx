import { useRef, useEffect } from "react";
import { useTicTacToe } from "../Context/TicTacToeProvider";

const TictactoeBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { board, makeMove, drawBoard } = useTicTacToe();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const size = 300;
        canvas.width = size;
        canvas.height = size;

        const gridSize = 3;
        drawBoard(ctx, size, gridSize);
      }
    }
  }, [board, drawBoard]);

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
