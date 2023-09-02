import chalk from "chalk";
import wiki from "wikipedia";

function textRobot(content) {
    fetchContentFromWikipedia(content);

    async function fetchContentFromWikipedia(content) {

        try {
            await wiki.setLang('en');
            const page = await wiki.page(`${content.searchTerm}`)
            const summary = await page.summary();
            console.log(chalk.greenBright(summary.extract))
        } catch (error) {
            console.log(chalk.redBright(error.message));
        }
    }
}

export default textRobot;