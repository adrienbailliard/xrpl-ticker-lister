import { XRP_SYMBOL } from "./constants.js";
import { Currency, TickerData } from "./types";



function hexToString(hex: string): string
{
    let str: string = '';

    for (let i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));

    return str;
}



function getCurrencySymbol(currency: Currency): string
{
    return currency.currency.length === 40 ? hexToString(currency.currency) : currency.currency;
}



function getSologenicParam(currency: Currency): string
{
    return currency.currency === XRP_SYMBOL ? currency.currency : currency.currency + "+" + currency.issuer;
}



function getXrplCurrency(counter: string): Currency
{
    if (counter === XRP_SYMBOL)
        return { currency: counter };
    else
    {
        const [ issuer, currency ] = counter.split("_");
        return { currency: currency, issuer: issuer };
    }
}



function getXrpVolume(tickerData: TickerData, tokenPrices: Record<string, number>): number
{
    if (tickerData.counter === XRP_SYMBOL)
        return tickerData.counter_volume;

    else if (tickerData.base === XRP_SYMBOL)
        return tickerData.base_volume;

    else if (tokenPrices[tickerData.base])
        return tokenPrices[tickerData.base] * tickerData.base_volume;

    else
        return tokenPrices[tickerData.counter] * tickerData.counter_volume;
}



export { getCurrencySymbol, getSologenicParam, getXrplCurrency, getXrpVolume };