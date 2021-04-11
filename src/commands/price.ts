import { Message, MessageEmbed } from "discord.js";
import { QuillCommand } from "../abstract/QuillCommand";
import { sendErrorEmbed, sendRawEmbed } from "../helper/EmbedHelper";
import { getCryptoPrice } from "../helper/crypto/getCryptoPrice";

export default class Price extends QuillCommand {
    get keyword(): string {
        return "price";
    }

    async run(msg: Message, args: string[]): Promise<any> {
        await getCryptoPrice(args[0])
            .then(async ({ iconURL, priceString, ticker }) => {
                await sendRawEmbed(msg,
                    new MessageEmbed()
                        .setAuthor("Market Price", iconURL || "")
                        .setDescription(`The current price of **${ticker.toUpperCase() || ""}** is **${priceString}**`)
                        .setTimestamp(Date.now())
                )
            })
            .catch((err) => { sendErrorEmbed(msg, err.message) });
    }

}