import { QuillEvent } from "../QuillLib/abstract/QuillEvent";

export default class Ready extends QuillEvent {
    // This should only run once.
    once = true;

    get name(): string {
        return "ready";
    }
    
    async execute(): Promise<void> {
        console.log("Test!");
    }

}