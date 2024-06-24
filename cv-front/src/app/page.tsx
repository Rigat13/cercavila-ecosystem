"use client";

import Image from "next/image";
import { defaultLang, dictionary } from "@/content";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import SidebarMenu from "@/app/sections/shared/SidebarMenu";
import stylesSidebar from "@/app/sections/shared/SidebarMenu.module.scss";
import { Suspense } from 'react';
import RightSidebarMenu from "@/app/sections/shared/RightSidebarMenu";
import styles from './home.module.scss';

export default function Home() { return (<Suspense fallback={<div>Loading...</div>}><HomeContent /></Suspense>); }

function HomeContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || defaultLang;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
  const toggleRightSidebar = () => { setIsRightSidebarOpen(!isRightSidebarOpen); };

  return (
      <main className={styles.main}>
        <div className={stylesSidebar.sidebar}>
          <button className={stylesSidebar.sidebarButton} onClick={toggleSidebar}>
            <img src="/icons/icon-burger.svg" alt="Side bar" />
          </button>
          <SidebarMenu  isOpen={isSidebarOpen} onClose={toggleSidebar} lang={lang}/>
          <RightSidebarMenu isOpen={isRightSidebarOpen} onClose={toggleRightSidebar} lang={lang}/>
        </div>
        <div className={styles.relative}>
          <div className={styles.fixed}>
            <a className={`${styles.pointerEvents} ${styles.pointerEvents}`} target="_blank" rel="noopener noreferrer">
              <Image className={styles.relativeImg} src="/cercavila_logo.svg" alt="Logotip de Cercavila" width={270} height={56} priority />
              <Image className={styles.image} src="/gegants_fons.png" alt="Fons de gegants" width={510} height={300} priority style={{ objectFit: 'contain', width: '100%', height: 'auto' }} />
            </a>
          </div>
        </div>
        <div className={styles.grid}>
          <a href="https://www.instagram.com/coordinadoragegantsmataro/" className={`${styles.group} ${styles.group}`} target="_blank" rel="noopener noreferrer">
            <h2>CCGM{" "}<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span></h2>
            <p className={styles.p}>Troba informació sobre les colles geganteres de Mataró.</p>
          </a>
          <a href="http://www.gegantsmataro.net/" className={`${styles.group} ${styles.group}`} target="_blank" rel="noopener noreferrer">
            <h2>Gegants{" "}<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span></h2>
            <p className={styles.p}>Explora els gegants actius al Web dels Gegants de Mataró!</p>
          </a>
          <a href={lang === defaultLang ? "/colles.html" : `/colles.html?lang=${lang}`} className={`${styles.group} ${styles.group}`} target="_blank" rel="noopener noreferrer">
            <h2>Colles a Cercavila{" "}<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span></h2>
            <p className={styles.p}>Descobreix les colles registrades a Cercavila.</p>
          </a>
          <a href="https://www.instagram.com/c.rigat/" className={`${styles.group} ${styles.group}`} target="_blank" rel="noopener noreferrer">
            <h2>Nosaltres{" "}<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span></h2>
            <p className={styles.p}>Descobreix més sobre l&apos;equip darrere Cercavila.</p>
          </a>
        </div>
      </main>
  );
}
