const { EmbedBuilder } = require("discord.js");

module.exports = {
name: 'ban',
run: async (message, args, client) => {

if(!message.member.permissions.has("BanMembers")) {
return message.channel.send(`**${message.author.tag}**, Vous avez pas les permissions requises. (Bannir)`)
}
    
if(!message.guild.members.me.permissions.has("BanMembers")) {
return message.channel.send(`**${message.author.tag}**, Je n'ai pas les permissions requises. (Bannir)`)
}

let user = message.mentions.members.first();
    
if(!user) {
return message.channel.send(`**${message.author.tag}**, Mentionné le membre a bannir.`)
}

if(user.id === message.author.id) {
return message.channel.send(`**${message.author.tag}**, Vous ne pouvez pas vous ban.`)
}

if(!user.bannable) return message.channel.send(`**${message.author.tag}**, Je ne peux pas bannir cette personne.`)

const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

await user.ban({reason})

const banembed = new EmbedBuilder()
.setTitle("Nouveau ban")
.setDescription(`👥・**Membre** : ${user} | ${user.id} \n ❓・**Raison** : ${reason} \n 🚨・**Moderateur** : ${message.author.tag}`)
.setColor(client.config.couleurs.defaut)
message.channel.send({ embeds: [banembed] })

}};
