// Example client with dynamic command + event loading using 
// The abstract Quill methods
// 4-10-2021
import { Client, ClientOptions } from "discord.js";
import { QuillCommand } from "./QuillCommand";
import fg from "fast-glob";
import { QuillEvent } from "./QuillEvent";


class QuillClient extends Client {

    public commands: Map<string, QuillCommand> = new Map<string, QuillCommand>();

    constructor(opts: ClientOptions) {
        super(opts);

        //asyncronously load events & commands
        (async () => {

            //Load the commands & events
            const commandPromise = this.loadCommands();
            const eventPromise = this.loadEvents();
            await Promise.all([commandPromise, eventPromise])
                .catch(console.error);
        })();
    }

    /**
     * Load any QuillCommands in the commands directory.
     */
    loadCommands = async () => {
        const files = await fg(["src/commands/*.ts", "src/commands/*/*.ts"], { onlyFiles: true });
        for (const file of files) {
            const relPath = file.split("src/commands/")[1];
            const module = await import("../commands/" + relPath);

            const command: QuillCommand = new module.default(this);
            this.commands.set(command.keyword, command);

            console.log(`[Command Loader] Registered ${command.keyword}`);
        }
    }

    /**
     * Load any events that might occur
     */
    loadEvents = async () => {
        const files = await fg(["src/events/*.ts"], { onlyFiles: true });
        for (const file of files) {
            const relPath = file.split("src/events/")[1];
            // Import the module & create the event
            const module = await import("../events/" + relPath);
            const event:QuillEvent = new module.default(this);

            // Register the event on the client
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args));
            } else {
                this.on(event.name, (...args) => event.execute(...args));
            }

            console.log(`[Event Loader] Registered ${event.name}`);
        }
    }
}

export default QuillClient;