import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from "./Sidebar";
import { Pencil, Wallet, Users, Calendar, Bell, Check, Plus } from './Icons'
import { useParams, useNavigate } from "react-router";

const Edit = () => {
    const [isSideBarActive, setIsSideBarActive] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();

    const [error, setError] = useState();
    const [singleData, setSingleData] = useState({
        name: '',
        number_of_user: '',
        price: '',
        subscrib_at: '',
        expire_at: '',
    });

    useEffect(() => {
        const GetEachSubscription = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/subscription/${id}/`)

                if (!response.ok) {
                    throw new Error(`HTTP error! Status : ${response.status}`);
                }

                const data = await response.json();
                setSingleData(data);
                // setUser(data[0].name)
                console.log(data);
            } catch (err) {
                setError(err.message);
            }
        }

        GetEachSubscription();
        // console.log(singleData);
    }, [id]);

    const handleChange = (e) => {
        setSingleData({
            ...singleData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`http://127.0.0.1:8000/subscription/${id}/`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(singleData)
            }
        );
        navigate('/Home');
    }

    return (
        <div className="flex min-h-screen flex-col mesh-bg">
            <Navbar isSideBarActive={isSideBarActive} setIsSideBarActive={setIsSideBarActive} />
            <div className="flex flex-1">
                {/* sidebar */}
                {isSideBarActive && <Sidebar />}
                {/* main section */}
                <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Edit subscription</h1>
                        <p className="mt-1 text-sm text-slate-500 mb-6">Update the details of an existing subscription.</p>

                        <div className="card overflow-hidden">
                            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl brand-gradient text-white">
                                    <Wallet size={20} />
                                </span>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Subscription details</h2>
                                    <p className="text-xs text-slate-500">All fields help you keep an accurate overview.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6 p-6">
                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="sm:col-span-2 lg:col-span-1">
                                        <label className="label" htmlFor="name">Subscription name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="e.g. Netflix"
                                            value={singleData.name}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                    </div>

                                    <div>
                                        <label className="label" htmlFor="users">No. of users</label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                                <Users size={17} />
                                            </span>
                                            <input
                                                id="users"
                                                type="number"
                                                name="number_of_user"
                                                placeholder="1"
                                                value={singleData.number_of_user}
                                                onChange={handleChange}
                                                className="input pl-10"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label" htmlFor="price">Price / month</label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-slate-400">$</span>
                                            <input
                                                id="price"
                                                type="number"
                                                name="price"
                                                placeholder="0.00"
                                                value={singleData.price}
                                                onChange={handleChange}
                                                className="input pl-8"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="label" htmlFor="start">
                                            <span className="inline-flex items-center gap-1.5"><Calendar size={15} /> Start date</span>
                                        </label>
                                        <input
                                            id="start"
                                            type="date"
                                            name="subscrib_at"
                                            value={singleData.subscrib_at}
                                            onChange={handleChange}
                                            className="input text-slate-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="label" htmlFor="expire">
                                            <span className="inline-flex items-center gap-1.5"><Bell size={15} /> Expiry date</span>
                                        </label>
                                        <input
                                            id="expire"
                                            type="date"
                                            name="expire_at"
                                            value={singleData.expire_at}
                                            onChange={handleChange}
                                            className="input text-slate-600"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                                    <button
                                        type="submit"
                                        className="btn-primary w-full py-3 sm:w-auto sm:px-8"
                                    >
                                        <Pencil size={18} /> Edit subscription
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Edit
