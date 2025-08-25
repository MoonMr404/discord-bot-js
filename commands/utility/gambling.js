const { SlashCommandBuilder, CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spin')
        .setDescription('Slot machine'),

    async execute(interaction) {
        // Genera tre valori casuali per i rulli (0-9)
        const val = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));

        console.log(val);

        // Controlla se tutti i valori sono uguali
        const jackpot = val.every(v => v === val[0]);

        // Risposta al comando
        //punti canale?
        if (jackpot) {
            // await interaction.reply(`🎉 Jackpot! Hai fatto ${val.join(' - ')}!`);
            await interaction.reply(`🎉 Jackpot! ${interaction.user.username} ha guadagnato ${val.join(' - ')}!`);
        } else {
            await interaction.reply(`${interaction.user.username} ha perso 20 euro poll: ${val.join(' - ')}. Ritenta! ❌`);
        }
    },
};
