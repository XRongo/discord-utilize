export * from "./classes/CrashBlocker";
export * from "./classes/PageBuilder";
export * from "./functions/newEmbed";
export * from "./functions/arrayFunctions";
export * from "./functions/disableComponents";
export { EmbedStyle, EmbedLanguage } from "./types";
import checkForUpdates from "./helpers/checkUpdate";

checkForUpdates();
