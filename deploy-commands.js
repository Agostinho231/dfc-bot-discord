require("dotenv").config();
const { APP_ID, TOKEN, GUILD_ID } = process.env;

const { REST, Routes } = require("discord.js");

//import all command files
const fs = require("node:fs");
const path = require("node:path");

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const commands = [];

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  commands.push(command.data.toJSON());
}

// intancia REST
const rest = new REST({ version: "10" }).setToken(TOKEN);

// deploy
(async () => {
  try {
    console.log(
      `A reiniciar ${commands.length} comando${
        commands.length != 1 ? "s" : ""
      }...`
    );

    // PUT
    const data = await rest.put(
      Routes.applicationGuildCommands(APP_ID, GUILD_ID),
      {
        body: commands,
      }
    );

    console.log("Comandos registrados com sucesso!");
  } catch (error) {
    console.error(error);
  }
})();
