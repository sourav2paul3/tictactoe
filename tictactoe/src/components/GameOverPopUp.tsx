import { useTicTacToe } from "../Context/TicTacToeProvider";

const GameOverPopUp = ({ winner }: { winner: string | null }) => {
  const { resetGame } = useTicTacToe();
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="bg-gray-400 bg-opacity-70 backdrop-blur p-8 rounded-lg shadow-lg 
        flex flex-col items-center justify-center"
      >
        <div className="text-xl text-white text-center mb-4">
          {winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`}
        </div>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md max-w-[150px] mt-4"
          onClick={resetGame}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverPopUp;
