import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from "./Sidebar";
import { useParams, useNavigate } from "react-router";
import { Wallet, Chart, Users, Plus, Calendar, Bell, Pencil, Trash } from "./Icons";
import { RxCross2 } from "react-icons/rx";

const Delete = () => {
    const [isSideBarActive, setIsSideBarActive] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/subscription/${id}/`,
                {
                    method : 'DELETE',
                }
            );
            if (!response.ok) {
                throw new Error("Delete Failed");
            }

            navigate('/Home');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex min-h-screen flex-col mesh-bg">
            <Navbar isSideBarActive={isSideBarActive} setIsSideBarActive={setIsSideBarActive} />
            <div className="flex flex-1">
                {isSideBarActive && <Sidebar />}
                <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Delete subscription</h1>
                        <p className="mt-1 text-sm text-slate-500">Remove a subscription you no longer need.</p>

                        <div className="card mt-6 flex flex-col items-center justify-center px-6 py-16 text-center">
                            <h2 className='mb-10 text-slate-500'>Are You Sure, You want to Delete the Record</h2>
                            <div>
                                <button
                                    onClick={handleDelete}
                                    className="btn-primary w-full sm:w-auto mr-10"
                                >
                                    <Trash size={18} /> Yes
                                </button>
                                <button
                                    onClick={() => navigate("/Home")}
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    <RxCross2 size={18} /> No
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Delete
