"use client";

import Image from "next/image";
import {defaultLang, dictionary} from "@/content";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import SidebarMenu from "@/app/sections/shared/SidebarMenu";
import stylesSidebar from "@/app/sections/shared/SidebarMenu.module.scss";
import { Suspense } from 'react';
import RightSidebarMenu from "@/app/sections/shared/RightSidebarMenu";
import styles from './home.module.scss';
import {CollesContextProvider, useCollesContext} from "@/app/sections/colles/CollesContext";
import {createApiCollaRepository} from "@/modules/colles/infrastructure/ApiCollaRepository";
import {SimpleCollaFiguraCard} from "@/app/sections/colles/colla/figura/SimpleCollaFiguraCard";

export default function Home() {
  const repository = createApiCollaRepository();

  return (
      <CollesContextProvider repository={repository}>
        <Suspense fallback={<div>Loading...</div>}><HomeContent /></Suspense>
      </CollesContextProvider>);
}

function HomeContent() {
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang') || defaultLang;

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    const toggleRightSidebar = () => { setIsRightSidebarOpen(!isRightSidebarOpen); };

    const { figures } = useCollesContext();

    // ------------------------------------------ Auto scroll figures
    const wrapperRef = useRef(null);
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const clone = wrapper.cloneNode(true);
        clone.classList.add(styles.clone);
        wrapper.parentNode.appendChild(clone);
    }, []);
    // --------------------------------------------------------------

    return (
        <main className={styles.main}>
            <div className={stylesSidebar.sidebar}>
                <button className={stylesSidebar.sidebarButton} onClick={toggleSidebar}>
                    <img src="/icons/icon-burger.svg" alt="Side bar" />
                </button>
                <SidebarMenu isOpen={isSidebarOpen} onClose={toggleSidebar} lang={lang}/>
                <RightSidebarMenu isOpen={isRightSidebarOpen} onClose={toggleRightSidebar} lang={lang}/>
            </div>
            <div className={styles.relative}>
                <a className={styles.pointerEvents} target="_blank" rel="noopener noreferrer">
                    <div className={styles.imageContainer}>
                        <Image className={styles.logoImg} src="/cercavila_logo.svg" alt="Logotip de Cercavila" width={570} height={256} priority />
                        <p className={styles.subtitle}>{dictionary[lang]?.cercavilaTagline}</p>
                    </div>
                    <div className={styles.imageContainer}>
                        <Image className={styles.giantsImg} src="/gegants_fons.png" alt="Fons de gegants" width={510} height={300} priority />
                    </div>
                </a>
            </div>
            <div className={styles.grid}>
                <a className={styles.menuCategoryButton} href={lang === defaultLang ? "/colles.html" : `/colles.html?lang=${lang}`}>
                    <img src="/icons/icon-colles.svg" alt="Colles" className={styles.menuImage} /> {dictionary[lang]?.collesTitle}
                </a>

                <a className={styles.menuCategoryButton} href={lang === defaultLang ? "/store.html" : `/store.html?lang=${lang}`}>
                    <img src="/icons/icon-store.svg" alt="Store" className={styles.menuImage} /> {dictionary[lang]?.storeTitle}
                </a>

                <a className={styles.menuCategoryButton} href={lang === defaultLang ? "/users.html" : `/users.html?lang=${lang}`}>
                    <img src="/icons/icon-users.svg" alt="Users" className={styles.menuImage} /> {dictionary[lang]?.usersTitle}
                </a>

                <a className={styles.menuCategoryButton} href={lang === defaultLang ? "/events.html" : `/events.html?lang=${lang}`}>
                    <img src="/icons/icon-events.svg" alt="Events" className={styles.menuImage} /> {dictionary[lang]?.eventsTitle}
                </a>
            </div>
            <div className={styles.figuresContainer}>
                <div className={styles.figuresWrapper} ref={wrapperRef}>
                    {figures && figures.map((loadedFigure, index) => (
                        <div
                            key={loadedFigure.id}
                            className={styles.figureDiv}
                            // eslint-disable-next-line react/prop-types
                            style={index % 2 === 0 ? { '--random-delay': `${Math.random() * 2}s` } as any : {}}
                        >
                            <SimpleCollaFiguraCard figura={loadedFigure} lang={lang} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}