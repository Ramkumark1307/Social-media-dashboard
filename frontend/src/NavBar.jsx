// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router

const NavBar = () => {
  return (
    <nav style={styles.navBar}>
      <div style={styles.container}>
        <h1 style={styles.logo}>YouTube Analytics</h1>
        <ul style={styles.navLinks}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Logout</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/analytics" style={styles.navLink}>Analytics</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/about" style={styles.navLink}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  navBar: {
    backgroundColor: '#2c3e50',
    padding: '10px 20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    color: '#ecf0f1',
    fontSize: '1.8rem',
    margin: 0,
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '20px',
  },
  navLink: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
    padding: '10px',
  },
  navLinkActive: {
    color: '#3498db',
  },
  navLinkHover: {
    color: '#3498db',
  },
};

export default NavBar;
