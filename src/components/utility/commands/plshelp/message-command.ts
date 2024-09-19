import { ApplicationCommandType, MessageFlags } from '@discordjs/core';
import { messageLink } from '@discordjs/formatters';
import { plshelpMessage } from './message.js';
import { MessageCommand } from '/components/types.js';

export const plshelpMessageCommand = {
    data: {
        type: ApplicationCommandType.Message,
        name: 'How to Ask for Help',
    },
    async execute({ api, data: interaction }) {
        await api.interactions.defer(interaction.id, interaction.token, {
            flags: MessageFlags.Ephemeral,
        });

        const message = await api.channels.createMessage(
            interaction.channel.id,
            {
                content: plshelpMessage(),
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
