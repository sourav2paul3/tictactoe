import "./App.css";
import Navbar from "./components/Navbar";
import TictactoeBoard from "./components/TictactoeBoard";
import { TicTacToeProvider } from "./Context/TicTacToeProvider";
function App() {
  return (
    <div>
      <TicTacToeProvider>
        <Navbar />
        <TictactoeBoard />
      </TicTacToeProvider>
    </div>
  );
}

export default App;
