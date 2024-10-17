const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors'); // Import cors

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/enroll-student', (req, res) => {    // API to receive student enrollment data
  const studentData = req.body;
  fs.readFile('students.json', 'utf8', (err, data) => {     // Read existing data from students.json file
    if (err) throw err;
    let students = [];   
    if (data) {               // If the file has content, parse it
      students = JSON.parse(data);
    }
    students.push(studentData);// Add the new student data to the array
    fs.writeFile('students.json', JSON.stringify(students, null, 2), (err) => {  // Write updated data back to students.json
      if (err) throw err;
      res.send('Student data saved successfully!');
    });
  });
});

// Multer setup for file uploads
const upload = multer({
  dest: 'uploads/', // Directory where the files will be uploaded
});

// Upload teachers CSV
app.post('/upload-teachers', upload.single('file'), (req, res) => {
  res.send('Teachers CSV uploaded successfully!');
});

// Upload classrooms CSV
app.post('/upload-classrooms', upload.single('file'), (req, res) => {
  res.send('Classrooms CSV uploaded successfully!');
});

// Upload students CSV
app.post('/upload-students', upload.single('file'), (req, res) => {
  res.send('Students CSV uploaded successfully!');
});

// Endpoint to get student data
app.get('/students', (req, res) => {
  fs.readFile('students.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading student data');
    }

    res.json(JSON.parse(data)); // Send the student data as JSON
  });
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
