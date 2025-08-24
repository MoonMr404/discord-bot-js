const {SlashCommandBuilder} = require('discord.js');


//TODO add cooldown
module.exports = {
    cooldown:5,
    data: new SlashCommandBuilder()
    .setName('ao-contatto')
    .setDescription('Chiama il contatto')
    ,

    async execute(interaction){
        await interaction.reply(`Ao contatto!`);
    },
};
