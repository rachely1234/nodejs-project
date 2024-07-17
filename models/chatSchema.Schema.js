const { required } = require('joi');
const mongoose = require('mongoose');
const Message= require('./messageSchema.Schema')
const User=require('./user.Schema')

const ChatSchema = new mongoose.Schema({
    roomName: String,

    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],

    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',

        }
    ],




});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = {
    Chat,
};


