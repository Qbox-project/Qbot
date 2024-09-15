import {
    APIApplicationCommandInteractionDataStringOption,
    APIEmbed,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import { hyperlink, inlineCode } from '@discordjs/formatters';
import {
    color,
    docsUrl,
    githubReposApi,
    icon,
    metricsResourceApi,
    resources,
} from '../constants.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

const RESOURCE_PREFIXES = ['qbx_', 'npwd_qbx_', 'qbx-'];

interface MetricsResourceFail {
    success: false;
}

interface MetricsResourceSuccess {
    success: true;
    lastUpdated: number;
    totalPlayers: number;
    totalServers: number;
    resource: {
        name: string;
        playerRank: number;
        playerRankChange: number;
        players: number;
        serverRank: number;
        serverRankChange: number;
        servers: number;
    };
}

type MetricsResource = MetricsResourceSuccess | MetricsResourceFail;

interface GitHubRepository {
    subscribers_count: number;
    forks: number;
    stargazers_count: number;
}

interface GitHubRepositoryRelease {
    tag_name: string;
    html_url: string;
}

function rankChangeEmoji(rankChange: number): string {
    if (rankChange === 0) return '📊';
    return rankChange > 0 ? '📈' : '📉';
}

function percentage(part: number, whole: number): string {
    return ((part / whole) * 100).toFixed(2);
}

function embed(
    resource: string,
    metrics: MetricsResourceSuccess,
    repo: GitHubRepository | null,
    release: GitHubRepositoryRelease | null,
): APIEmbed {
    const embed: APIEmbed = {
        title: resource,
        fields: [
            {
                name: 'Servers Rank',
                value: `⭐ ${metrics.resource.serverRank}`,
                inline: true,
            },
            {
                name: 'Servers Rank Change',
                value: `${rankChangeEmoji(metrics.resource.serverRankChange)} ${metrics.resource.serverRankChange}`,
                inline: true,
            },
            {
                name: 'Servers',
                value: `🖥️ ${metrics.resource.servers} (${percentage(metrics.resource.servers, metrics.totalServers)}%)`,
                inline: true,
            },
            {
                name: 'Players Rank',
                value: `⭐ ${metrics.resource.playerRank}`,
                inline: true,
            },
            {
                name: 'Players Rank Change',
                value: `${rankChangeEmoji(metrics.resource.playerRankChange)} ${metrics.resource.playerRankChange}`,
                inline: true,
            },
            {
                name: 'Players',
                value: `🖥️ ${metrics.resource.players} (${percentage(metrics.resource.players, metrics.totalPlayers)}%)`,
                inline: true,
            },
        ],
    };

    if (repo) {
        embed.thumbnail = { url: icon };
        embed.color = color;
        embed.fields!.unshift(
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
        );

        if (resources.includes(resource)) {
            embed.fields!.unshift({
                name: 'Documentation',
                value: `${docsUrl}/resources/${resource}`,
            });
        }

        if (release) {
            embed.fields!.unshift({
                name: 'Latest Release',
                value: hyperlink(
                    inlineCode(release.tag_name),
                    release.html_url,
                ),
            });
        }
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

        const metrics = (await (
            await fetch(metricsResourceApi, {
                method: 'POST',
                body: JSON.stringify({ resource }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        ).json()) as MetricsResource;

        if (!metrics.success) {
            await api.interactions.editReply(
                interaction.application_id,
                interaction.token,
                {
                    content: `Failed to fetch ${inlineCode(resource)}.`,
                },
            );
            return;
        }

        let repo: GitHubRepository | null = null;
        let release: GitHubRepositoryRelease | null = null;
        if (
            RESOURCE_PREFIXES.filter((p) => resource.startsWith(p)).length > 0
        ) {
            repo = (await (
                await fetch(`${githubReposApi}/${resource}`)
            ).json()) as GitHubRepository;
            release = (await (
                await fetch(`${githubReposApi}/${resource}/releases/latest`)
            ).json()) as GitHubRepositoryRelease;
        }

        await api.interactions.editReply(
            interaction.application_id,
            interaction.token,
            {
                embeds: [embed(resource, metrics, repo, release)],
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
                choices: resources
                    .filter((r) => r.startsWith(value))
                    .map((r) => ({ name: r, value: r })),
            },
        );
    },
} satisfies ChatInputCommand;
