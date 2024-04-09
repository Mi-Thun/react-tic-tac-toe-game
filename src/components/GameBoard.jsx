import { useState } from "react";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectUser, activePlayerSymbol }) {
  const [board, setBoard] = useState(initialBoard);

  function handleCellClick(rowIndex, cellIndex) {
    setBoard((previousBoard) => {
      const updatedBoard = [
        ...previousBoard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[rowIndex][cellIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    onSelectUser();
  }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, cellIndex) => (
              <li key={cellIndex}>
                <button onClick={() => handleCellClick(rowIndex, cellIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
