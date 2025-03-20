/**
* @category XRPL
*/


type XRP = {
    currency: 'XRP',
    issuer?: never
}

type IssuedCurrency = {
    currency: string,
    issuer: string
}

type Currency = IssuedCurrency | XRP;



/**
* @category API
*/


type TickerData = {
    date_from: string,
    date_to: string,
    base: string,
    counter: string,
    base_volume: number,
    base_volume_buy: number,
    base_volume_sell: number,
    counter_volume: number,
    counter_volume_buy: number,
    counter_volume_sell: number,
    first: number,
    high: number,
    low: number,
    last: number,
    exchanges: number,
    unique_buyers: number,
    unique_sellers: number,
    trend_interval: number,
    xrpVolume?: number
}



export { Currency, TickerData };