import {
    APIInteractionResponseCallbackData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import {
    bold,
    hideLinkEmbed,
    hyperlink,
    inlineCode,
    userMention,
} from '@discordjs/formatters';
import {
    fivemDocsUrl,
    fivemNativesUrl,
    githubUrl,
    oxUrl,
} from '../constants.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

const deprecated: Record<string, string | [string, string]> = {
    connectqueue: ["Use qbx_core's built-in queue.", 'unused'],
    interact_sound: [
        `Use FiveM ${hyperlink('native audio', hideLinkEmbed(`${fivemNativesUrl}/?_0x7FF4944CC209192D`))} functionality.`,
        'unused',
    ],
    PolyZone: `Use ${hyperlink(inlineCode('lib.zones'), hideLinkEmbed(`${oxUrl}/ox_lib/Modules/Zones/Shared`))}.`,
    ['qbx-anticheat']: 'None. Anticheat resources are not recommended.',
    qbx_apartments: `Use ${hyperlink('qbx_properties', hideLinkEmbed(`${githubUrl}/qbx_properties`))}.`,
    qbx_commandbinding: `Use FiveM's native ${hyperlink(inlineCode('bind'), hideLinkEmbed(`${fivemDocsUrl}/client-manual/console-commands/#bind-mapper-input-command`))} command.`,
    qbx_crypto: 'None.',
    qbx_fitbit: 'None.',
    ['qbx-hotdogjob']: 'None.',
    qbx_houses: `Use ${hyperlink('qbx_properties', hideLinkEmbed(`${githubUrl}/qbx_properties`))}.`,
    qbx_interior: 'None. Housing resources provide their own interior system.',
    qbx_loading: `Use ${hyperlink('D4isDAVID/loadscreen', hideLinkEmbed('https://github.com/D4isDAVID/loadscreen'))}.`,
    qbx_lockpick: `Use ${hyperlink(inlineCode('lib.skillCheck'), hideLinkEmbed(`${oxUrl}/ox_lib/Modules/Interface/Client/skillcheck`))} or a custom solution.`,
    ['qbx-multicharacter']: "Use qbx_core's built-in character selection.",
    qbx_phone: `Use ${hyperlink('project-error/npwd', hideLinkEmbed('https://github.com/project-error/npwd'))}.`,
    ['qbx-printer']: 'None.',
    qbx_prison: `Use ${hyperlink('xT-Development/xt-prison', hideLinkEmbed('https://github.com/xT-Development/xt-prison'))}.`,
    qbx_skillbar: `Use ${hyperlink(inlineCode('lib.skillCheck'), hideLinkEmbed(`${oxUrl}/ox_lib/Modules/Interface/Client/skillcheck`))}.`,
    qbx_traphouse: 'None.',
    qbx_tunerchip: 'None.',
    qbx_vehiclefailure: `Use ${hyperlink('QuantumMalice/vehiclehandler', hideLinkEmbed('https://github.com/QuantumMalice/vehiclehandler'))}.`,
    qbx_weathersync: `Use ${hyperlink('Renewed-Scripts/Renewed-Weathersync', hideLinkEmbed('https://github.com/Renewed-Scripts/Renewed-Weathersync'))}.`,
};
const choices = Object.keys(deprecated).map((k) => ({ name: k, value: k }));

export const deprecatedCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'deprecated',
        description: 'Send information about an archived or unused resource',
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: 'resource',
                description: 'An optional exact resource to talk about',
                choices,
            },
            {
                type: ApplicationCommandOptionType.User,
                name: 'mention',
                description: 'An optional user to mention',
            },
        ],
    },
    async execute({ api, data: interaction }) {
        const { resource, mention } = mapChatInputOptionValues(
            interaction.data,
        ) as { resource: string | undefined; mention: string | undefined };

        const response: APIInteractionResponseCallbackData = {
            content: mention ? `${userMention(mention)} ` : '',
        };

        if (resource && resource in deprecated) {
            const obj = deprecated[resource];
            const alternative = typeof obj === 'string' ? obj : obj![0];
            const keyword = typeof obj === 'string' ? 'archived' : obj![1];

            response.content! += `${bold(`${resource} is ${keyword}.`)}
Recommended alternative: ${alternative}`;
        } else {
            response.content! += `${bold("The resource you've mentioned is archived or unused.")}
Sometimes we deem a resource (sometimes one of our own) to be unnecessary or not up to par, whether because we found an alternative solution or just because it isn't needed anymore.
In such cases, the GitHub repository for such resource will be archived—not accepting any more changes.
You should use a recommended alternative instead.`;
        }

        await api.interactions.reply(
            interaction.id,
            interaction.token,
            response,
        );
    },
} satisfies ChatInputCommand;
