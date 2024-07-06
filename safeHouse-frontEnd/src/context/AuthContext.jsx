// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { GetRoles } from '../service/RoleService';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const[roles, setRoles] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (savedToken) {
            console.log('token', savedToken);
            saveRoles();
            setToken(JSON.parse(savedToken));
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const saveToken = (newToken) => {
        localStorage.setItem('token', JSON.stringify(newToken));
        console.log('token', newToken);
        saveRoles();
        setToken(newToken);
    };

    const saveRoles = async () => {
        const res = await GetRoles()
        setRoles(res.data);
        console.log(roles);
    }

    const saveUser = (newUser) => {
        const user = { name: newUser.name, lastname: newUser.lastname, email: newUser.email, id: newUser.id, photo: newUser.photo }
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }

    const removeData = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null)
        setToken(null);
    };


    return (
        <AuthContext.Provider value={{ roles, user, token, saveToken, saveRoles, removeData, saveUser }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider };
