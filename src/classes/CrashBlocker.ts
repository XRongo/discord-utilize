/**
 * CrashBlocker module provides error handling and notification functionalities for Discord.js applications.
 * It integrates with advanced-logs for enhanced logging capabilities.
 */
import { Client, WebhookClient } from "discord.js";
import type { CrashBlockerOptions } from "../types";
import * as console from "../helpers/log";

export class CrashBlocker {
    /**
     * Whether to hide error messages from the console.
     */
    private hidden: boolean = false;

    /**
     * Whether to include error stack traces in the notifications. (ONLY NOT HIDDEN MODE)
     */
    private errorStack: boolean = false;

    /**
     * The webhook client to send error notifications.
     */
    private webhook: WebhookClient | undefined = undefined;

    /**
     * Discord.js client instance to handle Discord-specific errors.
     */
    private client: Client | undefined = undefined;

    /**
     * Creates an instance of CrashBlocker.
     *
     * @param {CrashBlockerOptions} [CrashBlockerOptions] - Options for configuring CrashBlocker instance.
     * @param {boolean} [CrashBlockerOptions.hidden=false] - Whether to hide error messages from the console.
     * @param {boolean} [CrashBlockerOptions.errorStack=false] - Whether to include error stack traces in the notifications. (ONLY NOT HIDDEN MODE)
     * @param {import("discord.js").WebhookClientData} [CrashBlockerOptions.webhook=undefined] - The webhook client to send error messages.
     * @param {Client} [CrashBlockerOptions.client=undefined] - Discord.js client instance to handle Discord-specific errors.
     */
    constructor(CrashBlockerOptions: CrashBlockerOptions) {
        if (CrashBlockerOptions) {
            if (
                CrashBlockerOptions.hidden &&
                typeof CrashBlockerOptions.hidden !== "boolean"
            ) {
                throw new Error(
                    "CrashBlocker option 'hidden' must be a boolean.",
                );
            }
            if (
                CrashBlockerOptions.errorStack &&
                typeof CrashBlockerOptions.errorStack !== "boolean"
            ) {
                throw new Error(
                    "CrashBlocker option 'errorStack' must be a boolean.",
                );
            }
            if (
                CrashBlockerOptions.webhook &&
                typeof CrashBlockerOptions.webhook !== "object"
            ) {
                throw new Error(
                    "CrashBlocker option 'webhook' must be a object.",
                );
            }
            if (
                CrashBlockerOptions.client &&
                (typeof CrashBlockerOptions.client !== "object" ||
                    !(CrashBlockerOptions.client instanceof Client))
            )
                throw new Error("Invalid client instance.");
        }
        this.hidden = CrashBlockerOptions.hidden ?? false;
        this.errorStack = CrashBlockerOptions.errorStack ?? false;
        this.webhook = CrashBlockerOptions.webhook
            ? new WebhookClient(CrashBlockerOptions.webhook)
            : undefined;
        this.client = CrashBlockerOptions.client ?? undefined;
    }

    /**
     * Initializes CrashBlocker by setting up event listeners for uncaught exceptions,
     * unhandled rejections, and Discord-specific errors.
     */
    init() {
        process.on("uncaughtException", (error) => {
            this.handleProcessError("Uncaught Exception", error);
        });

        process.on("unhandledRejection", (error) => {
            this.handleProcessError("Unhandled Rejection", error);
        });

        if (this.client) {
            this.client.on("error", (error) => {
                this.handleDiscordError(error);
            });
        }

        if (!this.hidden) {
            console.info("CrashBlocker initialized.");
        }
    }

    /**
     * Handles process-related errors and sends notifications via webhook if configured.
     *
     * @param {string} type - Type of error (e.g., "Uncaught Exception", "Unhandled Rejection").
     * @param {Error | unknown} error - The error object.
     */
    private handleProcessError(type: string, error: Error | unknown) {
        if (!this.hidden) {
            if (this.errorStack) {
                console.error(error);
            } else {
                console.error(`${error}`);
            }
        }

        if (this.webhook) {
            this.webhook.send({ content: `${type}: ${error}` });
        }
    }

    /**
     * Handles Discord-specific errors and sends notifications via webhook if configured.
     *
     * @param {Error} error - The Discord-specific error.
     */
    private handleDiscordError(error: Error) {
        if (!this.hidden) {
            if (this.errorStack) {
                console.error(error);
            } else {
                console.error(`${error}`);
            }
        }

        if (this.webhook) {
            this.webhook.send({
                content: `Discord Error: ${error}`,
            });
        }
    }
}
