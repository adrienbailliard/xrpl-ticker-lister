import axios from 'axios';
import { XRP_SYMBOL } from "./constants.js";
import { TickerData, Currency } from "./types";
import { getCurrencySymbol, getSologenicParam, getXrplCurrency, getXrpVolume } from "./utils.js";

import { createRequire } from "module";
const config = createRequire(import.meta.url)("../config.json");



async function main(): Promise<void>
{
	process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
    process.stdout.write('\x1b]0;XRPL Ticker Lister\x07');
    console.log("XRPL Ticker Lister,\nby Adrien Bailliard\n\n");


    const request = await axios.get('https://data.xrplf.org/v1/iou/ticker_data/all?interval=' + config.interval + 'd&exclude_amm=true&min_exchanges=' + config.minExchanges);
    const tokenPrices: Record<string, number> = {};

    const tickersData: Array<TickerData> = request.data.filter((ticker: TickerData) =>
    {
        if (ticker.counter === XRP_SYMBOL)
            tokenPrices[ticker.base] = ticker.last;

        return ticker.unique_buyers >= config.minUniqueBuyersAndSellers && ticker.unique_sellers >= config.minUniqueBuyersAndSellers;
    });


    tickersData.forEach(ticker => ticker.xrpVolume = getXrpVolume(ticker, tokenPrices));
    tickersData.sort((a: TickerData, b: TickerData) => b.xrpVolume! - a.xrpVolume!);


    const maxResults: number = Math.min(tickersData.length, config.maxResults);

    for (let i = maxResults - 1; i >= 0; i--)
    {
    	const baseCurrency: Currency = getXrplCurrency(tickersData[i].base);
        const quoteCurrency: Currency = getXrplCurrency(tickersData[i].counter);

        console.log("#" + (i + 1), getCurrencySymbol(baseCurrency) + "/" + getCurrencySymbol(quoteCurrency));
        console.log(" Volume: \x1b[33m%s\x1b[0m", tickersData[i].xrpVolume!.toFixed(0));
        console.log(" Exchanges:", tickersData[i].exchanges);
        console.log(" Unique buyers:", tickersData[i].unique_buyers);
        console.log(" Unique sellers:", tickersData[i].unique_sellers);
        console.log(" Market place: https://sologenic.org/trade?market=" + getSologenicParam(baseCurrency) + "/" + getSologenicParam(quoteCurrency), "\n");
    }


	process.stdout.write("\nPress [Enter] to exit...");
    process.stdin.on('data', () => process.exit());
}


main();