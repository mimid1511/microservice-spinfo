import React, { useState } from 'react';

export const PaymentModal = ({ isOpen, onClose, onConfirm, eventId, userId }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePaymentConfirmation = async () => {
    setLoading(true);
    setProcessing(true);
    setMessage('');
    try {
      const result = await simulatePayment(cardNumber);
      setLoading(false);
      if (result.success) {
        setMessage("You will receive an email confirmation.");

        setTimeout(() => {
          onConfirm();
          onClose();
        }, 3000);
      } else {
        setMessage("There is an error with the payment.");
        setProcessing(false);
      }
    } catch (error) {
      setMessage("There is an error with the payment.");
      setProcessing(false);
    }
  };

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
          disabled={processing}
        />
        {loading && <p className="text-blue-500">Processing payment...</p>}
        {message && <p className="text-red-500">{message}</p>}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700" disabled={processing}>
            Cancel
          </button>
          <button onClick={handlePaymentConfirmation} className="px-4 py-1 font-bold text-white bg-green-500 rounded hover:bg-green-700" disabled={processing}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const simulatePayment = (cardNumber) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      resolve({ success });
    }, 2000);
  });
};
