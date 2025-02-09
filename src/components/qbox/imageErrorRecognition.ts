import { GatewayDispatchEvents } from '@discordjs/core';
import { ocrSpaceKey, ocrSpaceUrl } from '../../utils/env.js';
import { GatewayEvent } from '../types.js';

let errorMessages = {
    'default game behaviour':
        'This issue is with the game, as it is disabling the weapon use. Please read [#1825](<https://github.com/overextended/ox_inventory/issues/1825>) to understand, that this is not an Inventory issue.',
    GetCoreObject:
        'This happens when you either don\'t have the bridge enabled, or are trying to use this export on the qbx_core. This is fixable by using qb-core for the export name (so exports["qb-core"] instead of qbx_core, or using the convar `setr qbx:enableBridge "true"`, This could also be an error inside the core. \nRead More at: <https://docs.qbox.re/faq#no-such-export-getcoreobject-in-resource-qbx_core>',
    GetCore0bject:
        'This happens when you either don\'t have the bridge enabled, or are trying to use this export on the qbx_core. This is fixable by using qb-core for the export name (so exports["qb-core"] instead of qbx_core, or using the convar `setr qbx:enableBridge "true"`, This could also be an error inside the core. \nRead More at: <https://docs.qbox.re/faq#no-such-export-getcoreobject-in-resource-qbx_core>',
    'Illegal mix of collations':
        "you're database has mixed up collations, to fix this go into your database and at the `Collation` section change it to the collation that the players database uses. \nRead More at <https://docs.qbox.re/faq#error-sql-cant-create-table-xyz-foreign-key-constraint-is-incorrectly-formed>",
    'rate limit exceeded':
        "Don't worry, this is not an issue with our framework, instead a limitation on github, for its api to be able to be free. Please Wait 3-5 minutes or Try changing your IP address. \nRead More at <https://docs.qbox.re/faq#txadmin-installation-task-failed-response-code-403-rate-limit-exceeded>",
};

async function parseImage(url: string) {
    const response = await fetch(ocrSpaceUrl, {
        method: 'POST',
        headers: {
            apikey: ocrSpaceKey,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            language: 'eng',
            url: url,
        }),
    });
    const data: any = await response.json();
    if (data.ParsedResults && data.ParsedResults.length > 0) {
        const parsedResult = data.ParsedResults[0];
        let parsedText = parsedResult.ParsedText || null;
        return parsedText;
    } else {
        return;
    }
}

async function parseMessage(url: string) {
    let parsedText = await parseImage(url);
    if (!parsedText) {
        return;
    }
    for (const key in errorMessages) {
        if (parsedText.toLowerCase().includes(key.toLowerCase())) {
            return errorMessages[key as keyof typeof errorMessages];
        }
    }
    return;
}

export const imageErrorRecognition = {
    name: GatewayDispatchEvents.MessageCreate,
    type: 'on',
    async execute({ api, data: message }) {
        if (message.attachments.length <= 0) return;

        message.attachments.forEach(async ({ url }) => {
            const isImage =
                url.includes('.png') ||
                url.includes('.jpg') ||
                url.includes('.jpeg');
            if (!isImage) return;
            await api.channels.addMessageReaction(
                message.channel_id,
                message.id,
                '🔍',
            );
            let result = await parseMessage(url);
            await api.channels.deleteOwnMessageReaction(
                message.channel_id,
                message.id,
                '🔍',
            );

            if (!result) return;
            await api.channels.createMessage(message.channel_id, {
                content:
                    result +
                    '\n\n-# Do you think this was a mistake? We are trying to improve our Image Recognition and any suggestions are welcome.',
                message_reference: {
                    message_id: message.id,
                },
            });
        });
    },
} satisfies GatewayEvent<GatewayDispatchEvents.MessageCreate>;
