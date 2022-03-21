// Discord AnimeBOT#8064
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const prefix = "onegai"

client.on("ready", async () => {
  console.log(client.user.username, client.user.id);
});
client.on("messageCreate", async (message) => {
  if (message.content.toLowerCase().startsWith(prefix)){
    message.args = message.content.trim().split(/ +/g);
    switch(message.channelId){
      case "955156015098257458":
        await KMLTR(message);
        break;
      case "955185855713149079":
        await ZJDCZ(message);
        break;
      case "955186031320236112":
        await SCAML(message);
        break;
  }
  } 
});


async function KMLTR (message) {
  if(message.args[1] == message.mentions.members.first() || message.args[2] == message.mentions.members.first() || message.args[3] == message.mentions.members.first() || message.args[4] == message.mentions.members.first() || message.args[2] == null){
    await message.channel.send("ale jesteś dupa, źle wpisałeś komende");
  }else
  if(message.args[1] == "nick" && message.args[3] == "ranga"){
    await message.channel.send("no dobra zmienie <@"+message.mentions.members.first()+"> ten nick na "+message.args[2]+" i dam range");
  }else
  if(message.args[1] == "nick" && message.args[4] == "najemnik"){
    await message.channel.send("no dobra zmienie <@"+message.mentions.members.first()+"> ten nick na "+message.args[2]+" i dam najemnika");
  }else
  if(message.args[1] == "nick"){
    await message.channel.send("no dobra zmienie <@"+message.mentions.members.first()+"> ten nick na "+message.args[2]);
  }else
  if(message.args[1] == "ranga"){
    await message.channel.send("no dobra dam <@"+message.mentions.members.first()+"> te range");
  }else
  if(message.args[1] == "najemnik"){
    await message.channel.send("no dobra dam <@"+message.mentions.members.first()+"> tego najemnika");
  }else{
    await message.channel.send("co chcesz psie?")
  }
    
}

async function ZJDCZ(message) {
  await message.channel.send("co chcesz psie z ZJDCZ?");
}

async function SCAML(message) {
  await message.channel.send("co chcesz psie z SCAML?");
}


client.login(process.env['token']);
// HTTP Server
const http = require('http');
http.createServer((req, res) => {
  res.write("OK");
  res.end();
}).listen(3000);