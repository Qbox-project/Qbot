import { Component } from '../types.js';
import { aboutCommand } from './commands/about.js';
import { docsCommand } from './commands/docs.js';
import { resourceCommand } from './commands/resource.js';
import { supportCommand } from './commands/support/chat-input-command.js';
import { supportMessageCommand } from './commands/support/message-command.js';

export default {
    commands: [
        aboutCommand,
        docsCommand,
        resourceCommand,
        supportCommand,
        supportMessageCommand,
    ],
} satisfies Component;
