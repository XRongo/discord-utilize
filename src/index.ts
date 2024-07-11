export * from "./functions/embed";
export * from "./classes/CrashBlocker";
export { EmbedStyle, EmbedLanguage } from "./types";
import checkForUpdates from "./helpers/checkUpdate";

checkForUpdates();
