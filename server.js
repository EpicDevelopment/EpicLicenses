// server.js
const fs = require('fs');
const yaml = require('yaml');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const setupCommands = require('./deploy-commands');
const startBot = require('./bot');
require('dotenv').config(); // Load environment variables from .env file

// Read and parse config.yml
const config = yaml.parse(fs.readFileSync('./config.yml', 'utf8'));

const app = express();
const PORT = config.server.port || 3000;
const mongoURI = config.mongo.uri;
const discordToken = config.discord.token;

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process or handle gracefully
    });

// Middleware
app.use(bodyParser.json());

// Express route to check license
app.post('/check-license', async (req, res) => {
    const { licenseKey, product } = req.body;
    const License = require('./models/License');

    try {
        const license = await License.findOne({ licenseKey, product });
        if (license && !license.blacklisted) {
            res.json({ status_id: "SUCCESS", license });
        } else {
            res.json({ status_id: "FAILURE" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Web Server running on port ${PORT}`);
    setupCommands(config.discord.client_id, config.discord.guild_id, discordToken);
    startBot(discordToken, config.license.product_guides);
});
