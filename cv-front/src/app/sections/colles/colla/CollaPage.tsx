import { Colla } from "@/modules/colles/domain/Colla";
import styles from "./CollaPage.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, {useEffect, useState} from "react";
import {useCollesContext} from "@/app/sections/colles/CollesContext";
import {CollaFiguraCard} from "@/app/sections/colles/colla/figura/CollaFiguraCard";
import {Figura} from "@/modules/figures/domain/Figura";

export function CollaPage({ colla, lang }: { colla: Colla; lang: string }) {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [collaFigures, setCollaFigures] = useState<Figura[]>([]);
    const { figures } = useCollesContext();

    const isHorizontal = window.innerWidth > window.innerHeight;
    const backPrimaryColourPanel = isHorizontal ? styles.backPrimaryColourPanelHorizontal : styles.backPrimaryColourPanelVertical;
    const descriptionStyle = getContrastTextColor(colla.secondaryColour) === 'light' ? styles.collaPage__descriptionLight : styles.collaPage__descriptionDark;

    useEffect(() => {
        if (colla.logo) {
            const blob = base64ToBlob(colla.logo as unknown as string);
            const url = URL.createObjectURL(blob);
            setLogoUrl(url);
        }

        if(colla.figures) {
            const figureIds = colla.figures.split(',');
            const fetchedCollaFigures = figures.filter(figure => figureIds.includes(figure.id));
            setCollaFigures(fetchedCollaFigures);
        }
    }, [colla.logo, colla.figures, figures]);

    return (
        <div className={styles.collaPage}>
            <a href={`colles/update.html?collaId=${colla.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                <button className={styles.updateButton}>
                    <img src="/icons/icon-edit.svg" alt="Editar" />
                </button>
            </a>
            <div className={backPrimaryColourPanel} style={{ backgroundColor: colla.primaryColour }}></div>
            <div className={styles.backSecondaryColourPanel} style={{ backgroundColor: colla.secondaryColour }}></div>

            <h3 className={styles.collaPage__name}>{colla.name}</h3>
            <h6 className={styles.collaPage__entity}>{colla.entity}</h6>
            <p className={styles.collaPage__foundationYear}>{colla.foundationYear}</p>
            <div className={descriptionStyle}>{colla.description}
                <p className={styles.collaPage__email}>{colla.email}</p>
            </div>
            <p className={styles.collaPage__type}>{dictionary[lang]?.[colla.type]}</p>
            <p className={styles.collaPage__neighbourhood}>{dictionary[lang]?.[colla.neighbourhood]}</p>
            <p className={styles.collaPage__music}>{dictionary[lang]?.[colla.music]}</p>


            <div className={styles.colorCircles}>
                <div className={styles.colorCircle} style={{ backgroundColor: colla.primaryColour }}></div>
                <div className={styles.colorCircle} style={{ backgroundColor: colla.secondaryColour }}></div>
            </div>

            {logoUrl && (
                <a href={`colles/colla.html?collaId=${colla.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                    <img
                        src={logoUrl}
                        alt={`Logo de ${colla.name}`}
                        className={styles.collaPage__logo}
                    />
                </a>
            )}

            {colla.instagram && (
                <a href={getInstagramUrl(colla.instagram)} target="_blank">
                    <button className={styles.outerLink}>
                        <img src="/icons/icon-instagram.png" alt="Instagram"/>
                    </button>
                </a>
            )}
            <div className={styles.collaPage__figuresContainer}>
                <div className={styles.collaPage__figuresWrapper}>
                    {collaFigures && collaFigures.map((loadedFigure) => (
                        <CollaFiguraCard key={loadedFigure.id} figura={loadedFigure} lang={lang}/>
                    ))}
                </div>
            </div>
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

function getContrastTextColor(backgroundColor) {
    // Validate input format (e.g., '#f6e9e9')
    const colorPattern = /^#[0-9a-fA-F]{6}$/;
    if (!colorPattern.test(backgroundColor)) {
        throw new Error('Invalid background color format:'+ backgroundColor);
        return 'unknown';
    }
    // Extract RGB components from the background color string
    const rgbMatch = backgroundColor.match(/[0-9a-fA-F]{2}/g);
    if (!rgbMatch || rgbMatch.length !== 3) {
        throw new Error('Unable to extract RGB components from color:'+ backgroundColor);
        return 'unknown';
    }

    const [r, g, b] = rgbMatch.map(hex => parseInt(hex, 16));
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.5 ? 'dark' : 'light';
}