import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Students from './app/Students';
import Lectures from './app/Lectures';
import Courses from './app/Courses/Courses';
import Batches from './app/Batches/Batches';
import StudentForms from './app/StudentForms/StudentForms';
import Settings from './app/Settings/Settings';

function App() {

  const [experience, setExperience] = useState("students")

  return (
    <div className="App">
      <div className="nav">
        <Navbar state={experience} stateChange={setExperience}  />
      </div>
      <div className="experience">
        {experience === "dash" && <h1>Dashboard</h1>}
        {experience === "lectures" && <Lectures />}
        {experience === "courses" && <Courses />}
        {experience === "students" && <Students />}
        {experience === "batches" && <Batches />}
        {experience === "forms" && <StudentForms />}
        {experience === "settings" && <Settings />}
      </div>
    </div>
  );
}

export default App;
