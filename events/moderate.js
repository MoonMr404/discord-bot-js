require('dotenv').config();
const {Client, GatewayIntentBits} = require('discord.js');


const bannableWords = [
  'pubblicità',
  'comprare',
  'vendere',
  'spam',
  'hack'
];

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});


client.on('messageCreate', (message) =>{
    
    let i = bannableWords.some(kw => message.content.includes(kw));
    if(i){
        message.reply('Hai detto una parola bannata, Attenzione');
        console.log(`${message.author.username} ha detto una parola proibita `);
    }
})

client.login(process.env.DISCORD_TOKEN);