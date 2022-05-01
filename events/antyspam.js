const {id_kanal_logi} = require('../config.json');
const { antispam, antispam_logi } = require('../embedy.js');

//config anti-spam
const TIME = 20 * 1000;
const LIMIT = 7;
const MUTE = 6 * 60 * 60 * 1000;


async function clear(message, end){
  let channels = await message.guild.channels.fetch();
  let channels_filtr = channels.filter(c => c.type == 'GUILD_TEXT');
  
  for (const channel of channels_filtr) {
    let mess = await channel[1].messages.fetch();
    let mess_filtr = mess.filter(m => m.author.id == message.author.id).filter( b => (end - b.createdTimestamp) < (TIME + (TIME/4)) );
      channel[1].bulkDelete(mess_filtr);
  }
}

module.exports = {
  
  execute(bot) {
    
    const usersMap = new Map();
    const messMap = new Map();
    
    bot.on("messageCreate", async(message) => {
      
      const kanal_logi = await bot.channels.fetch(id_kanal_logi);
      const member = await message.guild.members.fetch(message.author.id);
      if(message.author.bot) return;
      if(member.permissions.has('ADMINISTRATOR')) return;

      //
        if(usersMap.has(message.author.id)) {
          const userData = usersMap.get(message.author.id);
          const { lastMessage, timer } = userData;
          let msgCount = userData.msgCount;
          ++msgCount;
          
          if(parseInt(msgCount) === LIMIT) {
            message.channel.send({embeds: [antispam(message,MUTE)]});
            kanal_logi.send({embeds: [antispam_logi(message,MUTE)]});
            member.timeout(MUTE, 'Spam');
            clear(message, Date.now());
          } else {
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
          }
        }
        else {
          let timer = setTimeout(() => {
            usersMap.delete(message.author.id);
            }, TIME);
          
            usersMap.set(message.author.id, {
              msgCount: 1,
              lastMessage : message,
              timer : timer
            }); 
        }
    })
  }
}