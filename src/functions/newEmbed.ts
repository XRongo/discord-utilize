import { Client, Colors, EmbedBuilder, ColorResolvable } from "discord.js";
import { EmbedStyle, EmbedLanguage } from "../types";
import accentColor from "./accentColor";

/**
 * Creates a new Discord embed message builder based on the provided parameters.
 *
 * @param {Client} client - The Discord.js Client instance.
 * @param {EmbedStyle} [style=EmbedStyle.Default] - The style of embed (e.g., success, error).
 * @param {EmbedLanguage} [language=EmbedLanguage.Turkish] - The language of the embed (e.g., Turkish, English).
 * @returns {EmbedBuilder} - The built EmbedBuilder instance.
 */
export function newEmbed(
    client: Client,
    style: EmbedStyle = EmbedStyle.Default,
    language: EmbedLanguage = EmbedLanguage.Turkish,
): EmbedBuilder {
    if (!client) throw new Error("Client instance is required.");
    if (typeof client !== "object" || !(client instanceof Client))
        throw new Error("Invalid client instance.");
    if (typeof style !== "string")
        throw new Error("Embed type must be a string.");
    if (typeof language !== "string")
        throw new Error("Embed language must be a string.");
    if (!Object.values(EmbedStyle).includes(style))
        throw new Error("Invalid embed type.");
    if (!Object.values(EmbedLanguage).includes(language))
        throw new Error("Invalid embed language.");

    const titles = {
        tr: {
            success: "Başarılı",
            error: "Hata",
            default: `${client.user?.displayName ?? "Bilgi"}`,
        },
        en: {
            success: "Success",
            error: "Error",
            default: `${client.user?.displayName ?? "Info"}`,
        },
    };
    let color;
    let avatarUrl =
        client.user?.displayAvatarURL({ extension: "png", size: 2048 }) ??
        "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR0NrOJEpfjkM0zxD-aO9b-bWqW3mhY57jPMg3aSbxTYO__R4jOvx8T2Oa7Fm9yxXOGg4B_ns3SZaZGCiBOPQw";
    switch (style) {
        case EmbedStyle.Success:
            color = Colors.Green;
            break;
        case EmbedStyle.Error:
            color = Colors.Red;
            break;
        case EmbedStyle.Default:
            color = accentColor(avatarUrl) || Colors.White;
            break;
    }
    const embed = new EmbedBuilder()
        .setTitle(titles[language][style])
        .setColor(color as ColorResolvable);
    return embed;
}
