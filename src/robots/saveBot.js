import fs from "fs"
const contentFilePath = "./src/saves/save.json"

export function save(content) {
    const contentString = JSON.stringify(content);
    return fs.writeFileSync(contentFilePath, contentString);
}

export function load() {
    const fileBuffer = fs.readFileSync(contentFilePath, "utf-8");
    const contentJson = JSON.parse(fileBuffer);
    return contentJson;
}