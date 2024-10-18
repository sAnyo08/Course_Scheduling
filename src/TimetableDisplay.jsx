import React from 'react';

export default function TimetableDisplay({ timetable }) {
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '80%',
        maxWidth: '800px',
        margin: '20px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
    };

    const thTdStyle = {
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '12px',
        textAlign: 'left',
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    };

    return (
        <div style={{ marginTop: '40px', width: '80%', maxWidth: '800px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Timetable</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Day</th>
                        <th style={thStyle}>Time</th>
                        <th style={thStyle}>Subject</th>
                        <th style={thStyle}>Teacher</th>
                        <th style={thStyle}>Classroom</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(timetable).flatMap(([day, slots]) =>
                        Object.entries(slots).flatMap(([time, subjects]) =>
                            subjects.map((subject, index) => (
                                <tr key={`${day}-${time}-${index}`}>
                                    <td style={thTdStyle}>{day}</td>
                                    <td style={thTdStyle}>{time}</td>
                                    <td style={thTdStyle}>{subject.subject}</td>
                                    <td style={thTdStyle}>{subject.teacher}</td>
                                    <td style={thTdStyle}>{subject.classroom}</td>
                                </tr>
                            ))
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
