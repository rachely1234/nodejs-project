
const express = require('express');
const router = express.Router();
const {addStudent,getAllStudents,getAllPendingStudents} = require('../controllers/student/student.controller');
router.post('/add', addStudent);
router.get('/getAllStudents', getAllStudents);
router.get('/getAllPendingStudents', getAllPendingStudents);

module.exports = router;
