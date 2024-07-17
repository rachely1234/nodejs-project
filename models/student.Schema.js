const mongoose = require('mongoose');
 const ChatScheme=require('./chatSchema.Schema');
const UserSchema = require('./user.Schema');
const WeeklyScheduleSchema=require('./weekly.Schema');
const subjectsEnum = ['piano', 'flute', 'guitar', 'organic'];

const StudentSchema = new mongoose.Schema({

    subjects: [{
        type: String,
        enum: subjectsEnum,
        required: true
    }],
    age:Number,
    weeklySchedule:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:' WeeklySchedule',
       
        required:true
    }
    ],
    status:{
        type:String,
        enum: ['pending', 'accepted', 'rejected'], 
        require:true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
 });


module.exports = mongoose.model('Student', StudentSchema);




