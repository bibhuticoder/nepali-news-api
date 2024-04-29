const axios = require("axios")
const cheerio = require("cheerio")
const storageService = require("../services/storage.service");
const { summarize } = require("../services/gemini.service");
const { hash } = require("../util");

async function scrape() {
    const URL = "https://www.onlinekhabar.com/wp-json/okapi/v1/taja-updates?limit=1000"
    const { data } = await axios.get(URL)
    if (!(data && data.data && data.data.news)) return;

    const totalNewsCount = data.data.news.length;
    console.log("fetched", totalNewsCount, "news list")

    let count = 0;
    for (const n of data.data.news) {
        const { data } = await axios.get(n.link)
        const $ = cheerio.load(data)
        const content = $(".ok18-single-post-content-wrap").text()
        const title = n.title.trim()

        if (title && await storageService.checkNewsExist(title)) {
            console.log(`Exist: ${title}`)
            continue
        }

        try {
            await storageService.storeSingleNews({
                hash: hash(title),
                title: await summarize(title),
                date: Date.now(),
                source: "ok",
                category: null,
                content: await summarize(content)
            })
        } catch (e) {
            console.log(e)
            // store unsummarized
            await storageService.storeSingleNews({
                hash: hash(title),
                title,
                date: Date.now(),
                source: "ok",
                category: null,
                content
            })
        }
        console.log(++count, "/", totalNewsCount)
    }
}

module.exports = { scrape }