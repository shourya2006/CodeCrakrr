import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const HandleContext = createContext();

export const HandleProvider = ({ children }) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL || "";

  const { token } = useContext(AuthContext);
  const [handle, setHandle] = useState(null);
  useEffect(() => {
    const fetchHandle = async () => {
      const response = await fetch(`${VITE_API_URL}/api/data/gethandle`, {
        headers: {
          "auth-token": `${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!data.error) {
        setHandle(data);
      }
    };
    if (token) {
      fetchHandle();
    }
  }, [token]);
  return (
    <HandleContext.Provider value={{ handle, setHandle }}>
      {children}
    </HandleContext.Provider>
  );
};
