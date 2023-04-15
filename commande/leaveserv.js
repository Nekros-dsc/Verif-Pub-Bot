module.exports = {
name: 'leaveserv',
run: async (message, args, client) => {
 if(!message.author.id == "982632315274559558")return undefined;
    const sayMessage = message.content.split(' ').slice(1).join(' ');

    var guild = client.guilds.cache.get(sayMessage);
guild.leave()
message.author.send({content: `Je viens de quitter ${guild} (${guild.memberCount} membres, propriétaire : ${guild.ownerId})` })
}
}