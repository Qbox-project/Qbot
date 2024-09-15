import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ApplicationIntegrationType,
    InteractionContextType,
} from '@discordjs/core';
import { userMention } from '@discordjs/formatters';
import { supportMessage } from './message.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

export const supportCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'support',
        description: 'Refer someone to support channels',
        contexts: [InteractionContextType.Guild],
        integration_types: [ApplicationIntegrationType.GuildInstall],
        options: [
            {
                type: ApplicationCommandOptionType.User,
                name: 'mention',
                description: 'An optional user to mention',
            },
        ],
    },
    guildSpecific: true,
    async execute({ api, data: interaction }) {
        const { mention } = mapChatInputOptionValues(interaction.data) as {
            mention: string | undefined;
        };

        await api.interactions.reply(interaction.id, interaction.token, {
            content: `${mention ? `${userMention(mention)} ` : ''}${supportMessage}`,
        });
    },
} satisfies ChatInputCommand;
