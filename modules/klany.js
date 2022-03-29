const { Client, Intents } = require("discord.js");
const { zjdcz_ranga, zjdcz_najemnik, scaml_ranga, scaml_najemnik } = require('./config.json');
const { EMBED } = require('./embed.js');
const { ERROR } = require('./error.js');
const { CHECK } = require('./check.js');




module.exports = {
  //funkcja dla kanału zjdcz
  async ZJDCZ(message) {
    const osoba = message.mentions.members.first(); //przypisuje osobę wspomnianą do zmiennej
    const ranga = await message.guild.roles.fetch(zjdcz_ranga); // przypisuje rangę klanu do zmiennej
    const najemnik = await message.guild.roles.fetch(zjdcz_najemnik); // przypisuje rangę najemnika klanu do zmiennej
    
    if(await ERROR(message)){
      await CHECK(message, osoba, ranga, najemnik,"zjdcz");
    }
      
    return 0;
  },
  //funkcja dla kanału scaml
  async SCAML(message) {
    const osoba = message.mentions.members.first(); //przypisuje osobę wspomnianą do zmiennej
    const ranga = await message.guild.roles.fetch(scaml_ranga); // przypisuje rangę klanu do zmiennej
    const najemnik = await message.guild.roles.fetch(scaml_najemnik);// przypisuje rangę najemnika klanu do zmiennej
    
    if(await ERROR(message)){
      await CHECK(message, osoba, ranga, najemnik,"scaml");
    }
      
    return 0;
  }
}