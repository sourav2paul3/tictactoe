import { useRef, useEffect } from "react";

const Tictactoe = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const size = 300;
        canvas.width = size;
        canvas.height = size;

        const gridSize = 3;
        const lineWidth = 2;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "#000";

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
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
export default Tictactoe;
