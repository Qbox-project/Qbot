import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import {
    bold,
    hyperlink,
    orderedList,
    unorderedList,
    userMention,
} from '@discordjs/formatters';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

export const onesyncCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'onesync',
        description: 'Send information about how to enable OneSync infinity',
        options: [
            {
                type: ApplicationCommandOptionType.Mentionable,
                name: 'mention',
                description: 'An optional user to mention',
            },
        ],
    },
    async execute({ api, data: interaction }) {
        const { mention } = mapChatInputOptionValues(interaction.data) as {
            mention: string | undefined;
        };

        const content = [
            bold(
                `Qbox requires ${hyperlink('OneSync: Infinity', 'https://docs.fivem.net/docs/scripting-reference/onesync/')} to work correctly.`,
            ),
            'After completing the steps provided below, the next server start should have it enabled.',
            '',
            bold('With txAdmin:'),
            orderedList([
                'Go to the `Settings` page,',
                'Go to the `FXServer` section,',
                'Set the `OneSync` option to `On (with infinity)`,',
                'Click on `Save FXServer Settings`.',
            ]),
            '',
            bold('Without txAdmin:'),
            unorderedList([
                'Pass `+set onesync on` to `FXServer.exe` on Windows or `run.sh` on Linux.',
            ]),
        ];
        if (mention) content.unshift(userMention(mention));

        await api.interactions.reply(interaction.id, interaction.token, {
            content: content.join('\n'),
        });
    },
} satisfies ChatInputCommand;
