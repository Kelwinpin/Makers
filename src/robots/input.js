import readLine from "readline-sync"
import { save } from "./saveBot.js";

export function input() {
    const content = {}

    content.searchTerm = askAndReturnSearchedTerm();
    content.prefix = askAndReturnPrefix();

    save(content)

    function askAndReturnSearchedTerm() {
        return readLine.question("What do you to search:")
    }

    function askAndReturnPrefix() {
        const prefixes = ["Who is", "What is", "The history of"];
        const selectOption = readLine.keyInSelect(prefixes);
        return prefixes[selectOption];
    }
}