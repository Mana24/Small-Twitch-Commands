import { useEffect, useState } from "preact/hooks";
import List from "./List.jsx";
import { useOptions } from "../hooks/useOptions.js";
import { defaultOptions } from "../utils.js";
import githubLogo from '../../assets/iconmonstr-github-1.svg'

export default function App() {
  const [scaleInputValue, setScaleInputValue] = useState(null);
  const {
    options,
    optionsLoading,
    addItem,
    removeItem,
    restoreOptions,
    setScale,
  } = useOptions((options) => setScaleInputValue(options.scale));


  
  // setScale updates chrome storage which has a rate limit.
  // That's why handleChange and handleInput are split up
  // There's probably a better way to name them and a better way to handle this
  // using a debounce function. But I can't be arsed to figure that out right now.
  const handleChange = (e) => setScale(e.target.value);
  const handleInput = (e) => setScaleInputValue(e.target.value);
  // This makes the restore button update the ScaleInputValue as well
  useEffect(() => options && setScaleInputValue(options.scale), [options]);
  
  return (
    <div className="main-options">
      <h1 className="title">Small Twitch Commands Options</h1>
      {optionsLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div class="lists">
            <List
              items={options.smallUsers}
              title={"Always Small Users"}
              description={
                <>
                  Users in this list will have all their messages smallified.
                  <br />
                  It's meant for bots with repeating messages (e.g. NightBot,
                  StreamElements)
                </>
              }
              inputPlaceholder={"Example: NightBot"}
              addItem={(content) => {
                addItem("smallUsers", content);
              }}
              removeItem={(itemId) => {
                removeItem("smallUsers", itemId);
              }}
            />
            <List
              items={options.exemptCommands}
              title={"Exempt Commands"}
              description={
                <>
                  Commands in this list will never be smallified.
                  <br />
                  It's meant for commands that you don't want to miss (e.g.
                  !lurk going to work. Thanks for the stream)
                </>
              }
              inputPlaceholder={"Example: !lurk"}
              addItem={(content) => {
                addItem("exemptCommands", content);
              }}
              removeItem={(itemId) => {
                removeItem("exemptCommands", itemId);
              }}
            />
          </div>
          <div>
            <h2>Additional Options</h2>
            <div className="scale-option">
              <h3>Font scale</h3>
              <p>
                The value to scale the font by for commands and smallified
                users. Default: {defaultOptions.scale}
              </p>
              <div className="option-controls">
                <label htmlFor="fontScale">Font scale:</label>
                <input
                  id="fontScale"
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.05"
                  value={scaleInputValue}
                  onInput={handleInput}
                  onChange={handleChange}
                />
                <span>{scaleInputValue}</span>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="main-controls">
        <button id="restore" onClick={restoreOptions}>
          Restore
        </button>
        {/* <button id="debug">Debug</button>
        <button id="clear">Clear</button> */}
      </div>
      <a
        className="repo-link"
        href="https://github.com/Mana24/Small-Twitch-Commands"
      >
        <img className="github-icon" src={githubLogo}></img>
        <p>Github</p>
      </a>
    </div>
  );
}
