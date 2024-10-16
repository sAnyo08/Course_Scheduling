import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './main';
import StudentEnrollment from './studentPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define Routes here */}
        <Routes>
          {/* Route for Main page */}
          <Route path="/" element={<Main />} />

          {/* Route for Student Enrollment page */}
          <Route path="/studentPage" element={<StudentEnrollment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
