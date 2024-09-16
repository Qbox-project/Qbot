import { Component } from '../types.js';
import { guildCommand } from './commands/guild.js';
import { plshelpCommand } from './commands/plshelp/chat-input-command.js';
import { plshelpMessageCommand } from './commands/plshelp/message-command.js';

export default {
    commands: [
        guildCommand,
        plshelpCommand,
        plshelpMessageCommand,
    ],
} satisfies Component;
