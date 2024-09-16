import { Snowflake } from '@discordjs/core';
import {
    bold,
    hideLinkEmbed,
    hyperlink,
    unorderedList,
    userMention,
} from '@discordjs/formatters';

export function spoonfeedMessage(userId?: Snowflake) {
    const content = [
        bold('Information will not be spoonfed to you.'),
        'You are expected to be able to learn and understand programming concepts.',
        'Understand that even if you are "new to this dev stuff", we all started off with no knowledge in the space.',
        'Just as we take our time and learn, you are advised to do the same. Here are a few links to help you start:',
        unorderedList([
            hyperlink('Lua Docs', hideLinkEmbed('https://lua.org/docs.html')),
            hyperlink(
                'Programming in Lua e-book',
                hideLinkEmbed('https://lua.org/pil/contents.html'),
            ),
            hyperlink(
                'FiveM Docs',
                hideLinkEmbed('https://docs.fivem.net/docs/'),
            ),
            hyperlink(
                'Effective FiveM Lua',
                hideLinkEmbed('https://manason.github.io/effective-fivem-lua/'),
            ),
        ]),
    ];
    if (userId) content.unshift(userMention(userId));

    return content.join('\n');
}
