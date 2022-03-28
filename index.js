// Discord AnimeBOT#8064
const { Client, Intents , MessageEmbed, Permissions } = require("discord.js");
const { prefix, zjdcz_kanal, scaml_kanal } = require('./modules/config.json');
const { ERROR } = require('./modules/error.js');
const { CHECK } = require('./modules/check.js');
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
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("ready", async () => {
  console.log(client.user.username, client.user.id);
});

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


client.login(process.env['token']);
// HTTP Server
const http = require('http');
http.createServer((req, res) => {
  res.write("OK");
  res.end();
}).listen(3000);