import React, { useEffect, useState } from 'react';
import styles from './BuyConfirmationPopup.module.scss';
import { dictionary } from "@/content";
import detailsStyles from "@/app/sections/shared/EventDetails.module.scss";
import { base64ToBlob } from "@/app/sections/shared/Utilities";
import { useUpdateUserForm, FormStatus } from "@/app/sections/events/list/useUpdateUserForm"; // Updated path
import { useEventsContext } from "@/app/sections/events/EventsContext";
import confetti from 'canvas-confetti';

export function BuyConfirmationPopup({ event, onClose, lang, user }) {
    const canBuy = user.coins >= event.price;
    const remainingCoins = event.price - user.coins;

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { submitForm, formStatus } = useUpdateUserForm();
    const { events } = useEventsContext();
    const [buyOrCancelButtonsVisible, setBuyOrCancelButtonsVisible] = useState(true);
    useEffect(() => {
        if (event.image) {
            const blob = base64ToBlob(event.image);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [event.image]);

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
        if (!imageUrl && event.type !== 'eventTypeUserBackgroundColour' && event.type !== 'eventTypeUserTitle') return null;
        switch (event.type) {
            case 'eventTypeUserImage':
                return (
                    <a target="_blank" className={detailsStyles.eventDetails__aImage}>
                        <div className={detailsStyles.eventDetails__image}>
                            <img
                                src={imageUrl}
                                alt={`Imatge de ${event.name}`}
                            />
                        </div>
                    </a>
                );
            case 'eventTypeUserImageFrame':
                return (
                    <a target="_blank" className={detailsStyles.eventDetails__aImageFrame}>
                        <div className={detailsStyles.eventDetails__imageFrame}>
                            <img
                                src={imageUrl}
                                alt={`Imatge de ${event.name}`}
                            />
                        </div>
                    </a>
                );
            case 'eventTypeUserBackgroundImage':
                return (
                    <a target="_blank" className={detailsStyles.eventDetails__aBackgroundImage}>
                        <div className={detailsStyles.eventDetails__backgroundImage}>
                            <img
                                src={imageUrl}
                                alt={`Imatge de ${event.name}`}
                            />
                        </div>
                    </a>
                );
            case 'eventTypeUserTitle':
                return (
                    <a target="_blank" className={detailsStyles.eventDetails__aTitle}>
                        <div className={detailsStyles.eventDetails__title}
                             style={{ background: event.primaryColour, color: event.secondaryColour }}>
                            {event.name}
                            <div className={detailsStyles.eventDetails__shine}></div>
                        </div>
                    </a>
                );
            case 'eventTypeUserBackgroundColour':
                return (
                    <a target="_blank" className={detailsStyles.eventDetails__aBackgroundColour} >
                        <div className={detailsStyles.eventDetails__backgroundColour}
                             style={{ background: event.primaryColour, color: event.secondaryColour }}>
                            Abc
                        </div>
                    </a>
                );
            case 'eventTypeSticker': case 'eventTypePin':
                return (
                    <a target="_blank" className={detailsStyles.eventDetails__aSticker}>
                        <div className={detailsStyles.eventDetails__sticker}>
                            <img
                                src={imageUrl}
                                alt={`Imatge de ${event.name}`}
                            />
                        </div>
                    </a>
                );
            case 'eventTypePin':
                return (
                    <a target="_blank" className={detailsStyles.eventDetails__aPin}>
                        <div className={detailsStyles.eventDetails__pin}>
                            <img
                                src={imageUrl}
                                alt={`Imatge de ${event.name}`}
                            />
                        </div>
                    </a>
                );
            default:
                return null;
        }
    };

    const handleBuy = async () => {
        const updatedCoins = user.coins - event.price;
        const updatedEvents = user.events ? user.events.split(',') : [];
        updatedEvents.push(event.id);
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
            events: updatedEvents,
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
                {formStatus != FormStatus.Success  && <h2 className={styles.confirmBuyTitle}>{dictionary[lang]?.eventConfirmBuyTitle}</h2>}
                {formStatus != FormStatus.Success  && <p>{dictionary[lang]?.eventConfirmBuyMessage.replace('{product}', event.name)}</p>}
                {formStatus != FormStatus.Success  && <p>{dictionary[lang]?.eventProductPrice.replace('{price}', event.price)}</p>}
                {formStatus === FormStatus.Success  && <p className={styles.superCongratulationsTitle}>{dictionary[lang]?.eventSuccessBuyMessage}</p>}

                <div className={styles.buttonsContainer}>
                    {canBuy && buyOrCancelButtonsVisible ? (
                        <button className={styles.confirmButton} onClick={handleBuy}>
                            {event.price}
                            <img className={styles.iconCountImgGeneral} src="/icons/icon-coin.svg" alt="C" />
                            {dictionary[lang]?.eventStoreBuyButton}
                        </button>
                    ) : !canBuy && buyOrCancelButtonsVisible ? (
                        <p className={styles.insufficientCoins}>
                            {dictionary[lang]?.eventInsufficientCoins.replace('{remaining}', remainingCoins + "")}
                        </p>
                    ) : null}
                    {buyOrCancelButtonsVisible && <button className={styles.cancelButton} onClick={onClose}>{dictionary[lang]?.eventCancelBuyButton}</button>}
                    {formStatus === FormStatus.Loading && <p className={styles.updateUserStatusLoading}>{dictionary[lang]?.loading}</p>}
                    {formStatus === FormStatus.Success && <p className={styles.updateUserStatusSuccess}>{dictionary[lang]?.successUpdate}</p>}
                    {formStatus === FormStatus.Error && <p className={styles.updateUserStatusError}>{dictionary[lang]?.errorUpdate}</p>}
                </div>
            </div>
        </div>
    );
}
