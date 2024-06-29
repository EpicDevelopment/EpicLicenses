const { glob } = require("glob");
const { promisify } = require("util");
const mongoose = require("mongoose");
const globPromise = promisify(glob);
const chalk = require('chalk');

module.exports = async (client) => {
    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => {
        require(value);
        let eventName = value.split("/")[value.split("/").length - 1].split(".")[0];
        console.log(`${chalk.cyan.bold('┃')} Loaded: ✅ ${chalk.cyan.bold('┃')} ${eventName}`);
    });

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/commands/*.js`
    );

    const CommandsArray = [];
    slashCommands.map((value) => {
        const file = require(value);
        let cmdName;
        let cmdOption;
        if (!file?.name) return cmdName = 'No cmd name', cmdOption = '❌';
        else {
        }
        
        client.commands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        CommandsArray.push(file);
        client.permissions.push(file);
    });
    
    client.on("ready", async () => {
        const MONGO_URI = client.config.BOT_CONFIG.MONGO_URI;
        if (MONGO_URI) await mongoose.connect(MONGO_URI).then(() => console.log(`You are now connected to MongoDB`));
        
        const guild = client.guilds.cache.get(client.config.BOT_CONFIG.GUILD_ID);
        await guild.commands.set(CommandsArray).then((x) => {
        }).catch((error) => {
            console.log('Erm, Looks like you hit a snag setting up the Mongo Database. Did you setup the URI correctly? Config/config.yml')
        })
        require("../api/app");
    });
};