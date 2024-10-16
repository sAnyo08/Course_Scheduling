import React, { useState } from 'react';

export default function StudentEnrollment() {
    const [name, setName] = useState('');
    const [branch, setBranch] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [elective, setElective] = useState('');

    const branchSubjects = {
        comp: ['Maths', 'TCS', 'CN'],
        aids: ['Maths', 'SE', 'CNN'],
        tcs: ['Electronics', 'C-code', 'Wiring']
    };

    const electives = [
        { value: 'pgm', label: 'PGM' },
        { value: 'ip', label: 'IP' }
    ];

    const handleBranchChange = (e) => {
        const selectedBranch = e.target.value;
        setBranch(selectedBranch);
        setSubjects(branchSubjects[selectedBranch]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const studentData = { name, branch, subjects, elective };

        // Submit the form data to the backend
        fetch('http://localhost:5000/enroll-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                alert('Student enrolled successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '2rem',
            background: 'linear-gradient(135deg, #6ab7ff 0%, #1e5799 100%)',
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif',
        },
        form: {
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '500px',
        },
        title: {
            fontSize: '2rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
        },
        formGroup: {
            marginBottom: '1.5rem',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '1rem',
        },
        input: {
            width: '100%',
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ffffff',
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
        },
        select: {
            width: '100%',
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ffffff',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'black',
        },
        subjectList: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        subjectItem: {
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            borderRadius: '4px',
        },
        button: {
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: 'none',
            background: '#ffffff',
            color: '#1e5799',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Student Enrollment Form</h2>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Branch: </label>
                    <select value={branch} onChange={handleBranchChange} required style={styles.select}>
                        <option value="">Select Branch</option>
                        <option value="comp">Computer Science</option>
                        <option value="aids">AIDS</option>
                        <option value="tcs">TCS</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Subjects: </label>
                    <ul style={styles.subjectList}>
                        {subjects.map((subject, index) => (
                            <li key={index} style={styles.subjectItem}>{subject}</li>
                        ))}
                    </ul>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Elective: </label>
                    <select value={elective} onChange={(e) => setElective(e.target.value)} required style={styles.select}>
                        <option value="">Select Elective</option>
                        {electives.map((elec) => (
                            <option key={elec.value} value={elec.value}>
                                {elec.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
}