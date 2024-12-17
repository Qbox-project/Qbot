import { Component } from '../types.js';
import { guildCommand } from './commands/guild.js';
import { learnCommand } from './commands/learn/chat-input-command.js';
import { learnMessageCommand } from './commands/learn/message-command.js';
import { letmegooglethatCommand } from './commands/letmegooglethat.js';
import { plshelpCommand } from './commands/plshelp/chat-input-command.js';
import { plshelpMessageCommand } from './commands/plshelp/message-command.js';

export default {
    commands: [
        guildCommand,
        learnCommand,
        learnMessageCommand,
        letmegooglethatCommand,
        plshelpCommand,
        plshelpMessageCommand,
    ],
} satisfies Component;
