import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{ backgroundColor: 'whitesmoke', padding: '10px', textAlign: 'center' }}>
      <h1 style={{ margin: 0, fontWeight: 'bold', fontSize: '25px' }}>Reservation</h1>
      <div>
        <Link to="/home">Accueil</Link>
        {token ? (
          <>
            <Link to="/profil" style={{ marginLeft: '10px' }}>Profil</Link>
            <button onClick={handleLogout} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
              Log Out
            </button>
          </>
        ) : (
          <Link to="/" style={{ marginLeft: '10px' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
