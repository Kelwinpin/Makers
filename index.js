import readLine from "readline-sync"
import textRobot from "./src/robots/text.js"

function start() {
    const content = {}

    content.searchTerm = askAndReturnSearchedTerm();
    content.prefix = askAndReturnPrefix();

    textRobot(content)

    function askAndReturnSearchedTerm() {
        return readLine.question("Search:")
    }

    function askAndReturnPrefix() {
        const prefixes = ["Who is", "What is", "The history of"];
        const selectOption = readLine.keyInSelect(prefixes);
        return prefixes[selectOption];
    }

    console.log(content)
}

start()