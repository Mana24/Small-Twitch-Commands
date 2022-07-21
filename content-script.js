function log(msg) {
  console.log("STC: ", msg);
}

let SmallifyUsersList = [];
let exemptCommandsList = [];

function storageGet(keys) {
  return new Promise((resolve, reject) => {
     chrome.storage.sync.get(keys, resolve);
  })
}

/**
 * Determins wether a string is a command or not
 * @param {String} text
 * @returns {Boolean}
 */
function isCommand(text) {
  return text && text.trim().startsWith("!");
}

/**
 * 
 * @param {String} text 
 * @param {Array} exemptCommands
 * @returns {Boolean} 
 */
function isExemptCommand(text, exemptCommands) {
  const firstWord = text.split(' ')[0].trim().toLowerCase();
  // log(firstWord);
  return exemptCommands.includes(firstWord);
}

/**
 * @param {Node} node
 * @param {Array} smallUsers
 * @returns {Boolean}
 */
function isSmallifiedUserList(node, smallUsers) {
  const userNameNode = node.querySelector(".chat-author__display-name");
  if (!userNameNode) return false;

  const userName = userNameNode.textContent.trim().toLowerCase();
  
  return smallUsers.includes(userName);
}

log("Started");

/**
 * @param {Node} node
 */
processNewMessageNode = (node) => {
  //  log("New chat message");
  // log(node.querySelector('.message')?.textContent)
  // log(node.attributes)
  if (isSmallifiedUserList(node, SmallifyUsersList)) {
    log("Always small user detected");
    node.classList.add("SC-small");
    return;
  }

  const messageContent = node.querySelector(".message")?.firstChild?.textContent;

  if (isCommand(messageContent)) {
    log("chat command detected");
    if (isExemptCommand(messageContent, exemptCommandsList)) {
      log ("it's an exempt command");
      return;
    }
    node.classList.add("SC-small");
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
      // log(node.querySelector('.vod-message'));
      if (!node.querySelector) return;
      // This looks really ugly. I am sorry.
      // If querySelector-ing a node could catch itself this would look
      // way more elegant
      let messageNode =
        node.querySelector(".vod-message") ||
        (node.classList?.contains("chat-line__message") ? node : undefined);
      if (messageNode) processNewMessageNode(messageNode);
    });
  });
};

const observer = new MutationObserver(onObserve);

window.addEventListener("load", async () => {
  const options = await storageGet();

  SmallifyUsersList = options.smallUsers?.map(item => item.content) || [];
  exemptCommandsList = options.exemptCommands?.map(item => item.content) || [];

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
  });
  log("Observer started");
});
