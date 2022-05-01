const { MessageEmbed } = require('discord.js');
const { logo_error, logo_kmltr, logo_zjdcz, logo_scaml } = require('./config.json');

module.exports = {
  antialt(member){
    const embed = new MessageEmbed()
        .setAuthor("Do weryfikacji",logo_error,"")
        .setColor("#ED4245")
        .setDescription(`
          User: ${member} \n 
          Konto założone: ${(Date.now() - member.user.createdTimestamp)/(1000*60*60)} godzin temu
        `);
    return embed;
  },
  antispam( message, MUTE ){
    const embed = new MessageEmbed()
        .setAuthor("Mute za spam",logo_error,"")
        .setColor("#ED4245")
        .setDescription(`${message.author} dostał mute'a za spam na ${MUTE/(60 * 60 * 1000)}h`);
    return embed;
  },
  antispam_logi( message, MUTE ){
    const embed = new MessageEmbed()
        .setAuthor("Mute za spam",logo_error,"")
        .setColor("#ED4245")
        .setDescription(`User: ${message.author} \n Reason: Spam \n Time: ${MUTE/(60 * 60 * 1000)} h`);
    return embed;
  },
  async kmltr(interaction){
    const user = await interaction.guild.members.fetch(interaction.options.getUser('użytkownik').id);
    const option = interaction.options.getString('polecenie');
    const embed = new MessageEmbed()
        .setAuthor("Zmiany w KMLTR",logo_kmltr,"")
        .setColor("#ED4245")
        .setDescription(`KTO: ${interaction.user} \n KOMU: ${user} \n CO: ${option}`);
    return embed;
  },
  async scaml(interaction){
    const user = await interaction.guild.members.fetch(interaction.options.getUser('użytkownik').id);
    const option = interaction.options.getString('polecenie');
    const embed = new MessageEmbed()
        .setAuthor("Zmiany w SCAML",logo_scaml,"")
        .setColor("#ED4245")
        .setDescription(`KTO: ${interaction.user} \n KOMU: ${user} \n CO: ${option}`);
    return embed;
  },
  async zjdcz(interaction){
    const user = await interaction.guild.members.fetch(interaction.options.getUser('użytkownik').id);
    const option = interaction.options.getString('polecenie');
    const embed = new MessageEmbed()
        .setAuthor("Zmiany w ZJDCZ",logo_zjdcz,"")
        .setColor("#ED4245")
        .setDescription(`KTO: ${interaction.user} \n KOMU: ${user} \n CO: ${option}`);
    return embed;
  }
}