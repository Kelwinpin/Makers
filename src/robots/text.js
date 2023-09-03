import chalk from "chalk";
import wiki from "wikipedia";
import { sentences } from "sbd";
import natural from "natural";
import { load, save } from "./saveBot.js"

function textRobot() {
    const content = load()
    fetchContentFromWikipedia(content);

    async function fetchContentFromWikipedia(content) {
        try {
            await wiki.setLang('en');
            const page = await wiki.page(`${content.searchTerm}`)
            content.originalSource = await page.content();
            sanitizeContent(content.originalSource);
            save(content);
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
        content.sentences = [];
        const textSentences = sentences(text);

        textSentences.forEach(sentence => {
            content.sentences.push({
                text: sentence,
                keywords: takeKeywords(sentence),
                images: []
            })
        });

        return content.sentences;
    }

    function takeKeywords(setence) {
        const tags = new natural.WordTokenizer();
        const tokens = tags.tokenize(setence);

        const wordFreq = {};
        for (const token of tokens) {
            const word = token.toLowerCase();
            if (wordFreq[word]) {
                wordFreq[word]++;
            } else {
                wordFreq[word] = 1;
            }
        }
        const keywordThreshold = 1;
        const keywords = Object.keys(wordFreq).filter(word => wordFreq[word] > keywordThreshold);
        return keywords;
    }
}

export default textRobot;