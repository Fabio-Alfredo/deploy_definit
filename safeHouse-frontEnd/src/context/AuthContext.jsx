// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (savedToken) {
            setToken(JSON.parse(savedToken));
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const saveToken = (newToken) => {
        localStorage.setItem('token', JSON.stringify(newToken));
        setToken(newToken);
    };

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
        <AuthContext.Provider value={{ user, token, saveToken, removeData, saveUser }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider };
