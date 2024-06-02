import React, { Suspense, useEffect, useState, useRef } from 'react';
import { defaultLang, dictionary } from "@/content";
import styles from "./SidebarMenu.module.scss";
import { useSearchParams } from "next/navigation";
import UserCard from "@/app/sections/users/card/UserCard";
import { UsersContextProvider, useUsersContext } from "@/app/sections/users/UsersContext";
import { User } from "@/modules/users/domain/User";
import { createApiUserRepository } from "@/modules/users/infrastructure/ApiUserRepository";
import {EventCard} from "@/app/sections/events/card/EventCard";
import {EventsContextProvider, useEventsContext} from "@/app/sections/events/EventsContext";
import {createApiEventRepository} from "@/modules/events/infrastructure/ApiEventRepository";

interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
    lang: string;
}

export default function RightSidebarMenu({ isOpen, onClose, lang }: SidebarMenuProps) {
    const repository = createApiEventRepository();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EventsContextProvider repository={repository}>
                <RightSidebarMenuContent isOpen={isOpen} onClose={onClose} lang={lang} />
            </EventsContextProvider>
        </Suspense>
    );
}

function RightSidebarMenuContent({ isOpen, onClose, lang }: SidebarMenuProps) {
    const searchParams = useSearchParams();
    const existingParams = getExistingParams(searchParams);
    const { users } = useEventsContext();
    const { events } = useEventsContext();

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
                <img src="/icons/icon-cercampionat-min.svg" alt="Events" />
            </button>
            <div className={styles.rightMenuContainer}>
                <div className={styles.rightMenu}>
                    {events && events.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            lang={lang}
                        />
                    ))}
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
