import { setPresence } from "../helper/presence/setPresence";
import { QuillEvent } from "../abstract/QuillEvent";

export default class ShardResumeEvent extends QuillEvent {

    get name(): string {
        return "ready";
    }
    
    async execute(): Promise<void> {
        setPresence(this.client);
    }

}