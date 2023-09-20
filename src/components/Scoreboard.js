import React from "react";

const Scoreboard = ({ scoreboard, winner }) => {
  return (
    <div className="m-5">
      <h1 className="text-center underline font-bold">Scoreboard</h1>
      <div className="flex w-56 justify-between ">
        <div className="text-center">
          <h3 className={winner?.name === "Player 1" ? "text-green-500 font-bold" : ""}>
            Player 1
          </h3>
          {scoreboard[0]?.score}
        </div>
        <div className="text-center">
          <h3 className={winner?.name === "Player 2" ? "text-green-500 font-bold" : ""}>
            Player 2
          </h3>
          {scoreboard[1]?.score}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
