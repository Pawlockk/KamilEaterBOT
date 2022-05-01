const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = {};
const commandDir = fs.readdirSync('./commands').filter(commandFile => commandFile.endsWith('.js'));

for (const commandFile of commandDir) {
  const commandName = `${commandFile}`.replace('.js', '');
  const command = require(`../commands/${commandFile}`);
  commands[commandName] = command.data.toJSON();
}

module.exports = {
  execute(bot) {
    bot.on('ready', async () => {
        const rest = new REST({ version: '9' }).setToken(process.env['token']);
      for (const guild of bot.guilds.cache) {
        await rest.put(Routes.applicationGuildCommands(bot.user.id, guild[0]), {body: Object.values(commands)});
      }
      console.log(bot.user.username, bot.user.id);
    })
  }
}
