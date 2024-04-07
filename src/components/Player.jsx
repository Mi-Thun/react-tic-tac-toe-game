import { useState } from "react";

export default function Player({ initialPlayerName, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialPlayerName);

  function handleEdit() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleSave(event) {
    setPlayerName(event.target.value);
  }

  let fieldbutton = "Edit";
  let fieldname = <span className="player-playerName">{playerName}</span>;
  let fieldsymbol = <span className="player-symbol">{symbol}</span>;
  if (isEditing) {
    fieldname = (
      <input
        type="text"
        defaultValue={playerName}
        required
        onChange={handleSave}
      />
    );
    fieldbutton = "Save";
  }

  return (
    <li>
      <span className="player">
        {fieldname}
        {fieldsymbol}
      </span>
      <button onClick={handleEdit}>{fieldbutton}</button>
    </li>
  );
}
