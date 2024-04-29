'use client';
import Image from "next/image";
import {createApiCollaRepository} from "@/modules/colles/infrastructure/ApiCollaRepository";
import {CollesContextProvider, useCollesContext} from "@/app/sections/colles/CollesContext";
import {useSearchParams } from "next/navigation";
import {defaultLang, dictionary} from "@/content";
import {useEffect, useState} from "react";
import SidebarMenu from "@/app/sections/shared/SidebarMenu";
import stylesSidebar from "@/app/sections/shared/SidebarMenu.module.scss";
import {Suspense} from "react";
import {CollaPageHolder} from "@/app/sections/colles/colla/CollaPageHolder";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
}

function PageContent() {
    const searchParams = useSearchParams();
    const collaId = searchParams.get('collaId') || '';
    const lang = searchParams.get('lang') || defaultLang;
    const existingParams = getExistingParams(searchParams);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    const repository = createApiCollaRepository();

    return (
        <CollesContextProvider repository={repository}>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="flex justify-center items-center">
                    <Image src="/cercavila_logo.svg" alt="Logotip de Cercavila" className="}" width={80} height={80} />
                </div>
                <div className={stylesSidebar.sidebar}>
                    <button className={stylesSidebar.sidebarButton} onClick={toggleSidebar}>
                        <img src="/icons/icon-burger.svg" alt="Side bar" />
                    </button>
                    <SidebarMenu  isOpen={isSidebarOpen} onClose={toggleSidebar} lang={lang} otherParams={existingParams}/>
                </div>

                { collaId && <CollaPageHolder collaId={collaId} lang={lang}/> }
            </Suspense>
        </CollesContextProvider>
    )
}

function getExistingParams(searchParams) {
    let otherExistingParams = '';
    searchParams.forEach((value, key) => {
        if (key !== 'lang') {
            otherExistingParams += `${key}=${value}&`;
        }
    });
    return otherExistingParams.slice(0, -1); // Remove the last '&'
}