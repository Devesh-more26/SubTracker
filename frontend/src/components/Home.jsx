import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from "./Sidebar";
import Create from './Create';


const Home = () => {
    // console.log("home page rendered!");
    const [isSideBarActive, setIsSideBarActive] = useState(false);

    const [subscription, setSubscription] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const GetSubscription = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/subscription/");

                if (!response.ok) {
                    throw new Error(`HTTP error! Status : ${response.status}`)
                }

                const data = await response.json();

                setSubscription(data);
                console.log(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        GetSubscription();
        console.log("printing again", subscription);
    }, []);


    return (
        <div className="flex flex-col">
            <div className='transition-all duration-300 overflow-hidden'>
                <Navbar isSideBarActive={isSideBarActive} setIsSideBarActive={setIsSideBarActive} />
            </div>
            <div className='flex flex-row '>
                {isSideBarActive ? <Sidebar></Sidebar> : ""}
                <div className='w-full m-[2px]'>
                    <table className='w-full border-1 shadow-lg'>
                        <thead className='w-full bg-blue-800 text-slate-50'>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Subscription Start date</th>
                                <th>Expire date</th>
                                <th>No. of users</th>
                            </tr>
                        </thead>
                        <tbody className='w-full border-1'>
                            {subscription.length > 0 ? subscription.map((subscription) => (
                                <tr key={subscription.id} className='border-1'>
                                    <td className='text-center'>{subscription.name}</td>
                                    <td className='text-center'>{subscription.price}</td>
                                    <td className='text-center'>{subscription.subscrib_at}</td>
                                    <td className='text-center'>{subscription.expire_at}</td>
                                    <td className='text-center'>{subscription.number_of_user}</td>
                                </tr>
                            )) : <></>}
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    )
}

export default Home