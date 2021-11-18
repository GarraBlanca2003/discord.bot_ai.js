const got = require('got');
const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');

module.exports = {
    name: "axolotls",
    category: "Image",
    description: "Sends a random anime axolotl from reddit",
    example: `${config.Prefix}axolotl`,

    run: async (client, message, args) => {

        const embed = new Discord.MessageEmbed()
        got('https://reddit.com/r/axolotls/random.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let Url = `https://reddit.com${permalink}`;
            let Image = content[0].data.children[0].data.url;
            let Title = content[0].data.children[0].data.title;
            let Upvotes = content[0].data.children[0].data.ups;
            let Downvotes = content[0].data.children[0].data.downs;
            let NumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${Title}`)
            embed.setURL(`${Url}`)
            embed.setImage(Image)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${Upvotes} 👎 ${Downvotes} 💬 ${NumComments}`)
            message.channel.send(embed);
        })

}    }