const { SlashCommandBuilder } = require('@discordjs/builders');
const { scaml } = require('../embedy.js');
const { id_ranga_scaml, id_ranga_scaml_najemnik, id_kanal_logi } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
              .setName('scaml')
              .setDescription('Operacje na klanie SCAML')
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
                          name: 'daj rangę SCAML',
                          value: 'dał rangę SCAML'
                        },
                        {
                          name: 'zabierz rangę SCAML',
                          value: 'zabrał rangę SCAML'
                        },
                        {
                          name: 'daj rangę najemnik SCAML',
                          value: 'dał rangę najemnik SCAML'
                        },
                        {
                          name: 'zabierz rangę najemnik SCAML',
                          value: 'zabrał rangę najemnik SCAML'
                        }
                      )),
  async execute(interaction) {
    const user = await interaction.guild.members.fetch(interaction.options.getUser('użytkownik').id);
    const option = interaction.options.getString('polecenie');
    switch(option){
      case 'dał rangę SCAML' :
        await user.roles.add(id_ranga_scaml);
      break;
      case 'zabrał rangę SCAML' :
        await user.roles.remove(id_ranga_scaml);
      break;
      case 'dał rangę najemnik SCAML' :
        await user.roles.add(id_ranga_scaml_najemnik);
      break;
      case 'zabrał rangę najemnik SCAML' :
        await user.roles.remove(id_ranga_scaml_najemnik);
      break;
    }
    const embed = await scaml(interaction, user);
    const logi = await interaction.guild.channels.fetch(id_kanal_logi);
    await interaction.reply({embeds: [embed], ephemeral: true});
    logi.send({embeds: [embed]});
  }
}