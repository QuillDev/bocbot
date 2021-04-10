import { Message, MessageEmbed, MessageEmbedOptions } from "discord.js";

export const sendRawEmbed = async (msg: Message, embed: MessageEmbed) => {
    return await msg.channel.send(embed);
}

export const sendEmbed = async (msg: Message, embedOptions: MessageEmbedOptions) => {
    return await msg.channel.send(
        new MessageEmbed({
            timestamp: Date.now(),
            author: { name: "BOCBot" },
            ...embedOptions
        })
    );
}

export const sendErrorEmbed = async (msg: Message, errorMessage: string) => {
    return await msg.channel.send(
        new MessageEmbed({
            timestamp: Date.now(),
            author: { name: "BOCBot" },
            color: "#FF0000",
            description: errorMessage
        })
    );
}