import { DigitalProduct } from "@/modules/digitalproducts/domain/DigitalProduct";
import styles from "./DigitalProductCard.module.scss";
import detailsStyles from "@/app/sections/shared/DigitalProductDetails.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, {useEffect, useState} from "react";
import {base64ToBlob} from "@/app/sections/shared/Utilities";

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
                return <a target="_blank" className={detailsStyles.digitalProductDetails__aImage}>
                    <div className={detailsStyles.digitalProductDetails__image}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${digitalProduct.name}`}
                        />
                    </div>
                </a>;
            case 'digitalProductTypeUserImageFrame':
                return <a target="_blank" className={detailsStyles.digitalProductDetails__aImageFrame}>
                    <div className={detailsStyles.digitalProductDetails__imageFrame}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${digitalProduct.name}`}
                        />
                    </div>
                </a>;
            case 'digitalProductTypeUserBackgroundImage':
                return <a target="_blank" className={detailsStyles.digitalProductDetails__aBackgroundImage}>
                    <div className={detailsStyles.digitalProductDetails__backgroundImage}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${digitalProduct.name}`}
                        />
                    </div>
                </a>;
            case 'digitalProductTypeUserTitle':
                return <a target="_blank" className={detailsStyles.digitalProductDetails__aTitle}>
                    <div className={detailsStyles.digitalProductDetails__title}
                        style={{ background: digitalProduct.primaryColour, color: digitalProduct.secondaryColour }}>
                        {digitalProduct.name}
                        <div className={detailsStyles.digitalProductDetails__shine}></div>
                    </div>
                </a>;
            case 'digitalProductTypeUserBackgroundColour':
                return <a target="_blank" className={detailsStyles.digitalProductDetails__aBackgroundColour} >
                    <div className={detailsStyles.digitalProductDetails__backgroundColour}
                        style={{ background: digitalProduct.primaryColour, color: digitalProduct.secondaryColour }}>
                        Abc
                    </div>
                </a>;
            case 'digitalProductTypeSticker': case 'digitalProductTypePin':
                return <a target="_blank" className={detailsStyles.digitalProductDetails__aSticker}>
                    <div className={detailsStyles.digitalProductDetails__sticker}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${digitalProduct.name}`}
                        />
                    </div>
                </a>;
            case 'digitalProductTypePin':
                return <a target="_blank" className={detailsStyles.digitalProductDetails__aPin}>
                    <div className={detailsStyles.digitalProductDetails__pin}>
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