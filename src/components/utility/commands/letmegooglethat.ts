import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { hideLinkEmbed } from '@discordjs/formatters';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

export const letmegooglethatCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'letmegooglethat',
        description: 'Let me google that for you',
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: 'query',
                description: 'Search query',
                required: true,
            },
            {
                type: ApplicationCommandOptionType.String,
                name: 'type',
                description: 'Search type',
                choices: [
                    {
                        name: 'Books',
                        value: 'bks',
                    },
                    {
                        name: 'Images',
                        value: 'isch',
                    },
                    {
                        name: 'News',
                        value: 'nws',
                    },
                    {
                        name: 'Shopping',
                        value: 'shop',
                    },
                    {
                        name: 'Videos',
                        value: 'vid',
                    },
                ],
            },
        ],
    },
    async execute({ api, data: interaction }) {
        const { query, type } = mapChatInputOptionValues(interaction.data) as {
            query: string;
            type: string | undefined;
        };

        await api.interactions.reply(interaction.id, interaction.token, {
            content: [
                'Here, let me google that for you:',
                hideLinkEmbed(
                    `https://google.com/search?q=${encodeURI(query)}${type ? `&tbm=${type}` : ''}`,
                ),
            ].join('\n'),
        });
    },
} satisfies ChatInputCommand;
