import { Event } from "@/modules/events/domain/Event";
import styles from "./EventCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, { useEffect, useState } from "react";
import { base64ToBlob } from "@/app/sections/shared/Utilities";
import {useEventsContext} from "@/app/sections/events/EventsContext";

export function EventCard({ event, lang }: { event: Event; lang: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const isMajorEvent = event.type === 'eventTypeCercampionatMensual' || event.type === 'eventTypeCercampionatAnual';
    const { cercatrivies } = useEventsContext();

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

    const renderRewards = () => {
        if (!isMajorEvent) return null;
        return (
            <div className={styles.eventCard__rewards}>
                <p>{dictionary[lang]?.firstPlace}: {event.firstCoinsReward} coins, {event.firstDigitalProductsReward.toString()}</p>
                <p>{dictionary[lang]?.secondPlace}: {event.secondCoinsReward} coins, {event.secondDigitalProductsReward.toString()}</p>
                <p>{dictionary[lang]?.thirdPlace}: {event.thirdCoinsReward} coins, {event.thirdDigitalProductsReward.toString()}</p>
                <p>{dictionary[lang]?.fourthToTenthPlace}: {event.fourthTenthCoinsReward} coins, {event.fourthTenthDigitalProductsReward.toString()}</p>
            </div>
        );
    };

    const renderAllRewards = () => {
        return (
            <div className={styles.eventCard__allRewards}>
                {event.allDigitalProductsReward && (<p>{dictionary[lang]?.allParticipants}: {event.allCoinsReward} coins, {event.allDigitalProductsReward.toString()}</p>)}
            </div>
        );
    };

    const formattedStartDate = new Date(event.startDate).toLocaleDateString(lang);
    const formattedEndDate = new Date(event.endDate).toLocaleDateString(lang);
    const formattedStartTime = new Date(event.startDate).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = new Date(event.endDate).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });

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
                {event.cercatrivies  && (<div className={styles.eventCard__cercatrivies}>
                    <ul>
                        {event.cercatrivies.map((trivia, index) => (
                            <li key={index}>{trivia}</li>
                        ))}
                    </ul>
                </div>)}
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
