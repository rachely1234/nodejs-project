
const { studentValidationSchema } = require('../../models/messageSchema.Schema'); 
const messageservice = require('../../services/message/message.service');
const { func } = require('joi');


const leaveroom =async(req,res)=>{
    try{
        const usersinRoomChat=await messageservice.leaveroom(req.body);
        res.status(200).json( usersinRoomChat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    
    }
}

const get100LastMessage = async (req, res) => {
    try {
        const  LastMessage = await messageservice.get100LastMessage();
        res.status(200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function addMessage(req, res, next) {
    
    const messageData = req.body;

  
    try {
      const newStudent = await messageservice.addMessage(messageData);
     
      res.status(201).json(newStudent);
    } catch (err) {
      next(err);
    }
  }

  module.exports = {
    addMessage,
    get100LastMessage,
    leaveroom
};