import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import {
    bold,
    hideLinkEmbed,
    hyperlink,
    inlineCode,
    unorderedList,
    userMention,
} from '@discordjs/formatters';
import { docsUrl } from '../constants.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

export const compatCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'compat',
        description:
            'Send information about backwards compatibility in qbx_core',
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
                'qbx_core provides backwards compatiblity with qb-core resources.',
            ),
            unorderedList([
                `To enable, add ${inlineCode('set qbx:enableBridge true')} to your cfg files.`,
                `Learn more about converting from QBCore by clicking ${hyperlink('here', hideLinkEmbed(`${docsUrl}/converting`))}.`,
            ]),
            `Learn more in our ${hyperlink('FAQ', hideLinkEmbed(`${docsUrl}/faq`))}.`,
        ];
        if (mention) content.unshift(userMention(mention));

        await api.interactions.reply(interaction.id, interaction.token, {
            content: content.join('\n'),
        });
    },
} satisfies ChatInputCommand;
