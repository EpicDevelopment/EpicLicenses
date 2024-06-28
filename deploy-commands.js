// bot.js
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
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
                const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(':white_check_mark: License Details')
                    .setDescription(`**License Key:** ${license.licenseKey}\n**Product:** ${license.product}\n**BuiltByBit User:** ${license.builtByBitUser}\n**Discord User:** ${license.discordUser}\n**IPs:** ${license.ips.join(', ')}\n**Blacklisted:** ${license.blacklisted}\n**Blacklist Reason:** ${license.blacklistReason}`);
                await interaction.reply({ embeds: [embed] });
            } else {
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(':x: License Not Found')
                    .setDescription(`No license found for key: ${licenseKey}`);
                await interaction.reply({ embeds: [embed] });
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
                const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(':white_check_mark: Licenses List')
                    .setDescription(licenses.map(license => `**License Key:** ${license.licenseKey}\n**Product:** ${license.product}\n**BuiltByBit User:** ${license.builtByBitUser}\n**Discord User:** ${license.discordUser}\n**IPs:** ${license.ips.join(', ')}\n**Blacklisted:** ${license.blacklisted}\n**Blacklist Reason:** ${license.blacklistReason}`).join('\n\n'));
                await interaction.reply({ embeds: [embed] });
            } else {
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(':x: No Licenses Found')
                    .setDescription(`No licenses found for ${authType} user: ${id}`);
                await interaction.reply({ embeds: [embed] });
            }
        } else if (commandName === 'license-create') {
            const product = options.getString('product');
            const builtByBitUser = options.getString('builtbybit');
            const discordUser = options.getString('discord-user');
            const licenseKey = Math.random().toString(36).substring(2, 15); // simple key generator
            const newLicense = new License({ licenseKey, product, builtByBitUser, discordUser });
            await newLicense.save();
            const embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle(':white_check_mark: License Created')
                .setDescription(`License created: ${licenseKey}`);
            await interaction.reply({ embeds: [embed] });
        } else if (commandName === 'license-delete') {
            const licenseKey = options.getString('license');
            await License.deleteOne({ licenseKey });
            const embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle(':white_check_mark: License Deleted')
                .setDescription(`License deleted: ${licenseKey}`);
            await interaction.reply({ embeds: [embed] });
        } else if (commandName === 'ip-add') {
            const licenseKey = options.getString('license');
            const ip = options.getString('ip');
            const license = await License.findOne({ licenseKey });
            if (license) {
                license.ips.push(ip);
                await license.save();
                const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(':white_check_mark: IP Added')
                    .setDescription(`IP added: ${ip}`);
                await interaction.reply({ embeds: [embed] });
            } else {
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(':x: License Not Found')
                    .setDescription(`No license found for key: ${licenseKey}`);
                await interaction.reply({ embeds: [embed] });
            }
        } else if (commandName === 'ip-del') {
            const licenseKey = options.getString('license');
            const ip = options.getString('ip');
            const license = await License.findOne({ licenseKey });
            if (license) {
                license.ips = license.ips.filter(storedIp => storedIp !== ip);
                await license.save();
                const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(':white_check_mark: IP Removed')
                    .setDescription(`IP removed: ${ip}`);
                await interaction.reply({ embeds: [embed] });
            } else {
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(':x: License Not Found')
                    .setDescription(`No license found for key: ${licenseKey}`);
                await interaction.reply({ embeds: [embed] });
            }
        } else if (commandName === 'ip-list') {
            const licenseKey = options.getString('license');
            const license = await License.findOne({ licenseKey });
            if (license) {
                const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(':white_check_mark: IP List')
                    .setDescription(`IPs for license ${licenseKey}: ${license.ips.join(', ')}`);
                await interaction.reply({ embeds: [embed] });
            } else {
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(':x: License Not Found')
                    .setDescription(`No license found for key: ${licenseKey}`);
                await interaction.reply({ embeds: [embed] });
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
                    const embed = new EmbedBuilder()
                        .setColor('Green')
                        .setTitle(':white_check_mark: License Blacklisted')
                        .setDescription(`License ${id} blacklisted. Reason: ${reason}`);
                    await interaction.reply({ embeds: [embed] });
                } else {
                    const embed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(':x: License Not Found')
                        .setDescription(`No license found for key: ${id}`);
                    await interaction.reply({ embeds: [embed] });
                }
            } else if (type === 'BuiltByBit') {
                licenses = await License.find({ builtByBitUser: id });
                licenses.forEach(async (license) => {
                    license.blacklisted = true;
                    license.blacklistReason = reason;
                    await license.save();
                });
                const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(':white_check_mark: User Blacklisted')
                    .setDescription(`All licenses for BuiltByBit user ${id} blacklisted. Reason: ${reason}`);
                await interaction.reply({ embeds: [embed] });
            } else if (type === 'Discord') {
                licenses = await License.find({ discordUser: id });
                licenses.forEach(async (license) => {
                    license.blacklisted = true;
                    license.blacklistReason = reason;
                    await license.save();
                });
                const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(':white_check_mark: User Blacklisted')
                    .setDescription(`All licenses for Discord user ${id} blacklisted. Reason: ${reason}`);
                await interaction.reply({ embeds: [embed] });
            }
        } else if (commandName === 'guide') {
            const product = options.getString('product');
            // Assume we have some predefined guides stored somewhere
            const guides = {
                'product1': 'Guide for product 1',
                'product2': 'Guide for product 2'
            };
            const guide = guides[product];
            if (guide) {
                const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(':white_check_mark: Guide')
                    .setDescription(guide);
                await interaction.reply({ embeds: [embed] });
            } else {
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(':x: Guide Not Found')
                    .setDescription('No guide found for the specified product.');
                await interaction.reply({ embeds: [embed] });
            }
        }
    });

    client.login(token);
};
