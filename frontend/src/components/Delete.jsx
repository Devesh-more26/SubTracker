import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from "./Sidebar";
import { Trash } from './Icons'

const Delete = () =>{
    const [isSideBarActive, setIsSideBarActive] = useState(false);

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
                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                                <Trash size={26} />
                            </span>
                            <h2 className="mt-4 text-lg font-bold text-slate-900">Delete page</h2>
                            <p className="mt-1 max-w-sm text-sm text-slate-500">
                                This is the delete page.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Delete
