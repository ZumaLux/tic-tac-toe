import TacBoard from "./components/TacBoard";
import { useBoardContext } from "./context/boardContext";
import { useEffect } from "react";
import Scoreboard from "./components/Scoreboard";

function App() {
  const rows = 3;
  const columns = 3;
  const { createInitialBoard, currentPlayer, resetBoard, scoreboard, winner } = useBoardContext();

  useEffect(() => {
    createInitialBoard(rows, columns);
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <Scoreboard scoreboard={scoreboard} winner={winner} />
      <div className="w-fit text-center">
        <h1>{currentPlayer.name}'s turn</h1>
        <TacBoard />
        <button className="bg-gray-400 p-2 m-1" onClick={() => resetBoard()}>
          Restart!
        </button>
      </div>
    </div>
  );
}

export default App;
