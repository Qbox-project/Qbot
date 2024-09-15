import {
    APIInteractionResponseCallbackData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    MessageFlags,
} from '@discordjs/core';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

const invites: Record<string, string> = {
    ox: 'https://discord.overextended.dev/',
    'project-error': 'https://discord.gg/uy5N7jT5aJ',
    txAdmin: 'https://discord.gg/yWxjt9zPWR',
    cfx: 'https://discord.gg/fivem',
};

export const guildCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'guild',
        description: 'Send an invite link to a server',
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: 'name',
                description: 'The server name',
                required: true,
                choices: [
                    { name: 'Overextended', value: 'ox' },
                    { name: 'Project Error', value: 'project-error' },
                    { name: 'txAdmin', value: 'txAdmin' },
                    { name: 'Cfx.re', value: 'cfx' },
                ],
            },
        ],
    },
    async execute({ api, data: interaction }) {
        const { name: guild } = mapChatInputOptionValues(interaction.data) as {
            name: string;
        };

        const invite = invites[guild];
        const message: APIInteractionResponseCallbackData = {
            content: invite ?? 'Unknown guild selected.',
        };
        if (invite) message.flags = MessageFlags.Ephemeral;

        await api.interactions.reply(
            interaction.id,
            interaction.token,
            message,
        );
    },
} satisfies ChatInputCommand;
