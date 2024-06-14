import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Students from './app/Students';

function App() {

  const [experience, setExperience] = useState("students")

  return (
    <div className="App">
      <div className="nav">
        <Navbar />
      </div>
      <div className="experience">
        {experience === "dash" && <h1>Dashboard</h1>}
        {experience === "lectures" && <h1>Lectures</h1>}
        {experience === "courses" && <h1>Courses</h1>}
        {experience === "students" && <Students />}
        {experience === "batches" && <h1>Batches</h1>}
        {experience === "query" && <h1>Query</h1>}
        {experience === "settings" && <h1>Settings</h1>}
      </div>
    </div>
  );
}

export default App;
