// Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useState } from 'react';
import green from '../images/droplet.jpg';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav id="nav">
         <h1 id='logo' style={{
            backgroundImage: `url(${green})`,
          }}>Fitlife</h1>
      {/* Hamburger Icon */}
      <div id="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
          <h1 id='logom' style={{
            backgroundImage: `url(${green})`,
          }}>Fitlife</h1>
      {/* Nav Links */}
      <ul id="navul" className={menuOpen ? 'show' : ''}>
        <li><Link to="/dashboardhome">Dashboard</Link></li>
        <li><Link to="/bmi">BMI Calculator</Link></li>
        <li><Link to="/exercise">Exercise Tips</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/contactd">Contact</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-btn" style={{ color: 'black' }}>Logout</button>

        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
