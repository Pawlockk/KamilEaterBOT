// Discord AnimeBOT#8064
const { Client, Intents , MessageEmbed, Permissions} = require("discord.js");
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

//client.user.setPresence({ activities: [{ name: 'with discord.js' }], status: 'idle' });

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

  //dane embed
  const scaml_embed = "Zmiana w SCAML";
  const scaml_logo = "https://eu.wargaming.net/clans/media/clans/emblems/cl_624/500213624/emblem_195x195.png";
  const zjdcz_embed = "Zmiana w ZJDCZ";
  const zjdcz_logo = "https://eu.wargaming.net/clans/media/clans/emblems/cl_867/500211867/emblem_195x195.png";
  const error_logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/1024px-Cross_red_circle.svg.png";
  const check = "<:white_check_mark:957272359675363328>";

async function EMBED(tytul,opis,logo,message,kolor,error){
  
  const embed = new MessageEmbed()
  .setAuthor(tytul,logo,"")
  .setColor(kolor)
  .setDescription(opis);

  await message.channel.send({embeds : [embed] });
  
  if(error){ //sprawdza czy embed ma zwrócić error
    return 0;
  }else{
    const kanal = await client.channels.fetch(logi_kanal);
    await kanal.send({embeds : [embed]});
  }
  
  return 0;
  
}
  




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
  const osoba = message.mentions.members.first(); //przypisuje osobę wspomnianą do zmiennej
  const ranga = await message.guild.roles.fetch(zjdcz_ranga); // przypisuje rangę klanu do zmiennej
  const najemnik = await message.guild.roles.fetch(zjdcz_najemnik); // przypisuje rangę najemnika klanu do zmiennej
  
  if(await ERROR(message)){
    await CHECK(message, osoba, ranga, najemnik,"zjdcz");
  }
    
  return 0;
}

//funkcja dla kanału scaml
async function SCAML(message) {
  const osoba = message.mentions.members.first(); //przypisuje osobę wspomnianą do zmiennej
  const ranga = await message.guild.roles.fetch(scaml_ranga); // przypisuje rangę klanu do zmiennej
  const najemnik = await message.guild.roles.fetch(scaml_najemnik);// przypisuje rangę najemnika klanu do zmiennej
  
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
    await ERROR_brak_komendy(message) ||
    await ERROR_brak_permisji(message)
  ){
    return false; //jest bład
  } else return true;  // nie ma błędu
 
}

//sprawdza czy jest oznaczona osoba
async function ERROR_mention(message){
  
  if(message.mentions.members.first()==null){
      const tekst = "Nie oznaczyłeś osoby, poprawna komenda to:\nonegai [komendy jakie chcesz wpisać] [oznaczona osoba]";
      await EMBED("Błąd składni",tekst,error_logo,message,"#ED4245",true);
      return true; // jest błąd
    } else return false; // nie ma błędu
  
}

//sprawdza czy po komendzie nick jest wpisany pseudonim
async function ERROR_nick(message){
  
   if(message.args[1] == "nick" && (message.args[2] == "ranga" || message.args[2] == "najemnik" || message.args[2] == "zabierz" || message.args[2] == "wyrzuc" || message.args[2].startsWith("<@"))){
     const tekst = "Nie wpisałeś nicku, poprawna komenda to: \nonegai nick [nick na jaki zmienic] [oznaczona osoba]";
     await EMBED("Błąd składni",tekst,error_logo,message,"#ED4245",true);
      return true; // jest błąd
   } else return false; // nie ma błędu
  
}

//sprawdza czy jednocześnie są wpisane komendy ranga i wyrzuc
async function ERROR_ranga_wyrzuc(message){
  
  if(message.args.includes("ranga") && message.args.includes("wyrzuc")){
      const tekst = "Nie możesz jednocześnie dać i zabrać range klanową, \njeśli chcesz zabrać najemnika to wpisz: zabierz";
      await EMBED("Błąd składni",tekst,error_logo,message,"#ED4245",true);
      return true; //jest błąd
    } else return false; //nie ma błędu
  
}

//sprawdza czy jednocześnie są wpisane komendy najemnik i zabierz
async function ERROR_najemnik_zabierz(message){
  
  if(message.args.includes("najemnik") && message.args.includes("zabierz")){
      const tekst = "Nie możesz jednocześnie dać i zabrać range najemnika, \njeśli chcesz wyrzucic z klanu to wpisz: wyrzuc";
      await EMBED("Błąd składni",tekst,error_logo,message,"#ED4245",true);
      return true; //jest błąd
    } else return false; //nie ma błędu
  
}

//sprawdza czy podane są komendy
async function ERROR_brak_komendy(message){
  
  if(!message.args.includes("nick") && !message.args.includes("ranga") && !message.args.includes("najemnik") && !message.args.includes("zabierz") && !message.args.includes("wyrzuc"))
    {
      const tekst = "Błędna komenda, prawidłowe komendy to:\nnick\nranga\nnajemnik\nzabierz\nwyrzuc";
      await EMBED("Błędna komenda",tekst,error_logo,message,"#ED4245",true);
      return true; //jest błąd
    } else return false; //nie ma błędu
  
}

//sprawdza czy oznaczona osoba to Admin
async function ERROR_brak_permisji(message){

  const member = await message.guild.members.fetch(message.mentions.members.first().id);
  if(await member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
    const tekst = "Nie mam uprawnień aby zmienić cokolwiek u tej osoby";
    await EMBED("Brak uprawnień",tekst,error_logo,message,"#ED4245",true);
    return true; //jest błąd
  } else return false; //nie ma błędu
}

//jeśli nie ma błędów to sprawdza jakie jest polecenie i wykonuje
async function CHECK(message, osoba, ranga, najemnik,klan){
  let logi = `KTO: ${message.author}\nKOMU: ${osoba}\nCO:\n `; 
    //zmiana nicku
  if(message.args.includes("nick")){
    logi += `${check} zmiana nicku z ${osoba.displayName} na ${message.args[2]}\n `;
    await osoba.setNickname(message.args[2].toString());
  }

  //dawanie rangi
  if(message.args.includes("ranga")){
    logi += `${check} dał range ${ranga.name}\n`;
    await osoba.roles.add(ranga);
  }

  //dawanie najemnika
  if(message.args.includes("najemnik")){
    logi += `${check} dał range ${najemnik.name}\n`;
    await osoba.roles.add(najemnik);
  }

  //zabieranie rangi
  if(message.args.includes("wyrzuc")){
    logi += `${check} zabrał range ${ranga.name}\n`;
    await osoba.roles.remove(ranga);
  }

  //zabieranie najemnika
  if(message.args.includes("zabierz")){
    logi += `${check} zabrał range ${najemnik.name}\n`;
    await osoba.roles.remove(najemnik);
  }
  
  //wysyłanie odpowiedzi
  if(klan == "zjdcz"){
    const kolor = message.guild.roles.cache.get(zjdcz_ranga).color;
    await EMBED("Zmiana w ZJDCZ",logi,zjdcz_logo,message,kolor,false);
  }
  if (klan == "scaml"){
    const kolor = message.guild.roles.cache.get(scaml_ranga).color;
    await EMBED("Zmiana w SCAML",logi,scaml_logo,message,kolor,false);
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