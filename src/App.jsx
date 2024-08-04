import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Students from "./app/Students/Students";
import Lectures from "./app/Lectures";
import Courses from "./app/Courses/Courses";
import Batches from "./app/Batches/Batches";
import StudentForms from "./app/StudentForms/StudentForms";
import Settings from "./app/Settings/Settings";
import { App as AntdApp, ConfigProvider } from "antd";
import { RefineThemes } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import AddStudent from "./app/Students/AddStudent";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

// Custom data provider to handle API response structure
const customDataProvider = dataProvider("https://8hbbktpk-5001.inc1.devtunnels.ms");

function App() {
  const [experience, setExperience] = useState("students");

  return (
    <ConfigProvider theme={RefineThemes.Blue}>
      <AntdApp>
        <Refine
          dataProvider={customDataProvider}
          resources={[
            {
              name: "api/v0/user",
              route: "api/v0/user",
            },
          ]}
        >
          <div className="App">
            <div className="nav">
              <Navbar state={experience} stateChange={setExperience} />
            </div>
            <div className="experience">
              {experience === "dash" && <h1>Dashboard</h1>}
              {experience === "addStudent" && <AddStudent />}
              {experience === "lectures" && <Lectures />}
              {experience === "courses" && <Courses />}
              {experience === "students" && <Students stateChange={setExperience} />}
              {experience === "batches" && <Batches />}
              {experience === "forms" && <StudentForms />}
              {experience === "settings" && <Settings />}
            </div>
            <ToastContainer position="bottom-right" />
          </div>
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
