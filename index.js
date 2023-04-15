const { Client, Collection, GatewayIntentBits, ActivityType, EmbedBuilder } = require("discord.js")
const { readdirSync } = require("fs")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  restTimeOffset: 0,
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"],
})

const { token } = require("./botToken.json")

client.config = require("./botConfig.json")

client.login(token)
client.commands = new Collection()

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Commandes Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const commandFiles = readdirSync("./commande").filter((file) =>
file.endsWith(".js")
)
for (const file of commandFiles) {
const command = require(`./commande/${file}`)
client.commands.set(command.name, command)
console.log(`[COMMANDES] ${command.name} chargé.`)
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Event Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const eventFiles = readdirSync("./event").filter((file) => file.endsWith(".js"))
for (const file of eventFiles) {
const event = require(`./event/${file}`)
if (event.once) {
client.once(event.name, (...args) => event.execute(client, ...args))
} else {
client.on(event.name, (...args) => event.execute(client, ...args))
console.log(`[EVENTS] ${event.name} chargé`)
}}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Anti Crash |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

process.on("unhandledRejection", (error) => {
  if (error.code == 10062) return; // Unknown interaction
  console.log(`[ERREUR] ${error}`);
  })

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Ajoute et enleve |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

client.on("guildCreate", guild => {
  client.user.setPresence({
    activities: [{ name: `${client.guilds.cache.size.toLocaleString()} Serveurs`, type: ActivityType.Watching }]
    });
    const channel = client.channels.cache.get("1083571636109848577") //channel où le message s'envoie
    //console.log(channel)
    let removeembed = new EmbedBuilder()
        .setTitle(`BOT vient d\'être ajouté du serveur serveur ${guild.name}`)
        .setThumbnail(guild.iconURL())
        .addFields(
          {
          name: '👑 Propriétaire:',
          value: `<@${guild.ownerId}>`,
          inline: false
          },
          {
              name: 'Owner ID',
              value: `${guild.ownerId}`,
              inline: false
              },
              {
                  name: '📇 Nom du serveur',
                  value: `${guild.name}`,
                  inline: false
                  },
                  {
                      name: 'Id du serveur:',
                      value: `${guild.id}`,
                      inline: false
                      },
                      {
                          name: 'Nombre de membres:',
                          value: `${guild.memberCount}`,
                          inline: false
                          })
        .setColor(`#0fe90d`)
        .setFooter({text: `Désormais : ${client.guilds.cache.size} serveurs`})
    channel.send({embeds: [removeembed]})
      console.log(`[JOIN] j'ai rejoins un nouveaux serveur: ${guild.name}`)
})

client.on("guildDelete", guild => {
  client.user.setPresence({
    activities: [{ name: `${client.guilds.cache.size.toLocaleString()} Serveurs`, type: ActivityType.Watching }]
    });
    const channel = client.channels.cache.get("1083571636109848577") //channel où le message s'envoie
    //console.log(channel)
    let removeembed = new EmbedBuilder()
        .setTitle(`BOT vient d\'être retiré du serveur serveur ${guild.name}`)
        .setThumbnail(guild.iconURL())
        .addFields(
          {
          name: '👑 Propriétaire:',
          value: `<@${guild.ownerId}>`,
          inline: false
          },
          {
              name: 'Owner ID',
              value: `${guild.ownerId}`,
              inline: false
              },
              {
                  name: '📇 Nom du serveur',
                  value: `${guild.name}`,
                  inline: false
                  },
                  {
                      name: 'Id du serveur:',
                      value: `${guild.id}`,
                      inline: false
                      },
                      {
                          name: 'Nombre de membres:',
                          value: `${guild.memberCount}`,
                          inline: false
                          })
        .setColor(`#fc3d12`)
        .setFooter({text: `Désormais : ${client.guilds.cache.size} serveurs`})
    channel.send({embeds: [removeembed]})
 console.log(`[LEAVE] J'ai quitté: ${guild.name} et ${guild.memberCount} Membres`)  
})
