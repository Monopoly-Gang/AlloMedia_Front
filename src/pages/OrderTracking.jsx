import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { CheckCircle, XCircle } from 'lucide-react';

const mockOrders = [
  {
    _id: 'order1',
    client: { name: 'John Doe' },
    status: 'ready_for_delivery',
    estimatedDelivery: '15:30',
    items: [
      { menuItem: { name: 'Pizza', price: 12.99 }, quantity: 2 },
      { menuItem: { name: 'Burger', price: 8.99 }, quantity: 1 },
    ],
  },
  {
    _id: 'order2',
    client: { name: 'Jane Smith' },
    status: 'preparing',
    estimatedDelivery: '16:00',
    items: [
      { menuItem: { name: 'Pasta', price: 10.99 }, quantity: 1 },
      { menuItem: { name: 'Salad', price: 5.99 }, quantity: 2 },
    ],
  },
];

// Define the steps for the order status
const statusSteps = [
  { key: 'pending', label: 'Pending', icon: <XCircle className="w-6 h-6" /> },
  { key: 'preparing', label: 'Preparing', icon: <XCircle className="w-6 h-6" /> },
  { key: 'ready_for_delivery', label: 'Ready for Delivery', icon: <CheckCircle className="w-6 h-6" /> },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: <CheckCircle className="w-6 h-6" /> },
  { key: 'delivered', label: 'Delivered', icon: <CheckCircle className="w-6 h-6" /> },
  { key: 'cancelled', label: 'Cancelled', icon: <XCircle className="w-6 h-6" /> },
];

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {steps.map((step, index) => (
        <div key={step.key} className="flex flex-col items-center">
          <Tooltip title={step.label} arrow>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                index <= currentStep ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step.icon}
            </div>
          </Tooltip>
          <p
            className={`text-sm font-medium ${
              index <= currentStep ? 'text-primary' : 'text-gray-500'
            }`}
          >
            {step.label}
          </p>
          {index < steps.length - 1 && (
            <div className={`h-1 w-16 ${index < currentStep ? 'bg-primary' : 'bg-gray-300'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

// Main OrderTracking component
const OrderTracking = () => {
  const [orders] = useState(mockOrders);

  // Get the index of the current status
  const getStatusIndex = (status) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  return (
    <section className="py-10 md:py-20 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Order Tracking</h2>
        {orders.map((order) => (
          <div key={order._id} className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <Stepper steps={statusSteps} currentStep={getStatusIndex(order.status)} />
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Order Details</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">Order ID: <span className="font-medium">{order._id}</span></p>
                <p className="text-lg text-gray-700 dark:text-gray-300">Client: <span className="font-medium">{order.client.name}</span></p>
                <p className="text-lg text-gray-700 dark:text-gray-300">Estimated Delivery: <span className="font-medium">{order.estimatedDelivery}</span></p>
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Order Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                      <div>
                        <p className="text-md font-medium text-gray-900 dark:text-white">{item.menuItem.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-md font-bold text-gray-900 dark:text-white">${(item.menuItem.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderTracking;