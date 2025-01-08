import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useAuth } from '../contexts/authContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';

const LoginPage = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        
        // Validate inputs
        if (!email || !password) {
            setErrorMessage('Please fill in all fields');
            return;
        }

        if (!isSigningIn) {
            try {
                setIsSigningIn(true);
                setErrorMessage('');
                
                // Attempt to sign in
                const user = await doSignInWithEmailAndPassword(email, password);
                console.log('Sign in successful:', user);
                
                // Only navigate if sign in was successful
                if (user) {
                    navigate('/home');
                }
            } catch (error) {
                console.error('Login error:', error);
                setErrorMessage(error.message || 'Failed to sign in');
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            try {
                setIsSigningIn(true);
                setErrorMessage('');
                const user = await doSignInWithGoogle();
                console.log('Google sign in successful:', user);
                
                if (user) {
                    navigate('/home');
                }
            } catch (error) {
                console.error('Google sign-in error:', error);
                setErrorMessage(error.message || 'Failed to sign in with Google');
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();
        navigate('/signup');
    };

    // If user is already logged in, redirect to home
    if (userLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="decorative-shapes">
                    <div className="shape circle-1"></div>
                    <div className="shape circle-2"></div>
                    <div className="shape plus-1">+</div>
                    <div className="shape plus-2">+</div>
                    <div className="wavy-line"></div>
                </div>
                <div className="welcome-text">
                    <h1>Welcome back!</h1>
                    <p>You can sign in to access with your existing account.</p>
                </div>
            </div>
            <div className="login-right">
                <div className="login-form">
                    <h2>Login</h2>
                    {errorMessage && (
                        <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-options">
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-password">
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="sign-in-button"
                            disabled={isSigningIn}
                            style={{ cursor: isSigningIn ? 'not-allowed' : 'pointer' }}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                        <button
                            type="button"
                            className="google-sign-in-button"
                            onClick={onGoogleSignIn}
                            disabled={isSigningIn}
                            style={{ cursor: isSigningIn ? 'not-allowed' : 'pointer' }}
                        >
                            Login with Google
                        </button>
                    </form>
                    <p className="create-account">
                        New here? <a 
                            href="#" 
                            onClick={handleCreateAccount} 
                            className="signup-link"
                        >
                            Create an Account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;