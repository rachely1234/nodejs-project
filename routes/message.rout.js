const express = require('express');


const router = express.Router();

const {addMessage,get100LastMessage,leaveroom}=require('../controllers/message/message.controller')

router.post('/addMessage', addMessage);
router.get('/get100LastMessage',get100LastMessage)
router.delete('/leaveroom',leaveroom)
module.exports = router;
//zvu bhxuh nre 