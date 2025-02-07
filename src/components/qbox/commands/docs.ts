import {
    APIApplicationCommandOptionChoice,
    APIEmbed,
    APIInteractionResponseCallbackData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { hideLinkEmbed, userMention } from '@discordjs/formatters';
import { color, docsUrl, icon, resources } from '../constants.js';
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
    ],
};

const docs: Record<string, string> = {
    introduction: 'Please read our documentation thoroughly:',
    installation: 'Please read our documentation on how to install Qbox:',
    converting: 'Please read our documentation on how to convert from QBCore:',
    developers: "Read our Developer's Guide here:",
    release: 'Read our Release Readiness guidelines here:',
    faq: 'Please read our FAQ:',
};

const choices: APIApplicationCommandOptionChoice<string>[] = [];
Object.keys(docs).forEach((k) => choices.push({ name: k, value: k }));
resources.forEach((r) => choices.push({ name: r, value: `resources/${r}` }));

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
                choices,
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
                docs[link] ??
                    `Please read our documentation on ${link.replace('resources/', '')}:`,
                hideLinkEmbed(
                    `${docsUrl}/${link == 'introduction' ? '' : link}`,
                ),
            ].join('\n');
        }

        await api.interactions.reply(
            interaction.id,
            interaction.token,
            response,
        );
    },
} satisfies ChatInputCommand;
