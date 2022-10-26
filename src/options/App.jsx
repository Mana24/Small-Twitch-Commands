import { defaultOptions, storageGet, storageSet } from "../utils.js";
import { useState, useEffect } from "preact/hooks";
import List from "./List.jsx";
import { useOptions } from "../hooks/useOptions.js";

export default function App() {
  const { options, optionsLoading, addItem, removeItem, restoreOptions } =
    useOptions();

  return (
    <div className="main-options">
      <h1 class="title">Small Twitch Commands Options</h1>
      {optionsLoading ? (
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
                It's meant for commands that you don't want to miss (e.g. !lurk
                going to work. Thanks for the stream)
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
      )}
      <div class="main-controls">
        <button id="restore" onClick={restoreOptions}>
          Restore
        </button>
        {/* <button id="debug">Debug</button>
        <button id="clear">Clear</button> */}
      </div>
    </div>
  );
}
