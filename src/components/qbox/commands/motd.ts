import {
    bold,
    hideLinkEmbed,
    hyperlink,
    inlineCode,
} from '@discordjs/formatters';
import { docsUrl } from '../constants.js';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const content = `${bold('By default, Qbox sends a welcome message to players when loading in.')}
To disable this functionality, simply remove the ${inlineCode('qbx:motd')} convar from your server.cfg file.
You may also modify this value instead, to create your own custom message!
Read more in our ${hyperlink('Documentation', hideLinkEmbed(`${docsUrl}/resources/qbx_core/convars#motd`))}.`;

export const motdCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'motd',
        description: 'Send information on the qbx_core MOTD',
    },
    withOptionalMention: true,
    message: { content },
});
