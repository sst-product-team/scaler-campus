import { useEffect, useState } from "react";
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
import Login from "./components/Login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

console.log("HI", process.env.REACT_APP_DB_URL);

// Custom data provider to handle API response structure
const customDataProvider = dataProvider(process.env.REACT_APP_DB_URL);

// Mock live provider implementation
const liveProvider = {
  subscribe: ({ channel, params: { ids }, types, callback, meta }) => {
    console.log(`Subscribed to channel: ${channel} with ids: ${ids}`);
    // Simulate receiving data
    const interval = setInterval(() => {
      callback({
        type: types[0],
        payload: "Sample data",
        date: new Date(),
        meta,
      });
    }, 2000); // simulate data every 5 seconds

    return { channel, ids, types, callback, meta, interval }; // Return a subscription object
  },
  unsubscribe: (subscription) => {
    clearInterval(subscription.interval);
    console.log(`Unsubscribed from channel: ${subscription.channel}`);
  },
  publish: ({ channel, type, payload, date, meta }) => {
    console.log(
      `Published to channel: ${channel}, type: ${type}, payload: ${payload}`
    );
  },
};

function App() {
  const [experience, setExperienceValue] = useState(
    JSON.parse(localStorage.getItem("experience")) || "lectures"
  );

  const setExperience = (value) => {
    setExperienceValue(value);
    localStorage.setItem("experience", JSON.stringify(value));
  };

  const notify = (message) => toast(message);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    if (user) {
      notify("Welcome to Scaler Campus Teacher");
    }
  }, [user]);

  return (
    <ConfigProvider theme={RefineThemes.Blue}>
      <AntdApp>
        <Refine
          liveProvider={liveProvider}
          options={{ liveMode: "auto" }}
          dataProvider={customDataProvider}
          resources={[
            {
              name: "user",
              route: "user",
            },
          ]}
        >
          <div className="App">
            {
              // If user is not logged in, show login screen
              !user && (
                <Login
                  setUser={setUser}
                  user={user}
                  notify={notify}
                  stateChange={setExperience}
                />
              )
            }
            {user && (
              <>
                <div className="nav">
                  <Navbar state={experience} stateChange={setExperience} />
                </div>
                <div className="experience">
                  {experience === "addStudent" && <AddStudent />}
                  {experience === "lectures" && <Lectures />}
                  {experience === "courses" && <Courses />}
                  {experience === "students" && (
                    <Students stateChange={setExperience} notify={notify} />
                  )}
                  {experience === "batches" && <Batches />}
                  {experience === "forms" && <StudentForms />}
                  {experience === "settings" && <Settings />}
                </div>
              </>
            )}
            <ToastContainer position="bottom-right" />
          </div>
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
