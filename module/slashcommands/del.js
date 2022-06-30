async function del(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "del"){
    const del = interaction.options.getInteger("number");
      if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content:`delを使うには「メッセージ管理」の権限が必要です`,ephemeral:true });
      if(del < 2 || del > 80 ) return interaction.reply({ content:"削除する数は2以上、80以下にしてください", ephemeral:true })   
        const messages = await interaction.channel.messages.fetch({ limit: del })         
        interaction.channel.bulkDelete(messages)
          .then(()=> interaction.reply(`${interaction.member}${del}個のメッセージを削除しました`))
          .catch(()=> interaction.reply({ content:"削除できないメッセージが含まれているため、削除できませんでした",ephemeral:true })) 
        return;
  }
}
  
module.exports = del