import { Colla } from "@/modules/colles/domain/Colla";
import styles from "./CollaPage.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, {useEffect, useState} from "react";
import {useCollesContext} from "@/app/sections/colles/CollesContext";
import {CollaFiguraCard} from "@/app/sections/colles/colla/figura/CollaFiguraCard";
import {Figura} from "@/modules/figures/domain/Figura";
import {collaTypesFixed} from "@/modules/colles/domain/colla-attributes/CollaType";

export function CollaPage({ colla, lang }: { colla: Colla; lang: string }) {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [collaFigures, setCollaFigures] = useState<Figura[]>([]);
    const { figures } = useCollesContext();

    const isHorizontal = window.innerWidth > window.innerHeight;
    const backPrimaryColourPanel = isHorizontal ? styles.backPrimaryColourPanelHorizontal : styles.backPrimaryColourPanelVertical;
    const isLightContrast = getIsLightContrast(colla.primaryColour);
    const contrastTextColour = getContrastTextColour(isLightContrast);
    const instagramLogo = isLightContrast ? "/icons/dark-icon-instagram.png" : "/icons/icon-instagram.png";
    const updateLogo = isLightContrast ? "/icons/dark-icon-edit.svg" : "/icons/icon-edit.svg";


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
            <div className={styles.pageWrapper}>
                <div className = {styles.leftLeftContent}>
                    {logoUrl && (
                        <img
                            src={logoUrl}
                            alt={`Logo de ${colla.name}`}
                            className={styles.collaPage__logo}
                        />
                    )}
                </div>
                <div className={styles.leftContent}>
                    <div className={backPrimaryColourPanel} style={{ backgroundColor: colla.primaryColour }}></div>
                    <div className={styles.backSecondaryColourPanel} style={{ backgroundColor: colla.secondaryColour }}></div>

                    <h3 className={styles.collaPage__name} style={contrastTextColour} >{colla.name}</h3>
                    <h6 className={styles.collaPage__entity} style={contrastTextColour} >{colla.entity}</h6>
                    <p className={styles.collaPage__foundationYear} style={contrastTextColour} >{colla.foundationYear}</p>
                    <div className={styles.collaPage__description}  style={contrastTextColour} >{colla.description}
                        <p className={styles.collaPage__email}  >{colla.email}</p>
                    </div>
                    <div classname={styles.collaPage__characteristics}>
                        <p className={styles.collaPage__type} style={getTypeAdditionalStyle(colla.type) } > {dictionary[lang]?.[colla.type]} </p>
                        <p className={styles.collaPage__neighbourhood} > {dictionary[lang]?.[colla.neighbourhood]} </p>
                        <p className={styles.collaPage__music} style={getMusicAdditionalStyle(colla.music) } > {dictionary[lang]?.[colla.music]} </p>
                        {colla.instagram && (
                            <a href={getInstagramUrl(colla.instagram)} target="_blank">
                                <button className={styles.outerLink}>
                                    <img src={instagramLogo} alt="Instagram"/>
                                </button>
                            </a>
                        )}
                        <a href={`colles/update.html?collaId=${colla.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                            <button className={styles.updateButton}>
                                <img src={updateLogo} alt="Editar" />
                            </button>
                        </a>
                    </div>
                </div>
                <div className={styles.rightContent}>
                    <div className={styles.collaPage__figuresContainer}>
                        <div className={styles.collaPage__figuresWrapper}>
                            {collaFigures && collaFigures.map((loadedFigure) => (
                                <CollaFiguraCard key={loadedFigure.id} figura={loadedFigure} lang={lang}/>
                            ))}
                        </div>
                    </div>
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
    return luminance < 0.5;
}

function getContrastTextColour (isLight: boolean): React.CSSProperties {
    const lightColour = "#ffffff";
    const darkColour = "#000000";

    const color = isLight ? darkColour : lightColour;
    return {color};
}

function getTypeAdditionalStyle(type: string): React.CSSProperties {
    let backgroundColor = "#000000";
    let color = "#FFFFFF";

    switch (type) {
        case 'collaTypeInstitutional':
            backgroundColor = "#1c167e";
            color = "#ff9f9f";
            break;
        case 'collaTypeNeighbourhood':
            backgroundColor = "#234bd5";
            color = "#ffffff";
            break;
        case 'collaTypeStreet':
            backgroundColor = "#00805a";
            color = "#FFFFFF";
            break;
        case 'collaTypeEntity':
            backgroundColor = "#6028ef";
            color = "#FFFFFF";
            break;
        case 'collaTypeTheatrical':
            backgroundColor = "#800080";
            color = "#FFFFFF";
            break;
        case 'collaTypeScout':
            backgroundColor = "#4682B4";
            color = "#FFFFFF";
            break;
        case 'collaTypeNursingHome':
            backgroundColor = "#FF6347";
            color = "#FFFFFF";
            break;
        case 'collaTypeSportsClub':
            backgroundColor = "#111111";
            color = "#ffdd50";
            break;
        case 'collaTypeSchool':
            backgroundColor = "#e74848";
            color = "#ffffff";
            break;
        case 'collaTypeInstitute':
            backgroundColor = "#88073e";
            color = "#FFFFFF";
            break;
        case 'collaTypeNursery':
            backgroundColor = "#c77441";
            color = "#FFFFFF";
            break;
        case 'collaTypePrivate':
            backgroundColor = "#a5e855";
            color = "#000000";
            break;
        default:
            // Default style if type is not matched
            backgroundColor = "#000000";
            color = "#FFFFFF";
            break;
    }
    return { backgroundColor, color };
}

function getMusicAdditionalStyle(musicType: string): React.CSSProperties {
    let backgroundColor = "#000000";
    let color = "#FFFFFF";

    switch (musicType) {
        case 'musicFlabiol':
            backgroundColor = "#e0823c";
            color = "#0a0a0a";
            break;
        case 'musicGralla':
            backgroundColor = "#572a15";
            color = "#FFFFFF";
            break;
        case 'musicBatucada':
            backgroundColor = "#ff1466";
            color = "#FFFFFF";
            break;
        case 'musicBand':
            backgroundColor = "#FFD700";
            color = "#000000";
            break;
        case 'musicGrallaBand':
            backgroundColor = "#008000";
            color = "#FFFFFF";
            break;
        case 'musicOther':
            backgroundColor = "#4b166c";
            color = "#FFFFFF";
            break;
        case 'musicNone':
            backgroundColor = "#77777c";
            color = "#FFFFFF";
            break;
        default:
            // Default style if music type is not recognized
            backgroundColor = "#000000";
            color = "#FFFFFF";
            break;
    }

    return { backgroundColor, color };
}
