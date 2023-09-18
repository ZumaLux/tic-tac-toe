import React, { useEffect, useState } from "react";

const TacButton = ({ button, addToBoard, isDisabled }) => {
  const { cell, value } = button;
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(false);
  }, [isDisabled]);

  return (
    <button
      className="w-12 h-12 bg-red-400 m-1"
      onClick={() => {
        addToBoard(cell);
        setClicked(true);
      }}
      disabled={isDisabled || clicked ? true : false}
    >
      {value}
    </button>
  );
};

export default TacButton;
