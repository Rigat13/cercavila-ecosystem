import { Figura } from "@/modules/figures/domain/Figura";
import styles from "./FiguraCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import {useEffect, useState} from "react";

export function FiguraCard({ figura, lang }: { figura: Figura; lang: string }) {
    const [imageUrl, setLogoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (figura.image) {
            const blob = base64ToBlob(figura.image as unknown as string);
            const url = URL.createObjectURL(blob);
            setLogoUrl(url);
        }
    }, [figura.image]);

    return (
        <div className={styles.figuraCard}>
            <a href={`figures/update.html?figuraId=${figura.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                <button className={styles.updateButton}>
                    <img src="/icons/icon-edit.svg" alt="Editar" />
                </button>
            </a>
            <h3 className={styles.figuraCard__name}>{figura.name}</h3>
            <p className={styles.figuraCard__year}>{figura.year}</p>
            <p className={styles.figuraCard__type}>{dictionary[lang]?.[figura.type]}</p>

            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={`Logo de ${figura.name}`}
                    className={styles.figuraCard__image}
                />
            )}

            {figura.webUrl && (
                <a href={getWebUrl(figura.webUrl)}>
                    <button className={styles.outerLink}>
                        <img src="/icons/icon-web.png" alt="Història" />
                    </button>
                </a>
            )}
        </div>
    );
}

function getWebUrl(url: string): string {
    if (url.startsWith('http:')) {
        return url;
    } else if (url.startsWith('www.gegantsmataro')) {
        return `http://${url}`;
    } else if (url.startsWith('gegantsmataro.cat')) {
        return `http://${url}`;
    }
    return url;
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
