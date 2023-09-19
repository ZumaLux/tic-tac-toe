import { useBoardContext } from "./context/boardContext";
import { useEffect } from "react";
import Scoreboard from "./components/Scoreboard";
import TacButton from "./components/TacButton";

function App() {
  const boardSize = { rows: 3, columns: 3 };
  const {
    createInitialBoard,
    currentPlayer,
    resetBoard,
    scoreboard,
    winner,
    addToBoard,
    gameOverState,
    board,
  } = useBoardContext();

  useEffect(() => {
    createInitialBoard(boardSize.rows, boardSize.columns);
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <Scoreboard scoreboard={scoreboard} winner={winner} />

      <div className="w-fit text-center">
        <h1>{gameOverState ? "Game Over!" : currentPlayer.name + "'s turn"}</h1>
        <div className="border-4 w-fit p-2 m-3">
          {board.map((row, index) => (
            <div className="flex" key={index}>
              {row.map((btn) => (
                <TacButton
                  key={btn.cell}
                  button={btn}
                  addToBoard={addToBoard}
                  isDisabled={gameOverState}
                />
              ))}
            </div>
          ))}
        </div>
        <button className="bg-gray-400 p-2 m-1" onClick={() => resetBoard()}>
          Restart!
        </button>
      </div>
    </div>
  );
}

export default App;
