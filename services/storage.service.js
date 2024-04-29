const fs = require("fs")
const { initFile, hash } = require("../util")

const storeSingleNews = async (newsItem) => {
    const path = await initFile();
    let data = JSON.parse(fs.readFileSync(path, "utf-8"))

    const found = data.find(n => n.title === newsItem.title)
    if (!found) {
        data.push(newsItem)
        fs.writeFileSync(path, JSON.stringify(data))
    }
}

const checkNewsExist = async (newsTitle) => {
    const path = await initFile();
    let data = JSON.parse(fs.readFileSync(path, "utf-8"))

    const found = data.find(n => n.hash === hash(newsTitle))
    return found ? true : false
}

module.exports = { storeSingleNews, checkNewsExist }