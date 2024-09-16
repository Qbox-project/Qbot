import { Snowflake } from '@discordjs/core';
import {
    bold,
    hideLinkEmbed,
    hyperlink,
    unorderedList,
    userMention,
} from '@discordjs/formatters';

export function plshelpMessage(userId?: Snowflake) {
    const content = [
        bold('Please provide more information.'),
        "It's overly tough to understand your problem, moreover how to solve it.",
        'Please provide as much information as you can, to help us in helping you. Here are a few links to help you understand why we ask for more:',
        unorderedList([
            hyperlink(
                "Don't ask to ask, just ask",
                hideLinkEmbed('https://dontasktoask.com/'),
            ),
            hyperlink(
                'The XY Problem',
                hideLinkEmbed('https://xyproblem.info/'),
            ),
            hyperlink(
                'Stack Overflow - How do I ask a good question?',
                hideLinkEmbed('https://stackoverflow.com/help/how-to-ask'),
            ),
        ]),
    ];
    if (userId) content.unshift(userMention(userId));

    return content.join('\n');
}
