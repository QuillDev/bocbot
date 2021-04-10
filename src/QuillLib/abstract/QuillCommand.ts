import { Message } from "discord.js";
import QuillClient from "./QuillClient";

export abstract class QuillCommand {

    // Bind the client to this command
    protected client:QuillClient;
    constructor(client:QuillClient){
        this.client = client;
    }

    // Name out abstract methods
    abstract get keyword(): string;
    abstract run(msg: Message, args: string[]): Promise<void>;
}