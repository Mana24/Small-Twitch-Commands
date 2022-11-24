const fs = require('fs');
const path = require('path');

// Just changing manifest_version from 3 to 2 for now. It could look different in the future
const manifestV3 = JSON.parse(fs.readFileSync(path.join(__dirname, '../manifest.json')));
const optionsPage = manifestV3.options_page;
const manifestV2 = {
   ...manifestV3, manifest_version: 2, "browser_specific_settings": {
      "gecko": {
         "id": "manafakeemail@fakeness.com",
      }
   }
};
delete manifestV2.options_page;
manifestV2.options_ui = { "page": optionsPage, "open_in_tab": true };

// Export the different manifest files
fs.writeFileSync(path.join(__dirname, '../manifest.v3.json'), JSON.stringify(manifestV3));
fs.writeFileSync(path.join(__dirname, '../manifest.v2.json'), JSON.stringify(manifestV2));