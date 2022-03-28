const { logi_kanal } = require('./config.json');

module.exports = {
  async EMBED(tytul,opis,logo,message,kolor,error){
  
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
}