import {
    ApplicationIntegrationType,
    InteractionContextType,
} from '@discordjs/core';
import { channelMention } from '@discordjs/formatters';
import {
    createQuickReplyChatInputCommand,
    createQuickReplyMessageCommand,
} from '/utils/quick-reply.js';

const content = `Please move to ${channelMention('1031968831595352085')} or ${channelMention('1020532754426904697')} for support.`;

export const supportCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'support',
        description: 'Refer someone to support channels',
        contexts: [InteractionContextType.Guild],
        integration_types: [ApplicationIntegrationType.GuildInstall],
    },
    guildSpecific: true,
    withOptionalMention: true,
    message: { content },
});

export const supportMessageCommand = createQuickReplyMessageCommand({
    data: {
        name: 'Refer To Support',
        contexts: [InteractionContextType.Guild],
        integration_types: [ApplicationIntegrationType.GuildInstall],
    },
    guildSpecific: true,
    message: { content },
});
