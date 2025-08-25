const {SlashCommandBuilder} = require('discord.js');


const quotes = [
    "Ciao scemo",
    "Cazzo voi",
    "Suca",
    "A shiemo"
];




module.exports = {
    data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('waves to you'),
    async execute(interaction){

        let r = quotes[Math.floor(Math.random()  * quotes.length)];

        console.log(`${r}`);
        await interaction.reply(`${r}`);
    },
};