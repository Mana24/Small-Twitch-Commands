export const browser = chrome;

export function storageGet(keys) {
   return new Promise((resolve, reject) => {
      browser.storage.sync.get(keys, resolve);
   })
}

export async function storageGetSingle(key) {
   return (await storageGet(key))[key];
}

export function storageSet(keyValuePair) {
   log('updating storage');
   return new Promise((resolve, reject) => {
      browser.storage.sync.set(keyValuePair, resolve)
   })
}

export function storageClear() {
   return new Promise((resolve, reject) => {
      browser.storage.sync.clear(resolve);
   })
}

export function log(msg) {
   console.log("STC: ", msg);
}

/**
 * Determins wether a string is a command or not
 * @param {String} text
 * @returns {Boolean}
 */
export function isCommand(text) {
   return text && text.trim().startsWith("!");
}

export const defaultOptions = {
   exemptCommands: [
      { content: "!lurk", id: self.crypto.randomUUID() }
   ],
   smallUsers: [
      { content: "nightbot", id: self.crypto.randomUUID() },
      { content: "boggitbot", id: self.crypto.randomUUID() },
      { content: "streamelements", id: self.crypto.randomUUID() },
      { content: "fossabot", id: self.crypto.randomUUID() },
   ],
   scale: '0.8'
}

export async function storageGetOptionsOrDefault() {
   const retrivedOptions = await storageGet(null);
   if (!retrivedOptions || Object.keys(retrivedOptions).length === 0) {
      log('Empty options, using default');
      return defaultOptions;
   }
   return retrivedOptions;
}