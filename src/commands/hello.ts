import { Message } from "discord.js";
import { QuillCommand } from "../abstract/QuillCommand";

export default class Hello extends QuillCommand {
    get keyword(): string {
        return "hello";
    }
    async run(msg: Message, _args: string[]): Promise<void> {
        await msg.channel.send("Hello!");
    }
}