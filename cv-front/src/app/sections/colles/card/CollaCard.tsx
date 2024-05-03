import { Colla } from "@/modules/colles/domain/Colla";
import styles from "./CollaCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, {useEffect, useState} from "react";
import {useCollesContext} from "@/app/sections/colles/CollesContext";
import {getTypeAdditionalStyle} from "@/modules/colles/domain/colla-attributes/CollaType";
import {getMusicAdditionalStyle} from "@/modules/colles/domain/colla-attributes/CollaMusic";

export function CollaCard({ colla, lang }: { colla: Colla; lang: string }) {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [figureNames, setFigureNames] = useState<string[]>([]);
    const { figuresNoImage } = useCollesContext();

    const isLightContrast = getIsLightContrast(colla.primaryColour);
    const contrastTextColour = getContrastTextColour(isLightContrast);
    const isLightContrastSecondary = getIsLightContrast(colla.secondaryColour);
    const contrastTextColourSecondary = getContrastTextColour(isLightContrastSecondary);
    const contrastTextColourAndBackgroundSecondary = { ...contrastTextColourSecondary, backgroundColor: colla.secondaryColour };
    const contrastBackgroundAndTextColour = getContrastBackgroundAndTextColour(isLightContrastSecondary);
    const imageOutlineColour = { borderColor: colla.secondaryColour };
    const [isCollaHovered, setIsCollaHovered] = useState(false);
    const backgroundColourBorderColour = { backgroundColor: colla.primaryColour, border: isCollaHovered ? `2rem solid ${colla.secondaryColour}` : '2rem solid transparent' };

    const instagramLogo = isLightContrast ? "/icons/dark-icon-instagram.png" : "/icons/icon-instagram.png";
    const updateLogo = isLightContrast ? "/icons/dark-icon-edit.svg" : "/icons/icon-edit.svg";
    const emailLogo = isLightContrast ? "/icons/dark-icon-email.svg" : "/icons/icon-email.svg";

    const [isInstagramVisible, setIsInstagramVisible] = useState<boolean>(false);
    const [isEmailVisible, setIsEmailVisible] = useState<boolean>(false);


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
            {logoUrl && (
                <a href={`colles/colla.html?collaId=${colla.id}${lang === defaultLang ? '' : `&lang=${lang}`}`} className={styles.collaCard__aImage}>
                    <div className={styles.collaCard__image} style={imageOutlineColour} >
                        <img src={logoUrl} alt={`Logo de ${colla.name}`} />
                    </div>
                </a>
            )}

            <div className={styles.collaCard__info} style={backgroundColourBorderColour} onMouseEnter={() => setIsCollaHovered(true)} onMouseLeave={() => setIsCollaHovered(false)} >
                <h3 className={styles.collaCard__name} style={contrastTextColour} >{colla.name}</h3>
                <h6 className={styles.collaCard__entity} style={contrastTextColour} >{colla.entity}</h6>
                <p className={styles.collaCard__foundationYear} style={contrastTextColour} >{colla.foundationYear}</p>
                <div className={styles.collaCard__characteristics}>
                    <p className={styles.collaCard__type} style={getTypeAdditionalStyle(colla.type) } > {dictionary[lang]?.[colla.type]} </p>
                    <p className={styles.collaCard__neighbourhood} > {dictionary[lang]?.[colla.neighbourhood]} </p>
                    <p className={styles.collaCard__music} style={getMusicAdditionalStyle(colla.music) } > {dictionary[lang]?.[colla.music]} </p>
                </div>
                <div className={styles.collaCard__characteristics}>
                    {colla.instagram && ( <button className={styles.outerLink} onClick={() => setIsInstagramVisible(!isInstagramVisible)}>
                        <img src={instagramLogo} alt="Instagram"/>
                    </button> )}
                    {colla.instagram && isInstagramVisible && ( <a href={getInstagramUrl(colla.instagram)} target="_blank">
                        <p className={styles.collaCard__additionalTextButton} style={contrastBackgroundAndTextColour}>{colla.instagram}</p>
                    </a> )}
                    {colla.email && ( <button className={styles.outerLink} onClick={() => setIsEmailVisible(!isEmailVisible)}>
                        <img src={emailLogo} alt="Email"/>
                    </button> )}
                    {colla.email && isEmailVisible && ( <a href={`mailto:${colla.email}`} target="_blank">
                        <p className={styles.collaCard__additionalTextButton} style={contrastBackgroundAndTextColour}>{colla.email}</p>
                    </a> )}
                    <a href={`/colles/update.html?collaId=${colla.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                        <button className={styles.updateButton}>
                            <img src={updateLogo} alt="Editar"/>
                        </button>
                    </a>
                </div>
                <div className={styles.collaCard__description} style={contrastTextColour} >{colla.description}</div>
                <div className={styles.colorCircles}>
                    <div className={styles.colorCircle} style={{ backgroundColor: colla.primaryColour }}></div>
                    <div className={styles.colorCircle} style={{ backgroundColor: colla.secondaryColour }}></div>
                </div>
                {figureNames.length > 0 && (
                    <div className={styles.selectedFigures}>
                        {figureNames.map((figureName, index) => (
                            <span key={index} className={styles.selectedFigure} style={contrastTextColourAndBackgroundSecondary} >{figureName}</span>
                        ))}
                    </div>
                )}
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

function getIsLightContrast (backgroundColor: string): boolean {
    const colorPattern = /^#[0-9a-fA-F]{6}$/;
    if (!colorPattern.test(backgroundColor)) {
        throw new Error('Invalid background color format:'+ backgroundColor);
        return false;
    }
    // Extract RGB components from the background color string
    const rgbMatch = backgroundColor.match(/[0-9a-fA-F]{2}/g);
    if (!rgbMatch || rgbMatch.length !== 3) {
        throw new Error('Unable to extract RGB components from color:'+ backgroundColor);
        return false;
    }

    const [r, g, b] = rgbMatch.map(hex => parseInt(hex, 16));
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.5;
}

function getContrastTextColour (isLight: boolean): React.CSSProperties {
    const lightColour = "#ffffff";
    const darkColour = "#000000";

    const color = isLight ? darkColour : lightColour;
    return {color};
}

function getContrastBackgroundAndTextColour (isLight: boolean): React.CSSProperties {
    const lightColour = "#b2b2b2";
    const darkColour = "#3b3b3b";

    const backgroundColor = isLight ? darkColour : lightColour;
    const color = isLight ? lightColour : darkColour;
    return {backgroundColor, color};
}