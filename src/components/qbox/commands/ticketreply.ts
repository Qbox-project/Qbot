import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ApplicationIntegrationType,
    InteractionContextType,
    PermissionFlagsBits,
} from '@discordjs/core';
import { bold, channelLink } from '@discordjs/formatters';
import { createQuickReplySubcommand } from '/utils/quick-reply.js';
import { createSubcommandsCommand } from '/utils/subcommands.js';

const underReviewMessage = `Hi there,

Your store is currently under review, and we'll get back to you as soon as possible.

Thanks so much for your patience and understanding!`;

function rejectionMessage(reason: string | undefined) {
    return `Hi there,

We've reviewed your portfolio, and unfortunately, we've decided not to move forward at this time.${reason ? `\n\n${reason}` : ''}

Thank you for taking the time to apply — we appreciate your interest and encourage you to reapply in the future.`;
}

const rejectionReasons = {
    notenoughcreations: {
        name: 'Not Enough Creations',
        message: `You're currently missing ${bold('five')} unique creations to meet our minimum.
We encourage you to utilize our ${channelLink('1020030802395943063')} and ${channelLink('1413276066621165670')} channels so that you can show off things you're putting out, and maybe in the future, we can partner together!`,
    },
};

export const ticketreplyCommand = createSubcommandsCommand(
    {
        data: {
            type: ApplicationCommandType.ChatInput,
            name: 'ticketreply',
            description: 'Ticket replies',
            contexts: [InteractionContextType.Guild],
            integration_types: [ApplicationIntegrationType.GuildInstall],
            default_member_permissions: `${PermissionFlagsBits.ManageGuild}`,
        },
        guildSpecific: true,
    },
    [
        createQuickReplySubcommand({
            data: {
                type: ApplicationCommandOptionType.Subcommand,
                name: 'underreview',
                description: 'Send a message that the creator is under review',
            },
            withSeparateMessage: true,
            message: { content: underReviewMessage },
        }),
        createQuickReplySubcommand({
            data: {
                type: ApplicationCommandOptionType.Subcommand,
                name: 'rejected',
                description: 'Send a rejection message for the creator',
                options: [
                    {
                        type: ApplicationCommandOptionType.String,
                        name: 'reason',
                        description: 'Why the creator was rejected',
                        choices: Object.entries(rejectionReasons).map(
                            ([value, { name }]) => ({ name, value }),
                        ),
                    },
                ],
            },
            withSeparateMessage: true,
            message({ reason }) {
                const reasonMessage = reason
                    ? rejectionReasons[reason as keyof typeof rejectionReasons]
                    : undefined;

                return {
                    content: rejectionMessage(reasonMessage?.message),
                };
            },
        }),
    ],
);
