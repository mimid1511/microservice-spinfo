import React from 'react';
import EventTable from './Table';
import Navbar from './Navbar';

function Home() {
  const events = [
    { id: 1, nom: 'Événement 1', location: 'Lieu 1', nombreDePlaces: 100 },
    { id: 2, nom: 'Événement 2', location: 'Lieu 2', nombreDePlaces: 50 },
    { id: 3, nom: 'Événement 3', location: 'Lieu 3', nombreDePlaces: 200 },
  ];

  return (
    <div className="min-h-screen text-gray-900 bg-gray-100">
      <nav className="p-4 bg-black">
        <Navbar />
        <h1 className="text-xl text-white">Dashboard</h1>
      </nav>
      <div className="p-4">
        <EventTable events={events} userId={123} />
      </div>
    </div>
  );
}

export default Home;
