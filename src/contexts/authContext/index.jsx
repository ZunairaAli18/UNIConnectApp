import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({
    userLoggedIn: false,
    user: null
});

export const AuthProvider = ({ children }) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setUserLoggedIn(!!user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        userLoggedIn,
        user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};