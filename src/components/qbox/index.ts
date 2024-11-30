import { Component } from '../types.js';
import { aboutCommand } from './commands/about.js';
import { builtinCommand } from './commands/builtin.js';
import { compatCommand } from './commands/compat.js';
import { deprecatedCommand } from './commands/deprecated.js';
import { docsCommand } from './commands/docs.js';
import { onesyncCommand } from './commands/onesync.js';
import { recipesCommand } from './commands/recipes.js';
import { resourceCommand } from './commands/resource.js';
import { supportCommand } from './commands/support/chat-input-command.js';
import { supportMessageCommand } from './commands/support/message-command.js';
import { messageListener } from './imageErrorRecognition.js';

export default {
    commands: [
        aboutCommand,
        builtinCommand,
        compatCommand,
        deprecatedCommand,
        docsCommand,
        onesyncCommand,
        recipesCommand,
        resourceCommand,
        supportCommand,
        supportMessageCommand,
    ],
    gatewayEvents: [messageListener],
} satisfies Component;
