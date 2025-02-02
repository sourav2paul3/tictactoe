import { ImExit } from "react-icons/im";
import { RiResetLeftFill } from "react-icons/ri";
import { useTicTacToe } from "../Context/TicTacToeProvider";
import { FaUser } from "react-icons/fa";
import { HiComputerDesktop } from "react-icons/hi2";

const Navbar = () => {
  const { resetGame, xScore, oScore, mode, setMode } = useTicTacToe();

  const handleReset = () => {
    resetGame();
  };

  const handleExit = () => {
    window.location.href = "https://sourav2paul3.github.io/Games/";
  };

  return (
    <div className="text-sm font-bold max-w-[450px] m-auto mt-[2px]">
      <div className="flex items-center justify-center gap-10 p-5 border-b border-gray-400">
        <div className="flex gap-1">
          X Player: <span>{xScore}</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div
            className={`flex items-center gap-2 cursor-pointer p-2 rounded-md ${
              mode === "comp" ? "bg-gray-800 text-white" : "bg-transparent"
            }`}
            onClick={() => setMode("comp")}
          >
            <FaUser size={15} /> vs <HiComputerDesktop size={15} />
          </div>
          <span className="border-b border-gray-400"></span>
          <div
            className={`flex items-center gap-2 cursor-pointer p-2 rounded-md ${
              mode === "user" ? "bg-gray-800 text-white" : "bg-transparent"
            }`}
            onClick={() => setMode("user")}
          >
            <FaUser size={15} /> vs <FaUser size={15} />
          </div>
        </div>
        <div className="flex gap-1">
          O Player: <span>{oScore}</span>
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
