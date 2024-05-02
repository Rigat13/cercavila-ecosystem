import {useCollesContext} from "@/app/sections/colles/CollesContext";
import styles from "./CCGMCardHolder.module.scss";
import {dictionary} from "@/content";
import React from "react";
import {collaIsCCGM} from "@/modules/colles/domain/Colla";
import {CCGMCard} from "@/app/sections/colles/card/CCGMCard";

export function CCGMCardHolder({ lang }: { lang: string }) {
    const { colles } = useCollesContext();
    const colla = colles.find(colla => (collaIsCCGM(colla.id)));
    return (
        <section>
            <h2 className={styles.h2}>{dictionary[lang]?.collesTitle}</h2>
            <div className={styles.list}>
                {colla && (<CCGMCard key={colla.id} colla={colla} lang={lang}/>)}
            </div>
        </section>
    )
}