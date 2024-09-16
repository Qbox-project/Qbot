import { Component } from '../types.js';
import { aboutCommand } from './commands/about.js';
import { builtinCommand } from './commands/builtin.js';
import { compatCommand } from './commands/compat.js';
import { docsCommand } from './commands/docs.js';
import { resourceCommand } from './commands/resource.js';
import { supportCommand } from './commands/support/chat-input-command.js';
import { supportMessageCommand } from './commands/support/message-command.js';

export default {
    commands: [
        aboutCommand,
        builtinCommand,
        compatCommand,
        docsCommand,
        resourceCommand,
        supportCommand,
        supportMessageCommand,
    ],
} satisfies Component;
