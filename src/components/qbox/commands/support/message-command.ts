import {
    ApplicationCommandType,
    ApplicationIntegrationType,
    InteractionContextType,
    MessageFlags,
} from '@discordjs/core';
import { messageLink, subtext, userMention } from '@discordjs/formatters';
import { supportMessage } from './message.js';
import { MessageCommand } from '/components/types.js';

export const supportMessageCommand = {
    data: {
        type: ApplicationCommandType.Message,
        name: 'Refer to Support',
        contexts: [InteractionContextType.Guild],
        integration_types: [ApplicationIntegrationType.GuildInstall],
    },
    guildSpecific: true,
    async execute({ api, data: interaction }) {
        await api.interactions.defer(interaction.id, interaction.token, {
            flags: MessageFlags.Ephemeral,
        });

        const user = interaction.user ?? interaction.member!.user;
        const message = await api.channels.createMessage(
            interaction.channel.id,
            {
                content: [
                    supportMessage,
                    subtext(`Sent by ${userMention(user.id)}`),
                ].join('\n'),
                message_reference: { message_id: interaction.data.target_id },
            },
        );

        await api.interactions.editReply(
            interaction.application_id,
            interaction.token,
            {
                content: messageLink(message.channel_id, message.id),
            },
        );
    },
} satisfies MessageCommand;
