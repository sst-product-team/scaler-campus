import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userState, setUserState] = useState(true);
  function toggleUserState() {
    setUserState((prevUserState) => !prevUserState);
  }
  return (
    <UserContext.Provider value={{ userState, toggleUserState }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
