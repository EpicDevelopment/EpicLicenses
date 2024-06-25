const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
    name: String,
    totalLicenses: Number,
    totalRequests: Number,
    timesBotStarted: Number,
});

module.exports = mongoose.model('stats', schema);