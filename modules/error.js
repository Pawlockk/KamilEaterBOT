const { Client, Intents, Permissions } = require("discord.js");
const { error_logo } = require('./config.json');
const { EMBED } = require('./embed.js');

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

module.exports = {
  async ERROR(message){

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
}