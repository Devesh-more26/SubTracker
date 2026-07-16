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
        <div className="flex min-h-screen flex-col mesh-bg">
            <Navbar isSideBarActive={isSideBarActive} setIsSideBarActive={setIsSideBarActive} />

            <div className="flex flex-1">
                {isSideBarActive && <Sidebar />}

                <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-6">
                            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Add a subscription</h1>
                            <p className="mt-1 text-sm text-slate-500">Enter the details below to start tracking a new plan.</p>
                        </div>
                        <Form />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Create
