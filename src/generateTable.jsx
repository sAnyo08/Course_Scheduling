import React, { useState } from 'react';
import TimetableDisplay from './TimetableDisplay';

export default function TimetableGenerator() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timetable, setTimetable] = useState(null);

    const handleGenerateTimetable = async () => {
        setMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/generate-timetable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMessage(data.message);

            // Update to set the timetable if it exists
            if (data.timetable) {
                setTimetable(data.timetable);
            } else {
                // If the timetable is not returned, fetch it from the /timetable endpoint
                const timetableResponse = await fetch('http://localhost:5000/timetable');
                if (timetableResponse.ok) {
                    const timetableData = await timetableResponse.json();
                    setTimetable(timetableData);
                } else {
                    throw new Error('Failed to fetch timetable');
                }
            }
        } catch (error) {
            console.error('Failed to generate timetable: ', error);
            setMessage('Failed to generate timetable: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Generate Timetable</h1>
            <button
                onClick={handleGenerateTimetable}
                style={buttonStyle}
                disabled={isLoading}
            >
                {isLoading ? 'Generating...' : 'Generate Timetable'}
            </button>
            {message && <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>{message}</p>}

            {timetable && <TimetableDisplay timetable={timetable} />}
        </div>
    );
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
};

const buttonStyle = {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
};
