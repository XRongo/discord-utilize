# Discord Utilize
🛠️ A utility module for Discord.js applications, providing embed functions, error handling, and more.

## 🏅 Usages
```js
const { CrashBlocker, newEmbed, EmbedStyle, EmbedLanguage, PageBuilder } = require("discord-utilize");
/* import { CrashBlocker, newEmbed, EmbedStyle, EmbedLanguage } from "discord-utilize"; */
const { Client } = require("discord.js")
/* import { Client } from "discord.js"; */

const client = new Client({ intents: [] })

new CrashBlocker().init() // Your application will never crash.

// Türkçe Embedler
const defaultEmbedTurkish = newEmbed(client, EmbedStyle.Default) // Returns EmbedBuilder but it has title and color.
const successEmbedTurkish = newEmbed(client, EmbedStyle.Default) // Returns EmbedBuilder but it has title and color.
const errorEmbedTurkish = newEmbed(client, EmbedStyle.Default) // Returns EmbedBuilder but it has title and color.

// English Embeds
const defaultEmbedEnglish = newEmbed(client, EmbedStyle.Default, EmbedLanguage.English) // Returns EmbedBuilder but it has title and color.
const successEmbedEnglish = newEmbed(client, EmbedStyle.Default, EmbedLanguage.English) // Returns EmbedBuilder but it has title and color.
const errorEmbedEnglish = newEmbed(client, EmbedStyle.Default, EmbedLanguage.English) // Returns EmbedBuilder but it has title and color.

// Pagination System (PageBuilder)

client.on("messageCreate", async (message) => {
    if (message.content === "page") {
        const Page = new PageBuilder()
            .setComponents()

        const embed1 = new EmbedBuilder().setTitle("Page 1").setDescription("Hello World");
        const embed2 = new EmbedBuilder().setTitle("Page 2").setDescription("Hello World");
        const embed3 = new EmbedBuilder().setTitle("Page 3").setDescription("Hello World");
        const embed4 = new EmbedBuilder().setTitle("Page 4").setDescription("Hello World");
        const embed5 = new EmbedBuilder().setTitle("Page 5").setDescription("Hello World");

        const msg = await message.reply({ embeds: [embed1], components: [Page.getComponents()] })
        const collector = msg.createMessageComponentCollector({ filter: i => i.user.id === message.author.id, time: 60000 })
        Page.setCollector(collector)
        Page.setPages([embed1, embed2, embed3, embed4, embed5, embed6, embed7])
        await Page.init()
        collector.on("collect", async (i) => {
            i.update({ embeds: [Page.getPage()], components: [Page.getComponents()] })
        })
    }
})
```

## 🐞 I found a bug!
📱 You can contact me via [Discord](https://discord.gg/codebot)!