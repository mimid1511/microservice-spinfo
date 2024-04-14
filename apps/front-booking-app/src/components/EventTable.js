import React, { useEffect, useState } from 'react';
import { PaymentModal } from './PaymentModal';
import { jwtDecode } from 'jwt-decode';

const EventTable = ({ events, userId = 123 }) => { // Simulate user ID
  const [reservations, setReservations] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.role.includes('ADMIN')); // Assuming role is an array
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

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
            <tr key={event.eventId} className="bg-white border-b">
              <td className="px-4 py-2">{event.name}</td>
              <td className="px-4 py-2">{event.location}</td>
              <td className="px-4 py-2">{event.maximum_places - event.places_sold}</td>
              <td className="px-4 py-2">{`$${event.price.toFixed(2)}`}</td>
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
                {isAdmin && (
                  <>
                    <button className="px-4 py-1 font-bold text-white bg-green-500 rounded hover:bg-green-700">
                      Update
                    </button>
                    <button className="px-4 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </>
                )}
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
