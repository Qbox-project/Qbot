import { Component } from '../types.js';
import { aboutCommand } from './commands/about.js';
import { anticheatsCommand } from './commands/anticheats.js';
import { builtinCommand } from './commands/builtin.js';
import { compatCommand } from './commands/compat.js';
import { deprecatedCommand } from './commands/deprecated.js';
import { docsCommand } from './commands/docs.js';
import { gamehostsCommand } from './commands/gamehosts.js';
import { mariadbCommand } from './commands/mariadb.js';
import { motdCommand } from './commands/motd.js';
import { onesyncCommand } from './commands/onesync.js';
import { portsCommand } from './commands/ports.js';
import { recipesCommand } from './commands/recipes.js';
import { resourceCommand } from './commands/resource.js';
import { supportCommand, supportMessageCommand } from './commands/support.js';
import { tebexCommand } from './commands/tebex.js';
import { ticketreplyCommand } from './commands/ticketreply.js';
import { tutorialCommand } from './commands/tutorial.js';

export default {
    commands: [
        aboutCommand,
        anticheatsCommand,
        builtinCommand,
        compatCommand,
        deprecatedCommand,
        docsCommand,
        gamehostsCommand,
        mariadbCommand,
        motdCommand,
        onesyncCommand,
        portsCommand,
        recipesCommand,
        resourceCommand,
        supportCommand,
        supportMessageCommand,
        tebexCommand,
        ticketreplyCommand,
        tutorialCommand,
    ],
} satisfies Component;
