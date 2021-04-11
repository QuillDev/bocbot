import { Message } from "discord.js";
import { getBalance } from "../helper/crypto/NiceHashHelper";
import { QuillCommand } from "../abstract/QuillCommand";
import { sendEmbed } from "../helper/EmbedHelper";
import { getCryptoPrice } from "../helper/crypto/getCryptoPrice";

export default class Balance extends QuillCommand {
    get keyword(): string[] {
        return ["balance", "gains"];
    }

    async run(msg: Message, args: string[]): Promise<any> {

        const [balance, btcPrice, ethPrice] = await Promise.all([getBalance(), getCryptoPrice(), getCryptoPrice("ETH")]);
        const available = parseFloat(balance.total.available);

        const btc = available;
        const usd = Math.round((btc * btcPrice.price) * 100) / 100;
        const eth = Math.round((usd / ethPrice.price)*1e8)/1e8;
        sendEmbed(msg, {
            title: `Account: **Boys On Coins** :rocket:`,
            description: "Total amount translated into different currencies.",
            fields: [
                { name: "USD", value: `\`\`$${usd}\`\``},
                { name: "BTC", value: `\`\`${btc} BTC\`\``},
                { name: "ETH", value: `\`\`${eth} ETH\`\`` },
            ],
        })
    }

}