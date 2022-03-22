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
      case "955185855713149079":
        await ZJDCZ(message);
        break;
      case "955186031320236112":
        await SCAML(message);
        break;
  }
  } 
});

//funkcja dla kanału zjdcz
async function ZJDCZ(message) {
  let osoba = message.mentions.members.first(); //przypisuje osobę wspomnianą do zmiennej
  let ranga = message.guild.roles.cache.get("955262645257273355"); // przypisuje rangę klanu do zmiennej
  let najemnik = message.guild.roles.cache.get("955262682838216744"); // przypisuje rangę najemnika klanu do zmiennej
  ERROR(message,osoba,ranga,najemnik);
  return 0;
}

//funkcja dla kanału scaml
async function SCAML(message) {
  let osoba = message.mentions.members.first(); //przypisuje osobę wspomnianą do zmiennej
  let ranga = message.guild.roles.cache.get("955262645257273355"); // przypisuje rangę klanu do zmiennej
  let najemnik = message.guild.roles.cache.get("955262682838216744"); // przypisuje rangę najemnika klanu do zmiennej
  ERROR(message,osoba,ranga,najemnik);
  return 0;
}



//sprawdza błędy w poleceniu
async function ERROR(message, osoba, ranga, najemnik){
  //nie oznaczona osoba
  if(message.mentions.members.first()==null){
    await message.channel.send("nie oznaczyłeś osoby poprawna komenda to: onegai [komendy jakie chcesz wpisać] [oznaczona osoba]");
    return 0;//nie wpisany nick
  }else if(message.args[1] == "nick" && (message.args[2] == "ranga" || message.args[2] == "najemnik" || message.args[2] == "zabierz" || message.args[2] == "wyrzuc")){
    await message.channel.send("nie wpisałeś nicku, poprawna komenda to: onegai nick [nick na jaki zmienic]");
    return 0;//jednoczesnie wpisana ranga i wyrzuc
  }else if(message.args.includes("ranga") && message.args.includes("wyrzuc")){
    await message.channel.send("Nie możesz jednocześnie dać i zabrać range klanową, jeśli chcesz zabrać najemnika to wpisz: zabierz");
    return 0;//jednoczesnie wpisana najemnik i zabierz
  }else if(message.args.includes("najemnik") && message.args.includes("zabierz")){
    await message.channel.send("Nie możesz jednocześnie dać i zabrać range najemnika, jeśli chcesz wyrzucic z klanu to wpisz: wyrzuc");
    return 0;//nie wpisana żadna komenda
  }else if(!message.args.includes("nick") && !message.args.includes("ranga") && !message.args.includes("najemnik") && !message.args.includes("zabierz") && !message.args.includes("wyrzuc")){
    await message.channel.send("błędnie wpisane");
    return 0;
  }else {//jeśli wszystko działa to wykonuje polecenia
    CHECK(message, osoba, ranga, najemnik);
  }
}

//jeśli nie ma błędów to sprawdza jakie jest polecenie i wykonuje
async function CHECK(message, osoba, ranga, najemnik){
  let odpowiedz = "no dobra, "+osoba.displayName+" ";
  let logi = "KTO: <@"+message.author.id+"> KOMU: <@"+osoba+"> CO: ";
    //zmiana nicku
  if(message.args.includes("nick")){
    //logi
    await logi.concat("zmiana nicku z "+osoba.displayName+" na "+message.args[2]+", ");
    //odpowiedz
    await odpowiedz.concat("zmienie nick na "+message.args[2]+", ");
    await osoba.setNickname(message.args[2].toString());
    
  }

  //dawanie rangi
  if(message.args.includes("ranga")){
    //logi
    await logi.concat("dał range "+ranga.name+", ");
    //odpowiedz
    await odpowiedz.concat("dam range "+ranga.name+", ");
    await osoba.roles.add(ranga);
  }

  //dawanie najemnika
  if(message.args.includes("najemnik")){
    //logi
    await logi.concat("dał range "+najemnik.name+", ");
    //odpowiedz
    await odpowiedz.concat("dam range "+najemnik.name+", ");
    await osoba.roles.add(najemnik);
  }

  //zabieranie rangi
  if(message.args.includes("wyrzuc")){
    //logi
    await logi.concat("zabrał range "+ranga.name+", ");
    //odpowiedz
    await odpowiedz.concat("zabiore range "+ranga.name+", ");
    await osoba.roles.remove(ranga);
  }

  //zabieranie najemnika
  if(message.args.includes("zabierz")){
    await odpowiedz.concat("zabiore range "+najemnik.name+", ");
    await osoba.roles.remove(najemnik);
  }

  //logi
  await client.channels.cache.get(`955186031320236112`).send(logi);
  //odpowiedz
  await message.channel.send(odpowiedz);
  
  return 0;
}


client.login(process.env['token']);
// HTTP Server
const http = require('http');
http.createServer((req, res) => {
  res.write("OK");
  res.end();
}).listen(3000);