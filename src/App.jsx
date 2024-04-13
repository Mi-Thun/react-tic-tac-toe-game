import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { Log } from "./components/Log";

function deriveActivePlayer(gameLog) {
  let currentPlayer = "X";
  if (gameLog.length > 0 && gameLog[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameLog, setGameLog] = useState([]);

  const activePlayer = deriveActivePlayer(gameLog);

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialPlayerName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialPlayerName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard onSelectUser={handleSelectSquare} turns={gameLog} />
      </div>
      <Log gameLog={gameLog} />
    </main>
  );
}

export default App;
