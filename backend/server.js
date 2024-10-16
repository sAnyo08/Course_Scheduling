const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import cors

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API to receive student enrollment data
app.post('/enroll-student', (req, res) => {
  const studentData = req.body;

  // Read existing data from students.json file
  fs.readFile('students.json', 'utf8', (err, data) => {
    if (err) throw err;
    let students = [];

    // If the file has content, parse it
    if (data) {
      students = JSON.parse(data);
    }

    // Add the new student data to the array
    students.push(studentData);

    // Write updated data back to students.json
    fs.writeFile('students.json', JSON.stringify(students, null, 2), (err) => {
      if (err) throw err;
      res.send('Student data saved successfully!');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
