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
  const players = useRef({
    PLAYER_ONE: { name: "Player 1", score: 0, prefix: "X", picks: [] },
    PLAYER_TWO: { name: "Player 2", score: 0, prefix: "O", picks: [] },
  });
  const boardSize = useRef({ rows: 0, columns: 0 });
  const playsFirst = useRef(players.current.PLAYER_ONE);

  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(playsFirst.current);
  const [gameOverState, setGameOverState] = useState(false);
  const [scoreboard, setScoreboard] = useState({ scoreP1: 0, scoreP2: 0 });
  const [winner, setWinner] = useState(null);

  const createInitialBoard = (_rows, _columns) => {
    boardSize.current = { rows: _rows, columns: _columns };
    setBoard(generateEmptyBoard(_rows, _columns));
  };

  const resetBoard = () => {
    players.current.PLAYER_ONE.picks = [];
    players.current.PLAYER_TWO.picks = [];
    setCurrentPlayer(playsFirst.current);
    setGameOverState(false);
    setWinner(null);
    setBoard(generateEmptyBoard(boardSize.current.rows, boardSize.current.columns));
  };

  const addToBoard = (cell) => {
    setBoard(
      board.map((row) => {
        const pressedButton = row.find((btn) => btn.cell === cell);
        if (pressedButton && pressedButton.value === "") pressedButton.value = currentPlayer.prefix;
        return row;
      })
    );
    if (currentPlayer === players.current.PLAYER_ONE) {
      players.current.PLAYER_ONE.picks.push(cell);
    } else {
      players.current.PLAYER_TWO.picks.push(cell);
    }
    endTurn();
  };

  function endTurn() {
    console.log(winCondition());
    if (winCondition() || fieldsAvailable()) {
      gameOver();
    } else switchPlayers();
  }

  function switchPlayers() {
    if (currentPlayer === players.current.PLAYER_ONE) {
      setCurrentPlayer(players.current.PLAYER_TWO);
    } else {
      setCurrentPlayer(players.current.PLAYER_ONE);
    }
  }

  function winCondition() {
    let haveWinner = false;
    winCases.forEach((wc) => {
      if (wc.every((i) => currentPlayer.picks.includes(i))) {
        if (currentPlayer === players.current.PLAYER_ONE) {
          players.current.PLAYER_ONE.score = players.current.PLAYER_ONE.score + 1;
          setWinner(currentPlayer);
          setScoreboard({ ...scoreboard, scoreP1: scoreboard.scoreP1 + 1 });
        } else {
          players.current.PLAYER_TWO.score = players.current.PLAYER_TWO.score + 1;
          setScoreboard({ ...scoreboard, scoreP2: scoreboard.scoreP2 + 1 });
          setWinner(currentPlayer);
        }
        haveWinner = true;
      }
    });
    return haveWinner;
  }

  function fieldsAvailable() {
    const emptyFields = [];
    board.map((row) => {
      const empty = row.find((field) => field.value === "");
      if (empty) emptyFields.push(empty);
    });
    if (emptyFields.length) return false;
    else return true;
  }

  function gameOver() {
    console.log("gameOver");
    setGameOverState(true);
    if (playsFirst.current === players.current.PLAYER_ONE) {
      playsFirst.current = players.current.PLAYER_TWO;
    } else {
      playsFirst.current = players.current.PLAYER_ONE;
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
