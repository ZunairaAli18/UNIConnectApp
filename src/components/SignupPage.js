import React, { useState } from 'react';
import '../styles/SignupPage.css';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
   const navigate = useNavigate();
   const { userLoggedIn } = useAuth();
   
   const [formData, setFormData] = useState({
       firstName: '',
       lastName: '',
       username: '',
       email: '',
       password: '',
       confirmPassword: ''
   });
   const [isRegistering, setIsRegistering] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [termsAccepted, setTermsAccepted] = useState(false);

   const handleChange = (e) => {
       setFormData({
           ...formData,
           [e.target.name]: e.target.value
       });
   };

   const onSubmit = async (e) => {
       e.preventDefault();
       
       if (formData.password !== formData.confirmPassword) {
           setErrorMessage("Passwords don't match");
           return;
       }

       if (!termsAccepted) {
           setErrorMessage("Please accept the Terms and Conditions");
           return;
       }

       try {
           if (!isRegistering) {
               setIsRegistering(true);
               setErrorMessage('');
               await doCreateUserWithEmailAndPassword(formData.email, formData.password);
               navigate('/home');
           }
       } catch (error) {
           setErrorMessage(error.message);
       } finally {
           setIsRegistering(false);
       }
   };

   const handleLogin = (e) => {
       e.preventDefault();
       navigate('/login');
   };

   return (
       <div className="signup-container">
           {userLoggedIn && (<Navigate to={'/home'} replace={true}/>)}
           <div className="signup-left">
               <div className="decorative-shapes">
                   <div className="shape circle-1"></div>
                   <div className="shape circle-2"></div>
                   <div className="shape plus-1">+</div>
                   <div className="shape plus-2">+</div>
                   <div className="wavy-line"></div>
               </div>
               <div className="welcome-text">
                   <h1>Join Us Today!</h1>
                   <p>Create your account and start your journey with us.</p>
               </div>
           </div>
           <div className="signup-right">
               <div className="signup-form">
                   <h2>Sign Up</h2>
                   {errorMessage && (
                       <div className="error-message">{errorMessage}</div>
                   )}
                   <form onSubmit={onSubmit}>
                       <div className="form-row">
                           <div className="form-group">
                               <input
                                   type="text"
                                   className="form-input"
                                   placeholder="First Name"
                                   name="firstName"
                                   value={formData.firstName}
                                   onChange={handleChange}
                                   required
                               />
                           </div>
                           <div className="form-group">
                               <input
                                   type="text"
                                   className="form-input"
                                   placeholder="Last Name"
                                   name="lastName"
                                   value={formData.lastName}
                                   onChange={handleChange}
                                   required
                               />
                           </div>
                       </div>
                       <div className="form-group">
                           <input
                               type="text"
                               className="form-input"
                               placeholder="Username"
                               name="username"
                               value={formData.username}
                               onChange={handleChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <input
                               type="email"
                               className="form-input"
                               placeholder="Email"
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <input
                               type="password"
                               className="form-input"
                               placeholder="Create Password"
                               name="password"
                               value={formData.password}
                               onChange={handleChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <input
                               type="password"
                               className="form-input"
                               placeholder="Confirm Password"
                               name="confirmPassword"
                               value={formData.confirmPassword}
                               onChange={handleChange}
                               required
                           />
                       </div>
                       <div className="form-group checkbox-group">
                           <label className="checkbox-label">
                               <input
                                   type="checkbox"
                                   checked={termsAccepted}
                                   onChange={(e) => setTermsAccepted(e.target.checked)}
                                   required
                               />
                               <span className="checkbox-custom"></span>
                               <span className="label-text">I agree to all the Terms and Conditions</span>
                           </label>
                       </div>
                       <button
                           type="submit"
                           className="signup-button"
                           disabled={isRegistering}
                       >
                           {isRegistering ? 'Signing Up...' : 'Sign Up'}
                       </button>
                   </form>
                   <p className="login-link">
                       Already have an account? <a 
                           href="#" 
                           onClick={handleLogin} 
                           className="login-link"
                       >
                           Log In
                       </a>
                   </p>
               </div>
           </div>
       </div>
   );
};

export default SignupPage;