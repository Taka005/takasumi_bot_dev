async function output(message,client){
  const config = require("../../config.json");
  const { MessageAttachment } = require("discord.js")
  
  if(message.content === `${config.prefix}export`){
   const msg = await message.reply("JSON形式に出力中...");

   const invites = await message.guild.invites.fetch(); 

   const data = new Buffer.from(JSON.stringify({
      "guild":{
         "name":message.guild.name,
         "id":message.guild.id,
         "count":message.guild.memberCount,
         "icon":message.guild.iconURL(),
         "invite":{
            "url":invites.map(invite => invite.url),
            "code":invites.map(invite => invite.code)
         },
         "channels":{
            "name":message.guild.channels.cache.map(channel => channel.name),
            "id":message.guild.channels.cache.map(channel => channel.id),
            "topic":message.guild.channels.cache.map(channel => channel.topic),
            "type":message.guild.channels.cache.map(channel => channel.type),
            "count":message.guild.channels.cache.size
         },
         "members":{
            "name":message.guild.members.cache.map(member => member.user.tag),
            "id:":message.guild.members.cache.map(member => member.user.id),
            "color":message.guild.members.cache.map(member =>member.displayHexColor),
            "avatar":message.guild.members.cache.map(member =>member.user.avatarURL())
         },
         "roles":{
            "name":message.guild.roles.cache.map(role => role.name),
            "id":message.guild.roles.cache.map(role => role.id)
         }
      },
      "bot":{
         "user":client.user.tag,
         "ping":client.ws.ping
      }
   },null,"　"),"UTF-8");
 
  
   const attachment = new MessageAttachment()
      .setDescription("データは慎重に扱ってください") 
      .setFile(data) 
      .setName("SERVER_JSON_FILE.json")
   msg.edit({content:"サーバーのデータをJSON形式に出力しました", files: [attachment] })
      .catch(()=>msg.edit("JSONの生成に失敗しました..."))
  }
}
  
module.exports = output