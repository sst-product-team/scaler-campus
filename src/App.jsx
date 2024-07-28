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
import axios from "axios";

// Custom data provider to handle API response structure
const customDataProvider = {
  getList: async (resource, params) => {
    const response = await axios.get(`https://campus-auth-backend-node-adxvh.ondigitalocean.app/${resource.resource}`);
    console.log("DATA", response.data.data);
    return {
      data: response.data.data,
      total: response.data.data.length,
    };
  },
};

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
              {experience === "lectures" && <Lectures />}
              {experience === "courses" && <Courses />}
              {experience === "students" && <Students experience={setExperience} />}
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
