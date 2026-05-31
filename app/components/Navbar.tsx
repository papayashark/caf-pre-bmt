"use client";

import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

interface navbarProps {
    title: string;
}

export default function Navbar({ title }: navbarProps) {
    // This hook automatically checks if the user is logged in
    const { data: session, status } = useSession();

    return (
        <nav className="w-full bg-gray-900 text-white shadow-lg sticky top-0 z-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 transition-all">

            {/* LOGO SESTAVA */}
            <div className="flex flex-col items-center sm:items-start">
                <span className="text-2xl font-extrabold text-red-500 tracking-wider">
                    <Link href="/">
                        CAF PRE-BMT
                    </Link>
                </span>
                {/* Pokud je title prázdný, nezabere zbytečné místo */}
                {title && (
                    <p className="text-sm text-gray-400 font-medium mt-0.5">{title}</p>
                )}
            </div>

            {/* ODKAZY A TLAČÍTKA */}
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-x-6 gap-y-4 font-medium text-gray-300">

                <div className="hover:text-orange-500 cursor-pointer transition-colors">
                    <Link href="#about">
                        About
                    </Link>
                </div>

                <div>
                    <Link href="/training" className="hover:text-orange-500 transition-colors">
                        Training plans
                    </Link>
                </div>

                {/* --- SMART AUTHENTICATION LOGIC --- */}
                {status === "loading" ? (
                    // 1. Loading state (prevents UI flashing while checking session)
                    <div className="w-20 h-10 bg-gray-800 animate-pulse rounded-xl"></div>
                ) : session ? (
                    // 2. LOGGED IN STATE
                    <div className="flex items-center gap-4">
                        {/* Show user's name if they have one, otherwise default to Soldier */}
                        <span className="text-sm text-gray-400 hidden sm:block">
                            Welcome, {session.user?.name || "Soldier"}
                        </span>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        >
                            Log Out
                        </button>
                    </div>
                ) : (
                    // 3. LOGGED OUT STATE
                    <div>
                        <Link href="/login">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                                Log In
                            </button>
                        </Link>
                    </div>
                )}

            </div>
        </nav>
    );
}