import { Figura } from "@/modules/figures/domain/Figura";
import styles from "./CollaFiguraCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import {useEffect, useState} from "react";
import { figuraTypesFixed } from "@/modules/figures/domain/figura-attributes/FiguraType";

export function SimpleCollaFiguraCard({ figura, lang }: { figura: Figura; lang: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    let figuraImageStyle = styles.collaFiguraCard__imageGegant;
    switch (figura.type) {
        case figuraTypesFixed.figuraTypeGegant: figuraImageStyle = styles.collaFiguraCard__imageGegant; break;
        case figuraTypesFixed.figuraTypeGeganto: case figuraTypesFixed.figuraTypeMotxilla: figuraImageStyle = styles.collaFiguraCard__imageGeganto; break;
        case figuraTypesFixed.figuraTypeCapgros: case figuraTypesFixed.figuraTypeNan: figuraImageStyle = styles.collaFiguraCard__imageCapgros; break;
        case figuraTypesFixed.figuraTypeBestia: figuraImageStyle = styles.collaFiguraCard__imageBestia; break;
    }
    useEffect(() => {
        if (figura.image) {
            const blob = base64ToBlob(figura.image as unknown as string);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [figura.image]);

    return (
        <div className={styles.collaFiguraCard}>
            <div className={styles.collaFiguraCard__imageWrapper}>
                {imageUrl && (
                    <div className={figuraImageStyle}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${figura.name}`}
                        />
                    </div>
                )}
            </div>
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
