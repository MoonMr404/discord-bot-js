require('dotenv').config();
const {Events, MessageFlags } = require('discord.js');
const {Client, GatewayIntentBits} = require('discord.js');


const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers, // NECESSARIO per i ruoli
        GatewayIntentBits.MessageContent,
    ]
});


client.on(
    Events.InteractionCreate, 
    
    async (interaction) => {
        if(!interaction.isButton()){
            return;
        }

        const roleButtonMapping = {
            'testerButton' : '1409860990157455411'
        };

        if(roleButtonMapping.hasOwnProperty(interaction.customId)){
            const guild = client.guilds.cache.get('1408198564756324402');
            const roleID = roleButtonMapping[interaction.customId];     
            const role = guild.roles.cache.get(roleID);

            if(!role){
                return interaction.reply('unspecified role');
            }

            const member = guild.members.cache.get(interaction.user.id);
            const hasRole = member.roles.cache.has(role.id);

            try{
                if(hasRole){
                    await member.roles.remove(role);
                    await interaction.reply({content: `${role.name} removed`, flags: MessageFlags.Ephemeral});
                }else {
                    await member.roles.add(role);
                    await interaction.reply({content: `${role.name} added`, flags: MessageFlags.Ephemeral});
                }
            } catch(error){
                console.log(error);
                await interaction.reply({content:"An error occured", flags: MessageFlags.Ephemeral});
            }
   }
});


client.login(process.env.DISCORD_TOKEN);