'use client';
import Image from "next/image";
import { createApiUserRepository } from "@/modules/users/infrastructure/ApiUserRepository";
import { UsersContextProvider, useUsersContext } from "@/app/sections/users/UsersContext";
import { useSearchParams } from "next/navigation";
import { defaultLang } from "@/content";
import { useEffect, useState } from "react";
import SidebarMenu from "@/app/sections/shared/SidebarMenu";
import stylesSidebar from "@/app/sections/shared/SidebarMenu.module.scss";
import { Suspense } from "react";
import { UserPageHolder } from "@/app/sections/users/user/UserPageHolder";
import {SimpleRegisterUserForm} from "@/app/sections/users/form/SimpleRegisterUserForm";

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

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    const repository = createApiUserRepository();

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
            </div>
            <div>
                {token && username ? (
                    <UserDetailsSection token={token} username={username} onLogout={handleLogout} lang={lang} />
                ) : (
                    <SimpleRegisterUserForm lang={lang} />
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
            <p>Success. Token: {token}</p>
            <button onClick={onLogout}>Logout</button>
            {user && <UserPageHolder userId={user.id} lang={lang} />}
        </div>
    );
}
