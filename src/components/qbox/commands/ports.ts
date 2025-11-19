import { bold, inlineCode, unorderedList } from '@discordjs/formatters';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const content = `${bold('FXServer uses the TCP/UDP ports 30120 for connections by default.')}
If players are unable to connect to your server, or in the case you receive a ${inlineCode('Server list query returned an error')} message, you might need to open these ports:
${unorderedList(['TCP 30120', 'UDP 30120'])}`;

export const portsCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'ports',
        description: 'Send information about FXServer port forwarding',
    },
    withOptionalMention: true,
    message: { content },
});
