import { Message, MessageEmbed } from "discord.js";
import { QuillCommand } from "../abstract/QuillCommand";
import { parseHTML } from "linkedom";
import get from "got";
import { sendErrorEmbed, sendRawEmbed } from "../helper/EmbedHelper";

export default class Price extends QuillCommand {
    get keyword(): string {
        return "price";
    }
    async run(msg: Message, args: string[]): Promise<any> {
        let ticker = (!args.length || args.length === 0) ? "BTC" : args[0];
        const reqUrl = `https://www.cointracker.io/price/${ticker}`;
        const res = await get(reqUrl);

        // If the status is bad return out!
        if (res.statusCode !== 200) {
            return await sendErrorEmbed(msg, "Couldn't connect to price checking site!");

        }
        if (!res.body) {
            return await sendErrorEmbed(msg, "Page had invalid content.");
        }
        if (res.url !== reqUrl) {
            return await sendErrorEmbed(msg, "Invalid coin ticker!");
        }

        // Parse the page for the price we want
        const { document } = parseHTML(res.body);
        const price = document.querySelector("div > div > span")?.textContent;
        let img = document.querySelector("div.align-items-center > div > img")?.getAttribute("src");

        if (!price) {
            return await sendErrorEmbed(msg, "Couldn't get price!")
        }
        if (!img) {
            img = this.client.user!.displayAvatarURL();
        }

        return await sendRawEmbed(msg,
            new MessageEmbed()
                .setAuthor("Market Price", img)
                .setDescription(`The current price of **${ticker.toUpperCase()}** is **${price}**`)
                .setTimestamp(Date.now())
        )

    }

}