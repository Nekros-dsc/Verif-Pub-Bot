const { ActivityType } = require("discord.js")
const colors = require('colors');

module.exports = {
name: 'ready',
once: true,
async execute(client) {

console.log(`[BOT] Je suis connecté à ${client.user.tag}`)

client.user.setPresence({
    activities: [{ name: `${client.guilds.cache.size.toLocaleString()} Serveurs`, type: ActivityType.Watching }]
    });
console.log(colors.cyan(`[INFO] ${client.commands.size} Commandes Chargé`));
console.log(colors.bgYellow(`[INFO] ${client.guilds.cache.size} Serveur(s)`));
console.log(colors.bgGreen(`[INFO] ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} Membre(s)`));
console.log(colors.bgRed(`[INFO] ${client.channels.cache.size} Channel(s)`));
}
}
