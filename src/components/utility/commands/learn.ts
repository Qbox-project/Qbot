import {
    bold,
    hideLinkEmbed,
    hyperlink,
    unorderedList,
} from '@discordjs/formatters';
import {
    createQuickReplyChatInputCommand,
    createQuickReplyMessageCommand,
} from '/utils/quick-reply.js';

const content = `Learning programming can be both exciting and challenging, especially when you're starting out.
Diving into code, exploring resources, and experimenting are essential parts of the journey.
While it takes time and effort to develop your skills, we encourage curiosity and a growth mindset.
Whether you're an experienced programmer or new to FiveM development and Lua, we're here to support your learning.
${bold('Below are some excellent resources curated by the Qbox team to help you get started:')},
${unorderedList([
    hyperlink('Lua Docs', hideLinkEmbed('https://lua.org/docs.html')),
    hyperlink(
        'Programming in Lua e-book',
        hideLinkEmbed('https://lua.org/pil/contents.html'),
    ),
    hyperlink('FiveM Docs', hideLinkEmbed('https://docs.fivem.net/docs/')),
    hyperlink(
        'Effective FiveM Lua',
        hideLinkEmbed('https://manason.github.io/effective-fivem-lua/'),
    ),
])}`;

export const learnCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'learn',
        description: 'Send information about how to learn',
    },
    withOptionalMention: true,
    message: { content },
});

export const learnMessageCommand = createQuickReplyMessageCommand({
    data: {
        name: 'How To Learn',
    },
    message: { content },
});
