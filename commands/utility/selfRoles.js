const {SlashCommandBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('selfroles')
    .setDescription('selfRoles-banner'),


    async execute(interaction){
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
            await interaction.reply({
                content: "You don't have permission for this command",
                ephemeral: true
            });
            return;
        }

    

        const buttonTest = new ButtonBuilder()
            .setCustomId('testerButton')
            .setLabel('Tester')
            .setEmoji('✅')
            .setStyle(ButtonStyle.Secondary);
    
        const row = new ActionRowBuilder()
        .addComponents(buttonTest);

        const embed = new EmbedBuilder()
            .setTitle('Self Roles')
            .addFields(
                {name:'tester', value:'✅ <@&1409860990157455411>', inline:true}
            )
      await interaction.reply({embeds:[embed], components:[row]});
    },
};