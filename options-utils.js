
function storageGet(keys) {
   return new Promise((resolve, reject) => {
      chrome.storage.sync.get(keys, resolve);
   })
}

async function storageGetSingle(key) {
   return (await storageGet(key))[key];
}

function storageSet(keyValuePair) {
   return new Promise((resolve, reject) => {
      chrome.storage.sync.set(keyValuePair, resolve)
   })
}

function storageClear() {
   return new Promise ((resolve, reject) => {
      chrome.storage.sync.clear(resolve);
   })
}