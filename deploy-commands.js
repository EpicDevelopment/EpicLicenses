// deploy-commands.js
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const token = 'YOUR_DISCORD_BOT_TOKEN';
const clientId = 'YOUR_CLIENT_ID';
const guildId = 'YOUR_GUILD_ID';

const commands = [
    new SlashCommandBuilder().setName('license-fetch').setDescription('Fetch license details')
        .addStringOption(option => option.setName('license').setDescription('The license key').setRequired(true)),
    new SlashCommandBuilder().setName('license-list').setDescription('List licenses by BuiltByBit or Discord user')
        .addStringOption(option => option.setName('auth').setDescription('BuiltByBit or Discord').setRequired(true))
        .addStringOption(option => option.setName('id').setDescription('ID of the user').setRequired(true)),
    new SlashCommandBuilder().setName('license-create').setDescription('Create a new license')
        .addStringOption(option => option.setName('product').setDescription('The product').setRequired(true))
        .addStringOption(option => option.setName('builtbybit').setDescription('BuiltByBit user').setRequired(true))
        .addStringOption(option => option.setName('discord-user').setDescription('Discord user')),
    new SlashCommandBuilder().setName('license-delete').setDescription('Delete a license')
        .addStringOption(option => option.setName('license').setDescription('The license key').setRequired(true)),
    new SlashCommandBuilder().setName('ip-add').setDescription('Add an IP to a license')
        .addStringOption(option => option.setName('license').setDescription('The license key').setRequired(true))
        .addStringOption(option => option.setName('ip').setDescription('The IP address').setRequired(true)),
    new SlashCommandBuilder().setName('ip-del').setDescription('Remove an IP from a license')
        .addStringOption(option => option.setName('license').setDescription('The license key').setRequired(true))
        .addStringOption(option => option.setName('ip').setDescription('The IP address').setRequired(true)),
    new SlashCommandBuilder().setName('ip-list').setDescription('List IPs for a license')
        .addStringOption(option => option.setName('license').setDescription('The license key').setRequired(true)),
    new SlashCommandBuilder().setName('blacklist').setDescription('Blacklist a license, BuiltByBit user, or Discord user')
        .addStringOption(option => option.setName('type').setDescription('License, BuiltByBit, or Discord').setRequired(true))
        .addStringOption(option => option.setName('id').setDescription('The ID of the entity').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for blacklisting')),
    new SlashCommandBuilder().setName('guide').setDescription('Get the guide for a product')
        .addStringOption(option => option.setName('product').setDescription('The product name').setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

module.exports = async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
};
