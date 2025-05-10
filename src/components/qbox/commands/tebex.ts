import {
    APIInteractionResponseCallbackData,
    ApplicationCommandOptionType,
    ApplicationCommandType
} from '@discordjs/core';
import { hideLinkEmbed, userMention } from '@discordjs/formatters';
import { docsUrl } from '../constants.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

const docs: Record<string, string> = {
    slots: 'Check out our Casino Slots resource on tebex:',
    'weapon-audio': 'Check out our Weapon Audio resource on tebex:',
};

export const tebexCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'tebex',
        description: 'Send a Qbox tebex link',
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: 'link',
                description: 'The link to send',
                choices: Object.keys(docs).map((k) => ({ name: k, value: k })),
                required: true,
            },
            {
                type: ApplicationCommandOptionType.User,
                name: 'mention',
                description: 'An optional user to mention',
            },
        ],
    },
    async execute({ api, data: interaction }) {
        const { link, mention } = mapChatInputOptionValues(
            interaction.data,
        ) as { link: string; mention: string | undefined };

        const response: APIInteractionResponseCallbackData = {
            content: mention ? `${userMention(mention)} ` : '',
        };

        response.content! += [
            docs[link],
            hideLinkEmbed(`${docsUrl}/tebex/${link}`),
        ].join('\n');

        await api.interactions.reply(
            interaction.id,
            interaction.token,
            response,
        );
    },
} satisfies ChatInputCommand;
