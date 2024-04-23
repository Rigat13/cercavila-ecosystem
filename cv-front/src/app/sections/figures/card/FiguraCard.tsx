import { Figura } from "@/modules/figures/domain/Figura";
import styles from "./FiguraCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import {useEffect, useState} from "react";

export function FiguraCard({ figura, lang }: { figura: Figura; lang: string }) {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (figura.logo) {
            const blob = base64ToBlob(figura.logo as unknown as string);
            const url = URL.createObjectURL(blob);
            setLogoUrl(url);
        }
    }, [figura.logo]);

    return (
        <div className={styles.figuraCard}>
            <a href={`figures/update.html?figuraId=${figura.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                <button className={styles.updateButton}>
                    <img src="/icons/icon-edit.svg" alt="Editar" />
                </button>
            </a>
            <h3 className={styles.figuraCard__name}>{figura.name}</h3>
            <h6 className={styles.figuraCard__entity}>{figura.entity}</h6>
            <p className={styles.figuraCard__foundationYear}>{figura.foundationYear}</p>
            <p className={styles.figuraCard__description}>{figura.description}</p>
            <p className={styles.figuraCard__type}>{dictionary[lang]?.[figura.type]}</p>
            <p className={styles.figuraCard__neighbourhood}>{dictionary[lang]?.[figura.neighbourhood]}</p>
            <p className={styles.figuraCard__music}>{dictionary[lang]?.[figura.music]}</p>
            <p className={styles.figuraCard__email}>{figura.email}</p>

            <div className={styles.colorCircles}>
                <div className={styles.colorCircle} style={{ backgroundColor: figura.primaryColour }}></div>
                <div className={styles.colorCircle} style={{ backgroundColor: figura.secondaryColour }}></div>
            </div>

            {logoUrl && (
                <img
                    src={logoUrl}
                    alt={`Logo de ${figura.name}`}
                    className={styles.figuraCard__logo}
                />
            )}

            {figura.instagram && (
                <a href={getInstagramUrl(figura.instagram)}>
                    <button className={styles.outerLink}>
                        <img src="/icons/icon-instagram.png" alt="Editar" />
                    </button>
                </a>
            )}
        </div>
    );
}

function getInstagramUrl(usernameOrUrl: string): string {
    if (usernameOrUrl.startsWith('http')) {
        return usernameOrUrl;
    } else if (usernameOrUrl.startsWith('www.')) {
        return `https://${usernameOrUrl}`;
    } else if (usernameOrUrl.startsWith('instagram.com')) {
        return `https://${usernameOrUrl}`;
    }
    else if (usernameOrUrl.startsWith('@')) {
        return `https://www.instagram.com/${usernameOrUrl.slice(1)}`;
    }
    return `https://www.instagram.com/${usernameOrUrl}`;
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
