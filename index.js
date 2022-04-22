// Discord AnimeBOT#8064
const { Client, Intents, MessageEmbed, Permissions } = require("discord.js");
const { prefix, zjdcz_kanal, scaml_kanal } = require('./modules/config.json');
const { id_kanal_reakcje, id_message_reakcje, cebula, forza, logi_kanal } = require('./modules/config.json');
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
            member.roles.add(cebula);
            break;
          case '🚗':
            member.roles.add(forza);
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
            member.roles.remove(cebula);
            break;
          case '🚗':
            member.roles.remove(forza);
            break;
        }
      }
    }
})

const usersMap = new Map();
const LIMIT = 5;
const DIFF = 10000;


client.on("messageCreate", async(message) => {
  if(message.author.bot) return;
  if(message.guild.id != "458738346529783859") return;
  const member = await message.guild.members.fetch(message.author.id);
  if(member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;


  
  const embed_mute = new MessageEmbed()
    .setAuthor("Mute za spam",error_logo,"")
    .setColor("#ED4245")
    .setDescription(`${message.author} dostał mute'a za spam na 6h`);
  
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if(difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, 20000);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
              message.channel.send({embeds: [embed_mute]});
              member.timeout(6 * 60 * 60 * 1000, 'Spam');
              clear(message, Date.now());
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
        }, 20000);
        usersMap.set(message.author.id, {
          msgCount: 1,
          lastMessage : message,
          timer : fn
        });
        
    }
})

async function clear(message, end){
  let logi = "";
  let channels = await message.guild.channels.fetch();
  let channels_filtr = channels.filter(c => c.type == 'GUILD_TEXT');
  for (let current of channels_filtr) {
    let mess = await current[1].messages.fetch();
    let mess_filtr = mess.filter(m => m.author.id == message.author.id).filter(b => (end - b.createdTimestamp) < 25000 );
    for(let mc of mess_filtr){
      if(mc[1].content != null) logi += mc[1].content + "\n";
    }
    current[1].bulkDelete(mess_filtr);
  }
  const embed_mute_logi = new MessageEmbed()
    .setAuthor("Mute za spam",error_logo,"")
    .setColor("#ED4245")
    .setDescription(`User: ${message.author} \n Wiadomości:\n ${logi}`);
  const kanal_logi = await client.channels.fetch(logi_kanal);
  kanal_logi.send({embeds: [embed_mute_logi]});
}

client.on("guildMemberAdd", async(member) =>{
  if(member.user.createdTimestamp > (Date.now() - (1000*60*60*48))){
    member.timeout(24 * 60 * 60 * 1000, 'Do weryfikacji');
    const embed_verify = new MessageEmbed()
    .setAuthor("Do weryfikacji",error_logo,"")
    .setColor("#ED4245")
    .setDescription(`User: ${member} \n Konto założone: ${(Date.now() - member.user.createdTimestamp)/(1000*60*60)} godzin temu`);
  const kanal_logi = await client.channels.fetch("531192621281050634");
  kanal_logi.send({embeds: [embed_verify]});
  }
  
})
client.login(process.env['token']);
// HTTP Server
const http = require('http');
http.createServer((req, res) => {
  res.write("OK");
  res.end();
}).listen(3000);