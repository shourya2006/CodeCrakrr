import { createContext, useState } from "react";



export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
    }

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}



