const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const studentData = require('./data/students');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up express-ejs-layouts
app.use(expressLayouts);
app.use(cors());
app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Initialize students data
studentData.initializeStudents().catch(console.error);

// Home route - Student Entry Form
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Add New Student',
        activePage: 'home'
    });
});

// Students list route
app.get('/students', async (req, res) => {
    try {
        const students = await studentData.getAllStudents();
        res.render('students', { 
            studentsList: students,
            title: 'Student List',
            activePage: 'students'
        });
    } catch (error) {
        res.status(500).render('error', { 
            message: 'Error fetching students',
            error: error.message
        });
    }
});

app.get('/students/:id', async (req, res) => {
    try {
        const student = await studentData.getStudentById(req.params.id);
        if (student) {
            res.send(student);
        } else {
            res.status(404).send({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/students/branch/:branch', async (req, res) => {
    try {
        const students = await studentData.getAllStudents();
        const studentsByBranch = students.filter(s => 
            s.branch.toLowerCase() === req.params.branch.toLowerCase()
        );
        if (studentsByBranch.length > 0) {
            res.send(studentsByBranch);
        } else {
            res.status(404).send({ error: 'No students found in this branch' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/students', async (req, res) => {
    try {
        const newStudent = req.body;
        if (newStudent && newStudent.name && newStudent.branch && newStudent.dob) {
            await studentData.addStudent(newStudent);
            const students = await studentData.getAllStudents();
            res.render('students', { 
                studentsList: students,
                title: 'Student List',
                activePage: 'students'
            });
        } else {
            res.status(400).send({ error: 'Invalid student data' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.put('/students/:id', async (req, res) => {
    try {
        const updatedStudent = req.body;
        if (updatedStudent && updatedStudent.name && updatedStudent.branch && updatedStudent.dob) {
            const result = await studentData.updateStudent(req.params.id, updatedStudent);
            if (result) {
                const students = await studentData.getAllStudents();
                res.render('students', { 
                    studentsList: students,
                    title: 'Student List',
                    activePage: 'students'
                });
            } else {
                res.status(404).send({ error: 'Student not found' });
            }
        } else {
            res.status(400).send({ error: 'Invalid student data' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.delete('/students/:id', async (req, res) => {
    try {
        const result = await studentData.deleteStudent(req.params.id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
