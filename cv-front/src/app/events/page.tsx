"use client";

import Image from "next/image";
import {createApiEventRepository} from "@/modules/events/infrastructure/ApiEventRepository";
import {EventsContextProvider} from "@/app/sections/events/EventsContext";
import {FilteredEventsList} from "@/app/sections/events/list/FilteredEventsList";
import {CreateEventForm} from "@/app/sections/events/form/CreateEventForm";
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
    const repository = createApiEventRepository();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    const toggleRightSidebar = () => { setIsRightSidebarOpen(!isRightSidebarOpen); };

    return (
        <EventsContextProvider repository={repository}>
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

            <div className = "Events">
                <h1 className={globalStyles.h1}>{dictionary[lang]?.cercavilaTitle}</h1>
                <FilteredEventsList lang={lang} />
                <CreateEventForm lang={lang}/>
            </div>
        </EventsContextProvider>
    );
}