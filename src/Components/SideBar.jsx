import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoPrintSharp } from "react-icons/io5";


const SideBar = ({ isVisible, orderDetails, closeSidebar}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-gray-100 shadow-lg p-4">
        <div className='flex flex-row'>
            <div className='flex-1'></div>
        <button onClick={closeSidebar} className="mb-4 text-black"><RxCross2 size={22}/></button>
        </div>
      
      <h2 className="text-xl font-bold text-center">Ordered Information</h2>
      <div className="mt-4 flex justify-center gap-3">
         <button className="bg-blue-500 w-24 h-9 text-white px-5 py-[5px] rounded-md transform transition-transform hover:scale-105 ">Dine In</button>
         <button className="bg-slate-200 border-[2px] h-9 py-1 border-blue-500 text-center text-gray-400 p-2 rounded-md transform transition-transform hover:scale-105 ">Take Away</button>
      </div>
      <div className='flex flex-row justify-between m-1 mt-5'>
      <p>Order #{orderDetails.id}</p>
      <p>Token - {orderDetails.token}</p>
      <p>Table no. - 2</p>
      </div>

      {items && (
        <div>
          <h3 className='text-sm text-gray-400 mt-4'>Items</h3>
          {orderDetails.map((item) => (
            <div key={item.id} className='flex flex-row'>
                <img src="https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724198400&semt=ais_hybrid" alt="" className='h-20 w-20 rounded-full m-3 ' />
              <div>
              <p className='mt-5 '>
                {item.name} 
              </p>
              <p className='text-gray-400 text-xs mt-1'>{item.quantity}X</p>
              <p className='text-gray-400 text-xs mt-1'>Add extra cheese</p>

              </div>
              <p className='mt-16 ml-44 text-bold'>₹{item.price}</p>
              
             
          
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between mt-4">
      <button className="bg-yellow-400 w-28 h-9 text-black px-2 py-2 text-sm rounded-md flex  transform transition-transform hover:scale-105"><FaPlus className='m-[2px]'/>Add Items</button>
        <button className="bg-blue-500 w-28 h-9 text-white px-2 py-2 text-sm rounded-md flex transform transition-transform hover:scale-105 " ><IoPrintSharp size={18} className='mt-[2px] mr-[6px]'/>Print KOT</button>
        <button className="bg-gray-700 w-32 h-9 text-white px-2 py-2 text-sm rounded-md flex transform transition-transform hover:scale-105 " ><IoPrintSharp size={18} className='mt-[2px] mr-[6px]'/>Print Invoice</button>
      </div>
      <button className="bg-green-700 text-sm w-24 text-white p-2 rounded-md mt-3 transform transition-transform hover:scale-105">Pay Later</button>

      <p className='text-sm mt-5'>Write Instructions</p>
      <div className='bg-slate-200 h-28 mt-5 rounded'>
        <li className='ml-5 pt-4 text-blue-500'>Add extra cheese in Pizza</li>
        <li className='ml-5 pt-3 text-blue-500'>Add extra cheese in Pasta</li>
      </div>
      <p className='text-sm mt-4'>Change Payment Options :</p>
      <button className="bg-green-700 text-sm w-full h-12 text-white p-2 rounded-md mt-3 transform transition-transform hover:scale-105 ">Accept Cash Before</button>
      <button className="bg-yellow-300 text-sm w-full h-12 text-black p-2 rounded-md mt-3 transform transition-transform hover:scale-105 ">Update Order</button>
    </div>
  );
};

export default SideBar;