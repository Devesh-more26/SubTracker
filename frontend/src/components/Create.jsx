import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from "./Sidebar";
import Form from './Form'

const Create = () => {
    const [isSideBarActive, setIsSideBarActive] = useState(false);

    const [users, setUsers] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("fetching api......")
                const response = await fetch('http://127.0.0.1:8000/');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status : ${response.status}`);
                }

                const data = await response.json();

                setUsers(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    console.log(users);

    return (
        <div>
            <div className='transition-all duration-300 overflow-hidden'>
                <Navbar isSideBarActive={isSideBarActive} setIsSideBarActive={setIsSideBarActive} />
            </div>
            <div className="flex flex-row">
                {isSideBarActive ? <Sidebar></Sidebar> : ""}
                <div className='flex-1 transition-all duration-300'><Form /></div>
            </div>
        </div>
    )
}

export default Create