"use client";

import Image from "next/image";
import {createApiDigitalProductRepository} from "@/modules/digitalproducts/infrastructure/ApiDigitalProductRepository";
import {DigitalProductsContextProvider} from "@/app/sections/digitalproducts/DigitalProductsContext";
import {FilteredDigitalProductsList} from "@/app/sections/digitalproducts/list/FilteredDigitalProductsList";
import {CreateDigitalProductForm} from "@/app/sections/digitalproducts/form/CreateDigitalProductForm";
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
    const repository = createApiDigitalProductRepository();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    return (
        <DigitalProductsContextProvider repository={repository}>
            <div className="flex justify-center items-center">
                <Image src="/cercavila_logo.svg" alt="Logotip de Cercavila" className="}" width={80} height={80} />
            </div>
            <div className={stylesSidebar.sidebar}>
                <button className={stylesSidebar.sidebarButton} onClick={toggleSidebar}>
                    <img src="/icons/icon-burger.svg" alt="Side bar" />
                </button>
                <SidebarMenu  isOpen={isSidebarOpen} onClose={toggleSidebar} lang={lang}/>
            </div>

            <div className = "DigitalProducts">
                <h1 className={globalStyles.h1}>{dictionary[lang]?.cercavilaTitle}</h1>
                <FilteredDigitalProductsList lang={lang}/>
                <CreateDigitalProductForm lang={lang}/>
            </div>
        </DigitalProductsContextProvider>
    );
}