async function invite(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "invite"){
    const bot = new MessageButton()
      .setLabel("BOT招待")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=981314695543783484&permissions=1644971949559&scope=bot%20applications.commands")
      .setStyle("LINK")

    const support = new MessageButton()
      .setLabel("サポート")
      .setURL("https://discord.gg/GPs3npB63m")
      .setStyle("LINK")

    const site = new MessageButton()
      .setLabel("サイト")
      .setURL("https://taka.ml/")
      .setStyle("LINK")

    await interaction.reply({
      embeds: [{
        color:"WHITE",
        title:"ご利用いただきありがとうございます",
        description: "制作:Taka005#1203\nスラッシュコマンド又は`>`でコマンドが使用可能です\nBOT導入、サポートサーバーに参加よろしくお願いします"
      }],
      components: [
        new MessageActionRow()
          .addComponents(bot)
          .addComponents(support)
          .addComponents(site)
      ]
    })
    return;
  }
}
    
module.exports = invite