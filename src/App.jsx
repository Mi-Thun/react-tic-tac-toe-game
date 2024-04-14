import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { Log } from "./components/Log";
import { winingCombinations } from "./wining-combinations.js";
import { GameOver } from "./GameOver.jsx";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameLog) {
  let currentPlayer = "X";
  if (gameLog.length > 0 && gameLog[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameLog) {
  let gameBoard = [...initialBoard.map((row) => [...row])];

  for (const turn of gameLog) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, player) {
  let winner;
  for (const combination of winingCombinations) {
    const [first, second, third] = combination;
    const firstPlayer = gameBoard[first.row][first.col];
    const secondPlayer = gameBoard[second.row][second.col];
    const thirdPlayer = gameBoard[third.row][third.col];
    if (
      firstPlayer !== null &&
      firstPlayer === secondPlayer &&
      firstPlayer === thirdPlayer
    ) {
      winner = player[firstPlayer];
    }
  }
  return winner;
}

function App() {
  const [gameLog, setGameLog] = useState([]);
  const [player, setPlayer] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const activePlayer = deriveActivePlayer(gameLog);
  const gameBoard = deriveGameBoard(gameLog);
  const winner = deriveWinner(gameBoard, player);
  const hasDraw = gameLog.length === 9 && !winner;

  function handleSelectSquare(rowIndex, cellIndex) {
    setGameLog((previousGameLog) => {
      const currentPlayer = deriveActivePlayer(previousGameLog);

      const updatedTurns = [
        { square: { row: rowIndex, col: cellIndex }, player: currentPlayer },
        ...previousGameLog,
      ];
      return updatedTurns;
    });
  }

  function resetGame() {
    setGameLog([]);
  }

  function handleEditPlayerName(symbol, playerName) {
    setPlayer((previousPlayer) => {
      return {
        ...previousPlayer,
        [symbol]: playerName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialPlayerName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            handleEditPlayerName={handleEditPlayerName}
          />
          <Player
            initialPlayerName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            handleEditPlayerName={handleEditPlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onReset={resetGame} />
        )}
        <GameBoard onSelectUser={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log gameLog={gameLog} />
    </main>
  );
}

export default App;
