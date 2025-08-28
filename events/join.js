const fs = require('fs');
const {Events} = require('discord.js');




const data = JSON.parse(fs.readFileSync('links.json', 'utf8'));
const usefulLinks = data.links.map(link => link.url);

module.exports ={
    name: Events.GuildMemberAdd,
    once: false,

    async execute(member){
        console.log(`New user joined : ${member.user.tag} `);
        //put messages on a file??
        const channel = member.guild.channels.cache.find(ch => ch.name === "welcome");
        if (channel){
            //TODO link customizable from ds 
            await channel.send(`Welcome aboard ${member.user}!\nWhy don't you listen to some music while you explore the server!: ${usefulLinks.join('\n')}`);
        }
    },
};