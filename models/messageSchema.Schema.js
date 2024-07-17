const mongoose = require('mongoose');
const UserScheme = require('./user.Schema');
const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        // required: true
    },
    timestamp: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Message', MessageSchema);
