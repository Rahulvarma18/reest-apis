const Student = require('../models/Student');

// Function to get all students
const getAllStudents = async () => {
    try {
        const students = await Student.find();
        return students;
    } catch (error) {
        throw new Error('Error fetching students: ' + error.message);
    }
};

// Function to get student by ID
const getStudentById = async (id) => {
    try {
        const student = await Student.findById(id);
        return student;
    } catch (error) {
        throw new Error('Error fetching student: ' + error.message);
    }
};

// Function to add new student
const addStudent = async (student) => {
    try {
        const newStudent = new Student(student);
        await newStudent.save();
        return newStudent;
    } catch (error) {
        throw new Error('Error adding student: ' + error.message);
    }
};

// Function to update student
const updateStudent = async (id, updatedData) => {
    try {
        const student = await Student.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        );
        return student;
    } catch (error) {
        throw new Error('Error updating student: ' + error.message);
    }
};

// Function to delete student
const deleteStudent = async (id) => {
    try {
        const result = await Student.findByIdAndDelete(id);
        return result !== null;
    } catch (error) {
        throw new Error('Error deleting student: ' + error.message);
    }
};

// Function to initialize students (for first-time setup)
const initializeStudents = async () => {
    try {
        const initialStudents = [
            {
                name: "student1",
                branch: "cse",
                dob: "01-01-2000"
            },
            {
                name: "student2",
                branch: "ece",
                dob: "02-02-2000"
            },
            {
                name: "student3",
                branch: "mech",
                dob: "03-03-2000"
            },
            {
                name: "student4",
                branch: "cse",
                dob: "04-04-2000"
            },
            {
                name: "student5",
                branch: "ece",
                dob: "05-05-2000"
            },
            {
                name: "student6",
                branch: "mech",
                dob: "06-06-2000"
            },
            {
                name: "student7",
                branch: "cse",
                dob: "07-07-2000"
            },
            {
                name: "student8",
                branch: "ece",
                dob: "08-08-2000"
            },
            {
                name: "student9",
                branch: "mech",
                dob: "09-09-2000"
            },
            {
                name: "student10",
                branch: "cse",
                dob: "10-10-2000"
            }
        ];

        // Check if collection is empty
        const count = await Student.countDocuments();
        if (count === 0) {
            await Student.insertMany(initialStudents);
            console.log('Initial students data inserted successfully');
        }
    } catch (error) {
        throw new Error('Error initializing students: ' + error.message);
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    initializeStudents
}; 