const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")

const path = require("path")

const configsalonpub = require("../database/config SalonPub.json");
let verifchannel = require(path.resolve(path.join('./database/verifchannel.json')));

module.exports = {
name: 'messageCreate',
async execute(client, message, ) {

if (message.author.bot) return
if (message.channel.type == "DM") return;

//Si c'est dans un salon publicitaire
if(configsalonpub[message.guild.id]) {
if(configsalonpub[message.guild.id][message.channel.id]) {

//Si le message et vide ne fait rien
if(message.content == "") return 

console.log(`[PUB] ${message.guild.name} / ${message.guild.id} | Publicité envoyée par ${message.author.tag} dans ${message.channel.name}`)

//Si il y a un salon de vérification
if(!verifchannel[message.guild.id]) return;
let channelverif = client.channels.cache.find(c => c.id === verifchannel[message.guild.id].verifChannel);

//Si le salon existe pas
if(!verifchannel) return

//Construction des boutons
let buttonVerif = new ActionRowBuilder()
.addComponents(
new ButtonBuilder()
.setCustomId('valider')
.setLabel('Valider')
.setStyle(ButtonStyle.Success),
new ButtonBuilder()
.setCustomId('refuser')
.setLabel('Refuser')
.setStyle(ButtonStyle.Danger),
new ButtonBuilder()
.setCustomId('supprimer')
.setEmoji('🗑️')
.setStyle(ButtonStyle.Secondary)
)
let buttonLien = new ActionRowBuilder()
.addComponents(new ButtonBuilder()
.setLabel('Lien du message')
.setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
.setStyle(ButtonStyle.Link),
)
//Construction de l'embed
const verifembed = new EmbedBuilder()
.setTitle("⏳・Nouvelle publicité en attente :")
.setDescription(message.content)
.addFields({ name: 'Utilisateur :', value: `${message.author}`, inline: true })
.addFields({ name: 'Salon :', value: `<#${message.channel.id}>`, inline: true })
.setColor("51e92a")
.setFooter({ text: `${message.id}`})

channelverif.send({ embeds: [verifembed], components: [buttonVerif, buttonLien] })
}}

}}
