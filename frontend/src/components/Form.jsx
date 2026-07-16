import React from 'react'
import { useState } from 'react'

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
        <div className="m-[2px]">
            {/* error and success messages */}
            {successMsg && (
                <p className='text-white bg-green-400 p-4 w-full rounded-2xl mb-1'>{successMsg}</p>
            )}

            {errorMsg && (
                <p className='text-white bg-red-400 p-4 w-full rounded-2xl mb-1'>{errorMsg}</p>
            )}

            {/* main form */}
            <h2 className="text-2xl p-3 font-bold shadow-xl text-slate-50 bg-blue-800 h-full rounded-tl-2xl rounded-tr-2xl">
                Subscription Form
            </h2>
            <form
                onSubmit={handleSubmit}
                className="w-full h-full flex flex-col bg-white shadow-xl p-8 space-y-5"
            >
                <div className='flex flex-row justify-evenly'>
                    <div className='w-full mr-[4%]'>
                        <h3>Subscription Name</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    <div className='w-full mr-[4%]'>
                        <h3>No. of user</h3>
                        <input
                            type="number"
                            placeholder="User"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    <div className='w-full'>
                        <h3>Price/month $</h3>
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                </div>

                <div className='flex'>
                    <div className='w-full mr-[4%]'>
                        <h3>Subscription Start Date</h3>
                        <input
                            type="date"
                            placeholder="Subscription Start Date"
                            value={subscribDate}
                            onChange={(e) => setSubscribDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-600"
                        />
                    </div>

                    <div className='w-full'>
                        <h3>Expire Date</h3>
                        <input
                            type="date"
                            placeholder="Expire Date"
                            value={expireDate}
                            onChange={(e) => setExpireDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-600"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Form