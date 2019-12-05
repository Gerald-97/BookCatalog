const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema ({
    name: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin:{ type:Boolean, default: true},
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', adminSchema);