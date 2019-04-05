var exports = module.exports = {};

const Discord = require("discord.js");
const client = new Discord.Client();

const app = require("./app");

const commandPrefix = "!";

var discAutorizados, salasAutorizadas, reifelUser;

client.on('guildCreate', guild => {
	var idGuild = Math.round(message.guild.id), idSala;
	if(idGuild!=363610360688672800){
		if(!discAutorizados.includes(idGuild)){ //se cliente nao aplica
			if(message.owner) message.owner.send("Não Autorizado por Reifel\r\n");
			print(message,"Não Autorizado por Reifel\r\n"); message.guild.leave(); return;
		}
	}
});

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

    if(!message.content.startsWith(commandPrefix)) return;
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(commandPrefix.length);

    let args = message.content.split(" ").slice(1);

    if(command === "contagem"){
	    if(message.author == reifelUser || message.member.roles.has("544981841480777750") || message.member.roles.has("554332187152089088")){
		    app.play();
	    }
		
    }

		
	
    if(command === "add"){
			if(message.author!=reifelUser) return;
			
			var novo = args.split("+");
			
			
			//client.channels.get("459432939898273798").send('{ "discords":[368240657816354836,377628278627893248,363610360688672778], "salas":[387003077695373315,428883305874718731] }');
			
			
			client.channels.get("459432939898273798").fetchMessage('461722127205269505')
			  .then(message => {
					var obj =  JSON.parse(message.content);
					obj["discords"].push(Number(novo[0]));
					obj["salas"].push(Number(novo[1]));
					discAutorizados = obj["discords"];					
					salasAutorizadas = obj["salas"];
					message.edit(JSON.stringify(obj));
			} )
			  .catch(console.error);
    }
});

function print(message, text){
		message.channel.send({embed: {
			  color: 3447003,
				description: text
			}
		});	
}

client.login(process.env.BOT_TOKEN);
