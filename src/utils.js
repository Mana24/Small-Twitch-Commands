
export function storageGet(keys) {
   return new Promise((resolve, reject) => {
      chrome.storage.sync.get(keys, resolve);
   })
}

export async function storageGetSingle(key) {
   return (await storageGet(key))[key];
}

export function storageSet(keyValuePair) {
   return new Promise((resolve, reject) => {
      chrome.storage.sync.set(keyValuePair, resolve)
   })
}

export function storageClear() {
   return new Promise((resolve, reject) => {
      chrome.storage.sync.clear(resolve);
   })
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
   ]
}