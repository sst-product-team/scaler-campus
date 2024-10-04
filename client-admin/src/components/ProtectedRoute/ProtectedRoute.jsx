import { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AccessNotFound from "../AccessNotFound"; // Assume you have this component

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const redirect = useNavigate();

  useEffect(() => {
    if (user.username !== "anonymous" || !localStorage.getItem("username")) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    // Show a loading state until the context is ready
    return <div>Loading...</div>;
  }

  if (user.username === "anonymous") {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, allow them to access the route
  return children;
};

export default ProtectedRoute;
