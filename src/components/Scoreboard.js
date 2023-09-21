import React from "react";

const Scoreboard = ({ scoreboard, winner }) => {
  return (
    <div className="m-5">
      <h1 className="text-center underline font-bold">Scoreboard</h1>
      <div className="flex w-fit justify-between ">
        {scoreboard.map((player) => (
          <div key={player.id + player.name} className="text-center ml-8 mr-8">
            <h3 className={winner?.name === player.name ? "text-green-500 font-bold" : ""}>
              {player.name}
            </h3>
            {player?.score}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
