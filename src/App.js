import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';
import { AuthProvider } from './contexts/authContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/home" 
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;