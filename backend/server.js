const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors'); // Import cors
const csv = require('csvtojson');
const path = require('path'); // Import path here

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load data from JSON files
const loadData = (filename) => {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
};

app.post('/generate-timetable', (req, res) => {
  try {
    // Load data from JSON files
    const students = loadData('students.json');
    const teachers = loadData('teachers.json');
    const classrooms = loadData('classroom.json');

    // Initialize timetable structure
    const timetable = {};

    // Define the subjects and their lecture details
    const subjects = [
      { name: 'Maths', lecturesPerWeek: 4 },
      { name: 'TCS', lecturesPerWeek: 4 },
      { name: 'IP', lecturesPerWeek: 4 },
      { name: 'CN', lecturesPerWeek: 4 },
      { name: 'SE', lecturesPerWeek: 4 },
      { name: 'CNN', lecturesPerWeek: 4 },
      { name: 'C-code', lecturesPerWeek: 4 },
      { name: 'Wiring', lecturesPerWeek: 4 },
      { name: 'PGM', lecturesPerWeek: 4 },
      { name: 'Electronics', lecturesPerWeek: 4 }
    ];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = [
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00', // Lunch break
      '14:00-15:00',
      '15:00-16:00'
    ];

    // Allocate classrooms for subjects
    const allocateClasses = () => {
      subjects.forEach((subject) => {
        let lecturesAllocated = 0;

        while (lecturesAllocated < subject.lecturesPerWeek) {
          for (const day of days) {
            for (const slot of timeSlots.filter(s => s !== '12:00-13:00')) {
              const subjectAlreadyAllocated = timetable[day] && timetable[day][slot] &&
                timetable[day][slot].some(item => item.subject === subject.name);

              if (!subjectAlreadyAllocated) {
                for (const classroom of classrooms) {
                  const enrolledStudents = students.filter(student => student.subject === subject.name).length;

                  if (enrolledStudents <= classroom.capacity) {
                    const availableTeacher = teachers.find(teacher => teacher.subject === subject.name);

                    if (availableTeacher) {
                      if (!timetable[day]) timetable[day] = {};
                      if (!timetable[day][slot]) timetable[day][slot] = [];

                      timetable[day][slot].push({
                        subject: subject.name,
                        teacher: availableTeacher.name,
                        classroom: classroom.room_number,
                      });

                      lecturesAllocated++;
                      break;
                    }
                  }
                }
              }

              if (lecturesAllocated >= subject.lecturesPerWeek) break;
            }
          }
        }
      });
    };

    allocateClasses();

    // Save the timetable to a file
    fs.writeFileSync('timetable.json', JSON.stringify(timetable, null, 2));
    res.json({ message: 'Timetable generated successfully!' });
  } catch (error) {
    console.error('Error generating timetable:', error);
    res.status(500).json({ error: 'Failed to generate timetable' });
  }
});

app.get('/timetable', async (req, res) => {
  try {
    const data = await fs.promises.readFile('timetable.json', 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Error reading timetable data');
  }
});

// Existing API to receive student enrollment data
app.post('/enroll-student', (req, res) => {
  const studentData = req.body;
  fs.readFile('students.json', 'utf8', (err, data) => {
    if (err) throw err;
    let students = [];
    if (data) {
      students = JSON.parse(data);
    }
    students.push(studentData);
    fs.writeFile('students.json', JSON.stringify(students, null, 2), (err) => {
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
  const filePath = req.file.path;

  // Convert CSV to JSON
  csv()
    .fromFile(filePath)
    .then((jsonObj) => {
      fs.writeFileSync('teachers.json', JSON.stringify(jsonObj, null, 2));
      res.json({ message: 'File uploaded and data saved to teachers.json' });
      fs.unlinkSync(filePath);
    })
    .catch((error) => {
      console.error('Error converting CSV to JSON:', error);
      res.status(500).json({ error: 'Failed to process file' });
    });
});

// Endpoint to upload classroom CSV file
app.post('/upload-classrooms', upload.single('classroomFile'), (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {
      const bufferData = Buffer.from(data).toString();
      const jsonData = JSON.parse(bufferData);

      const adjustedData = {
        room_number: jsonData.room_number,
        capacity: jsonData.capacity,
      };

      results.push(adjustedData);
    })
    .on('end', () => {
      fs.writeFile('classroom.json', JSON.stringify(results, null, 2), (err) => {
        if (err) {
          return res.status(500).send('Error saving classroom data');
        }
        fs.unlinkSync(req.file.path);
        res.send('Classroom data uploaded and saved successfully');
      });
    })
    .on('error', (error) => {
      res.status(500).send('Error processing CSV file');
    });
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
