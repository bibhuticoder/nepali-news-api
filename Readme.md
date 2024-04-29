# Nepali News API

This repository contains daily news from Nepal, scraped from Official News websites. The data can be accessed via API calls.

These websites are used for scraping. You can find the abbreviation mentioned on the data also.
- ***ok***: Online Khabar
- ***nn***: Nepal News
- ***kp***: Kathmandu Post

In order to keep the contents short, the scraped inforamtion are processed by AI to generate a summary.

## API endpoints
- `/__daily_news/YYYY_MM_DD.json`

## Examples
[/__daily_news/2024_04_29.json](https://bibhuticoder.github.io/nepali-news-api/__daily_news/2024_04_29.json)
```json
    {
        "hash": "6d3889ccfb52dd59b8667d88bd4b20779ddac2e965c08bea1fc56c172ba197e5",
        "title": "India and China made big promises to invest in Nepal at an investment summit.",
        "date": 1714328100000,
        "source": "kp",
        "category": "money",
        "content": "**China's Economic Diplomacy for Nepal**\n\n* China announced it will:\n    * Exempt Nepali citizens from visa fees to visit China starting May 1.\n    * Start flights from China to Pokhara and Lumbini, Nepal's new airports.\n    * Continue investing in Nepal's infrastructure and economic development.\n\n**India's Economic Engagement with Nepal**\n\n* India stated it is Nepal's largest cumulative foreign direct investor (FDI) and continues to encourage Indian companies to invest.\n* India emphasized the importance of Nepal's hydropower exports to India and is discussing a trilateral power trade agreement with Nepal and Bangladesh.\n\n**Nepal's Investment Summit**\n\n* Over 1,100 foreign participants attended Nepal's Investment Summit, representing India and China.\n* The summit showcased Nepal's investment opportunities in sectors like hydropower and infrastructure.\n* Nepal announced incentives for foreign investors, including tax breaks and protection of intellectual property rights.\n\n**Other Key Points**\n\n* Nepal seeks to attract investment from both China and India to boost its economic development.\n* India-Nepal cooperation focuses on hydropower exports, while China-Nepal cooperation emphasizes infrastructure and connectivity.\n* The United States Chamber of Commerce encourages Nepal to continue economic reforms to improve its business environment and attract foreign investment."
    }
```
> Note:
>
> ***hash***: unique identifier for each news item
> 
> ***date***: store in timestamp
>
> ***source***: view the abbreviation above

## How does it work
Scraping is done 3 times a day at 10:00 AM, 3:05 PM, and 12:00(midnight). Processing is done by AI and data is pushed to this Github repo.

## Contribution
We are open to any kind of suggestions and improvements. Please feel free to contribute by any means possible 😀
