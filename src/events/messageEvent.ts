import { Message } from "discord.js";
import { QuillEvent } from "../abstract/QuillEvent";

export default class MessageEvent extends QuillEvent {
    get name(): string {
        return "message"
    }
    async execute(msg:Message): Promise<void> {
        if(msg.author.bot) return;
        if(!msg.content.startsWith(process.env.PREFIX!)) return;

        // Get the args + keywork for the command
        const args = msg.content.substring(process.env.PREFIX!.length, msg.content.length).split(" ");
        const keyword = args.shift();

        if(!keyword) return; //If there is no keyword return.

        const command = this.client.commands.get(keyword.toLowerCase());

        if(!command) return; // If the command was bad, return

        command.run(msg, args); // Execute the matching command.
    }

}