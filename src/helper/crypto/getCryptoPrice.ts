import get from "got";
import { parseHTML } from "linkedom";
import { CryptoData } from "src/@types/CryptoData";

export const getCryptoPrice = async (symbol: string = "BTC"): Promise<CryptoData> => {
    let ticker = symbol || "BTC";
    const reqUrl = `https://www.cointracker.io/price/${ticker}`;
    const res = await get(reqUrl);

    // If the status is bad return out!
    if (res.statusCode !== 200) {
        throw new Error("Couldn't connect to price checking site!");

    }
    if (!res.body) {
        throw new Error("Page had invalid content.");
    }
    if (res.url !== reqUrl) {
        throw new Error("Invalid coin ticker!");
    }

    // Parse the page for the price we want
    const { document } = parseHTML(res.body);
    const priceText = document.querySelector("div > div > span")?.textContent;
    let img = document.querySelector("div.align-items-center > div > img")?.getAttribute("src") || "";

    if (!priceText) {
        throw new Error("Couldn't get price!")
    }
    // Parse the number from the price string
    const price = Number.parseFloat(priceText.replace(/[$,]/g, ""));
    if (Number.isNaN(price)) {
        throw new Error("Error when getting price data!");
    }
    return {
        priceString: priceText,
        price,
        ticker,
        iconURL: img,

    }
}
