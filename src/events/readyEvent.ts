import { QuillEvent } from "../QuillLib/abstract/QuillEvent";

export default class ReadyEvent extends QuillEvent {
    // This should only run once.
    once = true;

    get name(): string {
        return "ready";
    }
    
    async execute(): Promise<void> {
        console.log(`Bot ready! Logged in as user ${this.client.user?.username}`);
    }

}