import React, {Suspense} from 'react';
import {defaultLang, dictionary} from "@/content";
import styles from "./SidebarMenu.module.scss";
import {useSearchParams} from "next/navigation";

interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
    lang: string;
}

export default function SidebarMenu({ isOpen, onClose, lang }: SidebarMenuProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SidebarMenuContent isOpen={isOpen} onClose={onClose} lang={lang}/>
        </Suspense>
    );
}

function SidebarMenuContent({ isOpen, onClose, lang }: SidebarMenuProps) {
    const searchParams = useSearchParams();
    const existingParams = getExistingParams(searchParams);
    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <button className={styles.sidebarButton} onClick={onClose}>
                <img src="/icons/icon-burger-inverted.svg" alt="Side bar" />
            </button>
            <div className={styles.menu}>
                <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/" : `/?lang=${lang}`}>{dictionary[lang]?.cercavilaTitle}</a>
                <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/ccgm.html" : `/ccgm.html?lang=${lang}`}>{dictionary[lang]?.ccgmAcronym}</a>
                <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/colles.html" : `/colles.html?lang=${lang}`}>{dictionary[lang]?.collesTitle}</a>
                <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/figures.html" : `/figures.html?lang=${lang}`}>{dictionary[lang]?.figuresTitle}</a>
            </div>
            <div className={styles.languageSelector}>
                <button className={styles.languageButton}>{lang}</button>
                <div className={styles.dropdownContent}>
                    {lang !== defaultLang && <a href={`?${existingParams}&lang=ca`}>{defaultLang}</a>}
                    {lang !== 'en' && <a href={`?${existingParams}&lang=en`}>en</a>}
                    {lang !== 'es' && <a href={`?${existingParams}&lang=es`}>es</a>}
                </div>
            </div>
        </div>
    );
};


function getExistingParams(searchParams) {
    let existingParams = '';
    searchParams.forEach((value, key) => {
        if (key !== 'lang') {
            existingParams += `${key}=${value}&`;
        }
    });
    return existingParams.slice(0, -1); // Remove the last '&'
}