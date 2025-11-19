import {
    APIChatInputApplicationCommandInteraction,
    APIMessageApplicationCommandInteraction,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    CreateMessageOptions,
    MessageFlags,
} from '@discordjs/core';
import { messageLink, subtext, userMention } from '@discordjs/formatters';
import { mapChatInputOptionValues } from './interactions.js';
import {
    ChatInputCommand,
    InteractionData,
    MessageCommand,
} from '/components/types.js';

interface QuickReplyChatInputProps {
    data: Omit<
        InteractionData<APIChatInputApplicationCommandInteraction>,
        'type' | 'options'
    >;
    guildSpecific?: boolean;
    withOptionalMention?: boolean;
    message: CreateMessageOptions;
}

export function createQuickReplyChatInputCommand({
    data,
    guildSpecific = false,
    withOptionalMention = false,
    message,
}: QuickReplyChatInputProps) {
    return {
        data: {
            ...data,
            type: ApplicationCommandType.ChatInput,
            options: withOptionalMention
                ? [
                      {
                          type: ApplicationCommandOptionType.User,
                          name: 'mention',
                          description: 'An optional user to mention',
                      },
                  ]
                : undefined,
        },
        guildSpecific,
        async execute({ data: interaction, api }) {
            const { mention: userId } = mapChatInputOptionValues(
                interaction.data,
            ) as {
                mention: string | undefined;
            };

            const mention = userId
                ? `${subtext(userMention(userId))}\n`
                : undefined;

            const content = `${mention ?? ''}${message.content ?? ''}`;

            await api.interactions.reply(interaction.id, interaction.token, {
                ...message,
                content,
            });
        },
    } satisfies ChatInputCommand;
}

interface QuickReplyMessageProps {
    data: Omit<
        InteractionData<APIMessageApplicationCommandInteraction>,
        'type'
    >;
    guildSpecific?: boolean;
    message: CreateMessageOptions;
}

export function createQuickReplyMessageCommand({
    data,
    guildSpecific = false,
    message,
}: QuickReplyMessageProps) {
    return {
        data: {
            ...data,
            type: ApplicationCommandType.Message,
        },
        guildSpecific,
        async execute({ data: interaction, api }) {
            await api.interactions.defer(interaction.id, interaction.token, {
                flags: MessageFlags.Ephemeral,
            });

            const user = interaction.user ?? interaction.member!.user;
            const footer = subtext(`Sent by ${userMention(user.id)}`);

            const createdMessage = await api.channels.createMessage(
                interaction.channel.id,
                {
                    ...message,
                    content: `${message.content ?? ''}\n${footer}`,
                    message_reference: {
                        message_id: interaction.data.target_id,
                    },
                },
            );

            await api.interactions.editReply(
                interaction.application_id,
                interaction.token,
                {
                    content: messageLink(
                        createdMessage.channel_id,
                        createdMessage.id,
                    ),
                },
            );
        },
    } satisfies MessageCommand;
}
