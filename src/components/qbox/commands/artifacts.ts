import { hideLinkEmbed, hyperlink } from '@discordjs/formatters';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const content = `We recommend using the JGScripts ${hyperlink(
    'FiveM Artifacts DB',
    hideLinkEmbed('https://artifacts.jgscripts.com/'),
)} to install your artifacts.
This website curates and reports issues found within recently released versions.`;

export const artifactsCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'artifacts',
        description: 'Send information about FiveM anti-cheats',
    },
    withOptionalMention: true,
    message: { content },
});
