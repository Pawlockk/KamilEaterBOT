// Discord AnimeBOT#8064
const { Client, Intents } = require("discord.js");
const { prefix, zjdcz_kanal, scaml_kanal } = require('./modules/config.json');
const { id_kanal_reakcje, id_message_reakcje, cebula, forza } = require('./modules/config.json');
const { ZJDCZ, SCAML } = require('./modules/klany.js');

const client = new Client({
  presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: "UwU",
            type: "WATCHING",
        }],
  },
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});


client.on("ready", async () => {
  console.log(client.user.username, client.user.id);
  const kanal_reakcje = await client.channels.fetch(id_kanal_reakcje);
  await kanal_reakcje.messages.fetch(id_message_reakcje);
});

//dawanie rang komandami
client.on("messageCreate", async (message) => {
  if (message.content.toLowerCase().startsWith(prefix)){
    message.args = message.content.trim().split(/ +/g);
    switch(message.channelId){
      case zjdcz_kanal:
        await ZJDCZ(message);
        break;
      case scaml_kanal:
        await SCAML(message);
        break;
  }
  } 
});


//dawanie rang reakcjami
client.on("messageReactionAdd", async (reaction, user) => {
    const member = await reaction.message.guild.members.fetch(user.id);
    if(reaction.message.channelId == id_kanal_reakcje){
      if(reaction.message.id == id_message_reakcje){
        switch(reaction.emoji.name.toLowerCase()){
          case '🧅':
            await member.roles.add(cebula);
            break;
          case '🚗':
            await member.roles.add(forza);
            break;
        }
      }
    }
})

//zabieranie rang reakcjami
client.on("messageReactionRemove", async (reaction, user) => {
    const member = await reaction.message.guild.members.fetch(user.id);
    if(reaction.message.channelId == id_kanal_reakcje){
      if(reaction.message.id == id_message_reakcje){
        switch(reaction.emoji.name.toLowerCase()){
          case '🧅':
            await member.roles.remove(cebula);
            break;
          case '🚗':
            await member.roles.remove(forza);
            break;
        }
      }
    }
})


client.login(process.env['token']);
// HTTP Server
const http = require('http');
http.createServer((req, res) => {
  res.write("OK");
  res.end();
}).listen(3000);