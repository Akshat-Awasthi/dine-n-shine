import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageOrders = () => {
  const [formData, setFormData] = useState({
    id: '',
    token: '',
    status: '',
    type: '',
    table: '',
    Amount: '',
    Remaining: '',
    items: [{ name: '', quantity: '', price: '', remarks: '' }]
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { id: orderId, isUpdate } = location.state || {};

  useEffect(() => {
    if (orderId) {
      setFormData((prevData) => ({ ...prevData, id: orderId }));
    }
    const selectedOrder = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/order_by_id/${orderId}`);
        if (response.status === 200) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    if (isUpdate && orderId) {
      selectedOrder();
    }
  }, [orderId, isUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newItems = [...prevFormData.items];
      newItems[index] = { ...newItems[index], [name]: value };
      return { ...prevFormData, items: newItems };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = isUpdate
        ? await axios.put(`http://127.0.0.1:8000/update_order/${formData.id}`, formData)
        : await axios.post('http://127.0.0.1:8000/create_order', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

      if (response.status === 200) {
        toast.success(isUpdate ? 'Order Updated!' : 'Order Created!');
        console.log(isUpdate ? 'Order updated!' : 'Order created!');
        navigate('/');
      }
    } catch (e) {
      console.error("Error submitting order:", e);
      toast.error("Error submitting order. Please try again.");
    }
  };

  return (
    <div className="w-[60rem] flex flex-col justify-center items-center p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {isUpdate ? "Update Order Details" : "Create Order Details"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full m-10 p-10 border border-gray-300 rounded-lg shadow-lg bg-white">
        
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium" htmlFor="token">Token</label>
            <input
              type="text"
              name="token"
              value={formData.token}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-1 font-medium" htmlFor="status">Payment Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              <option>Select</option>
              <option value="Paid">Paid</option>
              <option value="Not Paid">Not Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium" htmlFor="type">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              <option>Select</option>
              <option value="Dine In">Dine In</option>
              <option value="Take Away">Take Away</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="block mb-1 font-medium" htmlFor="table">Table</label>
            <input
              type="text"
              name="table"
              value={formData.table}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium" htmlFor="Amount">Amount</label>
            <input
              type="number"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-1 font-medium" htmlFor="Remaining">Remaining</label>
            <input
              type="number"
              name="Remaining"
              value={formData.Remaining}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-4">Items</h3>
        {formData.items.map((item, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-md mt-2">
            <label className="block mb-1 font-medium" htmlFor={`itemName_${index}`}>Name</label>
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />

            <label className="block mb-1 mt-2 font-medium" htmlFor={`itemQuantity_${index}`}>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />

            <label className="block mb-1 mt-2 font-medium" htmlFor={`itemPrice_${index}`}>Price</label>
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />

            <label className="block mb-1 mt-2 font-medium" htmlFor={`itemRemarks_${index}`}>Remarks</label>
            <input
              type="text"
              name="remarks"
              value={item.remarks}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        ))}

        <button type="submit" className="bg-blue-500 w-full text-white py-2 rounded-md mt-4 transform transition-transform hover:scale-105">
          {isUpdate ? "Update Order" : "Create Order"}
        </button>
      </form>
    </div>
  );
};

export default ManageOrders;
