const Joi = require('joi')
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    userId: String,
    name: String,
    email: String,
    phone: String,
    password:String,
    exists: {
        type: Boolean,
        default: true
    },


});

const User = mongoose.model('User', UsersSchema);

module.exports = {
    User,
};


const validUserSchema = Joi.object({
    userId: Joi.string().max(120).min(12).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .message('User ID must be between 12 and 120 characters, and contain only letters and numbers'),
    name: Joi.string().max(9).min(2),
    email: Joi.string().email(),
    phone: Joi.string().max(15).min(7)
    .message('Phone number must be between 7 and 15 digits'),
    password:Joi.string().min(8) 
    .max(30) 
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) 
    .message('Password must be between 8 and 30 characters, and contain only letters and numbers')

});


module.exports = {
    validUserSchema,
};

module.exports = {
    User,
    validUserSchema
};