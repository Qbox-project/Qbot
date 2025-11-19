import { Component } from '../types.js';
import { aboutCommand } from './commands/about.js';
import { builtinCommand } from './commands/builtin.js';
import { compatCommand } from './commands/compat.js';
import { deprecatedCommand } from './commands/deprecated.js';
import { docsCommand } from './commands/docs.js';
import { mariadbCommand } from './commands/mariadb.js';
import { onesyncCommand } from './commands/onesync.js';
import { recipesCommand } from './commands/recipes.js';
import { resourceCommand } from './commands/resource.js';
import { supportCommand, supportMessageCommand } from './commands/support.js';
import { tebexCommand } from './commands/tebex.js';
import { tutorialCommand } from './commands/tutorial.js';

export default {
    commands: [
        aboutCommand,
        builtinCommand,
        compatCommand,
        deprecatedCommand,
        docsCommand,
        mariadbCommand,
        onesyncCommand,
        recipesCommand,
        resourceCommand,
        supportCommand,
        supportMessageCommand,
        tebexCommand,
        tutorialCommand,
    ],
} satisfies Component;
