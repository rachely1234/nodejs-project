

const studentService = require('../../services/student/student.service');
const { studentValidationSchema } = require('../../models/studentValidation'); // Import the schema
const userService = require('../../services/user/user.services');
const { func } = require('joi');


async function addStudent(req, res, next) {
    const studentData = req.body;
  
    try {
      // const validationResult = studentValidationSchema.validate(studentData, { abortEarly: false });
      // if (validationResult.error) {
      //   const errors = validationResult.error.details.map(error => error.message);
      //   return res.status(400).json({ errors }); 
      // }
      const newStudent = await studentService.addStudent(studentData);
      const newuser = await userService.addUser(req.body);
      res.status(201).json(newStudent);
    } catch (err) {
      next(err);
    }
  }

const getAllStudents = async (req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllPendingStudents = async (req, res) => {
    try {
        const students = await studentService.getAllPendingStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addStudent,getAllStudents,getAllPendingStudents
};
