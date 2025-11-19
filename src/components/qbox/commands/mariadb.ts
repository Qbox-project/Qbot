import {
    bold,
    hideLinkEmbed,
    hyperlink
} from '@discordjs/formatters';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

const content = `${bold(`Qbox requires an up-to-date ${hyperlink('MariaDB', hideLinkEmbed('https://mariadb.org/download'))} instance to work correctly.`)}
If you are using ${bold('XAMPP')}, migrate to a ${bold('MariaDB')} server instead.`;

export const mariadbCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'mariadb',
        description: 'Send information about MariaDB requirements',
    },
    withOptionalMention: true,
    message: { content },
});
