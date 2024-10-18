import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const StudentData = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/students')
            .then((response) => response.json())
            .then((data) => {
                setStudents(data);
            })
            .catch((error) => console.error('Error fetching student data:', error));
    }, []);

    const downloadExcel = () => {
        // Create a copy of students array with subjects as a string (CSV format)
        const formattedStudents = students.map(student => ({
            ...student,
            subjects: student.subjects.join(', '),  // Convert subjects array to string
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedStudents);  // Use the updated array
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

        // Create Excel file and trigger download
        XLSX.writeFile(workbook, 'student_data.xlsx');
    };


    const containerStyle = {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const headerStyle = {
        color: '#333',
        borderBottom: '2px solid #3498db',
        paddingBottom: '10px',
        marginBottom: '20px',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    };

    const thStyle = {
        backgroundColor: '#3498db',
        color: '#fff',
        padding: '12px',
        textAlign: 'left',
    };

    const tdStyle = {
        padding: '10px',
        borderBottom: '1px solid #e0e0e0',
    };

    const buttonStyle = {
        backgroundColor: '#2ecc71',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Student Data</h2>

            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Branch</th>
                        <th style={thStyle}>Subjects</th>
                        <th style={thStyle}>Elective</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td style={tdStyle}>{student.name}</td>
                            <td style={tdStyle}>{student.branch}</td>
                            <td style={tdStyle}>{student.subjects.join(', ')}</td>
                            <td style={tdStyle}>{student.elective}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={downloadExcel}
                style={buttonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2ecc71'}
            >
                Download as Excel
            </button>
        </div>
    );
};

export default StudentData;