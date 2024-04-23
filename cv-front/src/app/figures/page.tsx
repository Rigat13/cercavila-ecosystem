"use client";

import Image from "next/image";
import {createApiFiguraRepository} from "@/modules/figures/infrastructure/ApiFiguraRepository";
import {FiguresContextProvider} from "@/app/sections/figures/FiguresContext";
import {FiguresList} from "@/app/sections/figures/list/FiguresList";
import {CreateFiguraForm} from "@/app/sections/figures/form/CreateFiguraForm";
import {defaultLang, dictionary} from "@/content";
import {useSearchParams } from "next/navigation";
import {useState} from "react";
import SidebarMenu from "@/app/sections/shared/SidebarMenu";
import stylesSidebar from "@/app/sections/shared/SidebarMenu.module.scss";
import globalStyles from "@/app/globalStyles.module.scss";
import { Suspense } from 'react';

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
    const repository = createApiFiguraRepository();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    return (
        <FiguresContextProvider repository={repository}>
            <div className="flex justify-center items-center">
                <Image src="/cercavila_logo.svg" alt="Logotip de Cercavila" className="}" width={80} height={80} />
            </div>
            <div className={stylesSidebar.sidebar}>
                <button className={stylesSidebar.sidebarButton} onClick={toggleSidebar}>
                    <img src="/icons/icon-burger.svg" alt="Side bar" />
                </button>
                <SidebarMenu  isOpen={isSidebarOpen} onClose={toggleSidebar} lang={lang}/>
            </div>

            <div className = "Figures">
                <h1 className={globalStyles.h1}>{dictionary[lang]?.cercavilaTitle}</h1>
                <FiguresList lang={lang}/>
                <CreateFiguraForm lang={lang}/>
            </div>
        </FiguresContextProvider>
    );
}