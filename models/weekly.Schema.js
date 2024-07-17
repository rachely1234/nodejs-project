const mongoose = require('mongoose')
const subjectsEnum = ['piano', 'flute', 'guitar', 'organic'];

const WeeklyScheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    hours: [{
        time: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            enum: subjectsEnum,
            required: true
        }
    }]
});

module.exports=mongoose.model('WeeklySchedule',WeeklyScheduleSchema)