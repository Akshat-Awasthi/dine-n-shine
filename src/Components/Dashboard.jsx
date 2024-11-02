import React, { useEffect, useState } from 'react';
import { IoMdPeople } from "react-icons/io"; 
import { FaUserCircle } from 'react-icons/fa';
import { IoPrintSharp } from "react-icons/io5";
import { BsFillBoxSeamFill } from "react-icons/bs";
import axios from 'axios';
import CurrentOrder from './CurrentOrder';

const Dashboard = () => {
    const [headerFocus, setHeaderFocus] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [orderData, setOrderData] = useState(null);
    
    const dashboardHeader = [
        { id: 1, type: 'All' },
        { id: 2, type: 'New Orders' },
        { id: 3, type: 'Dine in' },
        { id: 4, type: 'Take Away' },
    ];
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/orders');
            setOrderData(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        }
    };

    const openSidebar = (order) => {
        setSelectedOrder(order);
        setSidebarVisible(!isSidebarVisible);
    };

    const closeSidebar = () => {
        setSidebarVisible(false);
        setSelectedOrder(null);
    };

    const refresh = () => {
        console.log("refreshing...")
        fetchOrders();
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className='bg-slate-100 min-h-screen overflow-y-auto sm:mx-2 mx-1 md:mx-5 py-10'>
            <div>
                {dashboardHeader.map((item) => (
                    <span
                        key={item.id}
                        onClick={() => setHeaderFocus(item.id)}
                        className={`h-5 w-10 m-4 p-3 hover:cursor-pointer transform transition-transform hover:scale-105 rounded-md ${headerFocus === item.id ? 'text-black bg-yellow-300' : 'text-gray-500 bg-white'}`}
                    >
                        {item.type}
                    </span>
                ))}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 2xl:grid-cols-4 h-full w-full mt-5 ml-2'>
                {headerFocus === 1 && orderData?.orders.map((item) => (
                    <div key={item.id} className="w-[21rem] md:w-[22rem] h-max p-4 mt-2 bg-white rounded-md shadow">
                        <div className="flex justify-between">
                            <span className="bg-yellow-500 font-bold text-black p-2 px-3 h-12 rounded-md text-lg">
                                {item.token}
                            </span>
                            <div className='flex flex-col'>
                                <span className='h-6 text-center text-xs bg-blue-200 p-1 px-2 rounded-md'>{item.type}</span>
                                <span className='flex flex-row'>
                                    <li className={`${item.status === 'Paid' ? 'text-green-600' : 'text-red-600'} mt-1`} ></li>
                                    <p className='text-sm mt-2'>{item.status}</p>
                                </span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="text-gray-600 text-sm">Order #{item.id}</div>
                            <div className='flex flex-row'>
                                <p className='flex-1 text-sm'>Instructions</p>
                                <div className="text-blue-500 text-sm">{item.items[0]?.remarks || 'No remarks'}</div>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div className="mt-2">
                                    {item.items.map((orderItem, index) => (
                                        <div key={index} className="flex flex-col text-gray-700 font-medium">
                                            <p className='text-sm font-medium text-gray-400'>Items</p>
                                            <span className='text-xs mt-1'>{orderItem.name}</span>
                                            <span className='text-xs mt-1'>Total Amount</span>
                                            <span className='text-xs mt-1'>Remaining Amount</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2">
                                    {item.items.map((orderItem, index) => (
                                        <div key={index} className="flex flex-col text-gray-700">
                                            <p className='text-sm font-medium text-gray-400'>Qty</p>
                                            <span className='text-sm mt-1'>{orderItem.quantity}</span>
                                            <span className='text-sm'>-</span>
                                            <span className='text-sm'>-</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2">
                                    {item.items.map((orderItem, index) => (
                                        <div key={index} className="flex flex-col text-gray-700">
                                            <p className='text-sm font-medium text-gray-400'>Price</p>
                                            <span className='text-sm mt-1'>₹{orderItem.price}</span>
                                            <span className='text-sm'>₹{item.Amount}</span>
                                            <span className='text-sm'>₹{item.Remaining}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button className="bg-blue-500 text-white p-2 rounded-md flex flex-row transition-transform hover:scale-105 hover:cursor-pointer" onClick={() => openSidebar(item)}>
                                <BsFillBoxSeamFill size={15} className='mr-1 mt-1' />View Items
                            </button>
                            <button className="bg-gray-700 text-white p-2 rounded-md flex flex-row transition-transform hover:scale-105">
                                <IoPrintSharp size={17} className='mr-1 mt-1' />Print Invoice
                            </button>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button className="bg-blue-500 text-sm text-white p-2 rounded-md flex flex-row transition-transform hover:scale-105">
                                <FaUserCircle size={15} className='mr-1 mt-[2px]' />Enter Customer Info
                            </button>
                            <button className="bg-gray-700 text-sm text-white p-2 rounded-md flex flex-row transition-transform hover:scale-105">
                                <IoMdPeople size={20} className='mr-1' />Assign Staff
                            </button>
                        </div>
                        <h2 className='text-xs mt-2'>Payment Options</h2>
                        <div className="mt-2 flex justify-between">
                            <button className="bg-green-700 text-sm text-white p-2 rounded-md flex flex-row">Accept Cash Before</button>
                            <button className="bg-green-700 text-sm text-white p-2 rounded-md flex flex-row">Pay Later</button>
                        </div>
                    </div>
                ))}
                
                <CurrentOrder
                    isVisible={isSidebarVisible}
                    orderDetails={selectedOrder}
                    closeSidebar={closeSidebar}
                    refresh={refresh}
                />
            </div>
        </div>
    );
};

export default Dashboard;
