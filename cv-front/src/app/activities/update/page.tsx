'use client';
import Image from "next/image";
import {createApiActivityRepository} from "@/modules/activities/infrastructure/ApiActivityRepository";
import {ActivitiesContextProvider} from "@/app/sections/activities/ActivitiesContext";
import {UpdateActivityForm} from "@/app/sections/activities/update-form/UpdateActivityForm";
import {useSearchParams } from "next/navigation";
import {defaultLang, dictionary} from "@/content";
import styles from "@/app/sections/activities/list/ActivitiesList.module.scss";
import React, {useState} from "react";
import SidebarMenu from "@/app/sections/shared/SidebarMenu";
import stylesSidebar from "@/app/sections/shared/SidebarMenu.module.scss";
import {Suspense} from "react";
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
    const activityId = searchParams.get('activityId') || '';
    const lang = searchParams.get('lang') || defaultLang;
    const repository = createApiActivityRepository();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    const toggleRightSidebar = () => { setIsRightSidebarOpen(!isRightSidebarOpen); };

    return (
        <ActivitiesContextProvider repository={repository}>
            <Suspense fallback={<div>Loading...</div>}>
            <div className="flex justify-center items-center">
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

            <div className = "Activities">
                <h1 className={styles.h1}>{dictionary[lang]?.cercavilaTitle}</h1>
                <UpdateActivityForm activityId={activityId} lang={lang}/>
            </div>
                </Suspense>
        </ActivitiesContextProvider>
    )
}