const {SlashCommandBuilder} = require('discord.js');

const mainLink = 'https://www.cardmarket.com/it/Pokemon/Products/Singles/';

class Card{
    constructor(name,price) {
        this.price = price;
        this.name = name;
    }
}

//add card type?
//add ignoring case sensitive 
function getCardPrice(pokemon){
    

    const name = pokemon.toString();
    
    const price = "12";

    // let img;

    const card = new Card(name, price);
    console.log('funcc');
    console.log(card)
    return card;
}



//TODO add cooldown
module.exports = {
    cooldown:5,
    data: new SlashCommandBuilder()
    .setName('pokemon')
    .setDescription('Gives pokemon cards price')
    .addStringOption(option =>
        option.setName('name')
        .setDescription('gives pokemon name')
        .setRequired(true)
        ),


    async execute(interaction){
        const pokemon = interaction.options.getString('name');
        const card = getCardPrice(pokemon);
        await interaction.reply(`${card.name} - ${card.price}`);
    },
};
