const mongoose = require('mongoose');

const EmailTemp = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    codigo: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now, expires: '1m'}
});

const TempUser = mongoose.model('TempUser', EmailTemp);

module.exports = { TempUser };