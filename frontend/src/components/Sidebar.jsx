import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Home, Plus, Pencil, Trash } from './Icons'

const links = [
    { label: 'Home', icon: Home, path: '/Home', match: '/home' },
    { label: 'Create', icon: Plus, path: '/create', match: '/create' },
    { label: 'Edit', icon: Pencil, path: '/edit/:id', match: '/edit' },
    { label: 'Delete', icon: Trash, path: '/delete/:id', match: '/delete' },
]

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside className="w-64 shrink-0 border-r border-slate-200/70 bg-white/70 backdrop-blur">
            <nav className="flex flex-col gap-1 p-4">
                <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Menu
                </p>
                {links.map((l) => {
                    const active = location.pathname.toLowerCase().startsWith(l.match);
                    return (
                        <button
                            key={l.label}
                            onClick={() => navigate(l.path)}
                            className={
                                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition cursor-pointer ' +
                                (active
                                    ? 'brand-gradient text-white shadow-md shadow-brand-600/25'
                                    : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700')
                            }
                        >
                            <span
                                className={
                                    'flex h-8 w-8 items-center justify-center rounded-lg transition ' +
                                    (active ? 'bg-white/20' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-brand-600')
                                }
                            >
                                <l.icon size={17} />
                            </span>
                            {l.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    )
}

export default Sidebar
