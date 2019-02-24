var exports = module.exports = {};

const Discord = require("discord.js");
const client = new Discord.Client();

const app = require("./app");

const commandPrefix = "!";

client.on('ready', () => {
    app.startApp(client);
});

client.on('message', async(message) => {
    if(message.author.bot) return;

    if(!message.content.startsWith(commandPrefix)) return;
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(commandPrefix.length);

    let args = message.content.split(" ").slice(1);

    if(command === "test"){		
		app.play();
    }
});
client.login(process.env.BOT_TOKEN);
