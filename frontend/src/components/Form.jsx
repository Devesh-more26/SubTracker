import React from 'react'
import { useState } from 'react'
import { Wallet, Users, Calendar, Bell, Check, Plus } from './Icons'

const Form = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [subscribDate, setSubscribDate] = useState();
    const [expireDate, setExpireDate] = useState();
    const [user, setUser] = useState()
    const [successMsg, setSuccessMsg] = useState();
    const [errorMsg, setErrorMsg] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/subscription/",

                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        price: price,
                        subscrib_at: subscribDate,
                        expire_at: expireDate,
                        number_of_user: user,
                    }),
                }
            );

            const data = await response.json();
            console.log(response.status);
            console.log(data);

            if (!response.ok) {
                throw new Error("Failed to add Subscription");
            }

            setSuccessMsg("Subscription added Successfully!");

            setTimeout(() => {
                setSuccessMsg("");
            }, 3000);
            setErrorMsg("");

            setName("");
            setPrice("");
            setSubscribDate("");
            setExpireDate("");
            setUser("");

        } catch (error) {
            setErrorMsg(error.message);

            setTimeout(() => {
                setErrorMsg("");
            }, 3000);
            setSuccessMsg("");
        }

    }

    return (
        <div>
            {/* error and success messages */}
            {successMsg && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
                    <Check size={16} /> {successMsg}
                </div>
            )}

            {errorMsg && (
                <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
                    {errorMsg}
                </div>
            )}

            {/* main form */}
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
                                placeholder="e.g. Netflix"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                    placeholder="1"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
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
                                    placeholder="0.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
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
                                value={subscribDate}
                                onChange={(e) => setSubscribDate(e.target.value)}
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
                                value={expireDate}
                                onChange={(e) => setExpireDate(e.target.value)}
                                className="input text-slate-600"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                        <button
                            type="submit"
                            className="btn-primary w-full py-3 sm:w-auto sm:px-8"
                        >
                            <Plus size={18} /> Add subscription
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form
