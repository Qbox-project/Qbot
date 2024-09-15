import { Component } from '../types.js';
import { guildCommand } from './commands/guild.js';

export default {
    commands: [guildCommand],
} satisfies Component;
