import { Component } from '../types.js';
import { guildCommand } from './commands/guild.js';
import { letmegooglethatCommand } from './commands/letmegooglethat.js';
import { plshelpCommand } from './commands/plshelp/chat-input-command.js';
import { plshelpMessageCommand } from './commands/plshelp/message-command.js';
import { resourcesCommand } from './commands/resources/chat-input-command.js';
import { resourcesMessageCommand } from './commands/resources/message-command.js';

export default {
    commands: [
        guildCommand,
        letmegooglethatCommand,
        plshelpCommand,
        plshelpMessageCommand,
        resourcesCommand,
        resourcesMessageCommand,
    ],
} satisfies Component;
