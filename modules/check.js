const { Client, Intents } = require("discord.js");
const { zjdcz_ranga, zjdcz_logo, scaml_ranga, scaml_logo } = require('./config.json');
const { EMBED } = require('./embed.js');
const check = "<:white_check_mark:957272359675363328>";
//sprawdza czy jest komenda: nick
async function CHECK_nick(message, osoba){
  let logi = "";
  if(message.args.includes("nick")){
    await osoba.setNickname(message.args[2].toString());
    logi += `${check} zmiana nicku z ${osoba.displayName} na ${message.args[2]}\n`;
  }
  return logi;
}

//sprawdza czy jest komenda: ranga
async function CHECK_ranga(message, osoba, ranga){
  let logi = "";
  if(message.args.includes("ranga")){
    await osoba.roles.add(ranga);
    logi += `${check} dał range ${ranga.name}\n`;
  }
  return logi;
}

//sprawdza czy jest komenda: najemnik
async function CHECK_najemnik(message, osoba, najemnik){
  let logi = "";
  if(message.args.includes("najemnik")){
    await osoba.roles.add(najemnik);
    logi += `${check} dał range ${najemnik.name}\n`;
  }
  return logi;
}

//sprawdza czy jest komenda: wyrzuc
async function CHECK_wyrzuc(message, osoba, ranga){
  let logi = "";
  if(message.args.includes("wyrzuc")){
    await osoba.roles.remove(ranga);
    logi +=  `${check} zabrał range ${ranga.name}\n`;
  }
  return logi;
}

//sprawdza czy jest komenda: zabierz
async function CHECK_zabierz(message, osoba, najemnik){
  let logi = "";
  if(message.args.includes("zabierz")){
    await osoba.roles.remove(najemnik);
    logi += `${check} zabrał range ${najemnik.name}\n`;
  }
  return logi;
}

//odpowiedz
async function CHECK_odpowiedz(message,klan,logi){
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

module.exports = {
  async CHECK(message, osoba, ranga, najemnik,klan){
  let logi = `KTO: ${message.author}\nKOMU: ${osoba}\nCO:\n `; 
  
  //zmiana nicku
  logi += await CHECK_nick(message,osoba);

  //dawanie rangi
  logi += await CHECK_ranga(message,osoba,ranga);

  //dawanie najemnika
  logi += await CHECK_najemnik(message,osoba,najemnik);

  //zabieranie rangi
  logi += await CHECK_wyrzuc(message,osoba,ranga);

  //zabieranie najemnika
  logi += await CHECK_zabierz(message,osoba,najemnik);
  
  //wysyłanie odpowiedzi
  await CHECK_odpowiedz(message,klan,logi);
  
  return 0;
}
}