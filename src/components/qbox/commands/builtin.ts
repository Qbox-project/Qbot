import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { bold, unorderedList, userMention } from '@discordjs/formatters';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

export const builtinCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'builtin',
        description: 'Send information about features built into qbx_core',
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

        const content = [
            bold(
                'qbx_core has several built-in features, which can also be disabled in the config if needed:',
            ),
            unorderedList([
                'Built-in multicharacter',
                'Built-in multijob & multigang',
                'Built-in queue system',
            ]),
        ];
        if (mention) content.unshift(userMention(mention));

        await api.interactions.reply(interaction.id, interaction.token, {
            content: content.join('\n'),
        });
    },
} satisfies ChatInputCommand;
