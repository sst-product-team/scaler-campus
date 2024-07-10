import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Students from "./app/Students";
import Lectures from "./app/Lectures";
import Courses from "./app/Courses/Courses";
import Batches from "./app/Batches/Batches";
import StudentForms from "./app/StudentForms/StudentForms";
import Settings from "./app/Settings/Settings";
import { App as AntdApp, ConfigProvider } from "antd";
import { RefineThemes } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

function App() {
  const [experience, setExperience] = useState("students");
  const API_URL = "https://8hbbktpk-8080.inc1.devtunnels.ms";

  return (
    <ConfigProvider theme={RefineThemes.Blue}>
      <AntdApp>
        <Refine
          dataProvider={{
            default: dataProvider(API_URL),
          }}
          resources={[
            {
              name: "users",
              route: "/user",
            },
          ]}
        >
          <div className="App">
            <div className="nav">
              <Navbar state={experience} stateChange={setExperience} />
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
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
