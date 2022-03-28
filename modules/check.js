const { check, zjdcz_ranga, zjdcz_logo, scaml_ranga, scaml_logo } = require('./config.json');
const { EMBED } = require('./embed.js');

//sprawdza czy jest komenda: nick
async function CHECK_nick(message, osoba){
  if(message.args.includes("nick")){
    await osoba.setNickname(message.args[2].toString());
    return `${check} zmiana nicku z ${osoba.displayName} na ${message.args[2]}\n`;
  }
  return "";
}

//sprawdza czy jest komenda: ranga
async function CHECK_ranga(message, osoba, ranga){
  if(message.args.includes("ranga")){
    await osoba.roles.add(ranga);
    return `${check} dał range ${ranga.name}\n`;
  }
  return "";
}

//sprawdza czy jest komenda: najemnik
async function CHECK_najemnik(message, osoba, najemnik){
  if(message.args.includes("najemnik")){
    await osoba.roles.add(najemnik);
    return `${check} dał range ${najemnik.name}\n`;
  }
  return "";
}

//sprawdza czy jest komenda: wyrzuc
async function CHECK_wyrzuc(message, osoba, ranga){
  if(message.args.includes("ranga")){
    await osoba.roles.remove(ranga);
    return `${check} zabrał range ${ranga.name}\n`;
  }
  return "";
}

//sprawdza czy jest komenda: zabierz
async function CHECK_najemnik(message, osoba, najemnik){
  if(message.args.includes("najemnik")){
    await osoba.roles.remove(najemnik);
    return `${check} zabrał range ${najemnik.name}\n`;
  }
  return "";
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