const { SlashCommandBuilder } = require('@discordjs/builders');
const { kmltr } = require('../embedy.js');
const { id_ranga_kmltr, id_ranga_kmltr_najemnik, id_kanal_logi } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
              .setName('kmltr')
              .setDescription('Operacje na klanie KMLTR')
              .setDefaultPermission(false)
              .addUserOption(option => 
                      option.setName("użytkownik")
                      .setDescription("Użytkownik")
                      .setRequired(true))
              .addStringOption(option => 
                      option.setName('polecenie')
                      .setDescription('Co mam zrobić?')
                      .setRequired(true)
                      .addChoices(
                        {
                          name: 'daj rangę KMLTR',
                          value: 'dał rangę KMLTR'
                        },
                        {
                          name: 'zabierz rangę KMLTR',
                          value: 'zabrał rangę KMLTR'
                        },
                        {
                          name: 'daj rangę najemnik KMLTR',
                          value: 'dał rangę najemnik KMLTR'
                        },
                        {
                          name: 'zabierz rangę najemnik KMLTR',
                          value: 'zabrał rangę najemnik KMLTR'
                        }
                      )),
  async execute(interaction) {
    const user = await interaction.guild.members.fetch(interaction.options.getUser('użytkownik').id);
    const option = interaction.options.getString('polecenie');
    switch(option){
      case 'dał rangę KMLTR' :
        await user.roles.add(id_ranga_kmltr);
      break;
      case 'zabrał rangę KMLTR' :
        await user.roles.remove(id_ranga_kmltr);
      break;
      case 'dał rangę najemnik KMLTR' :
        await user.roles.add(id_ranga_kmltr_najemnik);
      break;
      case 'zabrał rangę najemnik KMLTR' :
        await user.roles.remove(id_ranga_kmltr_najemnik);
      break;
    }
    const embed = await kmltr(interaction, user);
    const logi = await interaction.guild.channels.fetch(id_kanal_logi);
    await interaction.reply({embeds: [embed], ephemeral: true});
    logi.send({embeds: [embed]});
  }
}