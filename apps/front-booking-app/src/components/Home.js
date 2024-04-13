import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/manage-users">Manage Users</Link>
        <Link to="/manage-events">Manage Events</Link>
        <Link to="/manage-tickets">Manage Tickets</Link>
      </nav>
    </div>
  );
}

export default Home;
