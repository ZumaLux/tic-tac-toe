import React from "react";
import TacButton from "./TacButton";
import { useBoardContext } from "../context/boardContext";

const TacBoard = () => {
  const { board, addToBoard, gameOverState } = useBoardContext();
  console.log("rerender board");

  return (
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
  );
};

export default TacBoard;
