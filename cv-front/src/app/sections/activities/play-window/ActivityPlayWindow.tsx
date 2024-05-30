import React, { useEffect, useState } from 'react';
import styles from './ActivityPlayWindow.module.scss';
import { dictionary } from "@/content";
import detailsStyles from "@/app/sections/shared/DigitalProductDetails.module.scss";
import { base64ToBlob } from "@/app/sections/shared/Utilities";
import { useUpdateUserForm, FormStatus } from "@/app/sections/digitalproducts/list/useUpdateUserForm"; // Updated path
import { useDigitalProductsContext } from "@/app/sections/digitalproducts/DigitalProductsContext";
import confetti from 'canvas-confetti';

export function ActivityPlayWindow({ activity, onClose, lang, user }) {
    const canBuy = user.coins >= activity.price;
    const remainingCoins = activity.price - user.coins;

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { submitForm, formStatus } = useUpdateUserForm();
    const { digitalProducts } = useDigitalProductsContext();
    const [buyOrCancelButtonsVisible, setBuyOrCancelButtonsVisible] = useState(true);
    useEffect(() => {
        if (activity.image) {
            const blob = base64ToBlob(activity.image);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [activity.image]);

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
        if (!imageUrl && activity.type !== 'digitalProductTypeUserBackgroundColour' && activity.type !== 'digitalProductTypeUserTitle') return null;
        switch (activity.type) {
            case 'digitalProductTypeUserImage':
                return (
                    <a target="_blank" className={detailsStyles.digitalProductDetails__aImage}>
                        <div className={detailsStyles.digitalProductDetails__image}>
                            <img
                                src={imageUrl}
                                alt={`Imatge de ${activity.name}`}
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
                                alt={`Imatge de ${activity.name}`}
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
                                alt={`Imatge de ${activity.name}`}
                            />
                        </div>
                    </a>
                );
            case 'digitalProductTypeUserTitle':
                return (
                    <a target="_blank" className={detailsStyles.digitalProductDetails__aTitle}>
                        <div className={detailsStyles.digitalProductDetails__title}
                             style={{ background: activity.primaryColour, color: activity.secondaryColour }}>
                            {activity.name}
                            <div className={detailsStyles.digitalProductDetails__shine}></div>
                        </div>
                    </a>
                );
            case 'digitalProductTypeUserBackgroundColour':
                return (
                    <a target="_blank" className={detailsStyles.digitalProductDetails__aBackgroundColour} >
                        <div className={detailsStyles.digitalProductDetails__backgroundColour}
                             style={{ background: activity.primaryColour, color: activity.secondaryColour }}>
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
                                alt={`Imatge de ${activity.name}`}
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
                                alt={`Imatge de ${activity.name}`}
                            />
                        </div>
                    </a>
                );
            default:
                return null;
        }
    };

    const handleBuy = async () => {
        const updatedCoins = user.coins - activity.price;
        const updatedDigitalProducts = user.digitalProducts ? user.digitalProducts.split(',') : [];
        updatedDigitalProducts.push(activity.id);
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
                {formStatus != FormStatus.Success  && <p>{dictionary[lang]?.digitalProductConfirmBuyMessage.replace('{product}', activity.name)}</p>}
                {formStatus != FormStatus.Success  && <p>{dictionary[lang]?.digitalProductProductPrice.replace('{price}', activity.price)}</p>}
                {formStatus === FormStatus.Success  && <p className={styles.superCongratulationsTitle}>{dictionary[lang]?.digitalProductSuccessBuyMessage}</p>}

                <div className={styles.buttonsContainer}>
                    {canBuy && buyOrCancelButtonsVisible ? (
                        <button className={styles.confirmButton} onClick={handleBuy}>
                            {activity.price}
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
