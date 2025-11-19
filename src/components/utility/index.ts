import { Component } from '../types.js';
import { guildCommand } from './commands/guild.js';
import { learnCommand, learnMessageCommand } from './commands/learn.js';
import { letmegooglethatCommand } from './commands/letmegooglethat.js';
import { plshelpCommand, plshelpMessageCommand } from './commands/plshelp.js';

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
