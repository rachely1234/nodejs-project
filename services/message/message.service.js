const Message = require('../../models/messageSchema.Schema');
const { error, messages } = require('../../models/studentValidation');
const { User } = require('../../models/user.Schema');
const { Chat } = require('../../models/chatSchema.Schema');

const leaveroom = async (data) => {


    try {

        const chatRoomUsers = await Chat.findOne({ roomName: data.room })

        if (!chatRoomUsers) {
            console.log(`Chat room ${room} not found.`);
            return;
        }

        chatRoomUsers.participants = chatRoomUsers.participants.filter((user) => user != data.userID)
        chatRoomUsers.save();
    }
    catch (err) {
        console.error(err)
        throw err;
    }
}


const get100LastMessage = async (room) => {
    try {
        // const message = await Message.find().limit(100);
        const chatRoom = await Chat.find({ roomName: room })
        // .populate({
        //     path: 'messages',
        //     options: {
        //         // sort: { createdAt: -1 }, // Sort messages in descending order of createdAt
        //         limit: 5 // Limit to 100 messages
        //     }
        // });

        const messages = await Message.find();

        // chatRoomUsers.participants=chatRoomUsers.participants.filter((user) => user!=data.userID)



        let arr= messages.filter((msg) => chatRoom[0].messages.includes(msg._id)).slice(0, 100)
        let user;
        const brr = await Promise.all(arr.map(async (message) => {
            const user = await User.findOne({ _id: message.sender });
            return {
                ...message._doc,
                sender: user ? user.name : 'Unknown User'
            };
        }));
  
        console.log(brr);
        return brr;
    } catch (error) {
        console.error('Error fetching recent messages:', error);
        throw error;
    }
};

async function addMessage(data) {
    console.log("data");
    console.log(data);

    try {

        let chatRoom = await Chat.findOne({ roomName: data.room })
        if (!chatRoom) {
            chatRoom = new Chat({
                roomName: data.room,
                participants: [],
                messages: [],
            })

        }

        let user = await User.findOne({ name: data.sender })
        console.log("user");
        console.log(user);
        //כרגע השם היחיד שאפשר להכניס הוא gj

        let messageData = {
            //לשנות ל user._id
            sender: user._id,
            content: data.content,
            timestamp: data.timestamp
        }
        const newMessage = new Message(messageData);
        chatRoom.messages.push(newMessage._id);
        const saveMessage = await newMessage.save();
        const newChat = await chatRoom.save();
        console.log("saveMessage");
        console.log(saveMessage.sender);
        // saveMessage._doc.sender=user.name,
        saveMessage._doc.sender=user.name,
        console.log(saveMessage.sender);
        return saveMessage;
    } catch (err) {
        console.error(err)
    }
}


module.exports = {
    addMessage,
    get100LastMessage,
    leaveroom

};




