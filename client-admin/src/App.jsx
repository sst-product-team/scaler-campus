import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Students from "./app/Students/Students";
import Lectures from "./app/Lectures";
import Courses from "./app/Courses/Courses";
import Batches from "./app/Batches/Batches";
import StudentForms from "./app/StudentForms/StudentForms";
import PollForms from "./app/PollingApp";
import Settings from "./app/Settings/Settings";
import { App as AntdApp, ConfigProvider } from "antd";
import { RefineThemes } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { ToastContainer } from "react-toastify";
import Vote from "./app/PollingApp/Vote";
import AppCode from "./app/AppCode";
import { UserProvider } from "./context/UserContext";
import useScope from "./hooks/useScope";

// Custom data provider to handle API response structure
const customDataProvider = dataProvider(`${process.env.REACT_APP_API_URL}`);

function Layout() {
  const location = useLocation();

  // Hide Navbar on /poll/:pollId
  const hideNavbar =
    location.pathname.startsWith("/poll/") ||
    location.pathname.startsWith("/app-code");

  return (
    <div className="App flex">
      {!hideNavbar && <Navbar />}
      <div className="experience flex-3">
        <Routes>
          <Route path="/" element={<Students />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/students" element={<Students />} />
          <Route path="/forms" element={<StudentForms />} />
          <Route path="/poll" element={<PollForms />} />
          <Route path="/poll/:pollId" element={<Vote />} />
          <Route path="/app-code" element={<AppCode />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

function App() {
  return (
    <UserProvider>
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
            <Router>
              <Layout />
            </Router>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </UserProvider>
  );
}

export default App;
