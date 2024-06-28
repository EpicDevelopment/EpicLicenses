// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const setupCommands = require('./deploy-commands');
const startBot = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/licenses';
const discordToken = process.env.DISCORD_TOKEN;

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

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
    console.log(`Server running on port ${PORT}`);
    setupCommands();
    startBot(discordToken);
});
