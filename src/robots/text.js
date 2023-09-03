import chalk from "chalk";
import wiki from "wikipedia";
import { sentences } from "sbd";

function textRobot(content) {
    fetchContentFromWikipedia(content);

    async function fetchContentFromWikipedia(content) {

        try {
            await wiki.setLang('pt');
            const page = await wiki.page(`${content.searchTerm}`)
            content.originalSource = await page.content();
            sanitizeContent(content.originalSource)
        } catch (error) {
            console.log(chalk.redBright(error.message));
        }
    }

    function sanitizeContent(text) {
        const sanitizeText = withoutBlankLinesAndMarkdown(text);
        const clearText = breakContentIntoSentences(sanitizeText);
        console.log(clearText);

        function withoutBlankLinesAndMarkdown(text) {
            const allLines = text.split('\n');
            const withoutBlankLinesAndMarkdown = allLines.filter(line => {
                if (line.trim().length === 0 || line.trim().startsWith("=")) {
                    return false;
                }
                return true;
            })
            return withoutBlankLinesAndMarkdown.join(" ");
        }
    }

    function breakContentIntoSentences(text) {
        content.sentences = []
        const textSentences = sentences(text);

        textSentences.forEach(sentence => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            })
        });

        return content.sentences;

    }
}

export default textRobot;