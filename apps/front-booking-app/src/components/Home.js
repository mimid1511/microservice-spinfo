import React from 'react';
import { Link } from 'react-router-dom';
import EventTable from './Table';
import Navbar from './Navbar';

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
      <nav>
        <Navbar/>
        <h1 style={{ padding : "10px", backgroundColor : 'black', color : 'white' }}>Dashboard</h1>
      </nav>
      <br/>
      <EventTable events={events} onReserve={handleReserve}/>
    </div>
  );
}

export default Home;
