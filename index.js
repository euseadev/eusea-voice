const { Client } = require("discord.js");
const fs = require("fs");
const config = require('./config.json')

const tokenFile = "tokens.txt";

const tokens = fs.readFileSync(tokenFile, "utf-8").split("\n").map((token) => token.trim());
let i = 0;

tokens.forEach((token, index) => {
    const client = new Client();

    client.login(token);
    
    client.on("ready", async () => {
        setTimeout(async () => {
            i += 1;
            console.log(`[${i}] ${client.user.tag} olarak giriş yapıldı!`);
            client.user.setStatus("dnd");
            client.user.setActivity("euseadev 💗 çiçero");

            const channelId = config.channelid;
            const voiceChannel = client.channels.cache.get(channelId);

            setTimeout(() => {
                voiceChannel.join();
            }, 250);

        }, 500);
    });
});

process.on("uncaughtException", (e) => {
    return console.log(e.message)
});
