import {
    bold,
    hideLinkEmbed,
    hyperlink,
    unorderedList,
} from '@discordjs/formatters';
import { fivemTosUrl } from '../constants.js';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const content = `${bold(`Do not use FiveM game server hosts.`)}
Not only are game server hosts against the ${hyperlink('FiveM PLA', hideLinkEmbed(fivemTosUrl))} (with a few exceptions), but most of them come with issues, such as:
${unorderedList([
    'Outdated database versions',
    'Outdated artifacts',
    'Lack of control over the server files and cfgs',
    'Simply bad performance',
    'and potentially more...',
])}
There is a list of allowed game server hosts on FiveM's website, but we do not recommend using them.
${bold('Please use a dedicated server or VPS from an established host instead.')}`;

export const gamehostsCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'gamehosts',
        description: 'Send information about FiveM Game Hosts',
    },
    withOptionalMention: true,
    message: { content },
});
