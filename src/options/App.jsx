import { defaultOptions, storageGet } from "../utils.js";
import { useState, useEffect } from "preact/hooks";
import List from "./List.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState(null);

  useEffect(async () => {
    // const retrivedOptions = (await storageGet(null)) || defaultOptions;
    const retrivedOptions = defaultOptions; // For testing only
    console.log(retrivedOptions);
    setOptions(retrivedOptions);
    setLoading(false);
  }, []);

  return (
    <div className="main-options">
      <h1 class="title">Small Twitch Commands Options</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div class="lists">
          <List
            items={options.smallUsers}
            title={"Always small users"}
            description={
              <>
                Users in this list will have all their messages smallified.
                <br />
                It's meant for bots with repeating messages (e.g. NightBot,
                StreamElements)
              </>
            }
            inputPlaceholder={"Example: NightBot"}
          />
          <List
            items={options.exemptCommands}
            title={"Exempt Commands"}
            description={
              <>
                Commands in this list will never be smallified.
                <br />
                It's meant for commands that you don't want to miss (e.g. !lurk
                going to work. Thanks for the stream)
              </>
            }
            inputPlaceholder={"Example: !lurk"}
          />
        </div>
      )}
      <div class="main-controls">
        <button id="restore">Restore</button>
        {/* <button id="debug">Debug</button>
        <button id="clear">Clear</button> */}
      </div>
    </div>
  );
}
