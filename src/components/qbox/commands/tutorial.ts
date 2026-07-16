import {
    APIApplicationCommandInteractionDataStringOption,
    APIInteractionResponseCallbackData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { hideLinkEmbed, inlineCode, userMention } from '@discordjs/formatters';
import { XMLParser } from 'fast-xml-parser';
import { color, docsUrl } from '../constants.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';
import { search } from '/utils/search.js';

interface AtomText {
    '#text'?: string;
}

interface AtomEntry {
    author?: { name?: string };
    id?: string;
    link?: { href?: string };
    summary?: AtomText | string;
    title?: AtomText | string;
}

interface AtomDocument {
    feed?: { entry?: AtomEntry | AtomEntry[] };
}

function getText(value: AtomText | string | undefined) {
    return typeof value === 'string' ? value : value?.['#text'];
}

async function fetchFeed() {
    const response = await fetch(`${docsUrl}/blog/atom.xml`, {
        signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch tutorial feed: ${response.status}`);
    }

    const body = await response.text();
    if (Buffer.byteLength(body) > 1_000_000) {
        throw new Error('Tutorial feed exceeds the maximum allowed size');
    }

    const document = new XMLParser({
        attributeNamePrefix: '',
        ignoreAttributes: false,
        processEntities: false,
    }).parse(body) as AtomDocument;
    const items = document.feed?.entry;
    const entries = Array.isArray(items) ? items : items ? [items] : [];

    return new Map(
        entries.flatMap((entry) => {
            const id = entry.id?.replace(`${docsUrl}/blog/`, '');
            const title = getText(entry.title);
            const description = getText(entry.summary);
            const link = entry.link?.href;
            const author = entry.author?.name;

            if (!id || !title || !description || !link || !author) return [];

            return [
                [
                    id,
                    {
                        title,
                        description,
                        link,
                        author,
                    },
                ],
            ] as const;
        }),
    );
}

export const tutorialCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'tutorial',
        description: 'Send a Qbox tutorial link',
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: 'link',
                description: 'The link to send',
                autocomplete: true,
            },
            {
                type: ApplicationCommandOptionType.User,
                name: 'mention',
                description: 'An optional user to mention',
            },
        ],
    },
    async execute({ api, data: interaction }) {
        const { link, mention } = mapChatInputOptionValues(
            interaction.data,
        ) as { link: string; mention: string | undefined };

        await api.interactions.defer(interaction.id, interaction.token);

        const response: APIInteractionResponseCallbackData = {
            content: mention ? `${userMention(mention)} ` : '',
        };

        if (!link) {
            response.content! += `Read our tutorials here: ${docsUrl}/blog`;
        } else {
            const feed = await fetchFeed();
            const entry = feed.get(link);

            if (!entry) {
                await api.interactions.editReply(
                    interaction.application_id,
                    interaction.token,
                    { content: `No such tutorial ${inlineCode(link)}.` },
                );
                return;
            }

            response.content! += hideLinkEmbed(entry.link);
            response.embeds = [
                {
                    title: `Tutorial: ${entry.title}`,
                    url: entry.link,
                    description: entry.description,
                    color,
                    author: { name: entry.author },
                },
            ];
        }

        await api.interactions.editReply(
            interaction.application_id,
            interaction.token,
            response,
        );
    },
    async autocomplete({ api, data: interaction }) {
        const value = (
            interaction.data
                .options[0]! as APIApplicationCommandInteractionDataStringOption
        ).value;

        const feed = await fetchFeed();

        await api.interactions.createAutocompleteResponse(
            interaction.id,
            interaction.token,
            {
                choices: search(Array.from(feed.keys()), value).map((r) => ({
                    name: r,
                    value: r,
                })),
            },
        );
    },
} satisfies ChatInputCommand;
