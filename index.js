import { input } from "./src/robots/input.js"
import { load } from "./src/robots/saveBot.js";
import textRobot from "./src/robots/text.js";

function start() {
    input();
    textRobot();
    const content = load()
    console.dir(content, { depth: null })
}

start()