const mongoose = require('mongoose')

const UserSchema = require('./user.Schema');
const StudentSchema=require('./student.Schema');
const WeeklyScheduleSchema=require('./weekly.Schema');
const ChatScheme=require('./chatSchema.Schema');
const subjectsEnum = ['piano', 'flute', 'guitar', 'organic'];
const TeacherSchema = new mongoose.Schema({

    subjects: [{
        type: String,
        enum: subjectsEnum,
        required: true
    }],
    weeklySchedule:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'WeeklySchedule',
        required:true
    }
    ],
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'StudentSchema',
        required:true
    }],
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    extraHoursPreference:Boolean



})
module.exports=mongoose.model('Teacher',TeacherSchema)


