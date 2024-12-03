import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { resourcesMessage } from './message.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

export const resourcesCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'resources',
        description: 'Send information about how to learn',
        options: [
            {
                type: ApplicationCommandOptionType.Mentionable,
                name: 'mention',
                description: 'An optional user to mention',
            },
        ],
    },
    async execute({ api, data: interaction }) {
        const { mention } = mapChatInputOptionValues(interaction.data) as {
            mention: string | undefined;
        };

        await api.interactions.reply(interaction.id, interaction.token, {
            content: resourcesMessage(mention),
        });
    },
} satisfies ChatInputCommand;
