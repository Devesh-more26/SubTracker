import React from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { Logo, Menu, Logout as LogoutIcon } from './Icons'

const Navbar = ({ isSideBarActive, setIsSideBarActive }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const Logout = (e) => {
        e.preventDefault();

        localStorage.removeItem('Token')
        navigate('/');
    }

    const isLanding = location.pathname === '/';

    return (
        <header className="sticky top-0 z-40 glass border-b border-slate-200/70">
            <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
                {/* Sidebar toggle — only meaningful on app pages */}
                {typeof setIsSideBarActive === 'function' && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsSideBarActive(!isSideBarActive);
                        }}
                        aria-label="Toggle sidebar"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 ring-1 ring-slate-200 bg-white/60 transition hover:bg-white hover:text-brand-700 cursor-pointer"
                    >
                        <Menu size={20} />
                    </button>
                )}

                {/* Brand */}
                <button
                    onClick={() => navigate('/Home')}
                    className="flex items-center gap-2.5 cursor-pointer"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl brand-gradient text-white shadow-lg shadow-brand-600/30">
                        <Logo size={20} />
                    </span>
                    <span className="text-lg font-extrabold tracking-tight text-slate-900">
                        Sub<span className="gradient-text">Tracker</span>
                    </span>
                </button>

                {/* Right actions */}
                <div className="ml-auto flex items-center gap-2 sm:gap-3">
                    {isLanding ? (
                        <>
                            <button className="btn-ghost" onClick={() => navigate('/login')}>Login</button>
                            <button className="btn-primary" onClick={() => navigate('/register')}>Register</button>
                        </>
                    ) : (
                        <button onClick={Logout} className="btn-ghost">
                            <LogoutIcon size={17} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar
