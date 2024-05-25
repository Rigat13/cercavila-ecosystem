import React, { useEffect, useState } from 'react';
import styles from './BuyConfirmationPopup.module.scss';
import { dictionary } from "@/content";
import detailsStyles from "@/app/sections/shared/DigitalProductDetails.module.scss";
import { base64ToBlob } from "@/app/sections/shared/Utilities";
import { useUpdateUserForm, FormStatus } from "@/app/sections/digitalproducts/list/useUpdateUserForm"; // Updated path
import { useDigitalProductsContext } from "@/app/sections/digitalproducts/DigitalProductsContext";
import confetti from 'canvas-confetti';

export function BuyConfirmationPopup({ digitalProduct, onClose, lang, user }) {
    const canBuy = user.coins >= digitalProduct.price;
    const remainingCoins = digitalProduct.price - user.coins;

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { submitForm, formStatus } = useUpdateUserForm();
    const { digitalProducts } = useDigitalProductsContext();
    const [buyOrCancelButtonsVisible, setBuyOrCancelButtonsVisible] = useState(true);
    useEffect(() => {
        if (digitalProduct.image) {
            const blob = base64ToBlob(digitalProduct.image);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [digitalProduct.image]);

    useEffect(() => {
        if (formStatus === FormStatus.Success) {
            confetti({
                zIndex: 200,
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [formStatus]);

    const renderProductDetails = () => {
        if (!imageUrl && digitalProduct.type !== 'digitalProductTypeUserBackgroundColour' && digitalProduct.type !== 'digitalProductTypeUserTitle') return null;
        switch (digitalProduct.type) {
            case 'digitalProductTypeUserImage':
                return (
                    <a target="_blank" className={detailsStyles.digitalProductDetails__aImage}>
                        <div className={detailsStyles.digitalProductDetails__image}>
                            <img
                                src={imageUrl}
                                alt={`Imatge de ${digitalProduct.name}`}
                            />
                        </div>
                    </a>
                );
            case 'digitalProductTypeUserImageFrame':
                return (
                    <a target="_blank" className={detailsStyles.digitalProductDetails__aImageFrame}>
                        <div className={detailsStyles.digitalProductDetails__imageFrame}>
                            <img
                                src={imageUrl}
                                alt={`Imatge de ${digitalProduct.name}`}
                            />
                        </div>
                    </a>
                );
            case 'digitalProductTypeUserBackgroundImage':
                return (
                    <a target="_blank" className={detailsStyles.digitalProductDetails__aBackgroundImage}>
                        <div className={detailsStyles.digitalProductDetails__backgroundImage}>
                            <img
                                src={imageUrl}
                                alt={`Imatge de ${digitalProduct.name}`}
                            />
                        </div>
                    </a>
                );
            case 'digitalProductTypeUserTitle':
                return (
                    <a target="_blank" className={detailsStyles.digitalProductDetails__aTitle}>
                        <div className={detailsStyles.digitalProductDetails__title}
                             style={{ background: digitalProduct.primaryColour, color: digitalProduct.secondaryColour }}>
                            {digitalProduct.name}
                            <div className={detailsStyles.digitalProductDetails__shine}></div>
                        </div>
                    </a>
                );
            case 'digitalProductTypeUserBackgroundColour':
                return (
                    <a target="_blank" className={detailsStyles.digitalProductDetails__aBackgroundColour} >
                        <div className={detailsStyles.digitalProductDetails__backgroundColour}
                             style={{ background: digitalProduct.primaryColour, color: digitalProduct.secondaryColour }}>
                            Abc
                        </div>
                    </a>
                );
            case 'digitalProductTypeSticker': case 'digitalProductTypePin':
                return (
                    <a target="_blank" className={detailsStyles.digitalProductDetails__aSticker}>
                        <div className={detailsStyles.digitalProductDetails__sticker}>
                            <img
                                src={imageUrl}
                                alt={`Imatge de ${digitalProduct.name}`}
                            />
                        </div>
                    </a>
                );
            case 'digitalProductTypePin':
                return (
                    <a target="_blank" className={detailsStyles.digitalProductDetails__aPin}>
                        <div className={detailsStyles.digitalProductDetails__pin}>
                            <img
                                src={imageUrl}
                                alt={`Imatge de ${digitalProduct.name}`}
                            />
                        </div>
                    </a>
                );
            default:
                return null;
        }
    };

    const handleBuy = async () => {
        const updatedCoins = user.coins - digitalProduct.price;
        const updatedDigitalProducts = user.digitalProducts ? user.digitalProducts.split(',') : [];
        updatedDigitalProducts.push(digitalProduct.id);
        setBuyOrCancelButtonsVisible(false);

        await submitForm({
            id: user.id,
            nickname: user.nickname,
            name: user.name,
            firstSurname: user.firstSurname,
            secondSurname: user.secondSurname,
            email: user.email,
            password: user.password,
            roles: user.roles.toString().split(','),
            coins: updatedCoins,
            digitalProducts: updatedDigitalProducts,
            activeUserImage: user.activeUserImage,
            activeUserImageFrame: user.activeUserImageFrame,
            activeUserBackgroundImage: user.activeUserBackgroundImage,
            activeUserTitle: user.activeUserTitle,
            activeUserBackgroundColour: user.activeUserBackgroundColour,
            activePins: user.activePins,
        });

    };

    const handleClose = () => {
        setBuyOrCancelButtonsVisible(true);
        onClose();
    }

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                {renderProductDetails()}
                <button className={styles.closePopupButton} type="button" onClick={handleClose}>×</button>
                <div className={styles.coinsCount}>
                    <span>{user.coins}</span>
                    <img className={styles.iconCountImg} src="/icons/icon-coin.svg" alt="C" />
                </div>
                {formStatus != FormStatus.Success  && <h2 className={styles.confirmBuyTitle}>{dictionary[lang]?.digitalProductConfirmBuyTitle}</h2>}
                {formStatus != FormStatus.Success  && <p>{dictionary[lang]?.digitalProductConfirmBuyMessage.replace('{product}', digitalProduct.name)}</p>}
                {formStatus != FormStatus.Success  && <p>{dictionary[lang]?.digitalProductProductPrice.replace('{price}', digitalProduct.price)}</p>}
                {formStatus === FormStatus.Success  && <p className={styles.superCongratulationsTitle}>{dictionary[lang]?.digitalProductSuccessBuyMessage}</p>}

                <div className={styles.buttonsContainer}>
                    {canBuy && buyOrCancelButtonsVisible ? (
                        <button className={styles.confirmButton} onClick={handleBuy}>
                            {digitalProduct.price}
                            <img className={styles.iconCountImgGeneral} src="/icons/icon-coin.svg" alt="C" />
                            {dictionary[lang]?.digitalProductStoreBuyButton}
                        </button>
                    ) : !canBuy && buyOrCancelButtonsVisible ? (
                        <p className={styles.insufficientCoins}>
                            {dictionary[lang]?.digitalProductInsufficientCoins.replace('{remaining}', remainingCoins + "")}
                        </p>
                    ) : null}
                    {buyOrCancelButtonsVisible && <button className={styles.cancelButton} onClick={onClose}>{dictionary[lang]?.digitalProductCancelBuyButton}</button>}
                    {formStatus === FormStatus.Loading && <p className={styles.updateUserStatusLoading}>{dictionary[lang]?.loading}</p>}
                    {formStatus === FormStatus.Success && <p className={styles.updateUserStatusSuccess}>{dictionary[lang]?.successUpdate}</p>}
                    {formStatus === FormStatus.Error && <p className={styles.updateUserStatusError}>{dictionary[lang]?.errorUpdate}</p>}
                </div>
            </div>
        </div>
    );
}
