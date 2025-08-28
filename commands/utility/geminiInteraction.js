require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");
const { SlashCommandBuilder } = require('discord.js');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gemini')
        .setDescription('Fai una domanda a Gemini')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Gives AI response')
                .setRequired(true)
        ),

    async execute(interaction) {
        const text = interaction.options.getString('text');

        await interaction.deferReply({ ephemeral: false });

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: text,
            });

            const MAX_CHARS = 2000;
            let replyText = response.text;

            // Se la risposta è troppo lunga, la suddividiamo
            if (replyText.length > MAX_CHARS) {
                let start = 0;
                let end = MAX_CHARS;
                await interaction.editReply(replyText.slice(start, end));
                start = end;

                while (start < replyText.length) {
                    end = start + MAX_CHARS;
                    await interaction.followUp(replyText.slice(start, end));
                    start = end;
                }
            } else {
                
                await interaction.editReply("prompt: " + text + "\n" + replyText);
                
            }

        } catch (error) {
            console.error(error);
            await interaction.editReply('C\'è stato un errore durante l\'esecuzione del comando!');
        }
    },
};
