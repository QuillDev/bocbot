import { Client, Message, MessageEmbed } from "discord.js";
import { QuillCommand } from "../abstract/QuillCommand";
import { sendErrorEmbed, sendRawEmbed } from "../helper/EmbedHelper";
import { getCryptoPrice } from "../helper/crypto/getCryptoPrice";
import QuillClient from "src/abstract/QuillClient";
export default class Price extends QuillCommand {

    private map = new Map<string, number>();

    constructor(client: QuillClient) {
        super(client);
        this.map.set("BTC", 1);
        this.map.set("ETC", 1027);
        this.map.set("BNB", 1839);
        this.map.set("DOGE", 74);

    }
    get keyword(): string {
        return "price";
    }
    async run(msg: Message, args: string[]): Promise<any> {
        await getCryptoPrice(args[0])
            .then(async ({ iconURL, priceString, ticker }) => {

                let img = `https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd/${this.map.get(ticker) || ""}.png`
                await sendRawEmbed(msg,
                    new MessageEmbed()
                        .setAuthor("Market Price", iconURL || "")
                        .setDescription(`The current price of **${ticker.toUpperCase() || ""}** is **${priceString}**`)
                        .setImage(img)
                        .setTimestamp(Date.now())
                )
            })
            .catch((err) => { sendErrorEmbed(msg, err.message) });
    }

}