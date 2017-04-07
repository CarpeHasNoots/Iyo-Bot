/*To Do List:
	Restrict access to gun command
*/

//Connect to the Discord
const Discord = require('discord.js');

const bot = new Discord.Client();

var version = "V0.9.2";

var status = "alpha";

var ball = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];

//Syntax creation
function commandIs(str, msg){
	return msg.content.toLowerCase().startsWith("!" + str);
}

//Getting the role names
function pluck(array) {
	return array.map(function(item) { return item["name"]; });
}

//Do they have this role?
function hasRole(mem, role) {
	if(pluck(mem.roles).includes(role)){
		return true;
	} else {
		return false;
	}
}

//Those sexy commands
var commands = ["`!hello`", "`!avatar`", "`!wiki`", "`!wake`", "`!version`", "`!uplog`", "`!night`"];
var gamble = ["`!roll`", "`!dice`", "`!double`", "`!coin`", "`!8ball`"];

//Time to roll out
bot.on('ready', () => {
  console.log('Iyo Bot ready for action');
});

bot.on('guildMemberAdd', member => {
	console.log(member.user.username + " has joined the server!");
	let guild = member.guild;
	let chan = bot.channels.find("name", "welcome_people");
	chan.sendMessage(`Welcome, ${member.user}`);
	if(guild.id === "291908992089718784") {
		member.addRole("291910292705771520");
	}
});

bot.on('message', message => {

  if (message.author.bot) return;

  //Gotta split those strings
  var args = message.content.split(/[ ]+/);

  if (commandIs("hello", message)) {
    message.channel.sendMessage("Hello, " + message.author);
    console.log("Hello command run by: " + message.author.username);
  }
  
  if (commandIs("avatar", message)) {
  	if(message.author.avatarURL === null) {
  		message.reply("you do not have an avatar.");
  	} else{
    	message.reply(message.author.avatarURL);
    	console.log("Avatar command run by: " + message.author.username);
  	}
  }

  if (commandIs("wiki", message)) {
  	message.channel.sendMessage("https://en.wikipedia.org/wiki/" + args.join("_").substring(6));
  	console.log("Wiki command run by: " + message.author.username + " | Searching for: " + args.join(" ").substring(6));
  }

  if (commandIs("cmds",message)) {
  	message.channel.sendMessage("**Iyo Bot Commands** \n \n" + "Regular Commands: " + commands.join(" ") + "\n \n" + "Gamble Commands: " + gamble.join(" ") + "\n \n For additonal info on a specific command use `!help [command]`");
  	console.log("Cmds command run by: " + message.author.username);
  }

  if (commandIs("help avatar", message)) {
  	message.channel.sendMessage("`!avatar` to display your avatar");
  	console.log("Help Avatar command run by: " + message.author.username);
  }

  if (commandIs("help hello", message)) {
  	message.channel.sendMessage("`!hello` to print world");
  	console.log("Help Hello command run by: " + message.author.username);
  }

  if (commandIs("help wiki", message)) {
  	message.channel.sendMessage("`!wiki [item]` to search an item on wikipedia (ex. !wiki penguin)");
  	console.log("Help Wiki command run by: " + message.author.username);
  }

  if (commandIs("help dice", message)) {
  	message.channel.sendMessage("`!dice` to roll a random number up to 6");
  	console.log("Help Dice command run by: " + message.author.username);
  }

  if (commandIs("help roll", message)) {
  	message.channel.sendMessage("`!roll [number]` to roll a random number of your choosing");
  	console.log("Help Roll command run by: " + message.author.username);
  }

  if (commandIs("help double", message)) {
  	message.channel.sendMessage("`!double` to roll two dices at once");
  	console.log("Help Double command run by: " + message.author.username);
  }

  if (commandIs("help version", message)) {
  	message.channel.sendMessage("`!version` to display the bot's version");
  }

  if(commandIs("help 8ball", message)) {
  	message.channel.sendMessage("`!8ball [question]` to ask Iyo Bot a question");
  }

  if(commandIs("help coin", message)) {
  	message.channel.sendMessage("`!coin` to get either `Heads` or `Tails`");
  }

  if(commandIs("help uplog", message)) {
  	message.channel.sendMessage("`!uplog` to view update logs");
  }

  if (commandIs("help", message)) {
  	if(args.length < 1) {
  		return false;
  	} else if(args.length === 1) {
  		message.channel.sendMessage("You have not entered a valid command (ex. !help wiki)");
  		console.log("Help command run by: " + message.author.username);
  	}
  }

  if (commandIs("wake", message)) {
  	if (args.length === 1) {
  		message.channel.sendMessage("Please define a name");
  	} else {
  	message.delete();
  	message.channel.sendMessage("Wake up, " + args.join(" ").substring(6));
  	console.log("Wake command run by: " + message.author.username);
    }
  }

  if (commandIs("roll", message)) {
  	var x = Math.floor((Math.random() * args.join().substring(6))) + 1;
  	if (args.length === 1){
  		message.channel.sendMessage("Please define a max number");
  	} else if(!x) {
  		message.channel.sendMessage("Please define a number");
  	} else  {
  		message.channel.sendMessage(x);
  	}
  	console.log("Roll command run by: " + message.author.username);
  }

  if (commandIs("dice", message)) {
  	message.channel.sendMessage(Math.floor((Math.random() * 6) + 1));
  	console.log("Dice command run by: " + message.author.username);
  }

  if (commandIs("double", message)) {
  	message.channel.sendMessage(Math.floor((Math.random() * 6) + 1));
  	message.channel.sendMessage(Math.floor((Math.random() * 6) + 1));
  	console.log("Double command run by: " + message.author.username);
  }

  if (commandIs("version", message)) {
  	message.channel.sendMessage("Iyo Bot is on " + version + " and is in " + status + " mode.");
  }

  if (commandIs("gun", message)) {
  	message.channel.sendMessage("Say hello to my little friend rat@@@@@@@@@@@@@@@@@", { tts: true });
  	console.log("Gun command run by: " + message.author.username);
  }

  if (commandIs("coin", message)) {
  	var flip = ["Heads", "Tails"];
  	var flipRan = flip[Math.floor(Math.random()*flip.length)];
  	message.channel.sendMessage(flipRan);
  }

  if (commandIs("8ball", message)) {
  	var ballRan = ball[Math.floor(Math.random()*ball.length)];
  	message.reply(ballRan);
  }

if (commandIs("night", message)) {
  	message.reply("night!");
  }

/*
  if (commandIs("command", message)) {
  	code
  }
*/

  if (commandIs("uplog", message)) {
  	message.channel.sendMessage(`
  		**Update Logs for Iyo Bot** \n
  		(4/5/2017) 0.9 Simple commands added and functional bot \n
  		(4/5/2017) 0.9.1 Gamble commands are added \n
  		(4/6/2017) 0.9.2 Help commands added and Auto-role is fixed \n
  	`)
  }

  if (commandIs("secret", message)) {
  	if(hasRole(message.member, "Owner")){
  		message.delete()
  		.then(msg => console.log("Deleted secret command"))
  		.catch(console.error);
  		message.channel.sendMessage("Hitler did nothing wrong @everyone");
  	} else {
  		message.delete()
  		.then(msg => console.log("Deleted failed command"))
  		.catch(console.error);
  		message.channel.sendMessage("You have found the secret but have failed the test");
  	}
  }
});

//The secret password
bot.login('Mjk2ODMyMjQ4ODc4MjAyODgy.C73-Jw.W_noS8FvIMqwZZf3CZaEsUMvj8Q');