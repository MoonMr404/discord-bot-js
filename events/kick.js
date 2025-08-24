const {Events} = require('discord.js');

module.exports ={
    name: Events.GuildMemberRemove,
    once: false,
    async execute(member){
        console.log(`User: ${member.user.tag} has been removed`);
        //put messages on a file??
        const channel = member.guild.channels.cache.find(ch => ch.name === "welcome");
        if (channel){
            await channel.send(`${member.user} fratm ingiustament vuttat`);
        }
    },
};


//TODO log file for join/kick?