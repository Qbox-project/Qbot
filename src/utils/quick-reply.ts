import {
    API,
    APIApplicationCommandSubcommandOption,
    APIChatInputApplicationCommandInteraction,
    APIChatInputApplicationCommandInteractionData,
    APIInteraction,
    APIMessageApplicationCommandInteraction,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    CreateMessageOptions,
    MessageFlags,
} from '@discordjs/core';
import { messageLink, subtext, userMention } from '@discordjs/formatters';
import {
    mapChatInputOptionValues,
    MappedChatInputOptionValues,
} from './interactions.js';
import { Subcommand } from './subcommands.js';
import {
    ChatInputCommand,
    InteractionData,
    MessageCommand,
} from '/components/types.js';

interface QuickReplyChatInputProps {
    data: Omit<
        InteractionData<APIChatInputApplicationCommandInteraction>,
        'type'
    >;
    guildSpecific?: boolean;
    withOptionalMention?: boolean;
    withSeparateMessage?: boolean;
    message:
        | CreateMessageOptions
        | ((options: MappedChatInputOptionValues) => CreateMessageOptions);
}

export function createQuickReplyChatInputCommand({
    data,
    guildSpecific = false,
    withOptionalMention = false,
    withSeparateMessage = false,
    message,
}: QuickReplyChatInputProps) {
    return {
        data: {
            ...data,
            options: withOptionalMention
                ? [
                      ...(data.options || []),
                      {
                          type: ApplicationCommandOptionType.User,
                          name: 'mention',
                          description: 'An optional user to mention',
                      },
                  ]
                : data.options || [],
        },
        guildSpecific,
        async execute({ data: interaction, api }) {
            await sendInteractionReply(
                api,
                interaction,
                interaction.data,
                message,
                withSeparateMessage,
            );
        },
    } satisfies ChatInputCommand;
}

interface QuickReplySubcommandProps {
    data: APIApplicationCommandSubcommandOption;
    withOptionalMention?: boolean;
    withSeparateMessage?: boolean;
    message:
        | CreateMessageOptions
        | ((options: MappedChatInputOptionValues) => CreateMessageOptions);
}

export function createQuickReplySubcommand<G extends boolean>({
    data,
    withOptionalMention = false,
    withSeparateMessage = false,
    message,
}: QuickReplySubcommandProps) {
    return {
        data: {
            ...data,
            type: ApplicationCommandOptionType.Subcommand,
            options: withOptionalMention
                ? [
                      ...(data.options || []),
                      {
                          type: ApplicationCommandOptionType.User,
                          name: 'mention',
                          description: 'An optional user to mention',
                      },
                  ]
                : data.options || [],
        },
        async execute({ data: interaction, api, subcommandData }) {
            await sendInteractionReply(
                api,
                interaction,
                subcommandData,
                message,
                withSeparateMessage,
            );
        },
    } satisfies Subcommand<G>;
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
            const user = interaction.user ?? interaction.member!.user;
            const footer = subtext(`Sent by ${userMention(user.id)}`);

            await sendMessageReply(api, interaction, {
                ...message,
                content: `${message.content ?? ''}\n${footer}`,
                message_reference: {
                    message_id: interaction.data.target_id,
                },
            });
        },
    } satisfies MessageCommand;
}

async function sendInteractionReply(
    api: API,
    interaction: APIInteraction,
    data:
        | APIChatInputApplicationCommandInteractionData
        | APIApplicationCommandSubcommandOption,
    message:
        | CreateMessageOptions
        | ((options: MappedChatInputOptionValues) => CreateMessageOptions),
    withSeparateMessage: boolean,
) {
    const values = mapChatInputOptionValues(data);

    const messageProps =
        typeof message === 'function' ? message(values) : message;

    if (withSeparateMessage) {
        await sendMessageReply(api, interaction, messageProps);
        return;
    }

    const userId = values.mention as string | undefined;
    const mention = userId ? `${subtext(userMention(userId))}\n` : undefined;

    await api.interactions.reply(interaction.id, interaction.token, {
        ...messageProps,
        content: `${mention ?? ''}${messageProps.content ?? ''}`,
    });
}

async function sendMessageReply(
    api: API,
    interaction: APIInteraction,
    message: CreateMessageOptions,
) {
    await api.interactions.defer(interaction.id, interaction.token, {
        flags: MessageFlags.Ephemeral,
    });

    const createdMessage = await api.channels.createMessage(
        interaction.channel!.id,
        message,
    );

    await api.interactions.editReply(
        interaction.application_id,
        interaction.token,
        {
            content: messageLink(createdMessage.channel_id, createdMessage.id),
        },
    );
}
