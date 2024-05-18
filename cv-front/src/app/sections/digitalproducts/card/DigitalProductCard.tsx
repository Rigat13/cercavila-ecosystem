import { DigitalProduct } from "@/modules/digitalproducts/domain/DigitalProduct";
import styles from "./DigitalProductCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, {useEffect, useState} from "react";
import {getRolesAdditionalStyle} from "@/modules/users/domain/user-attributes/UserRoles";
import {getContrastColour} from "@/app/sections/shared/getContrastColour";

export function DigitalProductCard({ digitalProduct, lang, isBuyable }: { digitalProduct: DigitalProduct; lang: string; isBuyable: boolean }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [buyable, setBuyable] = useState<boolean>(false);

    useEffect(() => {
        setBuyable(isBuyable);
        if (digitalProduct.image) {
            const blob = base64ToBlob(digitalProduct.image as unknown as string);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [digitalProduct.image, isBuyable]);

    // ---------------------------------------------------------- CARD COLOUR CHANGE ON HOVER IF BACKGROUND COLOUR TYPE
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => { setIsHovered(true); };
    const handleMouseLeave = () => { setIsHovered(false); };
    const hoverStyle = digitalProduct.type === "digitalProductTypeUserBackgroundColour" && isHovered ? {
        backgroundColor: digitalProduct.primaryColour,
        color: digitalProduct.secondaryColour,
        boxShadow: 'inset 0 0 0rem 0.6rem ' + digitalProduct.secondaryColour,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    } : {};

    // ----------------------------------------------------------------------------------------------------------------

    const renderProductDetails = () => {
        if (!imageUrl && digitalProduct.type !='digitalProductTypeUserBackgroundColour' && digitalProduct.type!='digitalProductTypeUserTitle') return null;
        switch (digitalProduct.type) {
            case 'digitalProductTypeUserImage':
                return <a target="_blank" className={styles.digitalProductCard__aImage}>
                    <div className={styles.digitalProductCard__image}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${digitalProduct.name}`}
                        />
                    </div>
                </a>;
            case 'digitalProductTypeUserImageFrame':
                return <a target="_blank" className={styles.digitalProductCard__aImageFrame}>
                    <div className={styles.digitalProductCard__imageFrame}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${digitalProduct.name}`}
                        />
                    </div>
                </a>;
            case 'digitalProductTypeUserBackgroundImage':
                return <a target="_blank" className={styles.digitalProductCard__aBackgroundImage}>
                    <div className={styles.digitalProductCard__backgroundImage}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${digitalProduct.name}`}
                        />
                    </div>
                </a>;
            case 'digitalProductTypeUserTitle':
                return <a target="_blank" className={styles.digitalProductCard__aImage}>
                    <div className={styles.digitalProductCard__image}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${digitalProduct.name}`}
                        />
                    </div>
                </a>;
            case 'digitalProductTypeUserBackgroundColour':
                return <a target="_blank" className={styles.digitalProductCard__aBackgroundColour}>
                    <div className={styles.digitalProductCard__backgroundColour}
                        style={{ background: digitalProduct.primaryColour, color: digitalProduct.secondaryColour }}>
                        Abc
                    </div>
                </a>;
            case 'digitalProductTypeSticker': case 'digitalProductTypePin':
                return <a target="_blank" className={styles.digitalProductCard__aSticker}>
                    <div className={styles.digitalProductCard__sticker}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${digitalProduct.name}`}
                        />
                    </div>
                </a>;
            case 'digitalProductTypePin':
                return <a target="_blank" className={styles.digitalProductCard__aPin}>
                    <div className={styles.digitalProductCard__pin}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${digitalProduct.name}`}
                        />
                    </div>
                </a>;
        }
    };

    return (
        <div className={styles.digitalProductCard}>
            <div className={`${styles.digitalProductCard__info}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={hoverStyle} >
                {renderProductDetails()}
                <a href={`digitalproducts/update.html?digitalProductId=${digitalProduct.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                    <button className={styles.updateButton}>
                        <img src="/icons/icon-edit.svg" alt="Editar" />
                    </button>
                </a>
                <p className={styles.digitalProductCard__type}>{dictionary[lang]?.[digitalProduct.type]}</p>
                <h3 className={styles.digitalProductCard__name}>{digitalProduct.name}</h3>
                <p className={styles.digitalProductCard__description}>{digitalProduct.description}</p>
                {buyable && (
                    <button type="button" className={styles.selectedElementCombined} >
                        <span className={styles.buyText}> {dictionary[lang]?.digitalProductStoreBuyButton} </span>
                        <span className={styles.priceText}> {digitalProduct.price + " " + dictionary[lang]?.coinAcronym} </span>
                    </button>
                )}
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