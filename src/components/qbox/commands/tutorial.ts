import {
    APIInteractionResponseCallbackData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { hideLinkEmbed, userMention } from '@discordjs/formatters';
import { docsUrl } from '../constants.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

const docs: Record<string, string> = {
    'how-fxmanifests-work': 'Learn how fxmanifests work with FiveM:',
    'vscode-setup':
        'Learn how to set up VSCode for FiveM and RedM Lua scripting:',
    'install-custom-weapons':
        'Learn how to install custom weapons in Qbox using ox_inventory:',
};

export const tutorialCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'tutorial',
        description: 'Send a Qbox tutorial link',
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
            hideLinkEmbed(`${docsUrl}/blog/${link}`),
        ].join('\n');

        await api.interactions.reply(
            interaction.id,
            interaction.token,
            response,
        );
    },
} satisfies ChatInputCommand;
