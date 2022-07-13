function log(msg) {
  console.log("SC: ", msg);
}

/**
 * Determins wether a message is a command or not
 * @param {String} text
 * @returns {Boolean}
 */
function isCommand(text) {
  return text && text.trim().startsWith("!");
}

log("Started");

/**
 * @param {Node} node
 */
processNewMessageNode = (node) => {
  //  log("New chat message");
  // log(node.querySelector('.message')?.textContent)
  if (isCommand(node.querySelector(".message")?.firstChild?.textContent)) {
    log("chat command detected");
    node.classList.add("SC-command");
  }
};

/**
 * @param {[MutationRecord]} records
 */
const onObserve = (records) => {
  //   log(records.length);
  //   records.forEach(record => record.addedNodes?.forEach((node) => log(node.classList?.contains('chat-line__message'))))
  records.forEach((record) => {
    record.addedNodes?.forEach((node) => {
      if (node.classList?.contains("chat-line__message") || node.classList?.contains("vod-message")) {
        processNewMessageNode(node);
      }
    });
  });
};

const observer = new MutationObserver(onObserve);

window.addEventListener("load", () => {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
  });
  log("Observer started");
});
