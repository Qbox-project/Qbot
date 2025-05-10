import {
    APIApplicationCommandInteractionDataStringOption,
    APIEmbed,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { hyperlink, inlineCode } from '@discordjs/formatters';
import {
    color,
    githubReposApi,
    githubUrl,
    icon,
    metricsResourceUrl,
    resources,
} from '../constants.js';
import { ChatInputCommand } from '/components/types.js';
import { fetchJson } from '/utils/http-request.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';
import { search } from '/utils/search.js';

interface GitHubRepository {
    subscribers_count: number;
    forks: number;
    stargazers_count: number;
}

interface GitHubRepositoryRelease {
    tag_name: string;
    html_url: string;
}

function embed(
    resource: string,
    repo: GitHubRepository,
    release: GitHubRepositoryRelease | undefined,
): APIEmbed {
    const embed: APIEmbed = {
        title: resource,
        url: `${githubUrl}/${resource}`,
        thumbnail: { url: icon },
        color: color,
        fields: [
            {
                name: 'Metrics',
                value: `${metricsResourceUrl}/${resource}`,
            },
            {
                name: 'Watchers',
                value: `${repo.subscribers_count}`,
                inline: true,
            },
            {
                name: 'Forks',
                value: `${repo.forks}`,
                inline: true,
            },
            {
                name: 'Stars',
                value: `${repo.stargazers_count}`,
                inline: true,
            },
        ],
    };

    if (release) {
        embed.fields!.unshift({
            name: 'Latest Release',
            value: hyperlink(inlineCode(release.tag_name), release.html_url),
        });
    }

    return embed;
}

export const resourceCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'resource',
        description: 'Fetch details about a resource',
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: 'name',
                description: 'The name of the resource',
                required: true,
                autocomplete: true,
            },
        ],
    },
    async execute({ api, data: interaction }) {
        const { name: resource } = mapChatInputOptionValues(
            interaction.data,
        ) as {
            name: string;
        };

        await api.interactions.defer(interaction.id, interaction.token);

        const repo = await fetchJson<GitHubRepository>(
            `${githubReposApi}/${resource}`,
        );
        const release = await fetchJson<GitHubRepositoryRelease>(
            `${githubReposApi}/${resource}/releases/latest`,
        );

        if (!repo) {
            await api.interactions.editReply(
                interaction.application_id,
                interaction.token,
                {
                    content:
                        'Failed to fetch resource from our GitHub organization.',
                },
            );
            return;
        }

        await api.interactions.editReply(
            interaction.application_id,
            interaction.token,
            {
                embeds: [embed(resource, repo, release)],
            },
        );
    },
    async autocomplete({ api, data: interaction }) {
        const value = (
            interaction.data
                .options[0]! as APIApplicationCommandInteractionDataStringOption
        ).value;

        await api.interactions.createAutocompleteResponse(
            interaction.id,
            interaction.token,
            {
                choices: search(resources, value).map((r) => ({
                    name: r,
                    value: r,
                })),
            },
        );
    },
} satisfies ChatInputCommand;
