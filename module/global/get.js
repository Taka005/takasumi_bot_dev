function get(message,client){
  if(message.channel.id != "949862388969119755" || message.author.id == client.user.id || !message.embeds[0].description) return;
  let msg = JSON.parse(new Buffer.from(message.embeds[0].description, "base64"));
  message.react("π")
return;
  client.channels.cache.get("949900405012324372").send({//θ§£θͺ­γ³γΌγ
    embeds: [{
      description: JSON.stringify(msg,null,"γ")
    }]
  });

  if(!msg.message.attachments.length){
    client.channels.cache.filter(channel => channel.topic == "$$GLOBAL$$").forEach((channel) =>{
      channel.send({//ζ·»δ»γγ‘γ€γ«γͺγ
        embeds:[{
          color: "WHITE",
          author: {
            name: `${msg.author.username}${msg.author.discriminator}`,
            icon_url: msg.author.avatarURL ||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: msg.message.content,
          footer: {
            text: `${msg.guild.name} <${message.author.username}>`,
            icon_url:msg.guild.iconURL ||"https://cdn.discordapp.com/embed/avatars/0.png"
          },
          timestamp: new Date()
        }]
      });

    });
    message.react("β")
    return;
  }else{
    client.channels.cache.filter(channel => channel.topic == "$$GLOBAL$$").forEach((channel) =>{
      channel.send({//ζ·»δ»γγ‘γ€γ«γγ
        embeds:[{
          color: "WHITE",
          author: {
            name: `${msg.author.username}${msg.author.discriminator}`,
            icon_url: msg.author.avatarURL ||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description:`${msg.message.content}\n[ζ·»δ»γγ‘γ€γ«](${msg.message.attachments[0].url})`,
          footer: {
            text: `${msg.guild.name} <${message.author.username}>`,
            icon_url:msg.guild.iconURL ||"https://cdn.discordapp.com/embed/avatars/0.png"
          },
          timestamp: new Date()
        }]
      });

    });
    message.react("β")
    return;
  }
}

module.exports = get