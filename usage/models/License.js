const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
    licenseKey: { type: String, required: true, unique: true },
    product: { type: String, required: true },
    builtByBitUser: { type: String, required: true },
    discordUser: { type: String },
    ips: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    blacklisted: { type: Boolean, default: false },
    blacklistReason: { type: String }
});

module.exports = mongoose.model('License', LicenseSchema);
