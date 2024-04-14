import React, { useState } from 'react';
import { PaymentModal } from './PaymentModal';

const EventTable = ({ events, userId = 123 }) => { // Simulate user ID
  const [reservations, setReservations] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleInputChange = (event, eventName) => {
    const { value } = event.target;
    setReservations(prevState => ({
      ...prevState,
      [eventName]: value
    }));
  };

  const handleReserveClick = (event) => {
    if (parseInt(reservations[event.nom]) > 0) {
      setSelectedEvent(event);
      setShowModal(true);
    } else {
      alert('Please enter a valid number of places to reserve.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleConfirmPayment = (cardNumber) => {
    console.log('Card Number:', cardNumber);
    console.log(`Reserving for event ID ${selectedEvent.id} and user ID ${userId}`);
    handleModalClose();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Emplacement</th>
            <th className="px-4 py-2">Places</th>
            <th className="px-4 py-2">Réserver</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="bg-white border-b">
              <td className="px-4 py-2">{event.nom}</td>
              <td className="px-4 py-2">{event.location}</td>
              <td className="px-4 py-2">{event.nombreDePlaces}</td>
              <td className="flex items-center px-4 py-2 space-x-2">
                <input
                  type="number"
                  min="0"
                  max={event.nombreDePlaces}
                  value={reservations[event.nom] || 0}
                  onChange={(e) => handleInputChange(e, event.nom)}
                  className="w-20 px-2 py-1 border rounded shadow-inner"
                />
                <button
                  onClick={() => handleReserveClick(event)}
                  className="px-4 py-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  Réserver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEvent && (
        <PaymentModal
          isOpen={showModal}
          onClose={handleModalClose}
          onConfirm={handleConfirmPayment}
          eventId={selectedEvent.id}
          userId={userId}
        />
      )}
    </div>
  );
};

export default EventTable;
