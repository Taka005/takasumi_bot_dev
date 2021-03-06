const { Client, Intents } = require('discord.js');
require("dotenv").config();
const cnf = require("./config.json"); 

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ],
});

let now = new Date();
let h = now.getHours();
let m = now.getMinutes();
let s = now.getSeconds();

const events = require("./module/events");
const server = require("./module/web/server");
events(client);
server(client);

client.login(process.env.DISCORD_BOT_TOKEN)
  .then(()=> console.info(`\x1b[34m[${h}:${m}:${s}]INFO:ログインに成功しました`))
  .catch(()=> console.error(`\x1b[31m[${h}:${m}:${s}]ERROR:ログインに失敗しました`))

//エラー回避
process.on('uncaughtException',async(error) => {
  console.error(`\x1b[31m[${h}:${m}:${s}]ERROR: `+error);

  client.channels.cache.get(cnf.log_channel).send({
    embeds:[{
      color: "RED",
      description: "```"+`${error}`+"```",
      timestamp: new Date()
    }]
  })
  return;
});

process.on('unhandledRejection',async(error) => {
  console.error(`\x1b[31m[${h}:${m}:${s}]ERROR: `+ error);

  client.channels.cache.get(cnf.log_channel).send({
    embeds:[{
      color: "ORANGE",
      description: "```"+`${error}`+"```",
      timestamp: new Date()
    }]
  })
  return;
});