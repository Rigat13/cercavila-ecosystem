"use client";

import Image from "next/image";
import {createApiUserRepository} from "@/modules/users/infrastructure/ApiUserRepository";
import {UsersContextProvider} from "@/app/sections/users/UsersContext";
import {FilteredUsersList} from "@/app/sections/users/list/FilteredUsersList";
import {CreateUserForm} from "@/app/sections/users/form/CreateUserForm";
import {defaultLang, dictionary} from "@/content";
import {useSearchParams } from "next/navigation";
import React, {useState} from "react";
import SidebarMenu from "@/app/sections/shared/SidebarMenu";
import stylesSidebar from "@/app/sections/shared/SidebarMenu.module.scss";
import globalStyles from "@/app/globalStyles.module.scss";
import { Suspense } from 'react';
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

    return (
        <UsersContextProvider repository={repository}>
            <div className={stylesSidebar.centralLogo}>
                <a href={lang === defaultLang ? "/" : `/?lang=${lang}`}>
                    <Image src="/cercavila_logo.svg" alt="Logotip de Cercavila" className="}" width={80} height={80} />
                </a>
            </div>
            <div className={stylesSidebar.sidebar}>
                <button className={stylesSidebar.sidebarButton} onClick={toggleSidebar}>
                    <img src="/icons/icon-burger.svg" alt="Side bar" />
                </button>
                <SidebarMenu  isOpen={isSidebarOpen} onClose={toggleSidebar} lang={lang}/>
                <RightSidebarMenu isOpen={isRightSidebarOpen} onClose={toggleRightSidebar} lang={lang}/>
            </div>

            <div className = "Users">
                <h1 className={globalStyles.h1}>{dictionary[lang]?.cercavilaTitle}</h1>
                <FilteredUsersList lang={lang}/>
                <CreateUserForm lang={lang}/>
            </div>
        </UsersContextProvider>
    );
}