import { stdout } from 'node:process';
import {
    commands,
    guildCommands,
    loadComponents,
} from './components/loader.js';
import { api, guildId } from './utils/env.js';

await loadComponents();

stdout.write('Fetching application info... ');
const { id } = await api.oauth2.getCurrentBotApplicationInformation();
console.log('Done!');

stdout.write('Deploying commands... ');
await api.applicationCommands.bulkOverwriteGlobalCommands(id, commands);
console.log('Done!');

stdout.write('Deploying guild-specific commands... ');
await api.applicationCommands.bulkOverwriteGuildCommands(
    id,
    guildId,
    guildCommands,
);
console.log('Done!');
