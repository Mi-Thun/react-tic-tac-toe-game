export function Log({ gameLog }) {
  return (
    <div id="log">
      <h2>Game Log</h2>
      <ol>
        {gameLog.map((turn, index) => (
          <li key={index}>
            {turn.player} selected {turn.square.row},{turn.square.col}
          </li>
        ))}
      </ol>
    </div>
  );
}
