const {Events} = require('discord.js');

module.exports ={
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member){
        console.log(`New user joined : ${member.user.tag} `);
        //put messages on a file??
        const channel = member.guild.channels.cache.find(ch => ch.name === "welcome");
        if (channel){
            await channel.send(`Benevenut scarafagg ${member.user}`);
        }
    },
};