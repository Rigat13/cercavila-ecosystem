import React from 'react';
import {defaultLang, dictionary} from "@/content";
import styles from "./SidebarMenu.module.scss";

interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
    lang: string;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose, lang }) => {
    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <button className={styles.sidebarButton} onClick={onClose}>
                <img src="/icons/icon-burger-inverted.svg" alt="Side bar" />
            </button>
            <div className={styles.menu}>
                <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/" : `/?lang=${lang}`}>{dictionary[lang]?.cercavilaTitle}</a>
                <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/colles.html" : `/colles.html?lang=${lang}`}>{dictionary[lang]?.collesTitle}</a>
                <a className={styles.sidebarCategoryButton} href={lang === defaultLang ? "/figures.html" : `/figures.html?lang=${lang}`}>{dictionary[lang]?.figuresTitle}</a>
            </div>
            <div className={styles.languageSelector}>
                <button className={styles.languageButton}>{lang}</button>
                <div className={styles.dropdownContent}>
                    {lang !== defaultLang && <a href="?lang=ca">{defaultLang}</a>}
                    {lang !== 'en' && <a href="?lang=en">en</a>}
                    {lang !== 'es' && <a href="?lang=es">es</a>}
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;
