import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from '@discordjs/core';
import {
    bold,
    hideLinkEmbed,
    hyperlink,
    unorderedList,
    userMention,
} from '@discordjs/formatters';
import { docsUrl } from '../constants.js';
import { ChatInputCommand } from '/components/types.js';
import { mapChatInputOptionValues } from '/utils/interactions.js';

function recipeUrl(recipe: string) {
    return `https://raw.githubusercontent.com/Qbox-project/txAdminRecipe/main/${recipe}.yaml`;
}

export const recipesCommand = {
    data: {
        type: ApplicationCommandType.ChatInput,
        name: 'recipes',
        description: 'Send information about how Qbox recipes',
        options: [
            {
                type: ApplicationCommandOptionType.Mentionable,
                name: 'mention',
                description: 'An optional user to mention',
            },
        ],
    },
    async execute({ api, data: interaction }) {
        const { mention } = mapChatInputOptionValues(interaction.data) as {
            mention: string | undefined;
        };

        const content = [
            bold(
                'Qbox offers several different recipes for different use cases:',
            ),
            unorderedList([
                `${hyperlink('Qbox Unstable', hideLinkEmbed(recipeUrl('qbox')))} — a complete server base that comes with all of our actively maintained resources`,
                `${hyperlink('Qbox Lean', hideLinkEmbed(recipeUrl('qbox')))} — a stripped down version of Qbox, without excess resources, and without criminal or civilian activities`,
                `${hyperlink('Qbox Stable', hideLinkEmbed(recipeUrl('qbox')))} — comes with the resources we consider stable based on our ${hyperlink('Release Readiness', hideLinkEmbed(`${docsUrl}/release`))} guidelines`,
            ]),
            `There may be caveats to using some of these recipes; learn more in our ${hyperlink('Installation', hideLinkEmbed(`${docsUrl}/installation`))} docs.`,
        ];
        if (mention) content.unshift(userMention(mention));

        await api.interactions.reply(interaction.id, interaction.token, {
            content: content.join('\n'),
        });
    },
} satisfies ChatInputCommand;
