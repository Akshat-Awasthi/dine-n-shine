import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoPrintSharp } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CurrentOrder = ({ isVisible, orderDetails, closeSidebar, refresh}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    token: '',
    status: '',
    type: '',
    table: '',
    Amount: '',
    Remaining: '',
    items: [{ name: '', quantity: '', price: '', remarks: '' }]
  });
  const navigate = useNavigate();
  if (!isVisible) return null;
  const {items} = orderDetails;
  let value;
  items.forEach((item) => {
    value += item.price * item.quantity;
  });
  const deleteOrder = async () => {
    try {
      const response = await axios.delete('http://127.0.0.1:8000/delete_order', {
        params: { _id: orderDetails.id },
      });
      if (response.status === 200) {
        toast.success("Order Deleted !")
        console.log("Order deleted!");
        closeSidebar();
        refresh();
      }
    } catch (e) {
      console.error("Error deleting order:", e);
    }
  };

  const updateOrder = () => {
    setIsUpdate(true);
    setFormData(orderDetails);
    console.log(formData)
    navigate('/manage', {
      state: { id: orderDetails.id, isUpdate: true }
    });
  };
  return (
    <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-gray-100 shadow-lg p-4">
        <div className='flex flex-row'>
            <div className='flex-1'></div>
        <button onClick={closeSidebar} className="mb-4 text-black"><RxCross2 size={22}/></button>
        </div>
      
      <h2 className="text-xl font-bold text-center">Ordered Information</h2>
      <div className="mt-4 flex justify-center gap-3">
         <button className="bg-blue-500 w-24 h-9 text-white px-5 py-[5px] rounded-md transform transition-transform hover:scale-105 ">Dine In</button>
         <button className="bg-slate-200 border-[2px] h-9 py-1 border-blue-500 text-center text-gray-400 p-2 rounded-md transform transition-transform hover:scale-105 ">Take Away</button>
      </div>
      <div className='flex flex-row justify-between mt-2 md:mt-5'>
      <p>Order #{orderDetails.id}</p>
      </div>
      <p>Total Amount {value}</p>

      {items && (
        <div key={items.token}>
          <h3 className='text-sm text-gray-400 mt-4'>Items</h3>
          {items.map((item) => (
            <div key={item.id} className='flex flex-row'>
                <img src="https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724198400&semt=ais_hybrid" alt="" className='h-20 w-20 rounded-full m-3 ' />
              <div>
              <p className='mt-5 '>
                {item.name} 
              </p>
              <p className='text-gray-400 text-xs mt-1'>{item.quantity}X</p>
              <p className='text-gray-400 text-xs mt-1'>Add extra cheese</p>

              </div>
              <p className='mt-16 ml-20  md:ml-44 text-bold'>₹{item.price}</p>
              
             
              
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between mt-4">
      <button className="bg-yellow-400 text-center w-24 md:w-28 h-9 text-black px-2 py-2 text-xs md:text-sm rounded-md flex  transform transition-transform hover:scale-105"><FaPlus className='m-[2px]'/>Add Items</button>
      <button className="bg-green-700 text-center w-24 md:w-28 h-9 text-white px-5 py-2 text-xs md:text-sm rounded-md flex  transform transition-transform hover:scale-105">Pay Later</button>
        <button className="bg-gray-700 text-center w-20 md:w-28 h-9 text-white px-4 py-2 text-xs md:text-sm rounded-md flex transform transition-transform hover:scale-105 " ><IoPrintSharp size={18} className='mt-[2px] mx-[4px]'/>Invoice</button>
      </div>

      <p className='text-sm mt-5'>Write Instructions</p>
      <div >
        <textarea name="instructions" id="instructions" cols="55" rows="3" className='bg-slate-200 w-full md:h-28 mt-3 px-3 py-2 text-sm text-gray-700 rounded'></textarea>
      </div>
      <p className='text-sm mt-4'>Order Options :</p>
      <button onClick={()=>updateOrder()} className="bg-yellow-300 text-sm w-full h-12 text-black p-2 rounded-md mt-3 transform transition-transform hover:scale-105 ">Update Order</button>
      <button onClick={()=>deleteOrder()} className="bg-red-700 text-sm w-full h-12 text-white p-2 rounded-md mt-3 transform transition-transform hover:scale-105 ">Delete Order</button>
    </div>
  );
};

export default CurrentOrder;