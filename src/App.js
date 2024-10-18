import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './main';
import StudentEnrollment from './studentPage';
import AdminPanel from './adminPage';
import StudentData from './studentDataPage';
import GenerateTimetable from './generateTable';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/adminpage" element={<AdminPanel />} />
          <Route path="/studentPage" element={<StudentEnrollment />} />
          <Route path="/studentDataPage" element={<StudentData />} />
          <Route path="/generateTable" element={<GenerateTimetable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
