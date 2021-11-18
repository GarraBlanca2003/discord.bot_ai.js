const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: "all" });
require('dotenv').config();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.snipes = new Discord.Collection();

["command", "event"].forEach(handler => {
    require(`./Handlers/${handler}`)(client);
});
//mine
//to read this you can go to important part using ctrl+f and using the comments, the end of this parts are just: fin-'part'
//Important ones: habla Images 
//todo
//Images (google images)
//

//
//
//
//Done
//AI
//responses
//8ball

//code
const PREFIX = '!';
client.util = require('./util');
//brain
//habla
client.on('message', msg => {
    switch (msg.content.toLowerCase()) {
        case "presio":
            msg.reply('muycaro gasias')
            break;
        case "puta":
            msg.reply('mezcla pures')
            break;
        case "hello there":
            msg.reply('https://c.tenor.com/QFSdaXEwtBAAAAAC/hello-there-general-kenobi.gif')
            break;
        case "roblox":
            msg.reply('vete al minecraft')
            break;
        //case "xd":
           // msg.reply('... ||i have 2 say it||||xd´nt||')
          //  break;
        case "uwu":
            msg.reply('shootgun')
            break;
        case "jotaro":
            msg.reply('DIO')
            break;
        case "sad":
            msg.reply(':(')
            break;
        case "trifusion":
            msg.reply('masca chapas')
            break;
        case "let me in":
            msg.sendMessage('https://images-ext-2.discordapp.net/external/7fNdnVEIzJmSvtDFC2lwyce3cFSD20FgwxQ2zQquT90/%3Fcid%3D73b8f7b11e3dde6c0645f54cc08979d3636464c9d2aa4594%26rid%3Dgiphy.mp4%26ct%3Dg/https/media2.giphy.com/media/yx400dIdkwWdsCgWYp/giphy.mp4')
            break;
        case "69":
            msg.reply('Nice')
            break;
        case "thicc":
            msg.reply('ur mom')
            break;
        case "me too kid":
            msg.reply('https://i.imgflip.com/433z6b.png')
            break;
        case "never gonna give you up":
            msg.reply('never let you down')
            break;
        case "kill me":
            msg.reply('https://i.pinimg.com/originals/f0/03/29/f00329c74ed15d7696be7ed87a1e2691.gif')
            break;
        case "feed my coin":
            msg.reply('https://youtu.be/6RU5sVP03fY')
            break;
        case "i like your funny words magic man":
            msg.reply('https://i.kym-cdn.com/photos/images/newsfeed/001/909/636/a8c.png')
            break;
            break;
        case "shut up and take a money":
            msg.reply('https://i.pinimg.com/originals/86/e6/2f/86e62f136d93bc6bffada430bed0afed.jpg')
            break;

            break;
        case "hl3":
            msg.reply('https://images-ext-2.discordapp.net/external/PcEowWZQLuGd0v6ATKO805XLKzb9Iz-lsg_sUqZgTFE/%3Fauto%3Dwebp%26s%3D7ed0d4cb43c6a6dc80a6e116ffce7a6f24aca89a/https/preview.redd.it/ewfgydv9jwn01.png')
            msg.reply('haha no')
            break;

    }
})

//no funsiona

//con prefix
client.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'getGF':
            message.channel.send('got to tinder you horny!');
            break;
        case 'Kill':
            message.channel.send('okay!:gun:');
            break;

    }
})
//ping
client.on('message', message => {
    if (message.content === '!ping') {
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        //message.channel.send('also pong!')
    }
});

//fin-ping
//fin-habla
//8ball
const Limiter = require("./limit8ball.js");
let limit = new Limiter(15000);
const fs = require("fs");

const clockEmoji = ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🕜", "🕝", "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧"];

const re = /^(\!\s?r+o+ll+|\!\s?s+h+a+k+e+)(?:\s(.+))?/gim; // Regex to find out if a user types ">roll"
let responses;
fs.readFile('./responses8ball.txt', "utf8", function (err, data) { // Allows custom responses
    if (err) {
        console.log("Can't read or find responses.txt, setting defaults");
        responses = ["It is certain", "It is decidedly so", "Without a doubt", "Yes, definitely",
            "You may rely on it", "As I see it, yes", "Most Likely", "Outlook good", "Yes",
            "Signs point to yes", "Reply hazy try again", "Ask again later"];
    } else {
        responses = data.split("\n"); // Responses are each individual line
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("Available responses: " + responses.length);
    //client.user.setGame(">roll or >shake");
});

client.on('message', msg => {
    let matches = re.exec(msg.content);

    if (!msg.author.bot && matches) {
        if (limit && limit.exists(msg.author.id)) { // Checks if a usage limit is in place
            for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
                msg.react(clockEmoji[Math.floor(Math.random() * clockEmoji.length)]);
            }
        } else {
            var rand = Math.floor(Math.random() * responses.length);
            if (matches[2]) {
                msg.reply("You asked: \"" + matches[2] + "\" - " + responses[rand]);
            } else {
                msg.reply(responses[rand]);
            }
            limit.add(msg.author.id);
        }
    }
});
//moderation
const noNoWords = ['#GarraCagandolaComoSiempre'];

client.on("message", message => {
    var content = message.content;
    var stringToCheck = content.replace(/\s+/g, '').toLowerCase();

    for (var i = 0; i < noNoWords.length; i++) {
        if (content.includes(noNoWords[i])){  
            message.delete();
            break
        }
    }
});
//ai

//moderation
//streams

//streams

client.login(process.env.TOKEN);