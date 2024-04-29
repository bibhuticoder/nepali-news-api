const axios = require("axios")
const cheerio = require("cheerio")
const moment = require("moment");
const storageService = require("../services/storage.service");
const { summarize } = require("../services/gemini.service");
const { hash } = require("../util");

async function scrape() {
    const URL = "https://kathmandupost.com"
    const { data } = await axios.get(URL)
    if (!data) return;

    const $ = cheerio.load(data)

    const isValidNewsLink = (href) => {
        const hrefRegex = /^\/\w+\/\d{4}\/\d{2}\/\d{2}\/[\w-]+$/;
        return href && hrefRegex.test(href)
    }

    const newsLinks = []
    $('a').each(async (index, element) => {
        const href = $(element).attr('href');
        if (isValidNewsLink(href) && !newsLinks.includes(URL + href)) newsLinks.push(URL + href)
    });

    if (!newsLinks.length) return;
    console.log("fetched", newsLinks.length, "news list")

    let count = 0;
    for (const newsLink of newsLinks) {
        const { data } = await axios.get(newsLink)
        const $$ = cheerio.load(data)

        let urlChunks = newsLink.replace('https://kathmandupost.com/', "").split("/")
        let category = urlChunks[0]
        let date = moment(urlChunks[1] + "/" + urlChunks[2] + "/" + urlChunks[3], "YYYY/MM/DD").valueOf();
        let title = urlChunks.pop()
        let content = ""

        if (title && await storageService.checkNewsExist(title)) {
            console.log(`Exist: ${title}`)
            continue
        }

        $$('.story-section').each((index, element) => {
            const numP = $(element).find('p').length;
            if (numP > 2) content += $(element).text();
        });

        try {
            await storageService.storeSingleNews({
                hash: hash(title),
                title: await summarize(title),
                date,
                source: "kp",
                category,
                content: await summarize(content)
            })
        } catch (e) {
            console.log(e)
            // store unsummarized
            await storageService.storeSingleNews({
                hash: hash(title),
                title,
                date,
                source: "kp",
                category,
                content
            })
        }

        console.log(++count, "/", newsLinks.length)
    }
}

module.exports = { scrape }