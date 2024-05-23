'use client';
import Image from "next/image";
import { createApiUserRepository } from "@/modules/users/infrastructure/ApiUserRepository";
import { UsersContextProvider, useUsersContext } from "@/app/sections/users/UsersContext";
import { useSearchParams } from "next/navigation";
import { defaultLang, dictionary } from "@/content";
import { useEffect, useState } from "react";
import SidebarMenu from "@/app/sections/shared/SidebarMenu";
import stylesSidebar from "@/app/sections/shared/SidebarMenu.module.scss";
import { Suspense } from "react";
import { UserPageHolder } from "@/app/sections/users/user/UserPageHolder";
import UserProfile from "@/app/sections/login/UserProfile";
import Login from "@/app/sections/login/Login";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
}

function PageContent() {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId') || '';
    const lang = searchParams.get('lang') || defaultLang;

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    const repository = createApiUserRepository();

    const [token, setToken] = useState<string | null>(null);

    const handleLogin = (token: string) => {
        console.log("Logging in with token:", token);
        setToken(token);
        localStorage.setItem('token', token); // Optionally store it in local storage
        console.log("Token state after login:", token);
        console.log(localStorage.getItem('token'));
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                {token ? (
                    <div>
                        <p>Success. Token: {token}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </div>
        </Suspense>
    );
}
