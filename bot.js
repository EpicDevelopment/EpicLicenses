// bot.js
const { Client, GatewayIntentBits } = require('discord.js');
const License = require('./models/License');

module.exports = (token) => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const { commandName, options } = interaction;

        if (commandName === 'license-fetch') {
            const licenseKey = options.getString('license');
            const license = await License.findOne({ licenseKey });
            if (license) {
                await interaction.reply(JSON.stringify(license, null, 2));
            } else {
                await interaction.reply('License not found.');
            }
        } else if (commandName === 'license-list') {
            const authType = options.getString('auth');
            const id = options.getString('id');
            let licenses;
            if (authType === 'BuiltByBit') {
                licenses = await License.find({ builtByBitUser: id });
            } else if (authType === 'Discord') {
                licenses = await License.find({ discordUser: id });
            }
            if (licenses.length) {
                await interaction.reply(JSON.stringify(licenses, null, 2));
            } else {
                await interaction.reply('No licenses found.');
            }
        } else if (commandName === 'license-create') {
            const product = options.getString('product');
            const builtByBitUser = options.getString('builtbybit');
            const discordUser = options.getString('discord-user');
            const licenseKey = Math.random().toString(36).substring(2, 15); // simple key generator
            const newLicense = new License({ licenseKey, product, builtByBitUser, discordUser });
            await newLicense.save();
            await interaction.reply(`License created: ${licenseKey}`);
        } else if (commandName === 'license-delete') {
            const licenseKey = options.getString('license');
            await License.deleteOne({ licenseKey });
            await interaction.reply(`License deleted: ${licenseKey}`);
        } else if (commandName === 'ip-add') {
            const licenseKey = options.getString('license');
            const ip = options.getString('ip');
            const license = await License.findOne({ licenseKey });
            if (license) {
                license.ips.push(ip);
                await license.save();
                await interaction.reply(`IP added: ${ip}`);
            } else {
                await interaction.reply('License not found.');
            }
        } else if (commandName === 'ip-del') {
            const licenseKey = options.getString('license');
            const ip = options.getString('ip');
            const license = await License.findOne({ licenseKey });
            if (license) {
                license.ips = license.ips.filter(storedIp => storedIp !== ip);
                await license.save();
                await interaction.reply(`IP removed: ${ip}`);
            } else {
                await interaction.reply('License not found.');
            }
        } else if (commandName === 'ip-list') {
            const licenseKey = options.getString('license');
            const license = await License.findOne({ licenseKey });
            if (license) {
                await interaction.reply(JSON.stringify(license.ips, null, 2));
            } else {
                await interaction.reply('License not found.');
            }
        } else if (commandName === 'blacklist') {
            const type = options.getString('type');
            const id = options.getString('id');
            const reason = options.getString('reason') || 'No reason provided';
            let licenses;
            if (type === 'License') {
                licenses = await License.findOne({ licenseKey: id });
                if (licenses) {
                    licenses.blacklisted = true;
                    licenses.blacklistReason = reason;
                    await licenses.save();
                    await interaction.reply(`License ${id} blacklisted. Reason: ${reason}`);
                } else {
                    await interaction.reply('License not found.');
                }
            } else if (type === 'BuiltByBit') {
                licenses = await License.find({ builtByBitUser: id });
                licenses.forEach(async (license) => {
                    license.blacklisted = true;
                    license.blacklistReason = reason;
                    await license.save();
                });
                await interaction.reply(`All licenses for BuiltByBit user ${id} blacklisted. Reason: ${reason}`);
            } else if (type === 'Discord') {
                licenses = await License.find({ discordUser: id });
                licenses.forEach(async (license) => {
                    license.blacklisted = true;
                    license.blacklistReason = reason;
                    await license.save();
                });
                await interaction.reply(`All licenses for Discord user ${id} blacklisted. Reason: ${reason}`);
            }
        } else if (commandName === 'guide') {
            const product = options.getString('product');
            const guides = {
                'product1': 'Guide for product 1...',
                'product2': 'Guide for product 2...',
            };
            const guide = guides[product];
            if (guide) {
                await interaction.reply(guide);
            } else {
                await interaction.reply('Guide not found.');
            }
        }
    });

    client.login(token);
};
