const { EmbedBuilder } = require("discord.js")

const configembed = require("../database/config AutoEmbed.json")
const configsalon = require("../database/config SalonPub.json");

module.exports = {
name: 'messageCreate',
async execute(client, message, ) {

if (message.author.bot) return
if (message.channel.type == "DM") return;

//Si c'est dans un salon publicitaire
if(configsalon[message.guild.id]) {
if(configsalon[message.guild.id][message.channel.id]) {

//Si le message et vide
if(message.content == "") return 

const autoembed = configembed[message.guild.id]

//Si l'embed n'est pas dans la base de données
if(!autoembed) return

//Si le système et etient
if(autoembed.status == "false") return

//Conversion des valeurs
autoembed.titre = autoembed.titre.replace(`{member.tag}`, `${message.author.tag}`)
autoembed.titre = autoembed.titre.replace(`{member.id}`, `${message.author.id}`)
autoembed.titre = autoembed.titre.replace(`{guild.name}`, `${message.guild.name}`)
autoembed.titre = autoembed.titre.replace(`{guild.id}`, `${message.guild.id}`)

autoembed.description = autoembed.description.replace(`{member.tag}`, `${message.author.tag}`)
autoembed.description = autoembed.description.replace(`{member.id}`, `${message.author.id}`)
autoembed.description = autoembed.description.replace(`{guild.name}`, `${message.guild.name}`)
autoembed.description = autoembed.description.replace(`{guild.id}`, `${message.guild.id}`)

//Construction de l'embed
const embed = new EmbedBuilder()
.setTitle(`${autoembed.titre}`)
.setDescription(`${autoembed.description}`)
.setColor(autoembed.couleur)
.setTimestamp()

//Envoyer l'embed
message.channel.messages.fetch().then(async m => {
const msg = m.filter(e => e.author.id === client.user.id).first();
if (msg) await msg.delete().catch(e => { return; });
return message.channel.send({embeds: [embed] })
})
}}

}}
