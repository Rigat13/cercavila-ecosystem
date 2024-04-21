import { Colla } from "@/modules/colles/domain/Colla";
import styles from "./CollaCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import {useEffect, useState} from "react";

export function CollaCard({ colla, lang }: { colla: Colla; lang: string }) {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (colla.logo) {
            const blob = base64ToBlob(colla.logo as string);
            const url = URL.createObjectURL(blob);
            setLogoUrl(url);
        }
    }, [colla.logo]);

    return (
        <div className={styles.collaCard}>
            <a href={`colles/update.html?collaId=${colla.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                <button className={styles.updateButton}>
                    <img src="/icons/edit.svg" alt="Editar" />
                </button>
            </a>
            <h3 className={styles.collaCard__name}>{colla.name}</h3>
            <h6 className={styles.collaCard__entity}>{colla.entity}</h6>
            <p className={styles.collaCard__foundationYear}>{colla.foundationYear}</p>
            <p className={styles.collaCard__description}>{colla.description}</p>
            <p className={styles.collaCard__type}>{dictionary[lang]?.[colla.type]}</p>
            <p className={styles.collaCard__neighbourhood}>{dictionary[lang]?.[colla.neighbourhood]}</p>

            <div className={styles.colorCircles}>
                <div className={styles.colorCircle} style={{ backgroundColor: colla.primaryColour }}></div>
                <div className={styles.colorCircle} style={{ backgroundColor: colla.secondaryColour }}></div>
            </div>

            {logoUrl && (
                <img
                    src={logoUrl}
                    alt={`Logo de ${colla.name}`}
                    className={styles.collaCard__logo}
                />
            )}
        </div>
    );
}

function base64ToBlob(base64: string): Blob {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: 'image/jpeg' });
}
