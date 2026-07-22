import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Wallet, Chart, Users, Plus, Calendar, Bell, Pencil, Trash } from "./Icons";

// Small helpers — purely presentational formatting of the fetched data.
const money = (n) => {
  const v = Number(n);
  return isNaN(v)
    ? "$0.00"
    : "$" +
    v.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
};
const initial = (name) =>
  name && name.trim() ? name.trim()[0].toUpperCase() : "?";
const swatch = (name) => {
  // Palette-family tones, kept medium so the white initial stays readable.
  const colors = [
    "#3480bd",
    "#4593ce",
    "#5aa0d0",
    "#e0a24a",
    "#d98a5a",
    "#6fa98c",
    "#5c7fb0",
  ];
  let h = 0;
  for (const c of name || "") h = (h * 31 + c.charCodeAt(0)) % colors.length;
  return colors[h];
};

const Home = () => {
  // console.log("home page rendered!");
  const navigate = useNavigate();
  const [isSideBarActive, setIsSideBarActive] = useState(false);

  const [subscription, setSubscription] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    const GetSubscription = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/subscription/");

        if (!response.ok) {
          throw new Error(`HTTP error! Status : ${response.status}`);
        }

        const data = await response.json();

        setSubscription(data);

        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    GetSubscription();
    // console.log("printing again", subscription);
  }, []);

  const totalSpend = subscription.reduce(
    (sum, s) => sum + (Number(s.price) || 0),
    0,
  );
  const totalUsers = subscription.reduce(
    (sum, s) => sum + (Number(s.number_of_user) || 0),
    0,
  );

  const stats = [
    {
      label: "Monthly spend",
      value: money(totalSpend),
      icon: Wallet,
      tint: "text-brand-700 bg-brand-100",
    },
    {
      label: "Active subscriptions",
      value: subscription.length,
      icon: Chart,
      tint: "text-amber-700 bg-amber-50",
    },
    {
      label: "Total seats",
      value: totalUsers,
      icon: Users,
      tint: "text-sky-700 bg-sky-50",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col mesh-bg">
      <Navbar
        isSideBarActive={isSideBarActive}
        setIsSideBarActive={setIsSideBarActive}
      />

      <div className="flex flex-1">
        {isSideBarActive && <Sidebar />}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Header row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                An overview of everything you're subscribed to.
              </p>
            </div>
            <button
              onClick={() => navigate("/create")}
              className="btn-primary w-full sm:w-auto"
            >
              <Plus size={18} /> Add subscription
            </button>
          </div>

          {/* Stat cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="card flex items-center gap-4 p-5">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.tint}`}
                >
                  <s.icon size={22} />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {s.label}
                  </p>
                  <p className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {s.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Subscriptions panel */}
          <div className="card mt-6 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 className="text-base font-bold text-slate-900">
                Your subscriptions
              </h2>
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                {subscription.length} total
              </span>
            </div>

            {/* Loading */}
            {loading && (
              <div className="p-5 space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                      <div className="h-3 w-1/4 animate-pulse rounded bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="m-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
                Couldn't load subscriptions: {error}
              </div>
            )}

            {/* Empty */}
            {!loading && !error && subscription.length === 0 && (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Wallet size={26} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  No subscriptions yet
                </h3>
                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  Add your first subscription to start tracking your recurring
                  spend.
                </p>
                <button
                  onClick={() => navigate("/create")}
                  className="btn-primary mt-6"
                >
                  <Plus size={18} /> Add subscription
                </button>
              </div>
            )}

            {/* Data — desktop table */}
            {!loading && !error && subscription.length > 0 && (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Price</th>
                        <th className="px-5 py-3">Start date</th>
                        <th className="px-5 py-3">Expiry date</th>
                        <th className="px-5 py-3 text-right">Users</th>
                        <th className="px-5 py-3 text-right">Edit</th>
                        <th className="px-5 py-3 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {subscription.map((s) => (
                        <tr key={s.id} className="transition hover:bg-slate-50">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <span
                                className="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold text-white"
                                style={{ background: swatch(s.name) }}
                              >
                                {initial(s.name)}
                              </span>
                              <span className="font-semibold text-slate-800">
                                {s.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 font-semibold text-slate-800">
                            {money(s.price)}
                          </td>
                          <td className="px-5 py-3.5 text-slate-500">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar size={14} className="text-slate-400" />{" "}
                              {s.subscrib_at || "—"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-slate-500">
                            <span className="inline-flex items-center gap-1.5">
                              <Bell size={14} className="text-slate-400" />{" "}
                              {s.expire_at || "—"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                              <Users size={12} /> {s.number_of_user}
                            </span>
                          </td>
                          <td
                            onClick={(e) => {
                              navigate(`/edit/${s.id}`)
                            }}
                            className="px-5 py-3.5 text-right">
                            <Pencil className="inline-flex items-center cursor-pointer" />
                          </td>
                          <td
                            onClick={() => {
                              navigate(`/delete/${s.id}`)
                            }}
                            className="px-5 py-3.5 text-right">
                            <Trash className="inline-flex items-center cursor-pointer" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Data — mobile cards */}
                <div className="divide-y divide-slate-100 md:hidden">
                  {subscription.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-3 p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                          style={{ background: swatch(s.name) }}
                        >
                          {initial(s.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-800">
                            {s.name}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                            <Bell size={12} /> Expires {s.expire_at || "—"}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                            <Users size={12} /> {s.number_of_user} users
                          </p>
                        </div>
                      </div>
                      <p className="shrink-0 font-bold text-slate-800">
                        {money(s.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
