import { Event } from "@/modules/events/domain/Event";
import styles from "./EventCard.module.scss";
import detailsStyles from "@/app/sections/shared/EventDetails.module.scss";
import { defaultLang, dictionary } from "@/content";
import React, {useEffect, useState} from "react";
import {base64ToBlob} from "@/app/sections/shared/Utilities";

export function EventCard({ event, lang, isBuyable, alreadyObtained, isEditable, onBuyButtonClick  }: { event: Event; lang: string; isBuyable: boolean, alreadyObtained: boolean, isEditable: boolean, onBuyButtonClick: () => void }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [buyable, setBuyable] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(isEditable);
    const eventExclusive = event.price === 0;

    useEffect(() => {
        setBuyable(isBuyable);
        setEditable(isEditable);
        if (event.image) {
            const blob = base64ToBlob(event.image as unknown as string);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [event.image, isBuyable, isEditable]);

    // ---------------------------------------------------------- CARD COLOUR CHANGE ON HOVER IF BACKGROUND COLOUR TYPE
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => { setIsHovered(true); };
    const handleMouseLeave = () => { setIsHovered(false); };
    const hoverStyle = event.type === "eventTypeUserBackgroundColour" && isHovered ? {
        backgroundColor: event.primaryColour,
        color: event.secondaryColour,
        boxShadow: 'inset 0 0 0rem 0.6rem ' + event.secondaryColour,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    } : {};

    const productCardOverlayStyle = (alreadyObtained && buyable) ? { // If the product is already obtained, make it semi-transparent and unclickable (when on store, buyable)
        opacity: 0.5,
        //pointerEvents: 'none',
    } : {};

    // ----------------------------------------------------------------------------------------------------------------

    const renderProductDetails = () => {
        if (!imageUrl && event.type !='eventTypeUserBackgroundColour' && event.type!='eventTypeUserTitle') return null;
        switch (event.type) {
            case 'eventTypeUserImage':
                return <a target="_blank" className={detailsStyles.eventDetails__aImage}>
                    <div className={detailsStyles.eventDetails__image}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${event.name}`}
                        />
                    </div>
                </a>;
            case 'eventTypeUserImageFrame':
                return <a target="_blank" className={detailsStyles.eventDetails__aImageFrame}>
                    <div className={detailsStyles.eventDetails__imageFrame}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${event.name}`}
                        />
                    </div>
                </a>;
            case 'eventTypeUserBackgroundImage':
                return <a target="_blank" className={detailsStyles.eventDetails__aBackgroundImage}>
                    <div className={detailsStyles.eventDetails__backgroundImage}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${event.name}`}
                        />
                    </div>
                </a>;
            case 'eventTypeUserTitle':
                return <a target="_blank" className={detailsStyles.eventDetails__aTitle}>
                    <div className={detailsStyles.eventDetails__title}
                        style={{ background: event.primaryColour, color: event.secondaryColour }}>
                        {event.name}
                    </div>
                </a>;
            case 'eventTypeUserBackgroundColour':
                return <a target="_blank" className={detailsStyles.eventDetails__aBackgroundColour} >
                    <div className={detailsStyles.eventDetails__backgroundColour}
                        style={{ background: event.primaryColour, color: event.secondaryColour }}>
                        Abc
                    </div>
                </a>;
            case 'eventTypeSticker': case 'eventTypePin':
                let isSpecialEditionMagnet = event.name.includes('-E-');
                return <a target="_blank" className={detailsStyles.eventDetails__aSticker}>
                    <div className={detailsStyles.eventDetails__sticker}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${event.name}`}
                        />
                        {isSpecialEditionMagnet && <div className={detailsStyles.eventDetails__goldenShine}></div>}
                    </div>
                </a>;
            case 'eventTypePin':
                return <a target="_blank" className={detailsStyles.eventDetails__aPin}>
                    <div className={detailsStyles.eventDetails__pin}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${event.name}`}
                        />
                    </div>
                </a>;
        }
    };

    return (
        <div className={styles.eventCard} style={productCardOverlayStyle}>
            <div className={`${styles.eventCard__info}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={hoverStyle} >
                {renderProductDetails()}
                {!buyable && editable && (<a href={`events/update.html?eventId=${event.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                    <button className={styles.updateButton}>
                        <img src="/icons/icon-edit.svg" alt="Editar" />
                    </button>
                </a>
                )}
                {eventExclusive && (<p className={styles.eventCard__eventExclusiveTag}>{dictionary[lang]?.eventEventExclusive}</p>)}
                <p className={styles.eventCard__type}>{dictionary[lang]?.[event.type]}</p>
                <h3 className={styles.eventCard__name}>{event.name}</h3>
                <p className={styles.eventCard__description}>{event.description}</p>
                {!eventExclusive && buyable && !alreadyObtained && (
                    <button type="button" onClick={onBuyButtonClick} className={styles.selectedElementCombined} >
                        <span className={styles.buyText}> {dictionary[lang]?.eventStoreBuyButton} </span>
                        <span className={styles.priceText}>
                            {event.price}
                            <img className={styles.iconCountImgGeneral} src="/icons/icon-coin.svg" alt="C" />
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}