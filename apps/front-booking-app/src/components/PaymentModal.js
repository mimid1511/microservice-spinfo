import React, { useState } from 'react';

export const PaymentModal = ({ isOpen, onClose, onConfirm, eventId, userId }) => {
  const [cardNumber, setCardNumber] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Proceed to Payment</h2>
        <input
          type="text"
          placeholder="Enter your card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700">
            Cancel
          </button>
          <button onClick={() => onConfirm(cardNumber)} className="px-4 py-1 font-bold text-white bg-green-500 rounded hover:bg-green-700">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
