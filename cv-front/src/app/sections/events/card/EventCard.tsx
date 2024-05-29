import { Event } from "@/modules/events/domain/Event";
import styles from "./EventCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, { useEffect, useState } from "react";
import { base64ToBlob } from "@/app/sections/shared/Utilities";
import {useEventsContext} from "@/app/sections/events/EventsContext";
import {DigitalProductDetails} from "@/app/sections/digitalproducts/card/DigitalProductDetails";

export function EventCard({ event, lang }: { event: Event; lang: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const isMajorEvent = event.type === 'eventTypeCercampionatMensual' || event.type === 'eventTypeCercampionatAnual';
    const { cercatrivies } = useEventsContext();
    const { digitalProducts } = useEventsContext();

    useEffect(() => {
        if (event.image) {
            const blob = base64ToBlob(event.image as unknown as string);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [event.image]);

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
                    <img src="/icons/icon-fourthtenth.svg" alt="Fourth to Tenth Place" className={styles.rewardImage} />
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

        return (
            <div className={styles.eventCard__cercatrivies}>
                {event.cercatrivies.toString().split(",").map((id, index) => {
                    const trivia = cercatrivies.find(t => t.id === id);
                    if (!trivia) return null;

                    const triviaDate = new Date(startDate);
                    triviaDate.setDate(startDate.getDate() + index);

                    if (triviaDate > endDate) return null;

                    const formattedTriviaDate = triviaDate.toLocaleDateString(lang, { day: '2-digit', month: '2-digit' });
                    const daysRemaining = Math.floor((triviaDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                    return (
                        <div className="cercatriviaItem" key={index}>
                            <div className="circleBackground"></div>
                            <img src="/icons/icon-cercatrivia.svg" alt="Cercatrivia Icon" className="icon" />
                            <div className="date">{formattedTriviaDate}</div>
                            {daysRemaining < 7 && <div className="daysRemaining">{daysRemaining.toString()+dictionary[lang]?.days}</div>}
                        </div>
                    );
                })}
            </div>
        );
    };


    return (
        <div className={styles.eventCard} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={styles.eventCard__info} style={additionalStyle}>
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
        </div>
    );
}
