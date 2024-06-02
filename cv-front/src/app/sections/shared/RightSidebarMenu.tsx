import React, { Suspense, useEffect, useState, useRef } from 'react';
import { defaultLang, dictionary } from "@/content";
import styles from "./SidebarMenu.module.scss";
import { useSearchParams } from "next/navigation";
import UserCard from "@/app/sections/users/card/UserCard";
import { UsersContextProvider, useUsersContext } from "@/app/sections/users/UsersContext";
import { User } from "@/modules/users/domain/User";
import { createApiUserRepository } from "@/modules/users/infrastructure/ApiUserRepository";

interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
    lang: string;
}

export default function RightSidebarMenu({ isOpen, onClose, lang }: SidebarMenuProps) {
    const repository = createApiUserRepository();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UsersContextProvider repository={repository}>
                <RightSidebarMenuContent isOpen={isOpen} onClose={onClose} lang={lang} />
            </UsersContextProvider>
        </Suspense>
    );
}

function RightSidebarMenuContent({ isOpen, onClose, lang }: SidebarMenuProps) {
    const searchParams = useSearchParams();
    const existingParams = getExistingParams(searchParams);
    const { users } = useUsersContext();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => { if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {onClose();}};
        if (isOpen) {document.addEventListener('mousedown', handleClickOutside);}
        else {document.removeEventListener('mousedown', handleClickOutside);}

        return () => {document.removeEventListener('mousedown', handleClickOutside);};
    }, [isOpen, onClose]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername && users) {
            const user = users.find(user => user.nickname === storedUsername);
            setLoggedInUser(user || null);
        }
    }, [users]);

    const handleLogout = () => {
        localStorage.removeItem('username');
        setLoggedInUser(null);
        // Redirect to home page or perform other actions after logout
    };

    return (
        <div ref={sidebarRef} className={`${styles.rightSidebar} ${isOpen ? styles.open : ''}`}>
            <button className={styles.rightSidebarButton} onClick={onClose}>
                <img src="/icons/icon-cercatrivia-min.svg" alt="Events" />
            </button>
            <div className={styles.menuContainer}>
                <div className={styles.menu}>
                    {loggedInUser ? (
                        <div className={styles.userCardContainer}>
                            <UserCard user={loggedInUser} lang={lang} />
                            <button className={styles.sidebarActionButton} onClick={handleLogout}>{dictionary[lang]?.logoutButton}</button>
                        </div>
                    ) : (
                        <div className={styles.authButtonsContainer}>
                            <a className={styles.sidebarActionButton} href="/login.html">{dictionary[lang]?.loginButton}</a>
                            <a className={styles.sidebarActionButton} href="/register.html">{dictionary[lang]?.registerButton}</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function getExistingParams(searchParams) {
    let existingParams = '';
    searchParams.forEach((value, key) => {
        if (key !== 'lang') {
            existingParams += `${key}=${value}&`;
        }
    });
    return existingParams.slice(0, -1); // Remove the last '&'
}
