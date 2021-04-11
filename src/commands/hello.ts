import { Message } from "discord.js";
import { sendEmbed } from "../helper/EmbedHelper";
import { QuillCommand } from "../abstract/QuillCommand";

export default class Help extends QuillCommand {
    get keyword(): string {
        return "help";
    }
    async run(msg: Message, _args: string[]): Promise<void> {
        await sendEmbed(msg, {
            description: `**Key**: 
            *[]* - Argument
            *[?]* - Optional Argument
            `,
            fields: [
                {name: "```$help```", "value": "Gives you this exact menu.. Literally."},
                {name: "```$price [?Coin Ticker]```", "value": "Gives the current price of the given coin (Default BTC)"},
                {name: "```$balance```", "value": "Gets the The Boys on Coins account balance."},
            ]
        })
    }
}