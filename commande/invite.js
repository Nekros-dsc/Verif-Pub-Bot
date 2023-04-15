const { EmbedBuilder } = require('discord.js')
const Discord = require("discord.js");

module.exports = {
name: 'invite',
run: async (message, args, client) => {

    const embed = new EmbedBuilder()
    .setAuthor({name:`${client.user.tag}`, 
    iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})
       .setThumbnail(client.user.displayAvatarURL())
          .setColor('Orange')
          .setTitle(`Invite Moi`)
          .setDescription(`**Soutenez-nous en invitant ${client.user.username} sur votre serveur** \n**[Invite moi en cliquant ici](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2146958847&scope=bot)\nRejoindre le support du bot [Rejoins le support](https://discord.gg/4WSfyPHG5h)**`)
          .setFooter({
            text: `${client.user.username} par SaKo`
            })
        .setImage("https://i.imgur.com/5cLXnSe.gif")
        
          message.channel.send({ embeds: [embed] })
    }
}
