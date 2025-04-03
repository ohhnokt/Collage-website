import React from 'react';

export default function StudentFees() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState('card');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Fee Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Current Semester Fees</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tuition Fee</span>
              <span className="font-semibold">₹45,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Development Fee</span>
              <span className="font-semibold">₹5,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Library Fee</span>
              <span className="font-semibold">₹2,000</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-bold">₹52,000</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Payment History</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">First Installment</p>
                <p className="text-sm text-gray-500">March 1, 2024</p>
              </div>
              <span className="text-green-600 font-semibold">₹26,000</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Second Installment</p>
                <p className="text-sm text-gray-500">Due by June 1, 2024</p>
              </div>
              <span className="text-yellow-600 font-semibold">₹26,000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Make Payment</h2>
        <div className="max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Amount
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedPaymentMethod('card')}
                className={`border rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium ${
                  selectedPaymentMethod === 'card'
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                Card
              </button>
              <button
                onClick={() => setSelectedPaymentMethod('upi')}
                className={`border rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium ${
                  selectedPaymentMethod === 'upi'
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                UPI
              </button>
              <button
                onClick={() => setSelectedPaymentMethod('netbanking')}
                className={`border rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium ${
                  selectedPaymentMethod === 'netbanking'
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                Net Banking
              </button>
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Proceed to Pay
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Payment Guidelines</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>All fees must be paid before the due date to avoid late payment charges</li>
          <li>Transaction receipt will be sent to your registered email address</li>
          <li>For any payment-related queries, please contact the accounts department</li>
        </ul>
      </div>
    </div>
  );
}