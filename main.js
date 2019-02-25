var exports = module.exports = {};

const Discord = require("discord.js");
const client = new Discord.Client();

const app = require("./app");

const commandPrefix = "!";

var discAutorizados, salasAutorizadas, reifelUser;

client.on('ready', () => {
    app.startApp(client);
	client.user.username="ReifelContagem";
	client.user.setUsername("ReifelContagem");
	
	client.channels.get("459432939898273798").fetchMessage('461722127205269505')
			  .then(message => {
					var obj =  JSON.parse(message.content);
					discAutorizados = obj["discords"];
					salasAutorizadas = obj["salas"];
			} )
			  .catch(console.error);
	
	reifelUser = client.users.get('195731919424585728');

});

client.on('message', async(message) => {
    if(message.author.bot) return;
	
	var idGuild = Math.round(message.guild.id), idSala;
	if(idGuild!=363610360688672800){
		if(!discAutorizados.includes(idGuild)){ //se cliente nao aplica
			if(message.owner) message.owner.send("Não Autorizado por Reifel\r\n");
			print(message,"Não Autorizado por Reifel\r\n"); message.guild.leave(); return;
		}
	}

    if(!message.content.startsWith(commandPrefix)) return;
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(commandPrefix.length);

    let args = message.content.split(" ").slice(1);

    if(command === "contagem"){
	    if(message.author == reifelUser || message.author.roles.has("549480273692065805")){
		    app.play();
	    }
		
    }
});
client.login(process.env.BOT_TOKEN);
