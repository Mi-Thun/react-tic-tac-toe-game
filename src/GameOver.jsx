export function GameOver({ winner, onReset }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && (
        <p>
          <strong>{winner}</strong> wins!
        </p>
      )}
      {!winner && <p>It&apos;s a draw!</p>}
      <button onClick={onReset}>Play Again</button>
    </div>
  );
}
