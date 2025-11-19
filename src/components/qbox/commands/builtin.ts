import { bold, unorderedList } from '@discordjs/formatters';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const content = `${bold('qbx_core has several built-in features, which can also be disabled in the config if needed:')}
${unorderedList([
    'Built-in multicharacter',
    'Built-in multijob & multigang',
    'Built-in queue system',
])}`;

export const builtinCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'builtin',
        description: 'Send information about features built into qbx_core',
    },
    withOptionalMention: true,
    message: { content },
});
