const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const License = require('./models/License');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/licenses', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
