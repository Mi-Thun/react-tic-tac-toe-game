import { useState } from "react";

export default function Player({ initialPlayerName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialPlayerName);

  function handleEdit() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleSave(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = (
    <span className="player-playerName">{playerName}</span>
  );

  if (isEditing) {
    editablePlayerName = (
      <input type="text" value={playerName} required onChange={handleSave} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
