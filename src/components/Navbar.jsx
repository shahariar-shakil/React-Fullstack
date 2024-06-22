// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeStyle = {
    fontWeight: 'bold',
    color: 'red',
  };

  const hideNavbarPaths = ['/signup', '/signin', '/admin'];

  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/signin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Shahariar</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/services" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Services</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about" style={({ isActive }) => (isActive ? activeStyle : undefined)}>About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Contact</NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={handleLogoutClick}>Logout</button>
                </li>
              </>
            ) : (
              location.pathname === '/' && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signin" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Sign In</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Sign Up</NavLink>
                  </li>
                </>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
