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
  const logi_kanal = "842144844729942056" ;
  //id zjdcz
  const zjdcz_kanal = "880188280967151686";
  const zjdcz_ranga = "880188082077442149";
  const zjdcz_najemnik = "933437854414151700";
  //id scaml
  const scaml_kanal = "906580276250026005";
  const scaml_ranga = "906668240309223495";
  const scaml_najemnik = "956290503459086337";




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
  
  if(await ERROR(message)){
    await CHECK(message, osoba, ranga, najemnik,"zjdcz");
  }
    
  return 0;
}

//funkcja dla kanału scaml
async function SCAML(message) {
  let osoba = message.mentions.members.first(); //przypisuje osobę wspomnianą do zmiennej
  let ranga = message.guild.roles.cache.get(scaml_ranga); // przypisuje rangę klanu do zmiennej
  let najemnik = message.guild.roles.cache.get(scaml_najemnik);// przypisuje rangę najemnika klanu do zmiennej
  
  if(await ERROR(message)){
    await CHECK(message, osoba, ranga, najemnik,"scaml");
  }
    
  return 0;
}



//sprawdza błędy w poleceniu
async function ERROR(message){

  if(
    await ERROR_mention(message) ||
    await ERROR_nick(message) ||
    await ERROR_ranga_wyrzuc(message) ||
    await ERROR_najemnik_zabierz(message) ||
    await ERROR_brak_komendy(message) 
  ){
    return false; //jest bład
  } else return true;  // nie ma błędu
 
}

//sprawdza czy jest oznaczona osoba
async function ERROR_mention(message){
  
  if(message.mentions.members.first()==null){
      await message.channel.send("nie oznaczyłeś osoby poprawna komenda to: onegai [komendy jakie chcesz wpisać] [oznaczona osoba]");
      return true;
    } else return false;
  
}

//sprawdza czy po komendzie nick jest wpisany pseudonim
async function ERROR_nick(message){
  
   if(message.args[1] == "nick" && (message.args[2] == "ranga" || message.args[2] == "najemnik" || message.args[2] == "zabierz" || message.args[2] == "wyrzuc" || message.args[2].startsWith("<@"))){
     await message.channel.send("nie wpisałeś nicku, poprawna komenda to: onegai nick [nick na jaki zmienic]");
      return true;
   } else return false;
  
}

//sprawdza czy jednocześnie są wpisane komendy ranga i wyrzuc
async function ERROR_ranga_wyrzuc(message){
  
  if(message.args.includes("ranga") && message.args.includes("wyrzuc")){
      await message.channel.send("Nie możesz jednocześnie dać i zabrać range klanową, jeśli chcesz zabrać najemnika to wpisz: zabierz");
      return true;
    } else return false;
  
}

//sprawdza czy jednocześnie są wpisane komendy najemnik i zabierz
async function ERROR_najemnik_zabierz(message){
  
  if(message.args.includes("najemnik") && message.args.includes("zabierz")){
      await message.channel.send("Nie możesz jednocześnie dać i zabrać range najemnika, jeśli chcesz wyrzucic z klanu to wpisz: wyrzuc");
      return true;
    } else return false;
  
}

//sprawdza czy podane są komendy
async function ERROR_brak_komendy(message){
  
  if(!message.args.includes("nick") && !message.args.includes("ranga") && !message.args.includes("najemnik") && !message.args.includes("zabierz") && !message.args.includes("wyrzuc"))
    {
      await message.channel.send("błędnie wpisane");
      return true;
    } else return false;
  
}

//jeśli nie ma błędów to sprawdza jakie jest polecenie i wykonuje
async function CHECK(message, osoba, ranga, najemnik,klan){
  let logi = `KTO: ${message.author}\n KOMU: ${osoba}\n CO:\n `; 
    //zmiana nicku
  if(message.args.includes("nick")){
    logi += `- zmiana nicku z ${osoba.displayName} na ${message.args[2]}\n `;
    await osoba.setNickname(message.args[2].toString());
  }

  //dawanie rangi
  if(message.args.includes("ranga")){
    logi += `- dał range ${ranga.name}\n `;
    await osoba.roles.add(ranga);
  }

  //dawanie najemnika
  if(message.args.includes("najemnik")){
    logi += `- dał range ${najemnik.name}\n `;
    await osoba.roles.add(najemnik);
  }

  //zabieranie rangi
  if(message.args.includes("wyrzuc")){
    logi += `- zabrał range ${ranga.name}\n` ;
    await osoba.roles.remove(ranga);
  }

  //zabieranie najemnika
  if(message.args.includes("zabierz")){
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