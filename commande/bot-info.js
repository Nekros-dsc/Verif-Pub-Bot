const { EmbedBuilder } = require('discord.js')
const Discord = require("discord.js");

module.exports = {
name: "bot-info",
run: async (message, args, client) => {
  
     
const embed = new EmbedBuilder()
.setThumbnail(client.user.displayAvatarURL())
.setTitle(`Mes Informations`)
.setColor('Orange')
.addFields(
{
name: '⭐・**Nom**',
value: `> **${client.user.tag}**`,
inline: false
},
{
name: '💻・**ID**',
value: `> **${client.user.id}**`,
inline: false
},
{
name: `🥊・**Ping**`,
value: `> **${client.ws.ping}ms**`,
inline: false
},
{
name: `💎・**Développeur**`,
value: `> Nom: **>Crack "!#3808** 
> ID: **1041082522978758726**`,
inline: false
},
{
name: `🌐・**Serveurs :**`,
value: `> Regarde **${client.guilds.cache.size.toLocaleString()}** Serveurs.`,
inline: false
},
{
name: `👤・**Utilisateurs :**`,
value: `> Regarde **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** utilisateurs.`,
inline: false
})
.setImage("https://i.imgur.com/gROCCLQ.gif")
.setTimestamp()
message.channel.send({ embeds: [embed] })
    }
}
