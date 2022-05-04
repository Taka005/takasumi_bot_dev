const node = require('./commands/node');

function events(client){
    const fs = require('fs');

    client.once("ready", async (client) =>{
       const ready = require("./ready");

       ready(client)
    });

    client.on('messageCreate', async (message) =>{
        //時間
        var now = new Date();
        var h = now.getHours()
        var m = now.getMinutes()
        var s = now.getSeconds() 

        const bump = require("./bump")
        bump(message)

        if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  

        //console.log
        console.log(`\x1b[37m[${h}:${m}:${s}]LOG:(`+message.author.tag+`)`+`${message.content} PING[${client.ws.ping}ms]`);
        //fs.log
        fs.appendFileSync('./log.txt', `\n[${h}:${m}:${s}]LOG:(${message.author.tag})${message.content} PING[${client.ws.ping}ms]`, (err) => {
          if(err) {
            console.log(err);
          }
        }); 
        //commands
        const say = require("./commands/say");
        const join = require("./commands/join");
        const avatar = require("./commands/avater");
        const timer = require("./commands/timer");
        const del = require("./commands/del");
        const draw = require("./commands/draw");
        const cpu = require("./commands/cpu");
        const url = require("./commands/url");
        const hello = require("./commands/hello");
        const poll = require("./commands/poll");
        const status = require("./commands/status");
        const user = require("./commands/user");
        const server = require("./commands/server");
        const note = require("./commands/note");
        const node = require("./commands/node");

        join(message)
        say(message)
        avatar(message,client)
        timer(message)
        del(message)
        draw(message)
        cpu(message)
        url(message)
        hello(message)
        poll(message)
        status(message,client)
        user(message)
        server(message)
        note(message)
        node(message)
        
        return;
    });

    client.on("interactionCreate", async (interaction) =>{
        const help = require("./commands/help")

        help(interaction);
        return;
    });

    client.on("guildMemberAdd", member=>{
        var now = new Date();
        var h = now.getHours()
        var m = now.getMinutes()
        var s = now.getSeconds() 
      
        console.log(`\x1b[37m[${h}:${m}:${s}]LOG:${member.user.tag} PING:${client.ws.ping}ms`)
        fs.appendFileSync('./log.txt', `\n[${h}:${m}:${s}]LOG:${member.user.tag} PING:${client.ws.ping}ms`, (err) => {
          if(err) {
            console.log(err);
          }
        });

      const join = require("./join")
       
      join(member,client)
    });

    client.on('guildMemberRemove', member =>{
        //時間
        var now = new Date();
        var h = now.getHours()
        var m = now.getMinutes()
        var s = now.getSeconds() 
        console.log(`\x1b[37m[${h}:${m}:${s}]LOG:${member.user.tag} PING:${client.ws.ping}ms`)  
      
        fs.appendFileSync('./log.txt', `\n[${h}:${m}:${s}]LOG:${member.user.tag} PING:${client.ws.ping}ms`, (err) => {
          if(err) {
            console.log(err);
          }
        }); 

        const leave = require("./leave")

        leave(member)
    });
}

module.exports = events