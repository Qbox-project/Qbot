import {
    bold,
    codeBlock,
    inlineCode,
    unorderedList,
} from '@discordjs/formatters';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const content = `${bold(`Do not use FiveM anti-cheats.`)}
Pretty much any FiveM anticheat out there wants to claim they solve the cheater problem. Yet, instead, all they do is provide problems, such as:
${unorderedList([
    'Breaking your server',
    'Breaking your resources',
    "Imploding your server's performance",
    'and much more...',
])}
Not even big companies can solve the cheater problem with an anti-cheat. Chances are, neither can these anti-cheats.
${bold('Here are a few alternatives we recommend:')}
${unorderedList([
    'Keep an active staff team — this should be the case even if you have an anti-cheat.',
    `Make sure your resources have protected events — this does not mean to have a resource for "protecting events", but rather to make sure your resources' code is secure.`,
    `Configure your server correctly — Qbox's txAdmin recipe comes with a ${inlineCode('misc.cfg')} file, which includes helpful options for limiting what cheaters can abuse on your server. Here are some settings we recommend: `,
])}
${codeBlock(
    'cfg',
    `set sv_filterRequestControl 4
set sv_enableNetworkedSounds false
set sv_enableNetworkedScriptEntityStates false`,
)}`;

export const anticheatsCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'anticheats',
        description: 'Send information about FiveM anti-cheats',
    },
    withOptionalMention: true,
    message: { content },
});
