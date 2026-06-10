import { bold, hideLinkEmbed, hyperlink } from '@discordjs/formatters';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const content = `FiveM contains a built-in ${bold('Profiler')} tool.
Using the profiler allows you to troubleshoot server lag, hitch warnings and FPS drops.
You can learn more on the ${hyperlink('FiveM Docs', hideLinkEmbed('https://docs.fivem.net/docs/scripting-manual/debugging/using-profiler/'))}.
Community solutions are available for inspecting profiler results, such as the ${hyperlink('1of1 Profiler Analyzer', 'https://app.1of1scripts.com/profiler')}.`;

export const profilerCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'profiler',
        description: 'Send information about the FiveM profiler',
    },
    withOptionalMention: true,
    message: { content },
});
