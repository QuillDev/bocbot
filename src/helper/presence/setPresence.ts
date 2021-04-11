import { Client } from "discord.js";

export const setPresence = async (client: Client) => {
    client.user?.setPresence({
        activity: {
            name: "BTC 🚀📈🌙",
            type: "WATCHING",
            url: "https://quilldev.tech/"
        }, status: "online"
    })
}
