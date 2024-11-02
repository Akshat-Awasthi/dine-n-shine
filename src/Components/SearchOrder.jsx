import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrentOrder from "./CurrentOrder";
import { IoMdPeople } from "react-icons/io"; 
import { FaUserCircle } from 'react-icons/fa';
import { IoPrintSharp } from "react-icons/io5";
import { BsFillBoxSeamFill } from "react-icons/bs";

const SearchOrders = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [order, setOrder] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const openSidebar = (order) => {
    setOrder(order);
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
    setOrder(null);
  };

  const getOrder = async (Id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/order_by_id/${Id}`);
      if (response.status === 200) {
        setOrder(response.data);
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    if (query) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/search_orders?query=${query}`);
          setSuggestions(response.data);
          console.log(response);
          console.log(suggestions);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      };

      const debounceTimeout = setTimeout(fetchSuggestions, 300);
      return () => clearTimeout(debounceTimeout);
    } else {
      setSuggestions([]);
      setOrder(null);
    }
  }, [query]);

  return (
    <div className="p-4">
      <div>
        <label className="block mb-2 text-lg font-medium text-gray-700">Search Orders</label>
        <input
          type="text"
          className="w-96 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Whole Order ID or token no."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute w-96 border border-gray-300 mt-2 rounded bg-white shadow-md">
            {suggestions.map((order) => (
              <li
                key={order.id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  getOrder(order.id);
                  setSuggestions([]);
                }}
              >
                {order.id} - {order.status}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 2xl:grid-cols-4 h-full w-full mt-5 ml-2">
          {order && (
            <div className="w-[32rem] h-[35rem] p-4 mt-2 bg-white rounded-md shadow">
              <div className="flex justify-between">
                <span className="bg-yellow-500 font-bold text-black p-2 px-3 h-12 rounded-md text-lg">
                  {order.token}
                </span>
                <div className="flex flex-col">
                  <span className="h-6 text-center text-xs bg-blue-200 p-1 px-2 rounded-md">
                    {order.type}
                  </span>
                  <span className="flex flex-row">
                    <li
                      className={`${
                        order.status === "Paid" ? "text-green-600" : "text-red-600"
                      } mt-1`}
                    ></li>
                    <p className="text-sm mt-2">{order.status}</p>
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-gray-600 text-sm">Order #{order.id}</div>
                <div className="flex flex-row">
                  <p className="flex-1 text-sm">Instructions</p>
                  <div className="text-blue-500 text-sm">
                    {order.items[0]?.remarks || "No remarks"}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="mt-2">
                    {order.items.map((orderItem, index) => (
                      <div key={index} className="flex flex-col text-gray-700 font-medium">
                        <p className="text-sm font-medium text-gray-400">Items</p>
                        <span className="text-xs mt-1">{orderItem.name}</span>
                        <span className="text-xs mt-1">Total Amount</span>
                        <span className="text-xs mt-1">Remaining Amount</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    {order.items.map((orderItem, index) => (
                      <div key={index} className="flex flex-col text-gray-700">
                        <p className="text-sm font-medium text-gray-400">Qty</p>
                        <span className="text-sm mt-1">{orderItem.quantity}</span>
                        <span className="text-sm">-</span>
                        <span className="text-sm">-</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    {order.items.map((orderItem, index) => (
                      <div key={index} className="flex flex-col text-gray-700">
                        <p className="text-sm font-medium text-gray-400">Price</p>
                        <span className="text-sm mt-1">₹{orderItem.price}</span>
                        <span className="text-sm">₹{order.Amount}</span>
                        <span className="text-sm">₹{order.Remaining}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-blue-500 text-white p-2 rounded-md flex flex-row"
                  onClick={() => openSidebar(order)}
                >
                  View Items
                </button>
                <button className="bg-gray-700 text-white p-2 rounded-md flex flex-row">
                  Print Invoice
                </button>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="bg-blue-500 text-sm text-white p-2 rounded-md flex flex-row">
                  Enter Customer Info
                </button>
                <button className="bg-gray-700 text-sm text-white p-2 rounded-md flex flex-row">
                  Assign Staff
                </button>
              </div>
              <h2 className="text-xs mt-2">Payment Options</h2>
              <div className="mt-2 flex justify-between">
                <button className="bg-green-700 text-sm text-white p-2 rounded-md flex flex-row">
                  Accept Cash Before
                </button>
                <button className="bg-green-700 text-sm text-white p-2 rounded-md flex flex-row">
                  Pay Later
                </button>
              </div>
            </div>
          )}
          <CurrentOrder
            isVisible={isSidebarVisible}
            orderDetails={order}
            closeSidebar={closeSidebar}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchOrders;
