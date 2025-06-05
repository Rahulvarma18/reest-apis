# Student Management System

A RESTful API-based Student Management System built with Node.js, Express, MongoDB, and EJS.

## Features

- CRUD operations for student records
- MongoDB database integration
- RESTful API endpoints
- EJS templating for views
- Bootstrap for responsive UI

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (v4.4 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/student-management.git
cd student-management
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system:
```bash
mongod
```

4. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `GET /students` - Get all students
- `GET /students/:id` - Get a specific student
- `GET /students/branch/:branch` - Get students by branch
- `POST /students` - Add a new student
- `PUT /students/:id` - Update a student
- `DELETE /students/:id` - Delete a student

## Project Structure

```
student-management/
├── config/
│   └── db.js           # MongoDB connection configuration
├── data/
│   └── students.js     # Student data operations
├── models/
│   └── Student.js      # Student model schema
├── views/
│   ├── error.ejs       # Error page template
│   └── students.ejs    # Students list template
├── index.js            # Main application file
├── package.json        # Project dependencies
└── README.md          # Project documentation
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Bootstrap

## License

This project is licensed under the MIT License - see the LICENSE file for details. 