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

  let member = message.mentions.members.first();
  let role = message.guild.roles.cache.get("955262645257273355");
  let merc = message.guild.roles.cache.get("955262682838216744");

  if(message.args[1] == "nick" && message.args[3] == "ranga"){
    await message.channel.send("no dobra zmienie <@"+member+"> ten nick na "+message.args[2]+" i dam range <@&"+role+">");
    await member.setNickname(message.args[2].toString());
    await member.roles.add(role);
  }else
  if(message.args[1] == "nick" && message.args[3] == "najemnik"){
    await message.channel.send("no dobra zmienie <@"+member+"> ten nick na "+message.args[2]+" i dam range <@&"+merc+">");
    await member.setNickname(message.args[2].toString());
    await member.roles.add(merc);
  }else
  if(message.args[1] == "nick"){
    await message.channel.send("no dobra zmienie <@"+member+"> ten nick na "+message.args[2]);
    await member.setNickname(message.args[2].toString());
  }else
  if(message.args[1] == "ranga"){
    await message.channel.send("no dobra dam <@"+member+"> te range <@&"+role+">");
    await member.roles.add(role);
  }else
  if(message.args[1] == "najemnik"){
    await message.channel.send("no dobra dam <@"+member+"> tego <@&"+merc+">");
    await member.roles.add(merc);
  }else{
    ERROR(message);
  }
  return 0;
}

async function ZJDCZ(message) {
  await message.channel.send("co chcesz psie z ZJDCZ?");
}

async function SCAML(message) {
  await message.channel.send("co chcesz psie z SCAML?");
}

async function CHECK(message){
  if(message.args[1] == "nick" && message.args[3] == "ranga"){
    return 1;
  }
  if(message.args[1] == "nick" && message.args[3] == "najemnik"){
    return 2;
  }
  if(message.args[1] == "nick" && message.args[3] == "zabierz"){
    return 3;
  }
  if(message.args[1] == "nick" && message.args[3] == "podjemnik"){
    return 4;
  }
  if(message.args[1] == "nick" && message.args[3] == "ranga" && message.args[4] == "podjemnik"){
    return 5;
  }
  if(message.args[1] == "nick" && message.args[3] == "podjemnik" && message.args[4] == "ranga"){
    return 6;
  }
  if(message.args[1] == "nick" && message.args[3] == "najemnik" && message.args[4] == "zabierz"){
    return 7;
  }
  if(message.args[1] == "nick" && message.args[3] == "zabierz" && message.args[4] == "najemnik"){
    return 8;
  }
}


client.login(process.env['token']);
// HTTP Server
const http = require('http');
http.createServer((req, res) => {
  res.write("OK");
  res.end();
}).listen(3000);