// GENERATES THE EMPTY TIC_TAC_TOE_BOARD

export default function generateEmptyBoard(rows, columns) {
  const emptyBoard = [];

  let cell = 0;

  for (let x = 1; x <= columns; x++) {
    const boardRow = [];

    for (let y = 1; y <= rows; y++) {
      boardRow.push({ cell: cell, x: x, y: y, value: "" });
      cell++;
    }

    emptyBoard.push(boardRow);
  }
  return emptyBoard;
}
