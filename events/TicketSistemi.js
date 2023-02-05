const {Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu }=require('discord.js')
const { kategori, yetkili } = require('../config.json');
module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isSelectMenu()) return;
        
	const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('del')
                    .setPlaceholder('Select to delete the ticket!')
					.addOptions([
						{
							label: '🗑️ Silinen bilet',
							description: 'Kanalı sil',
							value: 'delete',
						}
					])
                );
                
                
        let catégorie = kategori
        let roleStaff = interaction.guild.roles.cache.get(yetkili)

        let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
        
        if(interaction.customId === "del") {
            if (interaction.values[0] == "delete") {
                const channel = interaction.channel
                channel.delete();
              
            }
        }

        if (interaction.customId == "select") {
            if (DejaUnChannel) return interaction.reply({content: 'You already have an open ticket on the server.', ephemeral: true})
            if (interaction.values[0] == "yetkili") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const yetkili = new MessageEmbed()
                    .setTitle('Ticket to Pmco Role')
                    .setDescription('Hello, I am **COLD TURKEY CONTACT BOT**. I will give you information about how to take a role. If you want to have the role of pmco, just send the **luqipedia** link and logo, the authorities will come and take a look.')
                    .setFooter('COLD TURKEY')
                    c.send({embeds: [yetkili], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                })
                
            } else if (interaction.values[0] == "şikayet") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const şikayet = new MessageEmbed()
                    .setTitle('Ticket for partnership')
                    .setDescription('Please drop your partner text, and then share the text I posted below, when the authorized person sees your text, it will be shared.')
                    .setFooter('COLD TURKEY')
                    c.send({embeds: [şikayet], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                    c.send(`__***COLD TURKEY CONTACT***__

**Merhaba !**
**Cold Turkey Scrim ailesi olarak aynı kalite ile scrimlerimize devam  etmekteyiz.**

__Dıscord Sunucumuzda  ; __

> • Gelişmiş odalı Scrimler çok yakında 
> •7/24 Aktif Yönetim Kadrosu
> • %100 doğru çıkan sonuçlar
> •Anında Gelen Result

__**Serieslerimiz ;**__

> •Pmco Series
> •Cold Series

**Cold Turkey Scrim**
**Sizlerileride Bekleriz.Daha Ne bekliyorsun…**
__**Discord Adresimiz**__
https://discord.gg/CFTnupTpbG 

https://cdn.discordapp.com/attachments/1048636637313249310/1071399901277212692/standard_29.gif`)
                  
                  
                        })}
          
                
          
          else if (interaction.values[0] == "ortaklık") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const embed = new MessageEmbed()
                    .setTitle('Ticket to get support')
                    .setDescription('Please detail your application so that a server moderator will take the responsibility.')
                    .setFooter('COLD TURKEY')
                    c.send({embeds: [embed], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Your ticket has been successfully opened. <#${c.id}>`, ephemeral: true})
                })
                
            
                
            
            }
        }
    }
}