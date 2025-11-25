import { ApplicationCommandOptionType } from '@discordjs/core';
import { hideLinkEmbed } from '@discordjs/formatters';
import { docsUrl } from '../constants.js';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const links = {
    cdn: {
        name: 'CDN',
        message: 'Check out our CDN',
    },
    'loki-logging': {
        name: 'Loki Logging',
        message: 'Check out our Loki Logging',
    },
    slots: {
        name: 'Casino Slots',
        message: 'Check out our Casino Slots resource',
    },
    'weapon-audio': {
        name: 'Weapon Audio',
        message: 'Check out our Weapon Audio resource',
    },
};

export const tebexCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'tebex',
        description: 'Send a Qbox tebex link',
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: 'link',
                description: 'The link to send',
                choices: Object.entries(links).map(([value, { name }]) => ({
                    name,
                    value,
                })),
                required: true,
            },
        ],
    },
    withOptionalMention: true,
    message({ link }) {
        const linkMessage = links[link as keyof typeof links].message;

        return {
            content: `${linkMessage}: ${hideLinkEmbed(`${docsUrl}/tebex/${link}`)}`,
        };
    },
});
