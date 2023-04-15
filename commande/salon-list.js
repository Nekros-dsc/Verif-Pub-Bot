const { EmbedBuilder } = require('discord.js');
const path = require('path');

module.exports = {
name: 'salon-list',
run: async (message, args, client) => {

if(!message.member.permissions.has("ManageChannels")) {
return message.channel.send(`**${message.author.tag}**, Vous avez pas les permissions requises. (Gérer les salons)`)
}

let allchannel = '__Voici la liste des salons publicitaire du serveur.__\n';

const channels = require(path.resolve(path.join('./database/config SalonPub.json')));

for(channel in channels[message.guild.id]){
allchannel = allchannel + `\n> <#${channel}>, **ID**: ${channel}`;
}

const SalonList = new EmbedBuilder()
.setTitle('📢 Salon publicitaire')

.setDescription(allchannel)
.setFooter({ text: `${client.user.username}`})
.setColor('Purple')
message.channel.send({ embeds: [SalonList] })

    
}}
