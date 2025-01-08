import React from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../firebase/auth';

const HomePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await doSignOut();
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="home-container">
            <h1>Welcome to Home Page</h1>
            <p>Hello, {user?.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default HomePage; 