import {
    bold,
    hideLinkEmbed,
    hyperlink,
    inlineCode,
    unorderedList,
} from '@discordjs/formatters';
import { docsUrl } from '../constants.js';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const content = `${bold('qbx_core provides backwards compatiblity with qb-core resources.')}
${unorderedList([
    `To enable, add ${inlineCode('set qbx:enableBridge true')} to your cfg files.`,
    `Learn more about converting from QBCore by clicking ${hyperlink('here', hideLinkEmbed(`${docsUrl}/converting`))}.`,
])}
Learn more in our ${hyperlink('FAQ', hideLinkEmbed(`${docsUrl}/faq`))}.`;

export const compatCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'compat',
        description:
            'Send information about backwards compatibility in qbx_core',
    },
    withOptionalMention: true,
    message: { content },
});
