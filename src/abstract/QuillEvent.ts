import QuillClient from "./QuillClient";

export abstract class QuillEvent {

    // Allow access to the client in this events children
    protected client: QuillClient;
    public once: boolean = false;
    constructor(client: QuillClient) {
        this.client = client;
    }

    // Name abstract methods
    abstract get name(): string;
    abstract execute(...args:any[]): Promise<void>;
}