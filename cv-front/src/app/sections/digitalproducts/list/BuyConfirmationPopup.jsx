import React from 'react';
import styles from './BuyConfirmationPopup.module.scss';
import { dictionary } from "@/content";

export function BuyConfirmationPopup({ digitalProduct, onClose, lang, userCoins }) {
    const canBuy = userCoins >= digitalProduct.price;
    const remainingCoins = digitalProduct.price - userCoins;

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <button className={styles.closePopupButton} type="button" onClick={onClose}>×</button>
                <div className={styles.coinsCount}>
                    <span>{userCoins}</span>
                    <img className={styles.iconCountImg} src="/icons/icon-coin.svg" alt="C" />
                </div>
                <h2 className={styles.confirmBuyTitle}>{dictionary[lang]?.digitalProductConfirmBuyTitle}</h2>
                <p>{dictionary[lang]?.digitalProductConfirmBuyMessage.replace('{product}', digitalProduct.name)}</p>
                <p>{dictionary[lang]?.digitalProductProductPrice.replace('{price}', digitalProduct.price)}</p>

                <div className={styles.buttonsContainer}>
                    {canBuy ? (
                        <button className={styles.confirmButton} onClick={() => { /* Add buy logic here */ }}>
                            {digitalProduct.price}
                            <img className={styles.iconCountImgGeneral} src="/icons/icon-coin.svg" alt="C" />
                            {dictionary[lang]?.digitalProductStoreBuyButton}
                        </button>
                    ) : (
                        <p className={styles.insufficientCoins}>
                            {dictionary[lang]?.digitalProductInsufficientCoins.replace('{remaining}', remainingCoins + "")}
                        </p>
                    )}
                    <button className={styles.cancelButton} onClick={onClose}>{dictionary[lang]?.digitalProductCancelBuyButton}</button>
                </div>
            </div>
        </div>
    );
}
