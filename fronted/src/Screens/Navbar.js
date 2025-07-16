// Navbar.js
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useState } from 'react';
import green from '../images/droplet.jpg';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
   
     const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (  
    <nav id='nav'>
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
      <ul id="navul" className={menuOpen ? 'show' : ''}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
