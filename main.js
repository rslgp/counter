var exports = module.exports = {};

const Discord = require("discord.js");
const client = new Discord.Client();
// Delete this line when you´re using this project for public usages.
//const prv_config = require("../private_config.json");

const app = require("./app");

const commandPrefix = "!";

// Executed when the bot is ready!
client.on('ready', () => {
    app.startApp(client);
});

// If your code editor says that () => is an error, change it to function()
// Executed when message event
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

// Change it to config.token when you want to use this project for public usages.
//
// prv_config is only for personal usage or when youre forking this project,
// testing some functions with the and make a pull request to the repo.
// Warning: When you´re making a pull request, check that you didn´t wrote your token inside the config.json.
//
// To use prv_config, create a file called "private_config.json" inside the main directory.
// .gitignore will ignore this file when you want to commit and push.
// So nobody can get your bot token.
client.login(process.env.BOT_TOKEN);

