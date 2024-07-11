import { ActionRowBuilder, AnyComponentBuilder } from "discord.js";

/**
 * Disables all the buttons or select menus in the provided ActionRowBuilder.
 *
 * @template T
 * @param {ActionRowBuilder<T>} actionRowBuilder - The ActionRowBuilder containing components.
 * @returns {ActionRowBuilder<T>} - A new ActionRowBuilder with disabled components.
 */
export function disableComponents<T extends AnyComponentBuilder>(
    actionRowBuilder: ActionRowBuilder<T>,
): ActionRowBuilder<T> {
    return new ActionRowBuilder<T>().setComponents(
        actionRowBuilder.components.map((component) =>
            // @ts-ignore
            component.setDisabled(true),
        ),
    );
}
