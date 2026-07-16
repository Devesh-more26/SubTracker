import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Logo, Mail, Lock, ArrowRight, Wallet, Bell, Chart } from './Icons'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }
                ),
            })

            const data = await response.json()
            if (response.ok){
                localStorage.setItem('Token', JSON.stringify(data));
                navigate('/home');
            }
            console.log(data);

        } catch (err) {
            console.log(err);
            setError(err.message);
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
                        Welcome back to calmer spending.
                    </h2>
                    <p className="mt-4 text-slate-600">
                        Log in to see every subscription, upcoming renewal and your monthly total — all in one place.
                    </p>
                    <ul className="mt-8 space-y-4">
                        {[
                            { icon: Wallet, text: 'All your subscriptions in one dashboard' },
                            { icon: Bell, text: 'Renewal reminders so nothing surprises you' },
                            { icon: Chart, text: 'A clear view of your monthly spend' },
                        ].map((f) => (
                            <li key={f.text} className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 text-brand-700 shadow-sm">
                                    <f.icon size={18} />
                                </span>
                                <span className="text-sm font-medium text-slate-700">{f.text}</span>
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

                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Sign in</h1>
                    <p className="mt-2 text-sm text-slate-500">
                        New here?{' '}
                        <button onClick={() => navigate('/register')} className="font-semibold text-brand-600 hover:text-brand-700 cursor-pointer">
                            Create an account
                        </button>
                    </p>

                    {error && (
                        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
                            {error}
                        </div>
                    )}

                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
                            <div className="flex items-center justify-between">
                                <label className="label" htmlFor="password">Password</label>
                                <span className="mb-1.5 text-xs font-medium text-slate-400">Forgot?</span>
                            </div>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock size={18} />
                                </span>
                                <input
                                    id="password"
                                    className="input pl-11"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full py-3 text-base">
                            Sign in <ArrowRight size={18} />
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-slate-400">
                        By continuing you agree to SubTracker's Terms & Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
