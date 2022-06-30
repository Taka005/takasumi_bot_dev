function events(client){
  const mute_user = require("../data/block_user.json");
  const mute_server = require("../data/block_server.json");

    client.once("ready", async (client) =>{
       const ready = require("./events/ready");

       ready(client)
    });

    client.on('messageCreate', async (message) =>{
        //時間
        var now = new Date();
        var h = now.getHours()
        var m = now.getMinutes()
        var s = now.getSeconds() 
        //globalchat
        const global_base = require("./global/global");
        const connect = require("./global/connect");
        const get = require("./global/get");
        global_base(message,client)
        connect(message,client)
        get(message,client)
        
      if(mute_server[`${message.guild.id}`]||mute_user[`${message.author.id}`]){
        return;
      }
        //other
        const bump = require("./events/bump");
        const antitoken = require("./events/antitoken");
        const reference = require("./events/reference");
        const ngword = require("./events/ngword");
        const urlcheck = require("./events/urlcheck");
        bump(message)
        antitoken(message)
        reference(message,client)
        ngword(message,client)
        urlcheck(message)

        if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  

        //console.log
        console.log(`\x1b[37m[${h}:${m}:${s}]LOG:(${message.author.tag}[${message.guild.id}])${message.content} PING[${client.ws.ping}ms]`);
 
        //コマンド
        const say = require("./commands/say");
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
        const exec = require("./commands/exec");
        const soccer = require("./commands/soccer");
        const echo = require("./commands/echo");
        const auth = require("./commands/auth");
        const panel = require("./commands/panel");
        const dm = require("./commands/dm");
        const global = require("./commands/global");
        const gif = require("./commands/gif");
        const ticket = require("./commands/ticket");
        const quote = require("./commands/quote");
        const output = require("./commands/output");

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
        user(message,client)
        server(message)
        note(message)
        exec(message,client)
        soccer(message)
        echo(message,client)
        auth(message)
        panel(message)
        dm(message,client)
        global(message,client)
        gif(message)
        ticket(message)
        quote(message)
        output(message,client)

      return;
    });

    client.on("interactionCreate", async (interaction) =>{
        //イベント
        const auth_event = require("./events/auth_event");
        const panel = require("./events/panel");
        const check = require("./events/check");
        const ticket = require("./events/ticket");
        const embed_event = require("./events/embed_event");
        const support_event = require("./events/support_event");

        auth_event(interaction);
        panel(interaction);
        check(interaction);
        embed_event(interaction);
        ticket(interaction);
        support_event(interaction,client);

        //スラッシュコマンド
        const support = require("./slashcommands/support");
        const embed = require("./slashcommands/embed");
        const help = require("./slashcommands/help");
        const auth = require("./slashcommands/auth");
        const pane = require("./slashcommands/panel");
        const gif = require("./slashcommands/gif");
        const say = require("./slashcommands/say");
        const del = require("./slashcommands/del");

        help(interaction);
        support(interaction);
        embed(interaction);
        auth(interaction);
        panel(interaction);
        gif(interaction);
        say(interaction);
        del(interaction);
        return;
    });

    client.on("guildMemberAdd", member=>{
        let now = new Date();
        let h = now.getHours()
        let m = now.getMinutes()
        let s = now.getSeconds() 
      
        console.log(`\x1b[37m[${h}:${m}:${s}]LOG:${member.user.tag} PING:${client.ws.ping}ms`)

      const join = require("./events/join");
       
      join(member,client);
    });

    client.on('guildMemberRemove', member =>{
        //時間
      let now = new Date();
      let h = now.getHours()
      let m = now.getMinutes()
      let s = now.getSeconds() 
      console.log(`\x1b[37m[${h}:${m}:${s}]LOG:${member.user.tag} PING:${client.ws.ping}ms`)  

        const leave = require("./events/leave");

        leave(member);
    });
}

module.exports = events