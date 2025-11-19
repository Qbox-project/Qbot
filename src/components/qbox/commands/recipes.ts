import {
    bold,
    hideLinkEmbed,
    hyperlink,
    unorderedList,
} from '@discordjs/formatters';
import { docsUrl } from '../constants.js';
import { createQuickReplyChatInputCommand } from '/utils/quick-reply.js';

function recipeUrl(recipe: string) {
    return `https://raw.githubusercontent.com/Qbox-project/txAdminRecipe/main/${recipe}.yaml`;
}

const content = `${bold('Qbox offers several different recipes for different use cases:')}
${unorderedList([
    `${hyperlink('Qbox Unstable', hideLinkEmbed(recipeUrl('qbox')))} — a complete server base that comes with all of our actively maintained resources`,
    `${hyperlink('Qbox Lean', hideLinkEmbed(recipeUrl('qbox')))} — a stripped down version of Qbox, without excess resources, and without criminal or civilian activities`,
    `${hyperlink('Qbox Stable', hideLinkEmbed(recipeUrl('qbox')))} — comes with the resources we consider stable based on our ${hyperlink('Release Readiness', hideLinkEmbed(`${docsUrl}/release`))} guidelines`,
])}
There may be caveats to using some of these recipes; learn more in our ${hyperlink('Installation', hideLinkEmbed(`${docsUrl}/installation`))} docs.`;

export const recipesCommand = createQuickReplyChatInputCommand({
    data: {
        name: 'recipes',
        description: 'Send information about how Qbox recipes',
    },
    withOptionalMention: true,
    message: { content },
});
