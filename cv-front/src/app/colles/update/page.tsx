'use client';
import Image from "next/image";
import {createApiCollaRepository} from "@/modules/colles/infrastructure/ApiCollaRepository";
import {CollesContextProvider} from "@/app/sections/colles/CollesContext";
import {UpdateCollaForm} from "@/app/sections/colles/update-form/UpdateCollaForm";
import {useSearchParams } from "next/navigation";
import {defaultLang, dictionary} from "@/content";
import styles from "@/app/sections/colles/list/CollesList.module.scss";

export default function Page() {
    const searchParams = useSearchParams();
    const collaId = searchParams.get('collaId');
    const lang = searchParams.get('lang') || defaultLang;

    const repository = createApiCollaRepository();

    return (
        <CollesContextProvider repository={repository}>
            <Image
                src="/cercavila_logo.svg"
                alt="Logotip de Cercavila"
                className=""// dark:invert for dark logo on dark mode
                width={100}
                height={24}
                priority
            />

            <div className = "Colles">
                <h1 className={styles.h1}>{dictionary[lang]?.cercavilaTitle}</h1>
                <UpdateCollaForm collaId={collaId} lang={lang}/>
            </div>
        </CollesContextProvider>
    )
}