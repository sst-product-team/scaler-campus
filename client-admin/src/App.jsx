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
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import AccessNotFound from "./components/AccessNotFound"; // Assume you have this component
// Custom data provider to handle API response structure
const customDataProvider = dataProvider(`${process.env.REACT_APP_API_URL}`);

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
            <Layout />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </UserProvider>
  );
}

export default App;
