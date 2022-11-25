
# Small Twitch Commands

Small Twitch Commands is an extension for chrome-based browsers and Firefox that makes twitch commands (!gamble, !discord, etc) smaller and less distracting.
It can also make all messages by specified users smaller and less distracting

## Functionailty

* Make twitch commands smaller
* Exempt certain commands from being smallified (e.g. !lurk)
* Smallify messages by specified users
* Works in VOD chat too

## Picture Examples

![options preview](https://imgur.com/JaXsaK2.png)
![live chat preview](https://imgur.com/Du8A5j4.png)
![vod chat preview](https://imgur.com/JND8Xmh.png)

## Download it
* For Firefox: [Firefox Browser Add-ons](https://addons.mozilla.org/en-US/firefox/addon/manas-small-twitch-commands/)
* For Chrome-based browsers: Link coming soon! You can install it anyway using the manual method if you're so inclined.

## Manual Installation
Tested for Chrome and Edge
1. Download the [latest release](https://github.com/Mana24/Small-Twitch-Commands/releases/latest)
2. Unzip small-twitch-commands-\[version\].zip. You should end up with a folder containing the extension
3. Go to the extensions page of your broswer (chrome://extensions if you're on chrome)
4. Enable developer mode. It should be a toggle in the extensions page
5. Click **load unpacked**, and select the folder you extracted in step 2

## Build Instructions 

Tested using Windows 10, Node v18.6.0, and NPM 9.1.1

```Shell
npm install --force
npm run build
```

You should end up with manifest v2 and manifest v3 builds in the dist directory.


## Acknowledgments 

[SerBoggit](https://www.twitch.tv/serboggit): Thanks to SerBoggit for the idea and the last example picture
