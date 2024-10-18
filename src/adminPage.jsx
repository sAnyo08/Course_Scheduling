import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
    const [teacherFile, setTeacherFile] = useState(null);
    const [classroomFile, setClassroomFile] = useState(null);
    const [studentFile, setStudentFile] = useState(null);

    // Handle file change for teachers, classrooms, and students
    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (type === 'teachers') {
            setTeacherFile(file);
        } else if (type === 'classrooms') {
            setClassroomFile(file);
        } else if (type === 'students') {
            setStudentFile(file);
        }
    };

    // Handle upload for classrooms and students
    const handleSubmit = (file, type) => {
        const formData = new FormData();
        formData.append('classroomFile', file);

        fetch(`http://localhost:5000/upload-classrooms`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(`${type} file uploaded successfully!`, data);
                alert(`${type} file uploaded successfully!`);
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };

    // Separate function for teacher file upload
    const handleTeacherUpload = () => {
        if (!teacherFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', teacherFile);

        fetch('http://localhost:5000/upload-teachers', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert('File uploaded and processed successfully!');
            })
            .catch((error) => console.error('Error uploading file:', error));
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '100vh',
            padding: '20px',
        }}>
            <nav style={{
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '20px',
            }}>
                <ul style={{
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: 0,
                    padding: 0,
                }}>
                    <Link to="/generateTable">
                        <li style={{ color: 'white', cursor: 'pointer' }}>Generate Timetable</li>
                    </Link>
                    <Link to="/studentDataPage">
                        <li style={{ color: 'white', cursor: 'pointer' }}>Student Data</li>
                    </Link>
                </ul>
            </nav>

            <h2 style={{
                textAlign: 'center',
                color: '#4a5568',
                marginBottom: '30px',
            }}>Admin Panel</h2>

            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
            }}>
                {/* Teacher CSV Upload */}
                <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    margin: '10px',
                    width: '300px',
                }}>
                    <h3 style={{
                        color: '#4a5568',
                        marginBottom: '15px',
                    }}>Upload Teachers CSV</h3>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileUpload(e, 'teachers')}
                        style={{
                            marginBottom: '10px',
                            width: '100%',
                        }}
                    />
                    <button
                        onClick={handleTeacherUpload}
                        disabled={!teacherFile}
                        style={{
                            background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 50%, #7a2fff 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '100%',
                            opacity: teacherFile ? 1 : 0.5,
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Upload Teachers
                    </button>
                </div>

                {/* Classroom CSV Upload */}
                <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    margin: '10px',
                    width: '300px',
                }}>
                    <h3 style={{
                        color: '#4a5568',
                        marginBottom: '15px',
                    }}>Upload Classrooms CSV</h3>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileUpload(e, 'classrooms')}
                        style={{
                            marginBottom: '10px',
                            width: '100%',
                        }}
                    />
                    <button
                        onClick={() => handleSubmit(classroomFile, 'classrooms')}
                        disabled={!classroomFile}
                        style={{
                            background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 50%, #7a2fff 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '100%',
                            opacity: classroomFile ? 1 : 0.5,
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Upload Classrooms
                    </button>
                </div>

                {/* Student CSV Upload */}
                <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    margin: '10px',
                    width: '300px',
                }}>
                    <h3 style={{
                        color: '#4a5568',
                        marginBottom: '15px',
                    }}>Upload Students CSV</h3>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileUpload(e, 'students')}
                        style={{
                            marginBottom: '10px',
                            width: '100%',
                        }}
                    />
                    <button
                        onClick={() => handleSubmit(studentFile, 'students')}
                        disabled={!studentFile}
                        style={{
                            background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 50%, #7a2fff 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '100%',
                            opacity: studentFile ? 1 : 0.5,
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Upload Students
                    </button>
                </div>
            </div>
        </div>
    );
}
