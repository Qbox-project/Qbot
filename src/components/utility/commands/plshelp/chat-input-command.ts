import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { plshelpMessage } from './message.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

export const plshelpCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'plshelp',
        description: 'Send information about how to ask for help',
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
            content: plshelpMessage(mention),
        });
    },
} satisfies ChatInputCommand;
