const { SlashCommandBuilder } = require('@discordjs/builders');
const { zjdcz } = require('../embedy.js');
const { id_ranga_zjdcz, id_ranga_zjdcz_najemnik, id_kanal_logi } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
              .setName('zjdcz')
              .setDescription('Operacje na klanie ZDJCZ')
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
                          name: 'daj rangę ZDJCZ',
                          value: 'dał rangę ZDJCZ'
                        },
                        {
                          name: 'zabierz rangę ZDJCZ',
                          value: 'zabrał rangę ZDJCZ'
                        },
                        {
                          name: 'daj rangę najemnik ZDJCZ',
                          value: 'dał rangę najemnik ZDJCZ'
                        },
                        {
                          name: 'zabierz rangę najemnik ZDJCZ',
                          value: 'zabrał rangę najemnik ZDJCZ'
                        }
                      )),
  async execute(interaction) {
    const user = await interaction.guild.members.fetch(interaction.options.getUser('użytkownik').id);
    const option = interaction.options.getString('polecenie');
    switch(option){
      case 'dał rangę ZDJCZ' :
        await user.roles.add(id_ranga_zjdcz);
      break;
      case 'zabrał rangę ZDJCZ' :
        await user.roles.remove(id_ranga_zjdcz);
      break;
      case 'dał rangę najemnik ZDJCZ' :
        await user.roles.add(id_ranga_zjdcz_najemnik);
      break;
      case 'zabrał rangę najemnik ZDJCZ' :
        await user.roles.remove(id_ranga_zjdcz_najemnik);
      break;
    }
    const embed = await zjdcz(interaction, user);
    const logi = await interaction.guild.channels.fetch(id_kanal_logi);
    await interaction.reply({embeds: [embed], ephemeral: true});
    logi.send({embeds: [embed]});
  }
}