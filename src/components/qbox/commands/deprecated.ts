import {
    APIApplicationCommandOptionChoice,
    APIInteractionResponseCallbackData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { userMention } from '@discordjs/formatters';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

const deprecated: Record<string, string> = {
    qbx_loading:
        'We no longer support qbx_loading, and use **loadscreen** by d4isdavid, download it here: <https://github.com/D4isDAVID/loadscreen>',
    qbx_vehiclefailure:
        'We no longer use qbx_vehiclefailure, instead we use vehiclehandler by QuantumMalice, download it here: <https://github.com/QuantumMalice/vehiclehandler>',
    qbx_interior:
        'We no longer support qbx_interior, all housing scripts use their own system',
    qbx_prison:
        "We don't use qbx_prison, as we are now using xt_prison made by xT, download it here: <https://github.com/xT-Development/xt-prison>",
    qbx_traphouse: 'No information.',
    qbx_apartments:
        'We no longer use qbx_apartments, as qbx_properties took over its job, you can download it at: <https://github.com/Qbox-project/qbx_properties>',
    qbx_houses:
        'We no longer use qbx_houses, as qbx_properties took over its job, you can download it at: <https://github.com/Qbox-project/qbx_properties>',
    qbx_lockpick:
        'We no longer support qbx_lockpick, as we are now using the ox_lib native skillchecks.',
    PolyZone:
        'We no longer use polyzone, instead we use the ox_lib built-in zones for much better performance.',
    connectqueue:
        'We no longer have connectqueue, as it is now a **built-in** feature for qbx_core.',
    qbx_tunerchip:
        'We no longer use qbx_tunerchip, as it has been removed for users to replace.',
    qbx_commandbinding:
        "We no longer use qbx_commandbinding, instead use ox_lib's built in one.",
    interact_sound:
        'We no longer use interact-sound, as we are using native fivem audio for all of our audio or sound files.',
    qbx_phone:
        'We no longer support qbx_phone, as we switched over to npwd-phone, the best free phone made by Project Error, which you can download from here: <https://github.com/project-error/npwd>',
    qbx_crypto: 'No information.',
    qbx_weathersync:
        'We no longer use qbx_weathersync, as we are using Renewed-Weathersync by Renewed-Scripts, which you can download at: <https://github.com/Renewed-Scripts/Renewed-Weathersync>',
    qbx_fitbit: 'No information',
    qbx_skillbar:
        'We no longer support qbx_lockpick, as we are now using the ox_lib native skillchecks',
    qbx_multicharacter:
        'We no longer use qbx_multicharacter, as we have a built-in one inside of qbx_core.',
    qbx_anticheat: 'No information',
    qbx_printer: 'No information',
    qbx_customs: 'No information',
    qbx_hotdogjob: 'No information',
};
const choices: APIApplicationCommandOptionChoice<string>[] = [];
Object.keys(deprecated).forEach((k) => choices.push({ name: k, value: k }));

export const deprecatedCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'deprecated',
        description: 'send information about a script being deprecated',
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
            content: mention ? `${userMention(mention)}\n ` : '',
        };
        if (resource) {
            response.content! += deprecated[resource];
        } else {
            response.content! += `**The resource you've mentioned is archived.**
Sometimes we deem one of our own resources to be unnecessary, whether because we found an alternative solution or just because it isn't needed anymore.
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
