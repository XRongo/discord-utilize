# Discord Utilize
🛠️ A utility module for Discord.js applications, providing embed functions, error handling, and more.

## 🏅 Usages
```js
const { CrashBlocker, newEmbed, EmbedStyle } = require("discord-utilize");
/* import { CrashBlocker, newEmbed, EmbedStyle } from "discord-utilize"; */
const { Client } = require("discord.js")
/* import { Client } from "discord.js"; */

const client = new Client({ intents: [] })

new CrashBlocker().init() // Your application will never crash.

const embed = newEmbed(client, EmbedStyle.Default) // Returns EmbedBuilder but it has title and color.
```

## 🐞 I found a bug!
📱 You can contact me via [Discord](https://discord.gg/codebot)!