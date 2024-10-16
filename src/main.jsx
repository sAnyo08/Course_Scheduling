import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Component() {
    const [selectedUser, setSelectedUser] = useState(null)
    const navigate = useNavigate()  // Hook for navigation

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
    }

    const cardStyle = {
        width: '300px',
        padding: '30px',
        margin: '15px 0',
        borderRadius: '12px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        color: '#ffffff',
    }

    const studentCardStyle = {
        ...cardStyle,
        background: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
        transform: selectedUser === 'student' ? 'translateY(-5px)' : 'none',
    }

    const adminCardStyle = {
        ...cardStyle,
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        transform: selectedUser === 'admin' ? 'translateY(-5px)' : 'none',
    }

    const handleCardClick = (userType) => {
        setSelectedUser(userType)

        // Navigate to different pages based on user type
        if (userType === 'student') {
            navigate('/studentPage')  // Replace with the actual student page route
        } else if (userType === 'admin') {
            navigate('/admin-page')  // Replace with the actual admin page route
        }
    }

    return (
        <div style={containerStyle}>
            <h1 style={{ color: '#ffffff', marginBottom: '30px', fontSize: '2.5rem', textAlign: 'center' }}>
                Select User Type
            </h1>
            <div
                style={studentCardStyle}
                onClick={() => handleCardClick('student')}
            >
                <h2 style={{ margin: 0, fontSize: '1.8rem', marginBottom: '10px' }}>Student User</h2>
                <p style={{ margin: 0, fontSize: '1rem', opacity: 0.9 }}>Access student features and resources</p>
            </div>
            <div
                style={adminCardStyle}
                onClick={() => handleCardClick('admin')}
            >
                <h2 style={{ margin: 0, fontSize: '1.8rem', marginBottom: '10px' }}>Admin User</h2>
                <p style={{ margin: 0, fontSize: '1rem', opacity: 0.9 }}>Manage system and user accounts</p>
            </div>
            {selectedUser && (
                <p style={{
                    marginTop: '30px',
                    color: '#ffffff',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    animation: 'fadeIn 0.5s ease-in-out'
                }}>
                    You selected: {selectedUser.charAt(0).toUpperCase() + selectedUser.slice(1)} user
                </p>
            )}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    )
}
