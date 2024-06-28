const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
    licenseKey: { type: String, required: true },
    productName: { type: String, required: true },
    discordUserID: { type: String, required: true },
    builtbybitUserID: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    totalRequests: { type: Number, default: 0 },
    ipList: { type: [String], default: [] },
    hwidList: { type: [String], default: [] }
});

module.exports = mongoose.model('License', licenseSchema);
