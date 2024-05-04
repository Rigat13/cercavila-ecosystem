import { DigitalProduct } from "@/modules/digitalproducts/domain/DigitalProduct";
import styles from "./DigitalProductCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, {useEffect, useState} from "react";

export function DigitalProductCard({ digitalProduct, lang }: { digitalProduct: DigitalProduct; lang: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (digitalProduct.image) {
            const blob = base64ToBlob(digitalProduct.image as unknown as string);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [digitalProduct.image]);

    return (
        <div className={styles.digitalProductCard}>
            {imageUrl && (
                <a target="_blank" className={styles.digitalProductCard__aImage}>
                    <div className={styles.digitalProductCard__image}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${digitalProduct.name}`}
                        />
                    </div>
                </a>
            )}
            <div className={styles.digitalProductCard__info}>
                <a href={`digitalproducts/update.html?digitalProductId=${digitalProduct.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                    <button className={styles.updateButton}>
                        <img src="/icons/icon-edit.svg" alt="Editar" />
                    </button>
                </a>
                <h3 className={styles.digitalProductCard__name}>{digitalProduct.name}</h3>
                <p className={styles.digitalProductCard__description}>{digitalProduct.description}</p>
                <div className={styles.colourCircles}>
                    <div className={styles.colourCircle} style={{ backgroundColor: digitalProduct.primaryColour }}></div>
                    <div className={styles.colourCircle} style={{ backgroundColor: digitalProduct.secondaryColour }}></div>
                </div>
                <p className={styles.digitalProductCard__price}>{digitalProduct.price + " " + dictionary[lang]?.coinAcronym}</p>
                <p className={styles.digitalProductCard__type}>{dictionary[lang]?.[digitalProduct.type]}</p>
            </div>
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
