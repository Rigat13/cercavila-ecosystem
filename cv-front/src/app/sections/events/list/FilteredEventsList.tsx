import React, { useEffect, useState } from 'react';
import { EventCard } from "@/app/sections/events/card/EventCard";
import { useEventsContext } from "@/app/sections/events/EventsContext";
import styles from "./FilteredEventsList.module.scss";
import { dictionary } from "@/content";
import { eventTypes } from "@/modules/events/domain/events-attributes/EventType";
import { BuyConfirmationPopup } from "@/app/sections/events/list/BuyConfirmationPopup";

export function FilteredEventsList({ lang, isStore }: { lang: string, isStore: boolean }) {
    const { eventsNoImage, events, users } = useEventsContext();
    const [loadedEvents, setLoadedEvents] = useState([]);
    const [isEventsImagesLoaded, setIsEventsImagesLoaded] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (events.length > 0) {
            const mappedLoadedEvents = events.map((event) => {
                const existingEvent = eventsNoImage.find((fig) => fig.id === event.id);
                if (existingEvent) {
                    return { ...existingEvent, ...event };
                }
                return event;
            });
            setLoadedEvents(mappedLoadedEvents);
            setIsEventsImagesLoaded(true);
            if(localStorage) {
                setIsLoggedIn(localStorage.getItem('username') !== null);
                setUser(users.find(user => user.nickname === localStorage.getItem('username')));
            }
        }
    }, [events, eventsNoImage]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [filterType, setFilterType] = useState<string>('');

    const handleNameSearch = (event: React.ChangeEvent<HTMLInputElement>) => { setSearchTerm(event.target.value); };
    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setFilterType(event.target.value); };
    const handleAddType = () => { if (filterType && !selectedTypes.includes(filterType)) { setSelectedTypes([...selectedTypes, filterType]); } };

    const handleRemoveFilter = (type: string, category: string) => {
        switch (category) {
            case 'type': setSelectedTypes(selectedTypes.filter(t => t !== type)); break;
            default: console.error(`Invalid category: ${category}`); break;
        }
    };

    const getAdditionalStyle = (value: string, category: string) => {
        let backgroundColor = "#111111"; let color = "#FFFFFF";
        switch (category) {
            case 'type':
                return { backgroundColor, color };
            default: return {};
        }
    }

    // Retrieve current user's digital products from local storage
    const getCurrentUserEvents = () => {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') { return []; }
        const username = localStorage.getItem('username');
        const user = users.find(user => user.nickname === username);
        return user?.events || [];
    };

    const userEvents = getCurrentUserEvents();

    // Handle buy button click
    const handleBuyButtonClick = (event) => {
        setSelectedProduct(event);
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
        setSelectedProduct(null);
    };

    return (
        <section>
            <section className={styles.centeredSection}>
                {isStore && <h1 className={styles.title}>{dictionary[lang]?.storeTitle}</h1>}
                {!isStore && <h1 className={styles.h1}>{dictionary[lang]?.eventsTitle}</h1>}
            </section>
            {/* ------------------------------------------------- TYPE SELECTOR -------------------------------------------------*/}
            <div className={styles.filter}>

                <div className={styles.filtersWrapper}>
                    {isStore && user &&
                        <div className={styles.coinsCount}>
                            <span>{user.coins}</span>
                            <img className={styles.iconCountImg} src="/icons/icon-coin.svg" alt="C" />
                        </div>
                    }
                    <div className={styles.filterSection}>
                        <label className={styles.filterTitle} htmlFor="name">{dictionary[lang]?.collaFilterByName}</label>
                        <div className={styles.filterInnerSection}>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={searchTerm}
                                onChange={handleNameSearch}
                                placeholder={dictionary[lang]?.collaFilterWriteName}
                            />
                        </div>
                    </div>
                    <div className={styles.filterSection}>
                        <label className={styles.filterTitle} htmlFor="type">{dictionary[lang]?.collaFilterByType}</label>
                        <div className={styles.filterInnerSection}>
                            <select id="type" name="type" value={filterType} onChange={handleTypeChange} >
                                <option value="">{dictionary[lang]?.collaFilterByType}</option>
                                {eventTypes.map(option => (
                                    <option
                                        key={option.labelKey}
                                        value={option.labelKey}
                                        disabled={selectedTypes.includes(option.labelKey)}
                                    > {dictionary[lang]?.[option.labelKey]} </option>
                                ))}
                            </select>
                            <button className={styles.addFilterButton} onClick={handleAddType}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------------------------------------------------- SELECTED ROLES-COLLES -------------------------------------------------*/}
            <div className={styles.selectedFilters}>
                {[
                    ...selectedTypes.map(type => ({ value: type, category: 'type' })),
                ].map(({ value, category }) => {
                    const itemName = dictionary[lang]?.[value];
                    return (
                        <div key={`${category}-${value}`} className={styles.selectedFilter}
                             style={getAdditionalStyle(value, category)}>
                            <span> {itemName} </span>
                            <button className={styles.selectedFilterButton} onClick={() => handleRemoveFilter(value, category)}>×</button>
                        </div>
                    );
                })}
            </div>
            {/* -----------------------------------------------------------------------------------------------------------------*/}
            {/* ------------------------------------------------ PRODUCTS RESULT ------------------------------------------------*/}
            {/* -----------------------------------------------------------------------------------------------------------------*/}
            <div className={styles.list}>

                {/* Render events with no images */}
                {!isEventsImagesLoaded && eventsNoImage
                    .filter(event =>
                        (searchTerm.trim() === ''
                            || event.name.toLowerCase().includes(searchTerm.toLowerCase())
                            || event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
                        (selectedTypes.length === 0 || selectedTypes.some(type => event.type.localeCompare(type) === 0))
                    ).map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            isBuyable={isStore && isLoggedIn}
                            isEditable={!isStore && isLoggedIn}
                            lang={lang}
                            alreadyObtained={userEvents.includes(event.id)} // Check if the product is obtained
                            onBuyButtonClick={() => handleBuyButtonClick(event)} // Handle buy button click
                        />
                    ))}

                {/* Render loaded events with images */}
                {isEventsImagesLoaded && loadedEvents
                    .filter(event =>
                        (searchTerm.trim() === ''
                            || event.name.toLowerCase().includes(searchTerm.toLowerCase())
                            || event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
                        (selectedTypes.length === 0 || selectedTypes.some(type => event.type.localeCompare(type) === 0))
                    ).map((loadedEvent) => (
                        <EventCard
                            key={loadedEvent.id}
                            event={loadedEvent}
                            isBuyable={isStore && isLoggedIn}
                            isEditable={!isStore && isLoggedIn}
                            lang={lang}
                            alreadyObtained={userEvents.includes(loadedEvent.id)} // Check if the product is obtained
                            onBuyButtonClick={() => handleBuyButtonClick(loadedEvent)} // Handle buy button click
                        />
                    ))}
            </div>
            {popupVisible && selectedProduct && localStorage && (
                <BuyConfirmationPopup
                    event={selectedProduct}
                    onClose={handleClosePopup}
                    lang={lang}
                    user={users.find(user => user.nickname === localStorage.getItem('username'))}
                />
            )}
        </section>
    )
}
