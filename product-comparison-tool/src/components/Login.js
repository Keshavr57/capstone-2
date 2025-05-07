// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Header from './Header';
// import './Login.css';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   // Handle form submission (no actual authentication, just navigation)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, we would authenticate with a backend here
//     console.log('Login attempt with:', { email });
    

//     navigate('/products');
//   };


//   const handleGuestLogin = () => {
//     navigate('/products');
//   };

//   return (
//     <div className="app">
//       <Header />
//       <main className="login-container">
//         <div className="login-form-container">
//           <h1>Login to Your Account</h1>
//           <form className="login-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//             <div className="forgot-password">
//               <Link to="#">Forgot password?</Link>
//             </div>
//             <button type="submit" className="btn login-btn">Login</button>
//             <button 
//               type="button" 
//               className="btn guest-btn"
//               onClick={handleGuestLogin}>
//               Continue as Guest
//             </button>
//           </form>
//           <div className="signup-prompt">
//             <p>Don't have an account? <Link to="#">Sign up</Link></p>
//           </div>
//         </div>
//         <div className="login-image">
//           <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=600&fit=crop" alt="Login illustration" />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Login;