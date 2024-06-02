'use client';
import Image from "next/image";
import { createApiUserRepository } from "@/modules/users/infrastructure/ApiUserRepository";
import { UsersContextProvider, useUsersContext } from "@/app/sections/users/UsersContext";
import { useSearchParams } from "next/navigation";
import {defaultLang, dictionary} from "@/content";
import React, { useEffect, useState } from "react";
import SidebarMenu from "@/app/sections/shared/SidebarMenu";
import stylesSidebar from "@/app/sections/shared/SidebarMenu.module.scss";
import { Suspense } from "react";
import { UserPageHolder } from "@/app/sections/users/user/UserPageHolder";
import {SimpleRegisterUserForm} from "@/app/sections/users/form/SimpleRegisterUserForm";
import RightSidebarMenu from "@/app/sections/shared/RightSidebarMenu";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
}

function PageContent() {
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang') || defaultLang;
    const repository = createApiUserRepository();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    const toggleRightSidebar = () => { setIsRightSidebarOpen(!isRightSidebarOpen); };

    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    const handleLogin = (token: string, username: string) => {
        console.log("Logging in with token:", token);
        setToken(token);
        setUsername(username);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        console.log("Token and Username after login:", token, username);
        console.log(localStorage.getItem('token'), localStorage.getItem('username'));

        window.location.reload();
    };

    const handleLogout = () => {
        setToken(null);
        setUsername(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    const handleRegisterSuccess = (token: string, username: string) => {
        setToken(token);
        setUsername(username);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        window.location.reload();
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (storedToken) {
            setToken(storedToken);
            setUsername(storedUsername);
        }
    }, []);

    return (
        <UsersContextProvider repository={repository}>
            <div className="flex justify-center items-center">
                <Image src="/cercavila_logo.svg" alt="Logotip de Cercavila" className="}" width={80} height={80} />
            </div>
            <div className={stylesSidebar.sidebar}>
                <button className={stylesSidebar.sidebarButton} onClick={toggleSidebar}>
                    <img src="/icons/icon-burger.svg" alt="Side bar" />
                </button>
                <SidebarMenu isOpen={isSidebarOpen} onClose={toggleSidebar} lang={lang} />
                <RightSidebarMenu isOpen={isRightSidebarOpen} onClose={toggleRightSidebar} lang={lang}/>
            </div>
            <div>
                {token && username ? (
                    <UserDetailsSection token={token} username={username} onLogout={handleLogout} lang={lang} />
                ) : (
                    <SimpleRegisterUserForm lang={lang} onRegisterSuccess={handleRegisterSuccess} />
                )}
            </div>
        </UsersContextProvider>
    );
}

function UserDetailsSection({ token, username, onLogout, lang }) {
    const { users } = useUsersContext();
    const user = users.find((user) => user.nickname === username);

    return (
        <div>
            <h1>{dictionary[lang]?.cercavilaWelcome} {username}!</h1>
            {user && <UserPageHolder userId={user.id} lang={lang} />}
        </div>
    );
}