import { DigitalProduct } from "@/modules/digitalproducts/domain/DigitalProduct";
import styles from "./DigitalProductCard.module.scss";
import detailsStyles from "@/app/sections/shared/DigitalProductDetails.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, { useEffect, useState } from "react";
import { base64ToBlob } from "@/app/sections/shared/Utilities";
import { DigitalProductDetails } from "./DigitalProductDetails"; // Import the new component

export function DigitalProductCard({ digitalProduct, lang, isBuyable, alreadyObtained, isEditable, onBuyButtonClick }: { digitalProduct: DigitalProduct; lang: string; isBuyable: boolean, alreadyObtained: boolean, isEditable: boolean, onBuyButtonClick: () => void }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [buyable, setBuyable] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(isEditable);
    const eventExclusive = digitalProduct.price === 0;

    useEffect(() => {
        setBuyable(isBuyable);
        setEditable(isEditable);
        if (digitalProduct.image) {
            const blob = base64ToBlob(digitalProduct.image as unknown as string);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [digitalProduct.image, isBuyable, isEditable]);

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

    const productCardOverlayStyle = (alreadyObtained && buyable) ? { // If the product is already obtained, make it semi-transparent and unclickable (when on store, buyable)
        opacity: 0.5,
        //pointerEvents: 'none',
    } : {};

    // ----------------------------------------------------------------------------------------------------------------

    return (
        <div className={styles.digitalProductCard} style={productCardOverlayStyle}>
            <div className={`${styles.digitalProductCard__info}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={hoverStyle} >
                <DigitalProductDetails digitalProduct={digitalProduct} />
                {!buyable && editable && (
                    <a href={`digitalproducts/update.html?digitalProductId=${digitalProduct.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                        <button className={styles.updateButton}>
                            <img src="/icons/icon-edit.svg" alt="Editar" />
                        </button>
                    </a>
                )}
                {eventExclusive && (<p className={styles.digitalProductCard__eventExclusiveTag}>{dictionary[lang]?.digitalProductEventExclusive}</p>)}
                <p className={styles.digitalProductCard__type}>{dictionary[lang]?.[digitalProduct.type]}</p>
                <h3 className={styles.digitalProductCard__name}>{digitalProduct.name}</h3>
                <p className={styles.digitalProductCard__description}>{digitalProduct.description}</p>
                {!eventExclusive && buyable && !alreadyObtained && (
                    <button type="button" onClick={onBuyButtonClick} className={styles.selectedElementCombined} >
                        <span className={styles.buyText}> {dictionary[lang]?.digitalProductStoreBuyButton} </span>
                        <span className={styles.priceText}>
                            {digitalProduct.price}
                            <img className={styles.iconCountImgGeneral} src="/icons/icon-coin.svg" alt="C" />
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}
