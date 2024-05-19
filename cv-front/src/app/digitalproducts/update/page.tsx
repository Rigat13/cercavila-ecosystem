'use client';
import Image from "next/image";
import {createApiDigitalProductRepository} from "@/modules/digitalproducts/infrastructure/ApiDigitalProductRepository";
import {DigitalProductsContextProvider} from "@/app/sections/digitalproducts/DigitalProductsContext";
import {UpdateDigitalProductForm} from "@/app/sections/digitalproducts/update-form/UpdateDigitalProductForm";
import {useSearchParams } from "next/navigation";
import {defaultLang, dictionary} from "@/content";
import styles from "@/app/sections/digitalproducts/list/FilteredDigitalProductsList.module.scss";
import {useState} from "react";
import SidebarMenu from "@/app/sections/shared/SidebarMenu";
import stylesSidebar from "@/app/sections/shared/SidebarMenu.module.scss";
import {Suspense} from "react";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
}

function PageContent() {
    const searchParams = useSearchParams();
    const digitalProductId = searchParams.get('digitalProductId') || '';
    const lang = searchParams.get('lang') || defaultLang;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    const repository = createApiDigitalProductRepository();

    return (
        <DigitalProductsContextProvider repository={repository}>
            <Suspense fallback={<div>Loading...</div>}>
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
                <h1 className={styles.h1}>{dictionary[lang]?.cercavilaTitle}</h1>
                <UpdateDigitalProductForm digitalProductId={digitalProductId} lang={lang}/>
            </div>
                </Suspense>
        </DigitalProductsContextProvider>
    )
}