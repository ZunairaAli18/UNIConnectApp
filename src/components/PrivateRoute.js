import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const PrivateRoute = ({ children }) => {
    const { userLoggedIn } = useAuth();
    
    if (!userLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute; 