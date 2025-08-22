require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { clientId, guildId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] Il comando in ${filePath} non ha "data" o "execute".`);
        }
    }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`loding ${commands.length} commands`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), // Guild-specific = immediato
            { body: commands },
        );

        console.log(`${data.length} commands loaded`);
    } catch (error) {
        console.error(error);
    }
})();
