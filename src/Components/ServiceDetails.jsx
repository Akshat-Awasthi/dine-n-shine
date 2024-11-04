import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [selectedTime, setSelectedTime] = useState('Lunch');
    const time = [{name:'Lunch'}, {name:'Dinner'}];

    useEffect(() => {
        const fetchService = async () => {
            try {
                console.log(id)
                const response = await axios.get(`http://127.0.0.1:8000/service_by_id/${id}`);
                if (response.status === 200) {
                    const CurrentService = response.data;
                        const dateAdded = new Date(CurrentService.date_added);
                        CurrentService.date_added = dateAdded.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: '2-digit'
                        });
                        
                    setService(CurrentService);
                    console.log(response.data)
                } else {
                    throw new Error("Data format is incorrect");
                }
            } catch (e) {
                toast.error("Error fetching service details...");
                console.error("Error fetching service details:", e);
            }
        };
        fetchService();
    }, [id]);

    if (!service) return <p>Loading...</p>;

    return (
        <div className="mx-3 my-5">
            <h2 className="text-4xl font-medium mb-6">{service.title}</h2>
            <div className='flex flex-row'>
            <div className="bg-white rounded-lg shadow-lg p-5">
                <img src={service.img} alt="Service" className="border h-64 object-cover rounded-md m-1" />
            </div>
            <div className='mx-5 rounded-lg shadow-lg p-5'>
            <p className='mt-2'><strong>By:</strong> <i>{service.owner}</i></p>
                <p className='mt-2'><strong>Cost:</strong> ₹{service.cost}</p>
                <p className='text-sm mt-2'><strong className='text-base'>Description:</strong></p>
                <ul className="list-disc ml-5">
                    {service.distription.map((desc, i) => (
                        <li key={i}>{desc.point}</li>
                    ))}
                </ul>
                <p className='mt-2'><strong className='text-base'>Last Updated:</strong> {service?.date_added}</p>
                <div className='flex flex-row mt-6'>
                                <button onClick={()=>preView(service.id)} className="bg-white h-12 w-48 text-gray-700 p-1 font-semibold text-sm rounded-md border border-purple-400 hover:border-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-200 hover:text-white">
                                Book
                            </button>
                            </div>
            </div>
            </div>
            <div className='flex flex-row w-full'>
                <div className='m-2'>
                    {
                        time.map((item,i)=>(
                            <div onClick={()=>setSelectedTime(item.name)} className={`w-32 mb-1 text-center gap-2 p-3 px-3 hover:bg-gradient-to-r hover:from-purple-800 hover:to-purple-100 hover:no-underline hover:text-white active:bg-neutral-600 rounded-md hover:cursor-pointer text-base font-medium ${selectedTime === item.name ? 'bg-gradient-to-r from-purple-800 to-purple-100 text-white':''}`} key={i}>{item.name}</div>
                        ))
                    }
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 m-2 ml-5 gap-3'>
                    {selectedTime==='Lunch' &&
                        service.menu.lunch.map((item, i)=>(
                            <div key={i} className="bg-white border h-12 w-56 border-gray-300 rounded-lg shadow-md p-2 pl-5 transition-transform transform hover:shadow-lg">
                            <h4 className="text-lg font-medium text-gray-800">{item.dish}</h4>
                            </div>
                        ))
                    }
                    {
                        selectedTime==='Dinner' &&
                        service.menu.dinner.map((item, i)=>(
                            <div key={i} className="bg-white border border-gray-300 rounded-lg shadow-md h-12 w-56 p-2 pl-5 transition-transform transform hover:shadow-lg">
                            <h4 className="text-lg font-medium text-gray-800">{item.dish}</h4>
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </div>
    );
};

export default ServiceDetail;
