import React from 'react';
import { Link } from 'react-router-dom';
import EventTable from './Table';

function Home() {

  const events = [
    { nom: 'Événement 1', location: 'Lieu 1', nombreDePlaces: 100 },
    { nom: 'Événement 2', location: 'Lieu 2', nombreDePlaces: 50 },
    { nom: 'Événement 3', location: 'Lieu 3', nombreDePlaces: 200 },
  ];

  const handleReserve = (event) => {
    // Logique de réservation
    console.log(`Vous avez réservé ${event.nom}`);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/manage-users">Manage Users</Link>
        <Link to="/manage-events">Manage Events</Link>
        <Link to="/manage-tickets">Manage Tickets</Link>
        <br/><br/>
        <EventTable events={events} onReserve={handleReserve} />
      </nav>
    </div>
  );
}

export default Home;
