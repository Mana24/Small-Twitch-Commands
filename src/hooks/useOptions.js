import { useEffect, useState } from "preact/hooks";
import { storageSet, storageGetOptionsOrDefault, log } from "../utils.js";

export const useOptions = () => {
   const [optionsLoading, setOptionsLoading] = useState(true);
   const [options, setOptions] = useState(null);
   const [unmodifiedOptions, setUnmodifiedOptions] = useState(null);

   // RETRIEVE OPTIONS
   useEffect(async () => {
      const retrivedOptions = await storageGetOptionsOrDefault();
      // const retrivedOptions = defaultOptions; // For testing only
      log(retrivedOptions);
      setOptions(retrivedOptions);
      setUnmodifiedOptions(retrivedOptions);
      setOptionsLoading(false);
   }, []);

   // ON OPTIONS UPDATE
   useEffect(async () => {
      if (options === null) {
         //console.log("options unretrieved");
         return;
      }
      await storageSet(options);
   }, [options]);

   const addItem = (key, itemContent) => {
      setOptions((options) => {
         const optionsCopy = { ...options };
         optionsCopy[key] = [...optionsCopy[key],
         { content: itemContent, id: self.crypto.randomUUID() }
         ]
         return optionsCopy;
      })
   }

   const removeItem = (key, itemId) => {
      setOptions((options) => {
         const optionsCopy = { ...options };
         optionsCopy[key] = options[key].filter(item => item.id !== itemId);
         return optionsCopy;
      })
   }

   const restoreOptions = () => setOptions(unmodifiedOptions);

   return {
      options,
      unmodifiedOptions,
      optionsLoading,
      addItem,
      removeItem,
      restoreOptions
   };
}