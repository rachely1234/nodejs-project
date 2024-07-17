
const { User, validUserSchema } = require('../../models/user.Schema');

async function updateUserStatus(userId, exists) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.exists = exists;
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function addUser(studentData) {


    try {
        let user = await User.findOne({ email: studentData.email });
        console.log("user.findone");
        console.log(user);
        if (user) {
            throw new Error("email is exist already");
        }
        user=await User.findOne({userId:studentData.userId})
        if(user){
            throw new Error("user is exist already");
        }

        let newUser = {
            "userId": studentData.userId,
            "name": studentData.name,
            "email": studentData.email,
            "phone": studentData.phone
        }

        const { error } = validUserSchema.validate(newUser);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const newStudent = new User(newUser);
        const savedStudent = await newStudent.save();
        return savedStudent;
    }
    catch (err) {
        throw err;
    }
}



module.exports = {
    addUser,
    updateUserStatus

};