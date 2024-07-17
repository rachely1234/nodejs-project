const Joi = require('joi');
const Student = require('./student.Schema');  
const subjectsEnum = ['piano', 'flute', 'guitar', 'organic'];
const studentValidationSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z]+$/).min(2).required()
        .messages({
            'string.pattern.base': 'Name must contain only letters',
            'string.min': 'Name must be at least 2 characters long',
            'any.required': 'Name is required'
        }),
    phone: Joi.string().pattern(/^[0-9]{7,10}$/).required()
        .messages({
            'string.pattern.base': 'Phone number must be between 7 and 10 digits',
            'any.required': 'Phone number is required'
        }),
    email: Joi.string().email().required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required'
        }),
    subjects: Joi.array().items(Joi.string().valid(...subjectsEnum)).required()
        .messages({
            'array.base': 'Subjects must be an array',
            'any.required': 'Subjects are required'
        }),
    age: Joi.number().integer().positive().required()
        .messages({
            'number.base': 'Age must be a number',
            'number.integer': 'Age must be an integer',
            'number.positive': 'Age must be a positive number',
            'any.required': 'Age is required'
        }),
    weeklySchedule: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).required()
        .messages({
            'array.base': 'Weekly Schedule must be an array',
            'any.required': 'Weekly Schedule is required'
        }),
    status: Joi.string().valid('pending', 'accepted', 'rejected').required()
        .messages({
            'any.only': 'Status must be one of "pending", "accepted", "rejected"',
            'any.required': 'Status is required'
        }),
    user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
        .messages({
            'string.pattern.base': 'User ID must be a valid ObjectId',
            'any.required': 'User ID is required'
        }),
    chats: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).optional()
        .messages({
            'array.base': 'Chats must be an array'
        })
});

module.exports = studentValidationSchema;
