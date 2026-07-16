import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from "./Sidebar";

const Delete = () =>{
    const [isSideBarActive, setIsSideBarActive] = useState(false);

    return (
        <div>
            <Navbar isSideBarActive={isSideBarActive} setIsSideBarActive={setIsSideBarActive} />
            <div className='flex flex-row '>
                {isSideBarActive ? <Sidebar></Sidebar> : ""}
                <div>this is delete page</div>
            </div>
        </div>
    )
}

export default Delete