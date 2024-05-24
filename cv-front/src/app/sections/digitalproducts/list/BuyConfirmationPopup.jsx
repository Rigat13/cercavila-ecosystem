import React from 'react';
import styles from './BuyConfirmationPopup.module.scss';
import { dictionary } from "@/content";

export function BuyConfirmationPopup({ digitalProduct, onClose, lang, userCoins }) {
    const canBuy = userCoins >= digitalProduct.price;
    const remainingCoins = digitalProduct.price - userCoins;

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h2>{dictionary[lang]?.digitalProductConfirmBuyTitle}</h2>
                <p>{dictionary[lang]?.digitalProductConfirmBuyMessage.replace('{product}', digitalProduct.name)}</p>
                <p>{dictionary[lang]?.digitalProductProductPrice.replace('{price}', digitalProduct.price)}</p>
                <p>{userCoins}</p>
                {canBuy ? (
                    <button className={styles.confirmButton} onClick={() => { /* Add buy logic here */ }}>{dictionary[lang]?.digitalProductStoreBuyButton}</button>
                ) : (
                    <p className={styles.insufficientCoins}>
                        {dictionary[lang]?.digitalProductInsufficientCoins.replace('{remaining}', remainingCoins+"")}
                    </p>
                )}
                <button className={styles.cancelButton} onClick={onClose}>{dictionary[lang]?.digitalProductCancelBuyButton}</button>
            </div>
        </div>
    );
}