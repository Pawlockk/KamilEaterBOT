// Discord AnimeBOT#8064
const { Client, Intents, MessageEmbed, Permissions } = require("discord.js");
const { prefix, zjdcz_kanal, scaml_kanal } = require('./modules/config.json');
const { id_kanal_reakcje, id_message_reakcje, cebula, forza } = require('./modules/config.json');
const { ZJDCZ, SCAML } = require('./modules/klany.js');
const { error_logo } = require('./modules/config.json');

const client = new Client({
  presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: "SPY×FAMILY",
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

//zarządzanie rangami poprzez komendy
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

const usersMap = new Map();
const LIMIT = 5;
const DIFF = 20000;

client.on("messageCreate", async(message) => {
    if(message.author.bot) return;
    if(message.guild.id != "458738346529783859") return;
    const embed_mute = new MessageEmbed()
  .setAuthor("Mute za spam",error_logo,"")
  .setColor("#ED4245")
  .setDescription("Spamisz, mute na 6h, jeśli sądzisz że mute ci się nie należy napisz do moderacji");
  
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(message.author.id);

        if(difference > DIFF) {
            clearTimeout(timer);
            console.log('Cleared Timeout');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from map.')
            }, 1);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
              
                message.reply({embeds: [embed_mute]});
                const osoba = await message.guild.members.fetch(message.author.id);
                osoba.roles.add("532308726254796811");
                setTimeout(() => {
                osoba.roles.remove("532308726254796811");
                console.log(`unmuted ${message.author.id}`);
                }, 2160000);
                
              
              
               
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
              const member = await message.guild.members.fetch(message.author.id);
              if(await member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
                return;
              }else {
                let fn = setTimeout(() => {
              usersMap.delete(message.author.id);
              console.log('Removed from map.')
              }, 20000);
              usersMap.set(message.author.id, {
                  msgCount: 1,
                  lastMessage : message,
                  timer : fn
              });}
        
    }
})

client.login(process.env['token']);
// HTTP Server
const http = require('http');
http.createServer((req, res) => {
  res.write("OK");
  res.end();
}).listen(3000);