import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Logo,
  Menu,
  Close,
  Bell,
  Wallet,
  Chart,
  Shield,
  Sync,
  Users,
  Sparkle,
  Check,
  ArrowRight,
  Star,
  Calendar,
} from './Icons'

const features = [
  {
    icon: Wallet,
    title: 'All subscriptions, one view',
    desc: 'Netflix, Spotify, SaaS tools, gym memberships — track every recurring payment in a single clean dashboard.',
  },
  {
    icon: Bell,
    title: 'Never miss a renewal',
    desc: 'See exactly when each plan renews or expires so surprise charges become a thing of the past.',
  },
  {
    icon: Chart,
    title: 'Understand your spend',
    desc: 'Know your monthly total at a glance and spot the subscriptions quietly draining your wallet.',
  },
  {
    icon: Users,
    title: 'Built for teams too',
    desc: 'Track seats and per-user costs, perfect for families and small teams sharing plans.',
  },
  {
    icon: Sync,
    title: 'Fast & always in sync',
    desc: 'Add, edit and remove subscriptions instantly. Your list is always up to date.',
  },
  {
    icon: Shield,
    title: 'Private by design',
    desc: 'Your data stays yours. Secure accounts keep your subscription details protected.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Create your account',
    desc: 'Sign up in seconds — all you need is an email and a password.',
  },
  {
    n: '02',
    title: 'Add your subscriptions',
    desc: 'Enter each plan with its price, renewal date and number of users.',
  },
  {
    n: '03',
    title: 'Stay in control',
    desc: 'Watch your spend, track renewals and cancel what you no longer need.',
  },
]

