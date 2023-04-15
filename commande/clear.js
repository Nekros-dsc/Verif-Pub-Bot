module.exports = {
name: "clear",
run: async (message, args, client) => {

if(!message.member.permissions.has("Administrator")) {
return message.channel.send(`**${message.author.tag}**, Vous avez pas les permissions requises. (Administrateur)`)
}

let messagecount = parseInt(args[0]);

if(isNaN(messagecount)) return message.channel.send(`S'il vous plaît donnez-moi **un nombre** de messages à supprimer.`);

if(messagecount > 99) {
message.channel.send(`Vous ne pouvez pas aller au-delà de **99** messages que vous voulez supprimer.`)
} else if(messagecount < 1 ) {
message.channel.send(`Il est impossible d'aller au-dessous de **1** message à supprimer.`)
} else {
const { size } = await message.channel.bulkDelete(messagecount + 1, true)
message.channel.send(`✅・Vous venez de supprimer **${size - 1}** messages.`)
}

}}
