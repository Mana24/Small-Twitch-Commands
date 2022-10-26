import { useState, useEffect } from "preact/hooks";

export function ListItem({ content, remove }) {
  return (
    <li class="list-item">
      <p class="list-item-content">{content}</p>
      <button class="list-item-remove" onClick={remove}>
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
    e.preventDefault();
    if (addInput.trim()) {
      addItem(addInput.trim().toLowerCase());
      setAddInput('');
    }
  };

  return (
    <div class="list-container" id="smallUsers">
      <h2 class="list-title">{title}</h2>
      <p class="list-description">{description}</p>
      <ul class="list">
        {items.map((item) => (
          <ListItem
            content={item.content}
            remove={() => removeItem(item.id)}
            key={item.id}
          />
        ))}
      </ul>
      <form class="list-controls" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={inputPlaceholder}
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
