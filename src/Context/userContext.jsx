import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userLogin, setuserLogin] = useState(null);
  // Check if user is already logged in
  useEffect(() => {
    let token = localStorage.getItem("userToken");
    if (token) {
      setuserLogin(token);
    }
  }, []);
  return (
    <userContext.Provider value={{ userLogin, setuserLogin }}>
      {children}
    </userContext.Provider>
  );
}
