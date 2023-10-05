require("dotenv").config();
const axios = require("../axios");

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { API_URL } = process.env;

const login = require("../functions/login")
const pluck = require("../functions/pluck")
const getTeams = require("../functions/get-teams")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("team-draw")
    .setDescription("Draw the teams"),
  async execute(interaction) {
    const TOKEN = await login()

    const teams = await getTeams(TOKEN);
    
    const fields = [];

    teams.forEach((team) => {
      let players = pluck(team.players, "name").join("\n- ");
      fields.push({ name: `**${team.name}**`, value: `- ${players}`, inline: true });
    });

    const embed = {
      color: 16191548,
      title: "Sorteio das Equipas",
      thumbnail: {
        url: "https://cdn.discordapp.com/attachments/742420420086726686/1159207256710189197/soccer-ball-to-corner-in-grass-field-line-vector-43876398.jpg?ex=651f0b63&is=651db9e3&hm=8be5866eb22aceeb07c9bb6d8179c18b76e08835efa9d6fc04d8d53757e9c470&",
      },
      fields: fields,
      footer: {
        text: ".",
        icon_url: "https://cdn.discordapp.com/attachments/742420420086726686/1159212884006543411/logo.png?ex=65303420&is=651dbf20&hm=1ea41c15573bfca240511d803d7b059cda9fba614f1d4f6898460f3be32d76da&"
      },
      timestamp: new Date().toISOString(),
    };

    await interaction.deferReply();
    await interaction.editReply({ embeds: [embed] });
  },
};
