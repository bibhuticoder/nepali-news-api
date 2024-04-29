const axios = require("axios")
const cheerio = require("cheerio")
const moment = require("moment");
const storageService = require("../services/storage.service");
const { summarize } = require("../services/gemini.service");
const { hash } = require("../util");

async function scrape() {
    const URL = "https://nepalnews.com"
    const { data } = await axios.get(URL)
    if (!data) return;

    const $ = cheerio.load(data)

    const isValidNewsLink = (href) =>
        href && !href.includes('/s/gallery') && href.includes('https://nepalnews.com/s/') && href.replace('https://nepalnews.com/s/', "").includes("/")

    const newsLinks = []
    $('a').each(async (index, element) => {
        const href = $(element).attr('href');
        if (isValidNewsLink(href) && !newsLinks.includes(href)) newsLinks.push(href)
    });
    if (!newsLinks.length) return;
    console.log("fetched", newsLinks.length, "news list")

    let count = 0;
    for (const newsLink of newsLinks) {
        const { data } = await axios.get(newsLink)
        const $$ = cheerio.load(data)

        let date = null
        let content = null
        let title = newsLink.split("/").pop()
        let category = newsLink.replace('https://nepalnews.com/s/', "").split("/")[0]

        if (title && await storageService.checkNewsExist(title)) {
            console.log(`Exist: ${title}`)
            continue
        }

        // date of news
        const dateRegex = /\d{4} \w{3} \d{1,2}, \d{2}:\d{2},/;
        $$('span').each((index, element) => {
            const text = $(element).text();
            if (text && dateRegex.test(text)) date = moment(text.split(",")[0].trim(), "YYYY MMM DD").valueOf() || Date.now()
        });
        if (!date || date === null || date === "null") date = Date.now()


        $$('div').each((index, element) => {
            const numP = $(element).find('p').length;
            if (numP > 2) content = $(element).text();
        });

        try {
            await storageService.storeSingleNews({
                hash: hash(title),
                title: await summarize(title),
                date,
                source: "nn",
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
                source: "nn",
                category,
                content
            })
        }

        console.log(++count, "/", newsLinks.length)
    }
}

module.exports = { scrape }