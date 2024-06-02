import { Event } from "@/modules/events/domain/Event";
import styles from "./EventCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, { useEffect, useState } from "react";
import { base64ToBlob } from "@/app/sections/shared/Utilities";
import {useEventsContext} from "@/app/sections/events/EventsContext";
import {DigitalProductDetails} from "@/app/sections/digitalproducts/card/DigitalProductDetails";
import {Activity, CERCATRIVIA_EXPIRATION_DAYS} from "@/modules/activities/domain/Activity";
import {ActivityPlayWindow} from "@/app/sections/activities/play-window/ActivityPlayWindow";

export function EventCard({ event, lang }: { event: Event; lang: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const isMajorEvent = event.type === 'eventTypeCercampionatMensual' || event.type === 'eventTypeCercampionatAnual';
    const { cercatrivies } = useEventsContext();
    const { digitalProducts } = useEventsContext();

    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedActivityIsDoubleCoins, setSelectedActivityIsDoubleCoins] = useState(false);

    const { users } = useEventsContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const [hasExpired, setHasExpired] = useState(false);
    const additionalActiveStyle = hasExpired ? { opacity: 0.5 } : {};

    useEffect(() => {
        if (event.image) {
            const blob = base64ToBlob(event.image as unknown as string);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
        if(localStorage) {
            setIsLoggedIn(localStorage.getItem('username') !== null);
            setUser(users.find(user => user.nickname === localStorage.getItem('username')));
        }
    }, [event.image]);

    useEffect(() => {
        const today = new Date();
        const endDate = new Date(event.endDate);
        setHasExpired(today > endDate);
    }, [event.endDate]);

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => { setIsHovered(true); };
    const handleMouseLeave = () => { setIsHovered(false); };

    const additionalStyle = isHovered ? {
        backgroundColor: event.secondaryColour,
        color: event.primaryColour,
        boxShadow: 'inset 0 0 0rem 0.6rem ' + event.primaryColour,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    } : {
        backgroundColor: event.primaryColour,
        color: event.secondaryColour,
        boxShadow: 'inset 0 0 0rem 0.6rem ' + event.secondaryColour,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    };

    const datesStyle = isHovered ? {
        backgroundColor: event.primaryColour,
        color: event.secondaryColour,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    } : {
        backgroundColor: event.secondaryColour,
        color: event.primaryColour,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    }

    const lastDateStyle = { backgroundColor: "#de2b69", color: "#ffffff",}

    const renderDigitalProductsImages = (digitalProductsIds: string[]) => {
        return digitalProductsIds.toString().split(",").map((digitalProductId, index) => {
            const digitalProduct = digitalProducts.find(product => product.id === digitalProductId);
            if (!digitalProduct) return null;
            const digitalProductImageBlob = base64ToBlob(digitalProduct.image as unknown as string);
            const digitalProductImageUrl = URL.createObjectURL(digitalProductImageBlob);
            return (
                <div className={styles.digitalProductImageWrapper} key={index}>
                    {digitalProduct.type === 'digitalProductTypeUserTitle' ? (
                        <div className={styles.digitalProductText}> <DigitalProductDetails digitalProduct={digitalProduct} /></div>
                    ) : (
                        <div className={styles.digitalProductImage}> <DigitalProductDetails digitalProduct={digitalProduct} /></div>
                    )}
                    <span className={styles.digitalProductImageLabel}>{digitalProduct.name}</span>
                </div>
            );
        });
    };

    const renderRewards = () => {
        if (!isMajorEvent) return null;

        return (
            <div className={styles.eventCard__rewards}>
                <div className={styles.rewardLine}>
                    <img src="/icons/icon-first.svg" alt="First Place" className={styles.rewardImage} />
                    <span className={styles.coins}>{event.firstCoinsReward}</span>
                    <img src="/icons/icon-coin.svg" alt="Coin" className={styles.coinIcon} />
                    <div className={styles.rewardImagesContainer}>
                        {renderDigitalProductsImages(event.firstDigitalProductsReward)}
                    </div>
                </div>

                <div className={styles.rewardLine}>
                    <img src="/icons/icon-second.svg" alt="Second Place" className={styles.rewardImage} />
                    <span className={styles.coins}>{event.secondCoinsReward}</span>
                    <img src="/icons/icon-coin.svg" alt="Coin" className={styles.coinIcon} />
                    <div className={styles.rewardImagesContainer}>
                        {renderDigitalProductsImages(event.secondDigitalProductsReward)}
                    </div>
                </div>

                <div className={styles.rewardLine}>
                    <img src="/icons/icon-third.svg" alt="Third Place" className={styles.rewardImage} />
                    <span className={styles.coins}>{event.thirdCoinsReward}</span>
                    <img src="/icons/icon-coin.svg" alt="Coin" className={styles.coinIcon} />
                    <div className={styles.rewardImagesContainer}>
                        {renderDigitalProductsImages(event.thirdDigitalProductsReward)}
                    </div>
                </div>

                <div className={styles.rewardLine}>
                    <img src="/icons/icon-fourthTenth.svg" alt="Fourth to Tenth Place" className={styles.rewardImage} />
                    <span className={styles.coins}>{event.fourthTenthCoinsReward}</span>
                    <img src="/icons/icon-coin.svg" alt="Coin" className={styles.coinIcon} />
                    <div className={styles.rewardImagesContainer}>
                        {renderDigitalProductsImages(event.fourthTenthDigitalProductsReward)}
                    </div>
                </div>

            </div>
        );
    };



    const renderAllRewards = () => {
        return (
            <div className={styles.eventCard__rewards}>
                <div className={styles.rewardLine}>
                    <span className={styles.coins}>{event.allCoinsReward}</span>
                    <img src="/icons/icon-coin.svg" alt="Coin" className={styles.coinIcon} />
                    <div className={styles.rewardImagesContainer}>
                        {renderDigitalProductsImages(event.allDigitalProductsReward)}
                    </div>
                </div>
            </div>
        );
    };

    const formattedStartDate = new Date(event.startDate).toLocaleDateString(lang);
    const formattedEndDate = new Date(event.endDate).toLocaleDateString(lang);
    const formattedStartTime = new Date(event.startDate).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = new Date(event.endDate).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });

    const renderCercatrivies = () => {
        if (!event.cercatrivies) return null;

        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        const today = new Date();
        // ----------------------------------------------------------------------------------------- TIME REMAINING COUNTDOWN
        return (
            <div className={styles.eventCard__cercatrivies}>
                {event.cercatrivies.toString().split(",").map((id, index) => {
                    const trivia = cercatrivies.find(t => t.id === id);
                    if (!trivia) return null;

                    const triviaDate = new Date(startDate);
                    triviaDate.setDate(startDate.getDate() + index);
                    if (triviaDate > endDate) return null;
                    const formattedTriviaDate = triviaDate.toLocaleDateString(lang, { day: '2-digit', month: '2-digit' });

                    const timeDifference =  (today.getTime() - triviaDate.getTime());
                    const daysRemaining = CERCATRIVIA_EXPIRATION_DAYS - Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    const hoursRemaining = CERCATRIVIA_EXPIRATION_DAYS*24 - Math.floor(timeDifference / (1000 * 60 * 60));
                    const minutesRemainingAfterHours = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                    const minutesRemainingAfterHoursString = minutesRemainingAfterHours < 10 ? "0" + minutesRemainingAfterHours : minutesRemainingAfterHours.toString();
                    const stillTimeRemaining = daysRemaining >= 0 && hoursRemaining >= 0 && minutesRemainingAfterHours >= 0;
                    let daysRemainingText = '';

                    if (timeDifference > 0 && hoursRemaining < 24) {
                        daysRemainingText = dictionary[lang]?.remain +" "+ hoursRemaining + "." + minutesRemainingAfterHoursString + dictionary[lang]?.hours;
                    } else if (daysRemaining >= 1) {
                        daysRemainingText = dictionary[lang]?.remain +" "+ daysRemaining + ' ' + dictionary[lang]?.days;
                    }

                    // If onClick={handleActivityButtonClick(trivia), trivia is called immediately, and so at the start it returns an undefined.
                    // So it is needed a function to be called only when the button is clicked, onClick={() => handleActivityButtonClick(trivia)}.
                    return (
                        <div key={index}>
                            {stillTimeRemaining && (
                                <button className={styles.cercatriviaItem} onClick={() => handleActivityButtonClick(trivia, daysRemaining === 7)}>
                                    <div className={styles.circleBackground} style={datesStyle}></div>
                                    <img src="/icons/icon-cercatrivia-min.svg" className={styles.icon}/>
                                    <div className={styles.date} style={datesStyle}> {formattedTriviaDate} </div>
                                    {hoursRemaining < 24 && <div className={styles.daysRemaining} style={lastDateStyle}>{daysRemainingText}</div>}
                                    {daysRemaining > 1 && daysRemaining < 7 && <div className={styles.daysRemaining}>{daysRemainingText}</div>}
                                    {daysRemaining === 7 &&
                                        <div className={styles.x2rewardLine}>
                                            <span className={styles.x2coins}>x2</span>
                                            <img src="/icons/icon-coin.svg" alt="Coin" className={styles.coinIcon} />
                                        </div>
                                    }
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const handleActivityButtonClick = (activity, isDoubleCoins) => {
        if (!isLoggedIn) return window.location.href = `/login.html`; // Could also add redirect, but did now work with client side routing
        else {
            setSelectedActivity(activity);
            setSelectedActivityIsDoubleCoins(isDoubleCoins);
            setPopupVisible(true);
        }
    };

    const handleActivityClose = () => {
        setPopupVisible(false);
        setSelectedActivity(null);
        setSelectedActivityIsDoubleCoins(false);
    };

    return (
        <div className={styles.eventCard} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={`${styles.eventCard__info} ${hasExpired ? styles.expiredEventCard : ''} `} style={additionalStyle}>
                {imageUrl && (
                    <div className={styles.eventCard__image}>
                        <img src={imageUrl} alt={`Image of ${event.name}`} />
                    </div>
                )}
                <p className={styles.eventCard__description}>{event.description}</p>
                <p className={styles.eventCard__dates} style={datesStyle}> {dictionary[lang]?.start}: {formattedStartDate} {formattedStartTime} </p>
                <p className={styles.eventCard__dates} style={datesStyle}> {dictionary[lang]?.end}: {formattedEndDate} {formattedEndTime} </p>
                {renderCercatrivies()}
                {isMajorEvent ? renderRewards() : renderAllRewards()}
            </div>

            <a href={`/events/update.html?eventId=${event.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                <button className={styles.updateButton}>
                    <img src="/icons/icon-edit.svg" alt="Editar" />
                </button>
            </a>

            {popupVisible && selectedActivity && selectedActivityIsDoubleCoins != undefined && localStorage && (
                <ActivityPlayWindow
                    activity={selectedActivity as Activity}
                    onClose={handleActivityClose}
                    lang={lang}
                    user={users.find(user => user.nickname === localStorage.getItem('username'))}
                    doubleCoins={selectedActivityIsDoubleCoins}
                />
            )}
        </div>
    );
}
