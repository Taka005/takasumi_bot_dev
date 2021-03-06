async function ticket_event(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isButton()) return;
  if(interaction.customId === "ticket"){
    const user = interaction.user.id
    if(interaction.guild.channels.cache.find(name => name.name === user)) return interaction.reply({content: "チケットは既に作成済みです", ephemeral: true});
      const ch = interaction.guild.channels.cache.find(name => name.name === "ticket")
      if(!ch) return interaction.reply({content:"ticketカテゴリーが存在しない為、チケットを作成できませんでした", ephemeral: true});
        interaction.guild.channels.create(user, {
          permissionOverwrites: [{
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL']
          }],
          parent: ch.id
        })
        .then(channels => {
          channels.permissionOverwrites.edit(interaction.user.id, {VIEW_CHANNEL: true});

          const ticket_button = new MessageButton().setCustomId("close").setStyle("PRIMARY").setLabel("閉じる");
          channels.send({
            embeds: [{
              color:"WHITE",
              description: "お問い合わせへようこそ！\nお問い合わせ内容などをご記入ください。\n\n※ 注意 不必要なチケットの作成はおやめ下さい"
            }],
            components: [new MessageActionRow().addComponents(ticket_button)]
          })
          interaction.reply({content: `${channels}を作成しました`, ephemeral: true});
        })
        .catch(()=> interaction.reply({content:"チケットの作成に失敗しました...\nbotの権限、またはロールがしっかりと設定されてることを確認してください\n原因が解決できない場合はサポートサーバーまでよろしくお願いします\nhttps://discord.gg/GPs3npB63m", ephemeral:true}))
  }
  if(interaction.customId === "close"){
    interaction.channel.delete()
      .catch(()=> interaction.reply({content:"チケットの削除に失敗しました...\nbotの権限、またはロールがしっかりと設定されてることを確認してください\n原因が解決できない場合はサポートサーバーまでよろしくお願いします\nhttps://discord.gg/GPs3npB63m", ephemeral:true}))
  }
}
  
module.exports = ticket_event