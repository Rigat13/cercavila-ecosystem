'use client';
import Image from "next/image";
import {createApiUserRepository} from "@/modules/users/infrastructure/ApiUserRepository";
import {UsersContextProvider} from "@/app/sections/users/UsersContext";
import {UpdateUserForm} from "@/app/sections/users/update-form/UpdateUserForm";
import {useSearchParams } from "next/navigation";
import {defaultLang, dictionary} from "@/content";
import styles from "@/app/sections/users/list/UsersList.module.scss";
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
    const userId = searchParams.get('userId') || '';
    const lang = searchParams.get('lang') || defaultLang;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    const repository = createApiUserRepository();

    return (
        <UsersContextProvider repository={repository}>
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

            <div className = "Users">
                <h1 className={styles.h1}>{dictionary[lang]?.cercavilaTitle}</h1>
                <UpdateUserForm userId={userId} lang={lang}/>
            </div>
                </Suspense>
        </UsersContextProvider>
    )
}