const Landing = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (path) => {
    setMenuOpen(false)
    navigate(path)
  }

  return (
    <div className="min-h-screen mesh-bg text-slate-900">
      {/* ---------------- Header ---------------- */}
      <header className="sticky top-0 z-50">
        <div className="glass border-b border-white/40">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
            <button
              onClick={() => go('/')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl brand-gradient text-white shadow-lg shadow-brand-600/30">
                <Logo size={20} />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                Sub<span className="gradient-text">Tracker</span>
              </span>
            </button>

            <div className="hidden items-center gap-8 md:flex">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-brand-700 transition">Features</a>
              <a href="#how" className="text-sm font-medium text-slate-600 hover:text-brand-700 transition">How it works</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-brand-700 transition">Pricing</a>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <button onClick={() => go('/login')} className="btn-ghost">Login</button>
              <button onClick={() => go('/register')} className="btn-primary">
                Get started <ArrowRight width={16} height={16} />
              </button>
            </div>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-slate-200 bg-white/60 text-slate-700 md:hidden cursor-pointer"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <Close /> : <Menu />}
            </button>
          </nav>

          {/* mobile menu */}
          {menuOpen && (
            <div className="border-t border-white/40 px-5 py-4 md:hidden">
              <div className="flex flex-col gap-1">
                <a onClick={() => setMenuOpen(false)} href="#features" className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50">Features</a>
                <a onClick={() => setMenuOpen(false)} href="#how" className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50">How it works</a>
                <a onClick={() => setMenuOpen(false)} href="#pricing" className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50">Pricing</a>
                <div className="mt-2 flex flex-col gap-2">
                  <button onClick={() => go('/login')} className="btn-ghost w-full">Login</button>
                  <button onClick={() => go('/register')} className="btn-primary w-full">Get started</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        {/* decorative blobs — palette warm + cool */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sand-100/80 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute top-10 right-0 h-96 w-96 rounded-full bg-brand-200/60 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sand-200/70 blur-3xl animate-blob" style={{ animationDelay: '6s' }} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-200 backdrop-blur">
              <Sparkle width={14} height={14} /> Take control of recurring spend
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Every subscription,{' '}
              <span className="gradient-text">under control.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
              SubTracker gives you one calm dashboard for every plan you pay for —
              so you always know what renews, what it costs, and what to cancel.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <button onClick={() => go('/register')} className="btn-primary w-full px-7 py-3.5 text-base sm:w-auto">
                Start tracking free <ArrowRight width={18} height={18} />
              </button>
              <button onClick={() => go('/login')} className="btn-ghost w-full px-7 py-3.5 text-base sm:w-auto">
                I already have an account
              </button>
            </div>
            <div className="mt-8 flex flex-col items-center gap-4 text-sm text-slate-500 sm:flex-row lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['#8cc0eb', '#bfddf0', '#ffebcc', '#fff9d2'].map((c) => (
                    <span key={c} className="h-7 w-7 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />
                  ))}
                </div>
                <span>Loved by mindful spenders</span>
              </div>
              <div className="hidden h-4 w-px bg-slate-300 sm:block" />
              <div className="flex items-center gap-1 text-amber-500">
                {[0, 1, 2, 3, 4].map((i) => (<Star key={i} width={15} height={15} />))}
                <span className="ml-1 text-slate-500">4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Hero visual — a mock dashboard card */}
          <div className="animate-fade-up [animation-delay:120ms]">
            <div className="relative mx-auto max-w-md">
              <div className="animate-float rounded-3xl bg-white p-5 shadow-2xl shadow-brand-900/10 ring-1 ring-slate-200/70">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Monthly spend</p>
                    <p className="text-3xl font-extrabold tracking-tight text-slate-900">$84.97</p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Wallet />
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    { name: 'Netflix', price: '$15.49', color: '#e50914', tag: 'Renews Jul 28', letter: 'N' },
                    { name: 'Spotify', price: '$9.99', color: '#1db954', tag: 'Renews Aug 02', letter: 'S' },
                    { name: 'Figma', price: '$12.00', color: '#a259ff', tag: 'Renews Aug 11', letter: 'F' },
                  ].map((s) => (
                    <div key={s.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ background: s.color }}>
                          {s.letter}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                          <p className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar width={12} height={12} /> {s.tag}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{s.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* floating badge */}
              <div className="absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-slate-200/70 sm:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Bell width={18} height={18} />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-800">Renewal soon</p>
                  <p className="text-[11px] text-slate-400">Netflix in 3 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Stats strip ---------------- */}
      <section className="border-y border-slate-200/70 bg-white/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 sm:px-8 md:grid-cols-4">
          {[
            { k: '12+', v: 'Subscriptions tracked on average' },
            { k: '$240', v: 'Saved per year, on average' },
            { k: '0', v: 'Surprise renewals missed' },
            { k: '2 min', v: 'To set everything up' },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <p className="text-3xl font-extrabold tracking-tight gradient-text sm:text-4xl">{s.k}</p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section id="features" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Features</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything you need to tame your subscriptions
          </h2>
          <p className="mt-4 text-slate-600">
            Thoughtfully simple tools that turn a messy pile of recurring charges into a clear, calm overview.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:brand-gradient group-hover:text-white">
                <f.icon width={22} height={22} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section id="how" className="bg-white/60 border-y border-slate-200/70">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-600">How it works</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Up and running in three steps
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative text-center md:text-left">
                <span className="text-5xl font-black text-brand-100">{s.n}</span>
                <h3 className="mt-2 text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Pricing ---------------- */}
      <section id="pricing" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Pricing</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Simple, honest pricing</h2>
          <p className="mt-4 text-slate-600">Start free. Upgrade only when you want more.</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="card p-8">
            <h3 className="text-lg font-bold text-slate-900">Free</h3>
            <p className="mt-2 text-sm text-slate-500">For getting a handle on your subscriptions.</p>
            <p className="mt-6 text-4xl font-extrabold tracking-tight">$0<span className="text-base font-medium text-slate-400">/mo</span></p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {['Track unlimited subscriptions', 'Renewal & expiry dates', 'Monthly spend overview'].map((i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-brand-600"><Check width={13} height={13} /></span>
                  {i}
                </li>
              ))}
            </ul>
            <button onClick={() => go('/register')} className="btn-outline mt-8 w-full">Get started</button>
          </div>

          <div className="relative card overflow-hidden p-8 ring-2 ring-brand-500">
            <span className="absolute right-5 top-5 rounded-full brand-gradient px-3 py-1 text-xs font-bold text-white">Popular</span>
            <h3 className="text-lg font-bold text-slate-900">Pro</h3>
            <p className="mt-2 text-sm text-slate-500">For power users and small teams.</p>
            <p className="mt-6 text-4xl font-extrabold tracking-tight">$5<span className="text-base font-medium text-slate-400">/mo</span></p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {['Everything in Free', 'Team & per-user tracking', 'Renewal reminders', 'Spend insights & trends'].map((i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full brand-gradient text-white"><Check width={13} height={13} /></span>
                  {i}
                </li>
              ))}
            </ul>
            <button onClick={() => go('/register')} className="btn-primary mt-8 w-full">Start Pro trial</button>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl grad-soft px-6 py-16 text-center shadow-2xl shadow-brand-900/10 ring-1 ring-white/60 sm:px-12">
          <div className="pointer-events-none absolute -top-16 -right-10 h-64 w-64 rounded-full bg-white/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-white/30 blur-2xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
              Ready to stop overpaying?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Join SubTracker today and take the guesswork out of your recurring spend.
            </p>
            <button
              onClick={() => go('/register')}
              className="btn-primary mt-8 px-7 py-3.5 text-base"
            >
              Create your free account <ArrowRight width={18} height={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-slate-200/70 bg-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
          <button onClick={() => go('/')} className="flex items-center gap-2.5 cursor-pointer">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg brand-gradient text-white">
              <Logo size={18} />
            </span>
            <span className="font-extrabold tracking-tight">
              Sub<span className="gradient-text">Tracker</span>
            </span>
          </button>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} SubTracker. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#features" className="hover:text-brand-700 transition">Features</a>
            <a href="#pricing" className="hover:text-brand-700 transition">Pricing</a>
            <button onClick={() => go('/login')} className="hover:text-brand-700 transition cursor-pointer">Login</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
