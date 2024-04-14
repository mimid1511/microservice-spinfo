import React from 'react';
import { Link } from 'react-router-dom'; // Assurez-vous que votre application utilise React Router

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: 'whitesmoke', padding: '10px', textAlign: 'center' }}>
      <h1 style={{ margin: 0 }}>Reservation</h1>
      <div>
        <Link to="/home">Accueil</Link>
        <Link to="/profil" style={{ marginLeft: '10px' }}>Profil</Link>
      </div>
    </nav>
  );
};

export default Navbar;