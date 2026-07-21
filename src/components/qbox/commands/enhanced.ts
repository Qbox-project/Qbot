import {
    bold,
    italic
} from '@discordjs/formatters';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const content = `${bold('FiveM for GTAV Enhanced')} is currently in ${bold('Early Access.')}
It is provided purely for testing purposes, and it is ${bold('not ready for production use')}.
${bold(`No resources will be ${italic('"Enhanced Compatible"')} until it is ready.`)}`;

export const enhancedCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'enhanced',
        description:
            'Send information about FiveM for GTAV Enhanced',
    },
    withOptionalMention: true,
    message: { content },
});
