import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Header() {

    const [user, setUser] = useState({});

    const [cookies, setCookie] = useCookies(['S_User'], { path: '/' });

    useEffect(() => {
        if (!cookies.S_User) {
            window.location.href = "/"
        }

        setUser(cookies.S_User);
    }, [])

    return (user) ? (
        <div className="mb-8 shadow py-6">
            <div className="text-lg flex items-center justify-between mx-auto max-w-screen-lg lg:max-w-screen-xl w-full">
                <div className="text-gray-700">
                    Welcome, <span className="font-bold text-gray-800">{user?.S_Name || ""}</span>
                </div>
                <div className="tracking-wide flex items-center text-sm gap-6 uppercase">
                    <a className="text-gray-700 hover:text-gray-900" href="/seller/dashboard">Dashboard</a>
                    <a className="text-gray-700 hover:text-gray-900" href="/seller/account">Account</a>
                    <a href="/signout" className="rounded px-4 py-2 bg-red-500 text-white hover:bg-red-700 font-normal">Signout</a>
                </div>
            </div>
        </div>
    ) : <></>
}
