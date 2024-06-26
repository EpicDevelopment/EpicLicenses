// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Client, GatewayIntentBits } = require('discord.js');
const License = require('./models/License');
const setupCommands = require('./deploy-commands');

const app = express();
const PORT = process.env.PORT || 3000;
const token = 'YOUR_DISCORD_BOT_TOKEN';

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/licenses', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());

// Express route to check license
app.post('/checkLicense', async (req, res) => {
    const { licenseKey, product } = req.body;

    try {
        const license = await License.findOne({ licenseKey, product });
        if (license && !license.blacklisted) {
            res.json({ status_id: "SUCCESS" });
        } else {
            res.json({ status_id: "FAILURE" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Start the Discord bot
setupCommands();
require('./bot')(token);
