const {SlashCommandBuilder} = require('discord.js');
const path = require('node:path');


//TODO spostare in una cartella "privata"
module.exports = {
    data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Refresh a command')
    .addStringOption(option =>
        option.setName('command')
            .setDescription('Command to Realod')
            .setRequired(true)
    ),

    async execute(interaction){
        const commandName = interaction.options.getString('command', true).toLowerCase();
        const command = interaction.client.comands.get(commandName);

        if(!command){
            return interaction.reply(`Command ${commandName}`);
        }

        const commandPath = path.join(__dirname, `${command.data.name}`);

        try{
            delete require.cache[require.resolve(commandPath)];
            
            const newCommand = require(commandPath);

            interaction.client.commands.set(newCommand.data.name);

            await interaction.reply(`Command ${commandName} reloaded`);
        
        } catch(error){
            console.error(error);
            await interaction.reply("Command not reloaded");
        }

    },
};