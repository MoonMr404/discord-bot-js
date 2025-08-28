const { SlashCommandBuilder } = require("discord.js");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Imposta il refresh token (ottenuto quando hai fatto login OAuth)
spotifyApi.setRefreshToken(process.env.SPOTIFY_REFRESH_TOKEN);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spotify")
    .setDescription("Aggiungi una canzone a una playlist Spotify")
    .addStringOption(option =>
      option
        .setName("link")
        .setDescription("Il link della canzone Spotify")
        .setRequired(true)
    ),

  async execute(interaction) {
    const link = interaction.options.getString("link");

    // Estrai l'ID della traccia dal link
    const match = link.match(/track\/([a-zA-Z0-9]+)/);
    if (!match) {
      return interaction.reply("❌ Link non valido! Usa un link di canzone Spotify.");
    }
    const trackId = match[1];
    const trackUri = `spotify:track:${trackId}`;

    try {
      // Refresh token -> nuovo access token
      const data = await spotifyApi.refreshAccessToken();
      spotifyApi.setAccessToken(data.body["access_token"]);

      // Aggiungi la canzone alla playlist
      await spotifyApi.addTracksToPlaylist(process.env.SPOTIFY_PLAYLIST_ID, [trackUri]);

      return interaction.reply(`✅ Ho aggiunto la canzone alla playlist!\n${link}`);
    } catch (err) {
      console.error("Errore Spotify:", err);
      return interaction.reply("❌ Non sono riuscito ad aggiungere la canzone. Controlla i log.");
    }
  },
};
