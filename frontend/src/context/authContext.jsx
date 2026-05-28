import React, { createContext, useContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [name, setName] = useState('');
    useEffect(()=>{
        const checkToken = localStorage.getItem("token")
        if (checkToken){
            setToken(checkToken)
        }
    },[])
    const login =(token, name)=>{
        setToken(token)
        localStorage.setItem("token", token);
    }

    const logout =() =>{
        setToken(null)
        localStorage.removeItem("token")
    }




    return (
        <AuthContext.Provider value = {{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = ()=>{ //Helper function
    return useContext(AuthContext)
}