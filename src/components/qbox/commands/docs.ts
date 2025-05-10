import {
    APIEmbed,
    APIInteractionResponseCallbackData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { hideLinkEmbed, userMention } from '@discordjs/formatters';
import { color, docsUrl, icon } from '../constants.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

const embed: APIEmbed = {
    title: 'Qbox Documentation',
    color,
    description: 'Please read our documentation thoroughly.',
    thumbnail: { url: icon },
    fields: [
        {
            name: 'Documentation',
            value: docsUrl,
        },
        {
            name: 'Installation',
            value: `${docsUrl}/installation`,
        },
        {
            name: 'Converting from QBCore',
            value: `${docsUrl}/converting`,
        },
        {
            name: 'Frequently Asked Questions',
            value: `${docsUrl}/faq`,
        },
        {
            name: 'Tutorials',
            value: `${docsUrl}/blog`,
        },
    ],
};

const docs: Record<string, string> = {
    installation: 'Please read our documentation on how to install Qbox:',
    faq: 'Please read our FAQ:',
    converting: 'Please read our documentation on how to convert from QBCore:',
    developers: "Read our Developer's Guide here:",
    release: 'Read our Release Readiness guidelines here:',
    contributors: 'Read our contribution guide here:',
    blog: 'Read our tutorials here:',
};

export const docsCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'docs',
        description: 'Send useful documentation links',
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: 'link',
                description: 'An optional exact link to send',
                choices: Object.keys(docs).map((k) => ({ name: k, value: k })),
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
        ) as { link: string | undefined; mention: string | undefined };

        const response: APIInteractionResponseCallbackData = {
            content: mention ? `${userMention(mention)} ` : '',
        };

        if (!link) {
            response.embeds = [embed];
        } else {
            response.content! += [
                docs[link],
                hideLinkEmbed(`${docsUrl}/${link}`),
            ].join('\n');
        }

        await api.interactions.reply(
            interaction.id,
            interaction.token,
            response,
        );
    },
} satisfies ChatInputCommand;
