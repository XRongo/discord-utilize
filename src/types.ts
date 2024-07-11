import type { Client, WebhookClientData } from "discord.js";

export enum EmbedStyle {
    Success = "success",
    Error = "error",
    Default = "default",
}

export enum EmbedLanguage {
    Turkish = "tr",
    English = "en",
}

export type CrashBlockerOptions = {
    hidden?: boolean;
    errorStack?: boolean;
    webhook?: WebhookClientData;
    client?: Client;
};
