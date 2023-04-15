
const { EmbedBuilder } = require('discord.js')

module.exports = {
name: 'messageCreate',
async execute(client, message, ) {
            
if (message.author.bot) return
if (message.channel.type == "DM") return;

if(message.content.match(`^<@!?${client.user.id}>( |)$`)) {
    message.channel.send(`Mon prefix sur le serveur est : \`d!\``) 
}

const args = message.content.slice(client.config.prefix.length).trim().split(' ')
const commandName = args.shift().toLowerCase();
const command = client.commands.get(commandName)

if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
if (!command) return
console.log(`[COMMANDE] La commande "${commandName}" à été exécuté par ${message.author.tag}`)
            
try {
command.run(message, args, client)
} catch (error) {
    console.log(`[ERREUR] ${message.author.tag} à une erreur sur la commande "${commandName}"`)
message.channel.send(`> **❌ Je suis désolée mais il y à eu une erreur durant l'execution du code.`)
};

}}