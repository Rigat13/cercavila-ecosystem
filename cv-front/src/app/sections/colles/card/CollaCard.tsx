import { Colla } from "@/modules/colles/domain/Colla";
import styles from "./CollaCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, {useEffect, useState} from "react";
import {useCollesContext} from "@/app/sections/colles/CollesContext";

export function CollaCard({ colla, lang }: { colla: Colla; lang: string }) {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [figureNames, setFigureNames] = useState<string[]>([]);
    const { figuresNoImage } = useCollesContext();

    useEffect(() => {
        if (colla.logo) {
            const blob = base64ToBlob(colla.logo as unknown as string);
            const url = URL.createObjectURL(blob);
            setLogoUrl(url);
        }

        if(colla.figures) {
            const figureIds = colla.figures.split(',');
            const fetchedFigureNames = figureIds.map(id => {
                const figure = figuresNoImage.find(figure => figure.id === id);
                return figure ? figure.name : '';
            });
            setFigureNames(fetchedFigureNames);
        }
    }, [colla.logo, colla.figures, figuresNoImage]);

    return (
        <div className={styles.collaCard}>
            <a href={`colles/update.html?collaId=${colla.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                <button className={styles.updateButton}>
                    <img src="/icons/icon-edit.svg" alt="Editar" />
                </button>
            </a>
            <h3 className={styles.collaCard__name}>{colla.name}</h3>
            <h6 className={styles.collaCard__entity}>{colla.entity}</h6>
            <p className={styles.collaCard__foundationYear}>{colla.foundationYear}</p>
            <p className={styles.collaCard__description}>{colla.description}</p>
            <p className={styles.collaCard__type}>{dictionary[lang]?.[colla.type]}</p>
            <p className={styles.collaCard__neighbourhood}>{dictionary[lang]?.[colla.neighbourhood]}</p>
            <p className={styles.collaCard__music}>{dictionary[lang]?.[colla.music]}</p>
            <p className={styles.collaCard__email}>{colla.email}</p>
            <p className={styles.collaCard__figures}>{colla.figures}</p>

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

            {colla.instagram && (
                <a href={getInstagramUrl(colla.instagram)} target="_blank">
                    <button className={styles.outerLink}>
                        <img src="/icons/icon-instagram.png" alt="Instagram"/>
                    </button>
                </a>
            )}
            {figureNames.length > 0 && (
                <div className={styles.selectedFigures}>
                    {figureNames.map((figureName, index) => (
                        <span key={index} className={styles.selectedFigure}>{figureName}</span>
                    ))}
                </div>
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
