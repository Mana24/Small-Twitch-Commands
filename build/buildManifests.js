const fs = require('fs');
const path = require('path');

const manifestV3 = JSON.parse(fs.readFileSync(path.join(__dirname, '../manifest.json')));
const optionsPage = manifestV3.options_page;
const manifestV2 = {
   ...manifestV3, manifest_version: 2, "browser_specific_settings": {
      "gecko": {
         "id": "smalltwitchcommands@mana24.com",
      }
   }
};
delete manifestV2.options_page;
manifestV2.options_ui = { "page": optionsPage, "open_in_tab": true };

// Export the different manifest files
fs.writeFileSync(path.join(__dirname, '../manifest.v3.json'), JSON.stringify(manifestV3));
fs.writeFileSync(path.join(__dirname, '../manifest.v2.json'), JSON.stringify(manifestV2));