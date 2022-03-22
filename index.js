// Discord AnimeBOT#8064
const { Client, Intents , MessageEmbed} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("ready", async () => {
  console.log(client.user.username, client.user.id);
});

  const prefix = "onegai";
  //id logi
  const logi_kanal = "955186031320236112" ;
  //id zjdcz
  const zjdcz_kanal = "955185855713149079";
  const zjdcz_ranga = "955262645257273355";
  const zjdcz_najemnik = "955262682838216744";
  //id scaml
  const scaml_kanal = "955186031320236112";
  const scaml_ranga = "955262682838216744";
  const scaml_najemnik = "955262645257273355";

  


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

//funkcja dla kanału zjdcz
async function ZJDCZ(message) {
  let osoba = message.mentions.members.first(); //przypisuje osobę wspomnianą do zmiennej
  let ranga = message.guild.roles.cache.get(zjdcz_ranga); // przypisuje rangę klanu do zmiennej
  let najemnik = message.guild.roles.cache.get(zjdcz_najemnik); // przypisuje rangę najemnika klanu do zmiennej
  if(await ERROR(message) == true){
    await CHECK(message, osoba, ranga, najemnik,"zjdcz");
  }
    
  return 0;
}

//funkcja dla kanału scaml
async function SCAML(message) {
  let osoba = message.mentions.members.first(); //przypisuje osobę wspomnianą do zmiennej
  let ranga = message.guild.roles.cache.get(scaml_ranga); // przypisuje rangę klanu do zmiennej
  let najemnik = message.guild.roles.cache.get(scaml_najemnik); // przypisuje rangę najemnika klanu do zmiennej
  if(await ERROR(message)){
    await CHECK(message, osoba, ranga, najemnik,"scaml");
  }
    
  return 0;
}



//sprawdza błędy w poleceniu
async function ERROR(message){
  //nie oznaczona osoba
  if(message.mentions.members.first()==null){
    await message.channel.send("nie oznaczyłeś osoby poprawna komenda to: onegai [komendy jakie chcesz wpisać] [oznaczona osoba]");
    return false;//nie wpisany nick
  }else if(message.args[1] == "nick" && (message.args[2] == "ranga" || message.args[2] == "najemnik" || message.args[2] == "zabierz" || message.args[2] == "wyrzuc")){
    await message.channel.send("nie wpisałeś nicku, poprawna komenda to: onegai nick [nick na jaki zmienic]");
    return false;//jednoczesnie wpisana ranga i wyrzuc
  }else if(message.args.includes("ranga") && message.args.includes("wyrzuc")){
    await message.channel.send("Nie możesz jednocześnie dać i zabrać range klanową, jeśli chcesz zabrać najemnika to wpisz: zabierz");
    return false;//jednoczesnie wpisana najemnik i zabierz
  }else if(message.args.includes("najemnik") && message.args.includes("zabierz")){
    await message.channel.send("Nie możesz jednocześnie dać i zabrać range najemnika, jeśli chcesz wyrzucic z klanu to wpisz: wyrzuc");
    return false;//nie wpisana żadna komenda
  }else if(!message.args.includes("nick") && !message.args.includes("ranga") && !message.args.includes("najemnik") && !message.args.includes("zabierz") && !message.args.includes("wyrzuc")){
    await message.channel.send("błędnie wpisane");
    return false;
  }else {//jeśli wszystko działa to wykonuje polecenia
    return true;
  }
  return false;
}


//jeśli nie ma błędów to sprawdza jakie jest polecenie i wykonuje
async function CHECK(message, osoba, ranga, najemnik,klan){
  let logi = `KTO: ${message.author}\n KOMU: ${osoba}\n CO:\n `; 
    //zmiana nicku
  if(message.args.includes("nick")){
    //logi
    logi += `zmiana nicku z ${osoba.displayName} na ${message.args[2]}\n `;
    await osoba.setNickname(message.args[2].toString());
  }

  //dawanie rangi
  if(message.args.includes("ranga")){
    //logi
    logi += `- dał range ${ranga.name}\n `;
    await osoba.roles.add(ranga);
  }

  //dawanie najemnika
  if(message.args.includes("najemnik")){
    //logi
    logi += `- dał range ${najemnik.name}\n `;
    await osoba.roles.add(najemnik);
  }

  //zabieranie rangi
  if(message.args.includes("wyrzuc")){
    //logi
    logi += `- zabrał range ${ranga.name}\n` ;
    await osoba.roles.remove(ranga);
  }

  //zabieranie najemnika
  if(message.args.includes("zabierz")){
    //logi
    logi += `- zabrał range ${najemnik.name}\n` ;
    await osoba.roles.remove(najemnik);
  }

  //embed zjdcz
  const zjdcz_embed = new MessageEmbed()
  .setAuthor("Zmiana w ZJDCZ", "https://eu.wargaming.net/clans/media/clans/emblems/cl_867/500211867/emblem_195x195.png","")
  .setColor(message.guild.roles.cache.get(zjdcz_ranga).color);
  //embed scaml
  const scaml_embed = new MessageEmbed()
  .setAuthor("Zmiana w SCAML", "https://eu.wargaming.net/clans/media/clans/emblems/cl_624/500213624/emblem_195x195.png","")
  .setColor(message.guild.roles.cache.get(scaml_ranga).color);
  
  if(klan == "zjdcz"){
    await client.channels.cache.get(logi_kanal).send({embeds : [zjdcz_embed.setDescription(logi)]});
    await message.channel.send({embeds : [zjdcz_embed.setDescription(logi)]});
  }
  if (klan == "scaml"){
    await client.channels.cache.get(logi_kanal).send({embeds : [scaml_embed.setDescription(logi)]});
    await message.channel.send({embeds : [scaml_embed.setDescription(logi)]});
  }
  
  return 0;
}


client.login(process.env['token']);
// HTTP Server
const http = require('http');
http.createServer((req, res) => {
  res.write("OK");
  res.end();
}).listen(3000);