import React, { useState, useEffect } from 'react';
import EventTable from './EventTable';
import Navbar from './Navbar';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3030/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('There was a problem with fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

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
