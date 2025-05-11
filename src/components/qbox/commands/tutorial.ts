import {
    APIApplicationCommandInteractionDataStringOption,
    APIInteractionResponseCallbackData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { hideLinkEmbed, inlineCode, userMention } from '@discordjs/formatters';
import rss from 'rss-to-json';
import { color, docsUrl } from '../constants.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';
import { search } from '/utils/search.js';

async function fetchFeed() {
    const response = await rss.parse(`${docsUrl}/blog/atom.xml`);

    const entries = response.items.map(
        (x) =>
            [
                x.id.replace(`${docsUrl}/blog/`, ''),
                {
                    title: x.title,
                    description: x.description,
                    link: x.link,
                    author: x.author,
                },
            ] as [
                string,
                {
                    title: string;
                    description: string;
                    link: string;
                    author: string;
                },
            ],
    );

    return new Map(entries);
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
