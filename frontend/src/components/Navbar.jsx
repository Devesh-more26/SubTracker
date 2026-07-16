import React from 'react'
import Sidebar from './Sidebar'
import Login from './Login'
import Register from './Register'
import {useLocation} from 'react-router'
import { useNavigate } from 'react-router'


const Navbar = ({ isSideBarActive, setIsSideBarActive }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const Logout = (e) => {
        e.preventDefault();

        localStorage.removeItem('Token')
        navigate('/');
    }

    return (
        <div>
            <div className='shadow-xl/20 rounded-tl-lg rounded-tr-lg shadow-3xl flex items-center w-full h-15 bg-gradient-to-br from-blue-400 via-blue-450 via-blue-500 via-blue-550 to-blue-600'>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsSideBarActive(!isSideBarActive);
                    }}
                    className='text-white m-8 cursor-pointer'>
                    <span className="material-symbols-outlined">menu</span>
                </button>

                <h1 className='text-center text-3xl text-slate-50 w-auto h-auto'>SubTracker</h1>

                <div className='w-[50%]'>
                    {location.pathname === '/' ? (
                        <div className='flex justify-evenly'>
                        <button
                            className='p-2 rounded-2xl px-[8%] bg-gradient-to-br from-blue-600 via-blue-650 to-blue-700 text-white hover:cursor-pointer '
                            onClick={() => {
                                navigate('/login')
                            }}
                        >Login</button>
                        <button
                            className='p-2 rounded-2xl px-[8%] bg-gradient-to-br from-blue-600 via-blue-650 to-blue-700 text-white hover:cursor-pointer'
                            onClick={() => {
                                navigate('/register')
                            }}
                        >Register</button>
                    </div>
                    ) : (
                        <button 
                            className=''
                            onClick={Logout}
                        >
                            logout
                        </button>
                    )}
                    
                </div>

            </div>


        </div>

    )
}

export default Navbar