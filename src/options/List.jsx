import { useState, useEffect } from "preact/hooks";
import { log } from "../utils.js";

export function ListItem({ content, remove }) {
  return (
    <li className="list-item">
      <p className="list-item-content">{content}</p>
      <button className="list-item-remove" onClick={remove}>
        X
      </button>
    </li>
  );
}

export default function List({
  title,
  description,
  inputPlaceholder,
  items,
  addItem,
  removeItem,
}) {
  const [addInput, setAddInput] = useState("");

  const handleChange = (e) => setAddInput(e.target.value);

  const handleSubmit = (e) => {
    if (addInput.trim()) {
      addItem(addInput.trim().toLowerCase());
      setAddInput("");
    }
    e.preventDefault();
  };

  return (
    <div className="list-container" id="smallUsers">
      <div className="list-info-container">
        <h2 className="list-title">{title}</h2>
        <p className="list-description">{description}</p>
      </div>
      <ul className="list">
        {items.map((item) => (
          <ListItem
            content={item.content}
            remove={() => removeItem(item.id)}
            key={item.id}
          />
        ))}
      </ul>
      <form className="list-controls" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={inputPlaceholder}
          onInput={handleChange}
          value={addInput}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
