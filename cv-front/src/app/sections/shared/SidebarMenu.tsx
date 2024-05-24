import React, { Suspense, useEffect, useState } from 'react';
import { defaultLang, dictionary } from "@/content";
import styles from "./SidebarMenu.module.scss";
import { useSearchParams } from "next/navigation";
import UserCard from "@/app/sections/users/card/UserCard";
import {UsersContextProvider, useUsersContext} from "@/app/sections/users/UsersContext";
import { User } from "@/modules/users/domain/User";
import {createApiUserRepository} from "@/modules/users/infrastructure/ApiUserRepository";

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

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername && users) {
            const user = users.find(user => user.nickname === storedUsername);
            setLoggedInUser(user || null);
        }
    }, [users]);

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <button className={styles.sidebarButton} onClick={onClose}>
                <img src="/icons/icon-burger-inverted.svg" alt="Side bar" />
            </button>

            <div className={styles.menuContainer}>
                {loggedInUser && (
                    <div className={styles.userCardContainer}>
                        <UserCard userId={loggedInUser.id} user={loggedInUser} />
                    </div>
                )}
                <div className={styles.menu}>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/" : `/?lang=${lang}`}>{dictionary[lang]?.cercavilaTitle}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/ccgm.html" : `/ccgm.html?lang=${lang}`}>{dictionary[lang]?.ccgmAcronym}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/colles.html" : `/colles.html?lang=${lang}`}>{dictionary[lang]?.collesTitle}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/figures.html" : `/figures.html?lang=${lang}`}>{dictionary[lang]?.figuresTitle}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/digitalproducts.html" : `/digitalproducts.html?lang=${lang}`}>{dictionary[lang]?.digitalProductsTitle}</a>
                    <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/users.html" : `/users.html?lang=${lang}`}>{dictionary[lang]?.usersTitle}</a>
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
