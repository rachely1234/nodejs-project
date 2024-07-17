const mongoose = require('mongoose')

const UserSchema = require('./user.Schema');
const StudentSchema=require('./student.Schema');
const WeeklyScheduleSchema=require('./weekly.Schema');
const ChatsSchema=require('./chatSchema.Schema')
const subjectsEnum = ['piano', 'flute', 'guitar', 'organic'];
const ManagerSchema = new mongoose.Schema({

    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    

})
module.exports=mongoose.model('Manager',ManagerSchema)


