const {id_kanal_admin} = require('../config.json');
const { antialt } = require('../embedy.js');

module.exports = {
  
  execute(bot){
    
    bot.on("guildMemberAdd", async(member) =>{
      if(member.guild.id == '923978699047571466') return;
      
      if(member.user.createdTimestamp > (Date.now() - (1000*60*60*48))){
        
        const kanal_logi = await bot.channels.fetch(id_kanal_admin);
        member.timeout(24 * 60 * 60 * 1000, 'Do weryfikacji');
        kanal_logi.send({embeds: [antialt(member)]});
        
      }
      
    })
    
  }
  
}