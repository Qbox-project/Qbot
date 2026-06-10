import { APIEmbed } from '@discordjs/core';
import {
    color,
    docsUrl,
    githubUrl,
    icon,
    oxUrl,
    siteUrl,
} from '../constants.js';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

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
            name: 'Overextended',
            value: `We heavily rely on Overextended's resources.\n${oxUrl}`,
        },
    ],
};

export const aboutCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'about',
        description: 'About Qbox Project',
    },
    message: { embeds: [embed] },
});
