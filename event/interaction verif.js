const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder } = require("discord.js")

const path = require("path")

let logsChannel = require(path.resolve(path.join('./database/logschannel.json')));
let logsSanctionChannel = require(path.resolve(path.join('./database/logssanction.json')));

//Couleur logs
let colorValide = "2ecc71"
let colorRefus = "e74c3c"
let colorSupp = "607d8b"

module.exports = {
name: 'interactionCreate',
async execute(client, interaction ) {

try{
//Récupérer les info du embed de vérification
let userId = interaction.message.embeds[0].fields[0].value
let channelId = interaction.message.embeds[0].fields[1].value
let messageId = interaction.message.embeds[0].footer.text
let messagePub = interaction.message.embeds[0].description

//Retirer les parties qui sert a rien
userId = userId.replace(`<`, ``).replace(`@`, ``).replace(`>`, ``)
channelId = channelId.replace(`<`, ``).replace(`#`, ``).replace(`>`, ``)

//Seulement les buttons
if (interaction.isButton()) {

if(interaction.customId === "valider") {
interaction.message.delete()
client.channels.fetch(channelId).then(channel => {
channel.messages.react(messageId, "✅").catch(err => {});
})
logsmsg(userId, channelId, messageId, messagePub, colorValide, null, "valide")
}

if(interaction.customId === "refuser") {
await interaction.deferUpdate();
const refus = new ActionRowBuilder()
.setComponents(
new SelectMenuBuilder()
.setCustomId("refusRow")
.setPlaceholder("Choisir une raison de refus !")
.setOptions([
{ label: "1️⃣・Contenue à caractère pornographique :", description: "Pour les publicités nsfw.", value: "nsfwRefus" },
{ label: "2️⃣・Pub ne respectent pas les ToS/Règlement :", description: "Pour les publicités ne respectent pas les ToS de discord ou le règlement du serveur.", value: "tosRefus" },
{ label: "3️⃣・Contenu à caractère raciste/haineux ou autre :", description: "Pour les publicités ayant des contenus racistes/haineux.", value: "haineuxRefus" },
{ label: "4️⃣・Lien d'invitation invalide :", description: "La publicité possède un lien invalide.", value: "lienInvalideRefus" },
{ label: "5️⃣・Pub dans le mauvais salon :", description: "La publicité n'ai pas dans le bon salon.", value: "mauvaisSalonRefus" },
{ label: "6️⃣・Pub sans description :", description: "La publicité n'a pas de description.", value: "sansDescRefus" },
{ label: "✏️・Mettre sa propre raison :", description: "Choisir une raison personnelle.", value: "persoRefus" }
])
)
interaction.message.edit({ components : [refus] })
}

if(interaction.customId === "supprimer") {
interaction.message.delete()
client.channels.fetch(channelId).then(channel => {
channel.messages.delete(messageId).catch(err => {});
})
logsmsg(userId, channelId, messageId, messagePub, colorSupp, null, "delete")
}

} //Fin du interaction button

//Seulement les select-menu
if(interaction.isSelectMenu()) {
if(interaction.values?.[0] === "nsfwRefus"){
interaction.message.delete()
client.channels.fetch(channelId).then(channel => {
channel.messages.delete(messageId).catch(err => {});
})
logsmsg(userId, channelId, messageId, messagePub, colorRefus, "Contenu à caractère pornographique.", "refus")
}
if(interaction.values?.[0] === "tosRefus"){
interaction.message.delete()
client.channels.fetch(channelId).then(channel => {
channel.messages.delete(messageId).catch(err => {});
})
logsmsg(userId, channelId, messageId, messagePub, colorRefus, "Pub ne respectent pas les tos ou le règlement du serveur.", "refus")
}
if(interaction.values?.[0] === "haineuxRefus"){
interaction.message.delete()
client.channels.fetch(channelId).then(channel => {
channel.messages.delete(messageId).catch(err => {});
})
logsmsg(userId, channelId, messageId, messagePub, colorRefus, "Pub contenant des textes racistes/haineux ou autre.", "refus")
}
if(interaction.values?.[0] === "lienInvalideRefus"){
interaction.message.delete()
client.channels.fetch(channelId).then(channel => {
channel.messages.delete(messageId).catch(err => {});
})
logsmsg(userId, channelId, messageId, messagePub, colorRefus, "Lien d'invitation invalide.", "refus")
}
if(interaction.values?.[0] === "mauvaisSalonRefus"){
interaction.message.delete()
client.channels.fetch(channelId).then(channel => {
channel.messages.delete(messageId).catch(err => {});
})
logsmsg(userId, channelId, messageId, messagePub, colorRefus, "Pub dans le mauvais salon.", "refus")
}
if(interaction.values?.[0] === "sansDescRefus"){
interaction.message.delete()
client.channels.fetch(channelId).then(channel => {
channel.messages.delete(messageId).catch(err => {});
})
logsmsg(userId, channelId, messageId, messagePub, colorRefus, "Pub sans description.", "refus")
}
if(interaction.values?.[0] === "persoRefus"){
interaction.message.reply({ content: "✏️・Quelle raison voulez vous mettre ?" }).then( async (msg) => {

let msgRefus
const filter = m => interaction.user.id === m.author.id;
await interaction.channel.awaitMessages({ filter, max: 1, time: 30000 })
.then(async (collected) => {
collected.first().delete();
msgRefus = collected.first().content
}).catch((err) => {
return msg.delete();
})
if(msgRefus == "") return msg.delete();
interaction.message.delete()
msg.delete()
client.channels.fetch(channelId).then(channel => {
channel.messages.delete(messageId).catch(err => {});
})
logsmsg(userId, channelId, messageId, messagePub, colorRefus, msgRefus, "refus")
})
}

} //Fin du interaction select-menu

//Function logs
async function logsmsg(userID, channelID, messageID, messagePub, color, refus, status) {

console.log(`[VERIF] ${interaction.guild.name} / ${interaction.guild.id} | ${interaction.user.username}#${interaction.user.discriminator} à vérifier une publicité.`)

//Envoyé la sanction en mp
client.users.fetch(userID).then(mpsanction => {
if(status == "refus"){ 
const sanctionMp = new EmbedBuilder()
.setTitle("Nouvelle sanction !")
.setDescription(`📬・**Serveur** : ${interaction.guild.name} \n 🗑️・**Salon** : <#${channelID}> \n ❓・**Raison** : ${refus} \n 🚨・**Moderateur** : <@${interaction.user.id}>`)
.setTimestamp()
.setColor("0x0099ff")
mpsanction.send({ embeds: [sanctionMp] }).catch(err => {})

//Si le serveur et dans la db
if(!logsSanctionChannel[interaction.guild.id]) return

//Si le salon existe
const logsSanction = client.channels.cache.find(c => c.id === logsSanctionChannel[interaction.guild.id].logsChannel);
if(!logsSanction) return
const sanctionChannel = new EmbedBuilder()
.setTitle("Nouvelle sanction !")
.setDescription(`\n 🗑️・**Salon** : <#${channelID}> \n ❓・**Raison** : ${refus} \n 🚨・**Moderateur** : <@${interaction.user.id}>`)
.setTimestamp()
.setColor("0x0099ff")
logsSanction.send({ content: `<@${userID}>`, embeds: [sanctionChannel] })
}
})

//Si le serveur et dans la db
if(!logsChannel[interaction.guild.id]) return

//Si le salon existe
const logs = client.channels.cache.find(c => c.id === logsChannel[interaction.guild.id].logsChannel);
if(!logs) return

//Définir le titre de l'embed en fonction du choix
let titre = ""
if(status == "valide") { titre = titre +  "✅・Nouvelle publicité validé" } else if(status == "refus") { titre = titre + "❌・Nouvelle publicité refusé" } else if(status == "delete") { titre = titre +  "🗑️・Nouvelle publicité supprimé" }

//Construction d'un buttons
let buttonLien = new ActionRowBuilder()
.addComponents(new ButtonBuilder()
.setLabel('Lien du message')
.setURL(`https://discord.com/channels/${interaction.guild.id}/${channelID}/${messageID}`)
.setStyle(ButtonStyle.Link),
)

//Construction de l'embed
const logsEmbed = new EmbedBuilder()
.setTitle(titre + " :")
.setDescription(messagePub)
.addFields({ name: 'Utilisateur :', value: `<@${userID}>`, inline: true })
.addFields({ name: 'Salon :', value: `<#${channelID}>`, inline: true })
.setFooter({ text: `Vérifier par ${interaction.user.username}#${interaction.user.discriminator} | ${interaction.user.id}`})
.setColor(color)

if(status == "refus"){ logsEmbed.addFields({ name: 'Raison :', value: `${refus}`, inline: false }) }

logs.send({ embeds: [logsEmbed], components: [buttonLien] })
}

} catch(err) {}
}}