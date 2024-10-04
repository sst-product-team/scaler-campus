import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Students from "../../app/Students";
import Lectures from "../../app/Lectures";
import Courses from "../../app/Courses";
import Batches from "../../app/Batches";
import StudentForms from "../../app/StudentForms";
import PollForms from "../../app/PollingApp";
import Settings from "../../app/Settings";
import Vote from "../../app/PollingApp/Vote";
import AppCode from "../../app/AppCode";
import AccessNotFound from "../../components/AccessNotFound"; // Assume you have this component
import ProtectedRoute from "../../components/ProtectedRoute"; // Import the ProtectedRoute component
import { Route, Routes } from "react-router-dom";
import Login from "../../app/Login/Login";

function Layout() {
  const location = useLocation();
  const hideNavbar =
    location.pathname.startsWith("/poll/") ||
    location.pathname.startsWith("/app-code") ||
    location.pathname.startsWith("/login");

  return (
    <div className="App flex">
      {!hideNavbar && <Navbar />}
      <div className="experience flex-3">
        <Routes>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Lectures />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Lectures />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lectures"
            element={
              <ProtectedRoute>
                <Lectures />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/batches"
            element={
              <ProtectedRoute>
                <Batches />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forms"
            element={
              <ProtectedRoute>
                <StudentForms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/poll"
            element={
              <ProtectedRoute>
                <PollForms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/poll/:pollId"
            element={
              <ProtectedRoute>
                <Vote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app-code"
            element={
              <ProtectedRoute>
                <AppCode />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          {/* Fallback route */}
          <Route path="*" element={<AccessNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
