const path = require("path")
const fs = require("fs")

module.exports = {
name: "embed-create",
run: async (message, args, client) => {

if(!message.member.permissions.has("Administrator")) {
return message.channel.send(`**${message.author.tag}**, Vous avez pas les permissions requises. (Administrateur)`)
}

addautoembed(message.guild.id)

message.channel.send("✅・Enregistrement de l'auto embed.")

async function addautoembed(serverID) {
let server = require(path.resolve(path.join("./database/config AutoEmbed.json")))

if (!server[serverID]) {
server[serverID] = {}
fs.writeFile("./database/config AutoEmbed.json", JSON.stringify(server), (err) => {
if (err) console.error(err)
})
}

server = require(path.resolve(path.join("./database/config AutoEmbed.json")))

server[serverID] = { 
"status": "false",
"titre": "Publicité de {member.tag}",
"description": "🔔 Ne pas envoyer d'insulte.\n📒 Ta publicité doit contenir une description.\n🔨Lis le règlement du serveur, les [TOS](https://discord.com/terms) et la [Charte Utilisation](https://discord.com/guidelines) !",
"couleur": "ffd742"
}
fs.writeFile(
path.resolve(path.join("./database/config AutoEmbed.json")),
JSON.stringify(server, null, 2),
(err) => {
if (err) console.log(err)
})
}

}}
