import { Event } from "@/modules/events/domain/Event";
import styles from "./EventCard.module.scss";
import detailsStyles from "@/app/sections/shared/EventDetails.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, { useEffect, useState } from "react";
import { base64ToBlob } from "@/app/sections/shared/Utilities";

export function EventCard({ event, lang }: { event: Event; lang: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const isMajorEvent = event.type === 'eventTypeCercampionatMensual' || event.type === 'eventTypeCercampionatAnual';

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

    const hoverStyle = isHovered ? {
        backgroundColor: event.primaryColour,
        color: event.secondaryColour,
        boxShadow: 'inset 0 0 0rem 0.6rem ' + event.secondaryColour,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    } : {};

    const renderRewards = () => {
        if (!isMajorEvent) return null;
        return (
            <div className={styles.eventCard__rewards}>
                <p>{dictionary[lang]?.firstPlace}: {event.firstCoinsReward} coins, {event.firstDigitalProductsReward.join(", ")}</p>
                <p>{dictionary[lang]?.secondPlace}: {event.secondCoinsReward} coins, {event.secondDigitalProductsReward.join(", ")}</p>
                <p>{dictionary[lang]?.thirdPlace}: {event.thirdCoinsReward} coins, {event.thirdDigitalProductsReward.join(", ")}</p>
                <p>{dictionary[lang]?.fourthToTenthPlace}: {event.fourthTenthCoinsReward} coins, {event.fourthTenthDigitalProductsReward.join(", ")}</p>
            </div>
        );
    };

    const renderAllRewards = () => {
        return (
            <div className={styles.eventCard__allRewards}>
                <p>{dictionary[lang]?.allParticipants}: {event.allCoinsReward} coins, {event.allDigitalProductsReward.join(", ")}</p>
            </div>
        );
    };

    const renderEventDetails = () => {
        return (
            <a target="_blank" className={detailsStyles.eventDetails__aImage}>
                <div className={detailsStyles.eventDetails__image}>
                    <img src={imageUrl} alt={`Image of ${event.name}`} />
                </div>
            </a>
        );
    };

    const formattedStartDate = new Date(event.startDate).toLocaleDateString(lang);
    const formattedEndDate = new Date(event.endDate).toLocaleDateString(lang);

    return (
        <div className={styles.eventCard} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={hoverStyle}>
            <div className={styles.eventCard__info}>
                {renderEventDetails()}
                <h3 className={styles.eventCard__name}>{event.name}</h3>
                <p className={styles.eventCard__description}>{event.description}</p>
                <p className={styles.eventCard__dates}>
                    {formattedStartDate} - {formattedEndDate}
                </p>
                <div className={styles.eventCard__cercatrivies}>
                    <ul>
                        {event.cercatrivies.map((trivia, index) => (
                            <li key={index}>{trivia}</li>
                        ))}
                    </ul>
                </div>
                {isMajorEvent ? renderRewards() : renderAllRewards()}
            </div>
        </div>
    );
}
