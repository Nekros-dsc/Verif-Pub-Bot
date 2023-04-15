const { EmbedBuilder } = require("discord.js")
const path = require("path")
const fs = require("fs")

module.exports = {
name: "salon-add",
run: async (message, args, client) => {

if(!message.member.permissions.has("ManageChannels")) {
return message.channel.send(`**${message.author.tag}**, Vous avez pas les permissions requises. (Gérer les salons)`)
}

const addPubChannelMessageEmbed = new EmbedBuilder()
.setTitle("⏳・Ajout d'un salon")
.setColor(client.config.couleurs.defaut)
.setDescription(`Bienvenue dans le menu d'ajout d'un salon publicitaire.\n\n*\`Si vous souhaitez quittez, écrivez "cancel" !\`*`)
.setFooter({ text: `${client.user.username}` })
.setTimestamp()
message.channel.send({ embeds: [addPubChannelMessageEmbed] }).then( async (msg) => {

let channel
const filter = m => message.author.id === m.author.id;
await message.channel.awaitMessages({ filter, max: 1, time: 30000 })
.then(async (collected) => {
collected.first().delete();
channel = collected.first().content
}).catch((err) => {
    
const noSalonEmbed = new EmbedBuilder()
.setTitle("❌・Erreur...")
.setColor(client.config.couleurs.defaut)
.setDescription("Vous n'avez pas entrer de salon.")
.setFooter({ text: `${client.user.username}` })
.setTimestamp()
return msg.edit({ embeds: [noSalonEmbed] });
})

if(channel == undefined) return

channel = channel.replace('<', '');
channel = channel.replace('#', '');
channel = channel.replace('>', '');

if (channel === "cancel") {
return message.channel.send("Annulation ⌛").then((message) => {message.delete({ timeout: 100 })}).then(message.channel.send(`Annulation avec succès ✅`))
}

const salon = message.guild.channels.cache.find((c) => c.id === channel)
if (!salon) {
const introuvableEmbed = new EmbedBuilder()
.setTitle("❌・Erreur...")
.setColor(client.config.couleurs.defaut)
.setDescription("Ce salon est introuvable.")
.setFooter({ text: `${client.user.username}` })
.setTimestamp()
return msg.edit({ embeds: [introuvableEmbed] })
}

addpubchannel(message.guild.id, salon.id)

const sucessadd = new EmbedBuilder()
.setTitle("✅・Succès")
.setColor(client.config.couleurs.defaut)
.setDescription("Le salon <#" + salon.id + "> à correctement été ajouté !")
.setFooter({ text: `${client.user.username}` })
.setTimestamp()
msg.edit({ embeds: [sucessadd] })
})

// Fonctions
async function addpubchannel(serverID, channelID) {
let server = require(path.resolve(path.join("./database/config SalonPub.json")))

if (!server[serverID]) {
server[serverID] = {}
fs.writeFile("./database/config SalonPub.json", JSON.stringify(server), (err) => {
if (err) console.error(err)
})
}

server = require(path.resolve(path.join("./database/config SalonPub.json")))
let channel = server[serverID][channelID]

if (!channel) {
server[serverID][channelID] = {}
}
fs.writeFile(
path.resolve(path.join("./database/config SalonPub.json")),
JSON.stringify(server, null, 2),
(err) => {
if (err) console.log(err)
})
}

}}
