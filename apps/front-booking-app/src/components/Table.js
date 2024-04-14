import React, { useState } from 'react';

const EventTable = ({ events, onReserve }) => {
  const [reservations, setReservations] = useState({});

  const handleInputChange = (event, eventName) => {
    const { value } = event.target;
    setReservations(prevState => ({
      ...prevState,
      [eventName]: value
    }));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Emplacement</th>
          <th>Places</th>
          <th>Réserver</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={index}>
            <td>{event.nom}</td>
            <td>{event.location}</td>
            <td>{event.nombreDePlaces}</td>
            <td>
              <input
                type="number"
                min="0"
                max={event.nombreDePlaces}
                value={reservations[event.nom] || 0}
                onChange={(e) => handleInputChange(e, event.nom)}
              />
              <button onClick={() => onReserve(event, reservations[event.nom] || 0)}>Réserver</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;