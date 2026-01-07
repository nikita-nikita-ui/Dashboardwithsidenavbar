import React, { useState } from 'react';
import './Admin.css';
import Dashboard from '../Dashboard/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginTab, setIsLoginTab] = useState(true);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Dummy Credentials
  const DUMMY_EMAIL = "admin@gmail.com";
  const DUMMY_PASS = "123456";

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === DUMMY_EMAIL && password === DUMMY_PASS) {
      toast.success("Login Successful!", { position: "top-center", autoClose: 2000 });
      setTimeout(() => {
        setIsLoggedIn(true); // Yahan se Dashboard dikhega
      }, 1000);
    } else {
      toast.error("Invalid Email or Password!", { position: "top-center" });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if(fullName && email && password) {
        toast.success("Account Created! Please Login.", { position: "top-center" });
        setIsLoginTab(true);
    } else {
        toast.warning("Please fill all details", { position: "top-center" });
    }
  };

  // Logout Function jo Dashboard ko pass karenge
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    toast.info("Logged out successfully", { position: "top-center" });
  };

  // --- RENDER LOGIC ---

  // Agar Logged In hai -> Dashboard Component dikhao
  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  // Agar Logged In NAHI hai -> Login Form dikhao
  return (
    <div className="admin-container">
      <ToastContainer />
      <div className="form-wrapper">
        
        {/* Header */}
        <div className="form-header">
          <div className={`title ${isLoginTab ? 'active' : ''}`} onClick={() => setIsLoginTab(true)}>Login</div>
          <div className={`title ${!isLoginTab ? 'active' : ''}`} onClick={() => setIsLoginTab(false)}>Signup</div>
        </div>

        {/* Forms */}
        <div className="form-body">
          {isLoginTab ? (
            <form className="login-form animate-fade" onSubmit={handleLogin}>
              <h2>Welcome Back</h2>
              <div className="input-group">
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button className="submit-btn">Login</button>
              <div style={{marginTop: '10px', fontSize: '12px', color: '#666', textAlign: 'center'}}>(Use: admin@gmail.com / 123456)</div>
            </form>
          ) : (
            <form className="signup-form animate-fade" onSubmit={handleRegister}>
              <h2>Create Account</h2>
              <div className="input-group"><input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required /></div>
              <div className="input-group"><input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <div className="input-group"><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
              <button className="submit-btn">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;