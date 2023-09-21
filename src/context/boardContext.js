import { createContext, useContext, useRef, useState } from "react";
import generateEmptyBoard from "../functions/generateEmptyBoard";

const BoardContext = createContext(null);

const winCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function BoardContextProvider({ children }) {
  // REFS
  const players = useRef([
    { id: 0, name: "Player 1", score: 0, prefix: "X", picks: [] },
    { id: 1, name: "Player 2", score: 0, prefix: "O", picks: [] },
  ]);
  const boardSize = useRef({ rows: 0, columns: 0 });
  const playsFirst = useRef(players.current[0]);

  // STATES
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(playsFirst.current);
  const [gameOverState, setGameOverState] = useState(false);
  const [scoreboard, setScoreboard] = useState(generateScoreboard());
  const [winner, setWinner] = useState(null);

  // Initial Board
  const createInitialBoard = (_rows, _columns) => {
    boardSize.current = { rows: _rows, columns: _columns };
    setBoard(generateEmptyBoard(_rows, _columns));
  };

  // Generate Scoreboard
  function generateScoreboard() {
    return players.current.map((player) => ({
      playerId: player.id,
      score: player.score,
      name: player.name,
    }));
  }

  // Reset
  const resetBoard = () => {
    players.current.forEach((player) => {
      player.picks = [];
    });
    setCurrentPlayer(playsFirst.current);
    setGameOverState((prev) => {
      if (prev === false) return null;
      else return false;
    });
    setWinner(null);
    setBoard(generateEmptyBoard(boardSize.current.rows, boardSize.current.columns));
  };

  // On player click
  const addToBoard = (cell) => {
    setBoard(
      board.map((row) => {
        const pressedButton = row.find((btn) => btn.cell === cell);
        // eslint-disable-next-line
        if (pressedButton?.value == false) pressedButton.value = currentPlayer.prefix;
        return row;
      })
    );
    players.current[currentPlayer.id].picks.push(cell);
    setCurrentPlayer({ ...currentPlayer, picks: players.current[currentPlayer.id].picks });
    endTurn();
  };

  // On turn end
  function endTurn() {
    if (winCondition() || fieldsAvailable()) {
      gameOver();
    } else switchPlayers();
  }

  // Switch players
  function switchPlayers() {
    if (currentPlayer.id < players.current.length - 1) {
      setCurrentPlayer(players.current[currentPlayer.id + 1]);
    } else {
      setCurrentPlayer(players.current[0]);
    }
  }

  // Checks for winner
  function winCondition() {
    let haveWinner = false;
    winCases.forEach((wc) => {
      if (wc.every((i) => currentPlayer.picks.includes(i))) {
        const currentScoreIndex = scoreboard.findIndex((i) => i.playerId === currentPlayer.id);
        const updatedScore = {
          ...scoreboard[currentScoreIndex],
          score: scoreboard[currentScoreIndex].score + 1,
        };
        const newScoreboard = [...scoreboard];
        newScoreboard[currentScoreIndex] = updatedScore;
        setScoreboard(newScoreboard);

        setWinner(currentPlayer);
        players.current[currentPlayer.id].score += 1;
        haveWinner = true;
      }
    });
    return haveWinner;
  }

  // Checks if the board is full
  function fieldsAvailable() {
    const emptyFields = [];
    board.forEach((row) => {
      const empty = row.find((field) => field.value === "");
      if (empty) emptyFields.push(empty);
    });
    if (emptyFields.length) return false;
    else return true;
  }

  // On game over
  function gameOver() {
    setGameOverState(true);
    if (playsFirst.current.id < players.current.length - 1) {
      playsFirst.current = players.current[playsFirst.current.id + 1];
    } else {
      playsFirst.current = players.current[0];
    }
  }

  return (
    <BoardContext.Provider
      value={{
        board,
        createInitialBoard,
        resetBoard,
        addToBoard,
        currentPlayer,
        gameOverState,
        scoreboard,
        winner,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoardContext = () => useContext(BoardContext);
