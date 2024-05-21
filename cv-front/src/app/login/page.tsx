'use client';
import Image from "next/image";
import {createApiUserRepository} from "@/modules/users/infrastructure/ApiUserRepository";
import {UsersContextProvider, useUsersContext} from "@/app/sections/users/UsersContext";
import {useSearchParams } from "next/navigation";
import {defaultLang, dictionary} from "@/content";
import {useEffect, useState} from "react";
import SidebarMenu from "@/app/sections/shared/SidebarMenu";
import stylesSidebar from "@/app/sections/shared/SidebarMenu.module.scss";
import {Suspense} from "react";
import {UserPageHolder} from "@/app/sections/users/user/UserPageHolder";
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
        setToken(token);
        localStorage.setItem('token', token); // Optionally store it in local storage
    };

    return (
        <UsersContextProvider repository={repository}>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="flex justify-center items-center">
                    <Image src="/cercavila_logo.svg" alt="Logotip de Cercavila" className="}" width={80} height={80} />
                </div>
                <div className={stylesSidebar.sidebar}>
                    <button className={stylesSidebar.sidebarButton} onClick={toggleSidebar}>
                        <img src="/icons/icon-burger.svg" alt="Side bar" />
                    </button>
                    <SidebarMenu  isOpen={isSidebarOpen} onClose={toggleSidebar} lang={lang}/>
                </div>

                <div>
                    {token ? <UserProfile token={token} /> : <Login onLogin={handleLogin} />}
                </div>
            </Suspense>
        </UsersContextProvider>
    )
}
