import {
    bold,
    hideLinkEmbed,
    hyperlink,
    orderedList,
    unorderedList,
} from '@discordjs/formatters';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const content = `${bold(`Qbox requires ${hyperlink('OneSync: Infinity', hideLinkEmbed('https://docs.fivem.net/docs/scripting-reference/onesync/'))} to work correctly.`)}
After completing the steps provided below, the next server start should have it enabled.
Note that having more than 48 player slots with OneSync requires a ${hyperlink('FiveM Patreon subscription', hideLinkEmbed('https://patreon.com/fivem'))}, with different memberships providing different amounts of player slots.

${bold('With txAdmin:')}
${orderedList([
    'Go to the `Settings` page,',
    'Go to the `FXServer` section,',
    'Set the `OneSync` option to `On (with infinity)`,',
    'Click on `Save FXServer Settings`.',
])}

${bold('Without txAdmin:')}
${unorderedList([
    'Pass `+set onesync on` to `FXServer.exe` on Windows or `run.sh` on Linux.',
])}`;

export const onesyncCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'onesync',
        description: 'Send information about how to enable OneSync infinity',
    },
    withOptionalMention: true,
    message: { content },
});
