import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from "./Sidebar";

const Edit = () => {
    const [isSideBarActive, setIsSideBarActive] = useState(false);

    return (
        <div>
            <Navbar isSideBarActive={isSideBarActive} setIsSideBarActive={setIsSideBarActive} />
            <div className='flex flex-row w-full'>
                {/* sidebar */}
                    {isSideBarActive ? <Sidebar></Sidebar> : ""}
                {/* main section */}
                <div>this is edit page</div>
            </div>
        </div>
    )
}

export default Edit