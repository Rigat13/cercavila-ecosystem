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

export default function SidebarMenu({ isOpen, onClose, lang }: SidebarMenuProps) {
    const repository = createApiUserRepository();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UsersContextProvider repository={repository}>
                <SidebarMenuContent isOpen={isOpen} onClose={onClose} lang={lang} />
            </UsersContextProvider>
        </Suspense>
    );
}

function SidebarMenuContent({ isOpen, onClose, lang }: SidebarMenuProps) {
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
        <div ref={sidebarRef} className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <button className={styles.sidebarButtonWhite} onClick={onClose}>
                <img src="/icons/icon-burger-inverted.svg" alt="Side bar" />
            </button>
            <a href={lang === defaultLang ? "/" : `/?lang=${lang}`}>
                <button className={styles.homeButton}> <img src="/icons/icon-home.svg" alt="Inici" /> </button>
            </a>
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
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/" : `/?lang=${lang}`}>{dictionary[lang]?.cercavilaTitle}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/ccgm.html" : `/ccgm.html?lang=${lang}`}>{dictionary[lang]?.ccgmAcronym}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/colles.html" : `/colles.html?lang=${lang}`}>{dictionary[lang]?.collesTitle}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/figures.html" : `/figures.html?lang=${lang}`}>{dictionary[lang]?.figuresTitle}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/store.html" : `/store.html?lang=${lang}`}>{dictionary[lang]?.storeTitle}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/digitalproducts.html" : `/digitalproducts.html?lang=${lang}`}>{dictionary[lang]?.digitalProductsTitle}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/users.html" : `/users.html?lang=${lang}`}>{dictionary[lang]?.usersTitle}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/activities.html" : `/activities.html?lang=${lang}`}>{dictionary[lang]?.activitiesTitle}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/events.html" : `/events.html?lang=${lang}`}>{dictionary[lang]?.eventsTitle}</a>
                </div>
            </div>
            <div className={styles.languageSelector}>
                <button className={styles.languageButton}>{lang}</button>
                <div className={styles.dropdownContent}>
                    {lang !== defaultLang && <a href={`?${existingParams}&lang=ca`}>{defaultLang}</a>}
                    {lang !== 'en' && <a href={`?${existingParams}&lang=en`}>en</a>}
                    {lang !== 'es' && <a href={`?${existingParams}&lang=es`}>es</a>}
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
