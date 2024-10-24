// src/pages/Cart.jsx
import React, { useState } from "react";

// Mock data for testing
const mockBasketItems = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    price: 49.99,
    quantity: 1,
    image: "https://via.placeholder.com/150",
  },
];

const Cart = ({ basketItems = mockBasketItems, removeItemFromBasket }) => {
  const [items, setItems] = useState(basketItems);

  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  const handleRemoveItem = (id) => {
    console.log(`Remove item with id: ${id}`);
    // Implement removal logic here if needed
  };

  const handleQuantityChange = (id, delta) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleOrderNow = () => {
    console.log("Order Now clicked");
    // Implement order logic here if needed
  };

  const handleClearAllItems = () => {
    setItems([]);
    console.log("All items cleared");
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {items.length === 0 ? (
                <p className="text-center text-slate-500 dark:text-slate-400">
                  Aucune items existe dans le panier.
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <img
                          className="h-20 w-20 rounded-full"
                          src={item.image}
                          alt={item.name}
                        />
                      </a>
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a
                          href="#"
                          className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                        >
                          {item.name}
                        </a>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <svg
                              className="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            readOnly
                            value={item.quantity}
                            className="w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order Summary
              </p>
              <div className="space-y-4">
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ${calculateTotal()}
                  </dd>
                </dl>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleOrderNow}
                  className="flex w-full items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white"
                >
                  Order Now
                </button>
                <button
                  onClick={handleClearAllItems}
                  className="flex w-full items-center justify-center border-2 border-red-500 text-red-500 font-semibold rounded-md bg-slate-50 px-5 py-2.5 text-sm"
                >
                  Clear All Items
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;