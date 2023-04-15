const { SelectMenuBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
name: 'help',
run: async (message, args, client, collect) => {
    let embed_painel = new EmbedBuilder()
    .setAuthor({name:`${client.user.tag}`, 
 iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Bonjour je suis **${client.user.username} développer par SaKo**, je vous permet de vérifier les publiciters sur votre serveur.`)
    .addFields(
        {
        name: 'Utile :',
        value: "> `help`, `ping`, `bot-info`, `invite`",
        inline: false
        },
        {
            name: 'Modération :',
            value: "> `ban`, `clear`, `kick`",
            inline: false
            },
            {
                name: 'Configuration :',
                    value: "> `embed-create`, `embed-builder`, `logs-channel`, `salon-add`, `salon-list`, `salon-remove`, `verif-channel`, `logs-sanction`",
                inline: false
                })
    .setColor('Orange')
    .setFooter({
        text: `${client.user.username} par SaKo`
        })
    .setImage("https://i.imgur.com/5cLXnSe.gif")



    let painel = new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
            .setCustomId('menu')
            .setPlaceholder("Clique ici!")
            .addOptions(
                {
                    label: "Page d’accueil",
                    //description: "",
                    emoji: "📖",
                    value: "painel"
                },
                {
                    label: "Utile",
                    description: "Voir mes commandes de utile.",
                    emoji: "✨",
                    value: "utilidade"
                },
                {
                    label: "Modération",
                    description: "Voir mes commandes de moderation.",
                    emoji: "🛠",
                    value: "diversao"
                },
                {
                    label: "Configuration",
                    description: "Voir mes commandes de Configuration.",
                    emoji: "⚙",
                    value: "adm"
                }
            )
    )

    message.channel.send({embeds: [embed_painel], components: [painel] }).then(message => {

        const filtro = (interaction) => 
        interaction.isSelectMenu()
  
      const coletor = message.createMessageComponentCollector({
        filtro
      });
  
      coletor.on('collect', async (c) => {

        let valor = c.values[0]
        c.deferUpdate()


    if (valor === 'painel') {

        let embed1 = new EmbedBuilder()
        .setAuthor({name:`${client.user.tag}`, 
     iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`Bonjour je suis **${client.user.username} développer par SaKo**, je vous permet de vérifier les publiciters sur votre serveur.`)
        .addFields(
            {
            name: 'Utile :',
            value: "> `help`, `ping`, `bot-info`, `invite`",
            inline: false
            },
            {
                name: 'Modération :',
                value: "> `ban`, `clear`, `kick`",
                inline: false
                },
                {
                    name: 'Configuration :',
                    value: "> `embed-create`, `embed-builder`, `logs-channel`, `salon-add`, `salon-list`, `salon-remove`, `verif-channel`, `logs-sanction`",
                    inline: false
                    })
        .setColor("Orange")
        .setFooter({
            text: `${client.user.username} par SaKo`
            })
        .setImage("https://i.imgur.com/5cLXnSe.gif")

        message.edit({ embeds: [ embed1 ], components: [painel]  });


   };

   if (valor === 'utilidade') {

    let embed_utilidade = new EmbedBuilder()
    .setAuthor({name:`${client.user.tag}`, 
    iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})
       .setThumbnail(client.user.displayAvatarURL())
       .setDescription(`Voici les commandes Utile:`)
       .addFields(
           {
           name: 'd!help',
           value: "Voir mes commande.",
           inline: false
           },
           {
               name: 'd!ping',
               value: "Voir mon ping",
               inline: false
               },
               {
                   name: 'd!bot-info',
                   value: "Voir mes information.",
                   inline: false
                   },
                   {
                       name: 'd!invite',
                       value: "M'invité et rejoindre le support.",
                       inline: false
                       })
       .setColor('Orange')
       .setFooter({
           text: `${client.user.username} par SaKo`
           })
       .setImage("https://i.imgur.com/5cLXnSe.gif")
    
    message.edit({ embeds: [ embed_utilidade ], components: [painel]  });
  };

  if (valor === 'diversao') {

    let embed_diversao = new EmbedBuilder()
    .setAuthor({name:`${client.user.tag}`, 
    iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})
       .setThumbnail(client.user.displayAvatarURL())
       .setDescription(`Voici les commandes Modération:`)
       .addFields(
           {
           name: 'd!ban',
           value: "Permet de ban une personne.",
           inline: false
           },
           {
               name: 'd!clear',
               value: "Permet de supprimer des messages",
               inline: false
               },
               {
                   name: 'd!kick',
                   value: "Permet de kick une personne.",
                   inline: false
                   })
       .setColor('Orange')
       .setFooter({
           text: `${client.user.username} par SaKo`
           })
       .setImage("https://i.imgur.com/5cLXnSe.gif")

    message.edit({ embeds: [ embed_diversao ], components: [painel]  });
};

if (valor === 'adm') {

    let embed_adm = new EmbedBuilder()
        .setAuthor({name:`${client.user.tag}`, 
    iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})
       .setThumbnail(client.user.displayAvatarURL())
       .setDescription(`Voici les commandes Configuration:`)
       .addFields(
           {
           name: 'd!embed-create',
           value: "Permet de créé un embed publicité automatique.",
           inline: false
           },
           {
               name: 'd!embed-builder',
               value: "Permet de créé un embed publicité manuelment",
               inline: false
               },
               {
                   name: 'd!logs-channel',
                   value: "Permet de ajouter un salon de logs publicité.",
                   inline: false
                   },
                   {
                     name: 'd!salon-add',
                     value: "Permet de ajouter les salons pour envoyer les publicités",
                     inline: false
                   },
                   {
                      name: 'd!salon-list',
                      value: "Permet de voir les salons où envoyer les publicités",
                      inline: false
                   },
                   {
                       name: 'd!salon-remove',
                       value: "Permet de enlever les salons où envoyer les publicités.",
                       inline: false
                   },
                   {
                        name: "d!verif-channel",
                        value: "Permet de ajouter un salon de vérification de publicité.",
                        inline: false
                   },
                   {
                        name: "d!logs-sanction",
                        value: "Permet de ajouter un salon de logs sanction.",
                        inline: false
                   })
       .setColor('Orange')
       .setFooter({
           text: `${client.user.username} par SaKo`
           })
       .setImage("https://i.imgur.com/5cLXnSe.gif")

    message.edit({embeds: [embed_adm], components: [painel] });
};

})
})

}
}