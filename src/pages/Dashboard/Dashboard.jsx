import React, { useState } from 'react';
import './Dashboard.css';
import ShowProduct from '../Products/showProduct'; 
function Dashboard({ onLogout }) {
  // Active Page State
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <ul className="nav-links">
          <li 
            className={activePage === 'Dashboard' ? 'active-link' : ''} 
            onClick={() => setActivePage('Dashboard')}
          >
            Dashboard
          </li>

          {/* 👇 2. Yahan Naya Button Add kiya hai Products ke liye */}
         

          <li 
            className={activePage === 'Contact' ? 'active-link' : ''} 
            onClick={() => setActivePage('Contact')}
          >
            Contact
          </li>
          <li 
            className={activePage === 'About' ? 'active-link' : ''} 
            onClick={() => setActivePage('About')}
          >
            About
          </li>
          <li 
            className={activePage === 'Service' ? 'active-link' : ''} 
            onClick={() => setActivePage('Service')}
          >
            Service
          </li>

          <li 
            className={activePage === 'Products' ? 'active-link' : ''} 
            onClick={() => setActivePage('Products')}
          >
            View Products
          </li>

        </ul>
        
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      {/* Right Side Content */}
      <div className="main-content">
        <div className="top-bar">
          <h2>{activePage === 'Products' ? 'Product List' : activePage + ' Overview'}</h2>
          <span>Welcome, Admin</span>
        </div>
        
        <div className="content-area animate-fade">
           {activePage === 'Dashboard' && <h3>📊 This is the Dashboard Home.</h3>}
           
           {/* 👇 3. Yahan Logic lagaya hai: Agar 'Products' selected hai to Component dikhao */}
           {activePage === 'Products' && <ShowProduct />}
           
           {activePage === 'Contact' && <h3>📞 Contact Us Information goes here.</h3>}
           {activePage === 'About' && <h3>ℹ️ About Us Content goes here.</h3>}
           {activePage === 'Service' && <h3>🛠️ Services List goes here.</h3>}
           
           {/* Note: Ye message sirf tab dikhega jab Products open NA ho, taaki UI clean rahe (Optional) */}
           {activePage !== 'Products' && (
             <p style={{marginTop: '20px', color: '#666'}}>
               You are securely logged in.
             </p>
           )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;