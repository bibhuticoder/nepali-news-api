const okScraper = require("./scrapers/ok.scraper");
const nnScraper = require("./scrapers/nn.scraper");
const kpScraper = require("./scrapers/kp.scraper");
const fs = require("fs");
(async () => {
    // console.log("====================OK=====================")
    // await okScraper.scrape()

    // console.log("====================NN=====================")
    // await nnScraper.scrape()

    // console.log("====================KP=====================")
    // await kpScraper.scrape()

    fs.writeFileSync("./__daily_news/test.txt", "test 8");
    console.log("File added");
})()