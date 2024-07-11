import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    InteractionCollector,
} from "discord.js";

/**
 * A class to build a paginated message with buttons.
 */
export class PageBuilder {
    /**
     * ActionRowBuilder containing the buttons.
     *
     * @type {ActionRowBuilder<ButtonBuilder>}
     * @private
     */
    private components: ActionRowBuilder<ButtonBuilder> =
        new ActionRowBuilder<ButtonBuilder>();

    /**
     * Array of pages to display.
     *
     * @type {Array<any>}
     * @private
     */
    private pages: any[] = [];

    /**
     * InteractionCollector to collect button interactions.
     *
     * @type {InteractionCollector<ButtonInteraction>}
     * @private
     */
    private collector: InteractionCollector<ButtonInteraction> | undefined;

    /**
     * Current page number.
     *
     * @type {number}
     * @private
     */
    private currentPage: number = 0;

    /**
     * Creates an instance of PageBuilder.
     */
    constructor() {}

    /**
     * Sets the components for the paginated message.
     *
     * @returns {PageBuilder} The PageBuilder instance.
     */
    public setComponents(): this {
        const onePage = this.pages.length === 1;

        this.components.addComponents(
            new ButtonBuilder()
                .setCustomId("firstPage")
                .setDisabled(true)
                .setEmoji("⏪")
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId("left")
                .setDisabled(true)
                .setEmoji("⬅")
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId("text")
                .setDisabled(true)
                .setLabel(`[1/${this.pages.length}]`)
                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
                .setCustomId("right")
                .setDisabled(onePage ? true : false)
                .setEmoji("➡")
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId("lastPage")
                .setDisabled(onePage ? true : false)
                .setEmoji("⏩")
                .setStyle(ButtonStyle.Primary),
        );

        return this;
    }

    /**
     * Sets the pages for the paginated message.
     *
     * @param {Array} pages - The pages to display.
     * @returns {PageBuilder} The PageBuilder instance.
     * @throws {Error} If pages is not an array.
     */
    public setPages(pages: any[]): this {
        if (!Array.isArray(pages)) {
            throw new Error("Pages must be an array.");
        }
        this.pages = pages;
        return this;
    }

    /**
     * Get current page.
     *
     * @returns {any} The current page.
     */
    public getPage(): any {
        return this.pages[this.currentPage];
    }

    /**
     * Sets the collector for the paginated message.
     *
     * @param {InteractionCollector<ButtonInteraction>} collector The collector to set.
     * @returns {PageBuilder} The PageBuilder instance.
     * @throws {Error} If collector is not an instance of InteractionCollector.
     */
    public setCollector(
        collector: InteractionCollector<ButtonInteraction>,
    ): this {
        if (!collector || !(collector instanceof InteractionCollector)) {
            throw new Error(
                "Collector must be an instance of InteractionCollector.",
            );
        }
        this.collector = collector;
        return this;
    }

    /**
     * Get the current page number.
     *
     * @returns {number} The current page number.
     */
    public getCurrentPage(): number {
        return this.currentPage;
    }

    /**
     * Disables all the buttons in the provided ActionRowBuilder.
     *
     * @returns {ActionRowBuilder<ButtonBuilder>} ActionRowBuilder containing the buttons.
     */
    public disableComponents(): ActionRowBuilder<ButtonBuilder> {
        return new ActionRowBuilder<ButtonBuilder>().setComponents(
            ...this.components.components.map((component) =>
                component.setDisabled(true),
            ),
        );
    }

    /**
     * Get all the components.
     *
     * @returns {ActionRowBuilder<ButtonBuilder>} ActionRowBuilder containing the buttons.
     */
    public getComponents(): ActionRowBuilder<ButtonBuilder> {
        return this.components;
    }

    private get buttonActions(): Record<string, () => void> {
        return {
            firstPage: () => {
                this.currentPage = 0;
            },
            left: () => {
                this.currentPage--;
            },
            right: () => {
                this.currentPage++;
            },
            lastPage: () => {
                this.currentPage = this.pages.length - 1;
            },
        };
    }

    /**
     * Starts the collector and initializes the PageBuilder.
     * 
     * @returns {Promise<PageBuilder>} The PageBuilder instance.
     * @throws {Error} If components, pages, or collector is missing or invalid.
     */
    public async init(): Promise<this> {
        if (!this.components || typeof this.components !== "object") {
            throw new Error(
                "Components is missing or not an object. Did you forget to call setComponents()?",
            );
        }
        if (!this.pages || !Array.isArray(this.pages)) {
            throw new Error(
                "Pages is missing or not an array. Did you forget to call setPages()?",
            );
        }
        if (
            !this.collector ||
            !(this.collector instanceof InteractionCollector)
        ) {
            throw new Error(
                "Collector is missing or not an instance of InteractionCollector. Did you forget to call setCollector()?",
            );
        }

        this.collector.on("collect", async (interaction) => {
            const customId = interaction.customId as
                | "firstPage"
                | "left"
                | "right"
                | "lastPage";
            this.buttonActions[customId]?.();

            const buttonDatas = this.components.components;
            let currentPage = this.currentPage + 1;

            const leftButtons = [buttonDatas[0], buttonDatas[1]];
            const rightButtons = [buttonDatas[3], buttonDatas[4]];
            const textButton = buttonDatas[2];

            if (customId === "lastPage" || customId === "right") {
                leftButtons.forEach((button) => button?.setDisabled(false));
            }
            if (customId === "firstPage" || customId === "left") {
                rightButtons.forEach((button) => button?.setDisabled(false));
            }

            if (currentPage <= 1) {
                leftButtons.forEach((button) => button?.setDisabled(true));
                this.currentPage = 0;
                currentPage = 1;
            }

            if (currentPage >= this.pages.length) {
                rightButtons.forEach((button) => button?.setDisabled(true));
                this.currentPage = this.pages.length - 1;
                currentPage = this.pages.length;
            }

            textButton?.setLabel(`[${currentPage}/${this.pages.length}]`);
        });

        return this;
    }
}
