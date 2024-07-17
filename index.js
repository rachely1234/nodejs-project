require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const CHAT_BOT = 'ChatBot';
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room
const messageservice = require('./src/services/message/message.service');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://127.0.0.1:27017/School-management', {})
    .then(() => {
        console.log('MongoDB connected');
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error('MongoDB connection error:', error.message));

// Socket.IO connection
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on('leave_room', (data) => {

        let timestamp = Date.now();
        const { sender, room, __createdtime__ } = data;

        // Use room to leave the socket room
        socket.leave(room);
        socket.to(room).emit('receive_message', {
            content: `${data.sender} has left the chat room`,
            sender: CHAT_BOT,
            timestamp,
        });

        console.log(`User has left room ${room}`);

    });
    socket.on('join_room', async (data) => {

        const { sender, room } = data; // Data sent from client when join_room event emitted
        socket.join(room); // Join the user to a socket room
        let timestamp = Date.now(); // Current timestamp
        // Send message to all users currently in the room, apart from the user that just joined
        socket.to(room).emit('receive_message', {
            content: `${sender} has joined the chat room`,
            sender: CHAT_BOT,
            timestamp,
        });
        socket.emit('receive_message', {
            content: `Welcome ${sender}`,
            sender: CHAT_BOT,
            timestamp,
        });
        chatRoom = room;
        allUsers.push({ id: socket.id, sender, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
        socket.on('send_message', async (data) => {
            const { content, sender, room, timestamp } = data;

            try {

                const last100Messages = await messageservice.get100LastMessage(room)
                socket.emit('last_100_messages', last100Messages);
                //להראות לחיהלה ששניתי פה
                const newMessage = await messageservice.addMessage(data);
                io.in(room).emit('receive_message', newMessage);
            } catch (error) {
                console.error('Error saving message:', error);
            }


        });

    });



});

// Routes
const studRouter = require("./src/routes/student.rout");
const userRouter = require("./src/routes/user.rout");
const messageRouter = require("./src/routes/message.rout")

app.use("/students", studRouter);
app.use("/message", messageRouter)
// app.use("/users", userRouter); // Uncomment if you have user routes defined

// Example endpoints
const Student = require('./src/models/student.Schema');
const User = require('./src/models/user.Schema');
const { log } = require("console");

app.post('/create-student', async (req, res) => {
    const newStudent = new Student({
        userId: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        subjects: ['flute', 'piano'],
        age: 20,
        status: 'pending',
        user: 2,
        chats: [1],
        weeklySchedule: [2]
    });

    try {
        const savedStudent = await newStudent.save();
        console.log('Student saved successfully:', savedStudent);
        res.status(201).json(savedStudent);
    } catch (error) {
        console.error('Error saving student:', error);
        res.status(500).json({ error: 'Error saving student' });
    }
});

app.post('/create-user', async (req, res) => {
    const newUser = new User({
        userId: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        exists: true,
        password: '1111'
    });

    try {
        const savedUser = await newUser.save();
        console.log('User saved successfully:', savedUser);
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Error saving user' });
    }
});
