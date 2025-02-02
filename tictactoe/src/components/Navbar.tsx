import { ImExit } from "react-icons/im";
import { RiResetLeftFill } from "react-icons/ri";
import { useTicTacToe } from "../Context/TicTacToeProvider";
const Navbar = () => {
  const { resetGame, xScore, oScore, compScore } = useTicTacToe();
  const handleReset = () => {
    resetGame();
  };

  const handleExit = () => {
    window.location.href = "https://sourav2paul3.github.io/Games/";
  };

  return (
    <div className="font-bold max-w-[450px] m-auto mt-10">
      <div
        className="flex items-center justify-between gap-20 p-5 border-b 
          border-gray-400 "
      >
        <div className=" flex gap-2">
          X Player:<span>{xScore}</span>
        </div>
        <div className=" flex gap-2">
          Y Player:<span>{oScore}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-30 mt-4">
        <RiResetLeftFill
          size={25}
          className="cursor-pointer"
          onClick={handleReset}
        />
        <ImExit size={25} className="cursor-pointer" onClick={handleExit} />
      </div>
    </div>
  );
};

export default Navbar;
