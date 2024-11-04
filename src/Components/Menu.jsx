import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { IoMdCart } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const get_services = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/get_services");
                console.log(response.data);
                if (response.status === 200) {
                    const formattedServices = response.data.services.map(service => {
                        const dateAdded = new Date(service.date_added);
                        service.date_added = dateAdded.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: '2-digit'
                        });
                        return service;
                    });
                    setServices(formattedServices);
                } else {
                    throw new Error("Data format is incorrect");
                }
            } catch (e) {
                toast.error("Error fetching services...");
                console.error("Error fetching services:", e);
            }
        };
        get_services();
    }, []);

    const preView = (id) => {
        console.log(id);
        navigate(`/services/${id}`)
    }

    return (
        <div className="mx-3 my-5">
            <h2 className="text-2xl font-semibold text-center mb-6">Our Services</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:flex md:flex-col md:mr-5 md:ml-2">
                {services.map((service, i) => (
                    <div key={service.id} className="bg-white rounded-lg shadow-lg p-5 flex flex-col md:flex-row space-y-4 md:w-full md:h-60 transform transition-transform hover:scale-105 hover:cursor-pointer">
                        <div className="md:w-5/12 w-full h-54 overflow-hidden rounded-md border border-gray-300">
                            <img src={service.img} alt="Service image" className="w-full h-full object-cover" />
                        </div>
                        <div className='md:w-1/3 mx-7'>
                            <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                            <p className="text-gray-400 text-xs ml-1"> <i> by {service.owner} </i></p>
                            <div className="mt-3 space-y-2">
                                {service.distription.map((description, j) => (
                                    <p key={j} className="text-gray-500 text-sm">• {description.point}</p>
                                ))}
                            </div>
                        </div>
                        <div className='h-11/12 hidden md:block bg-gray-300 w-[1px]'></div>
                        <div className="md:w-1/3 flex flex-col justify-center items-center text-base font-semibold h-full text-gray-700 ">
                            <div className='w-full flex flex-col justify-center items-center md:h-[5rem] flex-1'>
                            <p>₹{service.cost} / meal</p>
                            <p className='text-xs mt-2 font-normal'>Last Updated : {service?.date_added}</p>
                            </div>
                            <div className='flex flex-row mb-3'>
                                <div className='border flex justify-center items-center w-12 h-12 rounded-md mr-3 hover:border-purple-400'>
                                <IoMdCart size={15} color='gray'/>
                                </div>
                                <button onClick={()=>preView(service.id)} className="bg-white h-12 w-48 text-gray-700 p-1 text-sm rounded-md border border-purple-400 hover:border-white hover:bg-purple-500 hover:text-white">
                                Preview
                            </button>
                            </div>
                            
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
