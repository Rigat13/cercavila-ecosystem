"use client";

import Image from "next/image";
import {createApiCollaRepository} from "@/modules/colles/infrastructure/ApiCollaRepository";
import {CollesContextProvider} from "@/app/sections/colles/CollesContext";
import {CollesList} from "@/app/sections/colles/list/CollesList";
import {CreateCollaForm} from "@/app/sections/colles/form/CreateCollaForm";
import styles from "@/app/sections/colles/list/CollesList.module.scss";
import {defaultLang, dictionary} from "@/content";
import {useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
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
                <h1 className={styles.h1}>{dictionary[lang]?.createCollaTitle}</h1>
                <CollesList lang={lang}/>
                <CreateCollaForm />
            </div>
        </CollesContextProvider>
    )
}