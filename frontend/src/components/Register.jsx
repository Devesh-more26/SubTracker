import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Logo, User, Mail, Lock, ArrowRight, Check } from './Icons'

const Register = () => {

    // const [form, setForm] = useState({ username: "", email: "", password: "" })
    const [username, setUsername]  = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState();
    const [successMsg, setSuccessMsg] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:8000/register/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setErrorMsg(data.message || 'Registration failed')
                return
            }

            setErrorMsg("")
            setSuccessMsg("Account created successfully! You can now sign in.")
        } catch (err) {
            setErrorMsg(err.message);
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* ---- Left: brand / marketing panel ---- */}
            <div className="relative hidden overflow-hidden grad-soft lg:flex lg:flex-col lg:justify-between p-12 text-slate-800">
                <div className="pointer-events-none absolute -top-24 -right-16 h-96 w-96 rounded-full bg-white/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-96 w-96 rounded-full bg-white/30 blur-3xl" />

                <button onClick={() => navigate('/')} className="relative flex items-center gap-2.5 cursor-pointer">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl brand-gradient text-white shadow-lg shadow-brand-700/20">
                        <Logo size={22} />
                    </span>
                    <span className="text-xl font-extrabold tracking-tight">SubTracker</span>
                </button>

                <div className="relative max-w-md">
                    <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
                        Start tracking in under two minutes.
                    </h2>
                    <p className="mt-4 text-slate-600">
                        Create your free account and bring every subscription you pay for into one calm, clear dashboard.
                    </p>
                    <ul className="mt-8 space-y-4">
                        {[
                            'Track unlimited subscriptions',
                            'Never miss a renewal date again',
                            'See exactly what you spend each month',
                            'Free forever — no card required',
                        ].map((t) => (
                            <li key={t} className="flex items-center gap-3">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full brand-gradient text-white">
                                    <Check size={14} />
                                </span>
                                <span className="text-sm font-medium text-slate-700">{t}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative text-sm text-slate-500">© {new Date().getFullYear()} SubTracker</p>
            </div>

            {/* ---- Right: form ---- */}
            <div className="flex items-center justify-center bg-slate-50 px-5 py-12 sm:px-8">
                <div className="w-full max-w-md animate-fade-up">
                    {/* mobile logo */}
                    <button onClick={() => navigate('/')} className="mb-8 flex items-center gap-2.5 lg:hidden cursor-pointer">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl brand-gradient text-white">
                            <Logo size={22} />
                        </span>
                        <span className="text-xl font-extrabold tracking-tight">
                            Sub<span className="gradient-text">Tracker</span>
                        </span>
                    </button>

                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Create your account</h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Already have one?{' '}
                        <button onClick={() => navigate('/login')} className="font-semibold text-brand-600 hover:text-brand-700 cursor-pointer">
                            Sign in
                        </button>
                    </p>

                    {successMsg && (
                        <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
                            <Check size={16} /> {successMsg}
                        </div>
                    )}
                    {errorMsg && (
                        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
                            {errorMsg}
                        </div>
                    )}

                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="label" htmlFor="username">Username</label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <User size={18} />
                                </span>
                                <input
                                    id="username"
                                    className="input pl-11"
                                    type="text"
                                    placeholder="Your name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label" htmlFor="email">Email address</label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Mail size={18} />
                                </span>
                                <input
                                    id="email"
                                    className="input pl-11"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label" htmlFor="password">Password</label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock size={18} />
                                </span>
                                <input
                                    id="password"
                                    className="input pl-11"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type='submit' className="btn-primary w-full py-3 text-base">
                            Create account <ArrowRight size={18} />
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-slate-400">
                        By creating an account you agree to SubTracker's Terms & Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
