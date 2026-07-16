import React from 'react'
import {Route, useNavigate} from 'react-router'



const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-white h-[90vh] w-[200px] border-slate-700 border-r-1'>
            <ul className='flex flex-col justify-center'>
                <li
                    onClick={()=>navigate(`/Home`)}
                    className='cursor-pointer p-1 hover:bg-slate-300'
                >
                    Home</li>
                <hr />
                <li
                    onClick={()=>navigate(`/create`)}
                    className='cursor-pointer p-1 hover:bg-slate-300'
                >
                    Create</li>
                <hr />
                <li
                    onClick={()=>navigate(`/edit/:id`)}
                    className='cursor-pointer p-1 hover:bg-slate-300'
                >
                    Edit</li>
                <hr />
                <li
                    onClick={()=>navigate(`/delete/:id`)}
                    className='cursor-pointer p-1 hover:bg-slate-300'
                >
                    Delete</li>
                <hr />
            </ul>
        </div>
    )
}

export default Sidebar