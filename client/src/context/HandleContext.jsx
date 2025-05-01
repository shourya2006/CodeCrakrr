import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const HandleContext = createContext();

export const HandleProvider = ({children}) => {
    const {token} = useContext(AuthContext);
    const [handle, setHandle] = useState(null);
    useEffect(() => {
        const fetchHandle = async () => {
            const response = await fetch(`http://localhost:3000/api/data/gethandle`, {
                headers: {
                    'auth-token': `${token}`
                }
            });
            const data = await response.json();
            console.log(data);
            if(!data.error){
                setHandle(data);
            }
        }
        if(token){  
            fetchHandle();
        }
    }, [token]);
    return (
        <HandleContext.Provider value={{handle, setHandle}}>
            {children}
        </HandleContext.Provider>
    )
}   