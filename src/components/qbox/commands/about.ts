import { APIEmbed, ApplicationCommandType } from '@discordjs/core';
import {
    color,
    docsUrl,
    githubUrl,
    icon,
    oxUrl,
    siteUrl,
} from '../constants.js';
import { ChatInputCommand } from '/components/types.js';

const embed: APIEmbed = {
    url: siteUrl,
    title: 'Qbox Project',
    color,
    description:
        'Qbox—originally a QBCore fork—is a FiveM framework with a focus on security, performance and stability.',
    thumbnail: { url: icon },
    fields: [
        {
            name: 'Documentation',
            value: docsUrl,
        },
        {
            name: 'GitHub',
            value: githubUrl,
        },
        {
            name: 'Community Ox',
            value: `We heavily rely on Community Ox's resources.\n${oxUrl}`,
        },
    ],
};

export const aboutCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'about',
        description: 'About Qbox Project',
    },
    async execute({ api, data: interaction }) {
        await api.interactions.reply(interaction.id, interaction.token, {
            embeds: [embed],
        });
    },
} satisfies ChatInputCommand;
