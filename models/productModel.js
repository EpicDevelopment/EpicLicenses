const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
    name: String,
    customerRoleID: String,
    createdBy: String,
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('products', schema);