import React, {useEffect, useState} from "react";
import { User } from "@/modules/users/domain/User";
import styles from "./UserPage.module.scss";
import {Colla} from "@/modules/colles/domain/Colla";
import classNames from "classnames";
import detailsStyles from "@/app/sections/shared/DigitalProductDetails.module.scss";
import {defaultLang, dictionary} from "@/content";
import useMediaQuery, {base64ToBlob, generateRandomColorFilter, getDefaultUserImage} from "@/app/sections/shared/Utilities";
import {getRolesAdditionalStyle, roleOrderMap} from "@/modules/users/domain/user-attributes/UserRoles";
import {getContrastColour} from "@/app/sections/shared/getContrastColour";
import {useUsersContext} from "@/app/sections/users/UsersContext";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct"; // Import SCSS module for styles

export function UserPage({ user, lang }: { user: User; lang: string }) {
    const {
        nickname,
        name,
        firstSurname,
        secondSurname,
        roles,
        coins,
        activeUserImage,
        activeUserImageFrame,
        activeUserBackgroundImage,
        activeUserTitle,
        activeUserBackgroundColour,
        activePins,
    } = user;
    const { colles } = useUsersContext();
    const {digitalProducts} = useUsersContext();

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageFrameUrl, setImageFrameUrl] = useState<string | null>(null);
    const [imageBackgroundUrl, setImageBackgroundUrl] = useState<string | null>(null);
    const [imagePinUrls, setImagePinUrls] = useState<string[]>([]);
    const [title, setTitle] = useState<DigitalProduct | null>(null);
    const [theme, setTheme] = useState<DigitalProduct | null>(null);
    const [randomColourFilter] = useState(generateRandomColorFilter());
    const [addingPins, setAddingPins] = useState(false);
    const [editingPins, setEditingPins] = useState(false);
    const [deletingPins, setDeletingPins] = useState(false);
    const [visibleActivePins, setVisibleActivePins] = useState<string[]>(activePins.split(","));

    const sortedRoles = roles.split(',').sort((a, b) => {
        const [roleNameA] = a.split('-');
        const [roleNameB] = b.split('-');
        return (roleOrderMap[roleNameA] || 100) - (roleOrderMap[roleNameB] || 100);
    });

    useEffect(() => {
        if (activeUserImage) {
            const digitalProduct = digitalProducts.find((dp) => dp.id === activeUserImage);
            if (digitalProduct) {
                const blob = base64ToBlob(digitalProduct.image as unknown as string);
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            }
        }
        if (activeUserImageFrame) {
            const digitalProduct = digitalProducts.find((dp) => dp.id === activeUserImageFrame);
            if (digitalProduct) {
                const blob = base64ToBlob(digitalProduct.image as unknown as string);
                const url = URL.createObjectURL(blob);
                setImageFrameUrl(url);
            }
        }
        if (activeUserBackgroundImage) {
            const digitalProduct = digitalProducts.find((dp) => dp.id === activeUserBackgroundImage);
            if (digitalProduct) {
                const blob = base64ToBlob(digitalProduct.image as unknown as string);
                const url = URL.createObjectURL(blob);
                setImageBackgroundUrl(url);
            }
        }
        if (activeUserTitle) {
            const digitalProduct = digitalProducts.find((dp) => dp.id === activeUserTitle);
            setTitle(digitalProduct);
        }

        if (activeUserBackgroundColour) {
            const digitalProduct = digitalProducts.find((dp) => dp.id === activeUserBackgroundColour);
            setTheme(digitalProduct);
        }

        if (activePins) {
            const pinUrls: string[] = activePins.split(",").map((pin) => {
                const digitalProduct = digitalProducts.find((dp) => dp.id === pin);
                if (digitalProduct) {
                    const blob = base64ToBlob(digitalProduct.image as unknown as string);
                    return URL.createObjectURL(blob);
                }
                return "";
            }).filter(url => url !== "");
            setImagePinUrls(pinUrls);
            setVisibleActivePins(activePins.split(","));
        }
    }, [activeUserImage, activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins, digitalProducts]);

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => { setIsHovered(true); };
    const handleMouseLeave = () => { setIsHovered(false); };
    const customTheme = activeUserBackgroundColour && theme ? {
        backgroundColor: theme.primaryColour,
        color: theme.secondaryColour,
        transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
    } : {};

    let availablePins = digitalProducts.filter(dp => dp.type === "digitalProductTypePin" && user.digitalProducts.includes(dp.id) && !visibleActivePins.includes(dp.id));
    const handleAddActivePin = (pinId: string) => {
        const newVisibleActivePins = [...visibleActivePins, pinId];
        setVisibleActivePins(prevState => [...prevState, pinId]);
        setAddingPins(false);
        reloadPinUrlsAndAvailablePins(newVisibleActivePins);
    };
    const handleDeleteActivePin = (pin: string) => {
        const newVisibleActivePins = visibleActivePins.filter((activePin) => activePin !== pin);
        setVisibleActivePins(newVisibleActivePins);
        reloadPinUrlsAndAvailablePins(newVisibleActivePins);
    }
    function reloadPinUrlsAndAvailablePins(newVisibleActivePins) {
        const pinUrls: string[] = newVisibleActivePins.map((pin) => {
            const digitalProduct = digitalProducts.find((dp) => dp.id === pin);
            if (digitalProduct) {
                const blob = base64ToBlob(digitalProduct.image as unknown as string);
                return URL.createObjectURL(blob);
            }
            return "";
        }).filter(url => url !== "");
        setImagePinUrls(pinUrls);
        availablePins = digitalProducts.filter(dp => dp.type === "digitalProductTypePin" && user.digitalProducts.includes(dp.id) && !visibleActivePins.includes(dp.id));
    }

    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className={styles.userPage} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={customTheme}>
            {isMobile ? (
                <>
                    <div className={styles.row}>
                        <div className={styles.component1}>
                            <a target="_blank" className={styles.userPage__aImage}
                               href={lang === defaultLang ? `/users/user.html?userId=${user.id}` : `/users/user.html?userId=${user.id}&lang=${lang}`}>
                                <div className={styles.userPage__image}>
                                    <img
                                        src={imageUrl || getDefaultUserImage()}
                                        style={!imageUrl ? randomColourFilter : {}}
                                    />
                                </div>
                                {imageFrameUrl &&
                                    <a target="_blank" className={styles.userPage__aImageFrame}
                                       href={lang === defaultLang ? `/users/user.html?userId=${user.id}` : `/users/user.html?userId=${user.id}&lang=${lang}`}>
                                        <div className={styles.userPage__imageFrame}>
                                            <img
                                                src={imageFrameUrl}
                                            />
                                        </div>
                                    </a>}
                            </a>

                            <a target="_blank" className={styles.userPage__aTitle}>
                                {title &&
                                    <div className={styles.userPage__title} style={{ background: title.primaryColour, color: title.secondaryColour }}>
                                        {title.name}
                                        <div className={detailsStyles.digitalProductDetails__shine}></div>
                                    </div>}
                            </a>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.component2}>
                                <div className={styles.userPage__nickname} style={customTheme}>@{nickname} </div>
                                <p className={styles.userPage__names}>{name + " " + firstSurname + " " + secondSurname}</p>
                            </div>
                            <div className={styles.component3}>
                                <div className={styles.userPage__coinsCount}>
                                    <span>{coins}</span>
                                    <img className={styles.userPage__iconCountImg} src="/icons/icon-coin.svg" alt="C" />
                                </div>
                                <div className={styles.userPage__inventoryCount}>
                                    <span>{user.digitalProducts.split(',').length}</span>
                                    <img className={styles.userPage__iconCountImg} src="/icons/icon-inventory.svg" alt="C" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.component4}>
                        <div className={styles.selectedElements}>
                            {sortedRoles.map((collaRole, index) => {
                                const [roleName, collaId] = collaRole.split('-');
                                const colla = colles.find((colla) => colla.id === collaId);
                                return colla && (
                                    <div key={index} className={styles.selectedElementCombined}>
                                        <span className={styles.selectedRole} style={getRolesAdditionalStyle(roleName)}>
                                            {dictionary[lang]?.[roleName]} </span>
                                        <span className={styles.selectedColla} style={{ backgroundColor: colla.primaryColour, color: getContrastColour(colla.primaryColour) }}>
                                            {colla?.name} </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.component5}>
                        <div className={styles.userPage__activePins}>
                            {visibleActivePins.map((pin, index) => {
                                const digitalProduct = digitalProducts.find((dp) => dp.id === pin);
                                if (!digitalProduct) return null;
                                return (
                                    <div key={pin}>
                                        {deletingPins && <button className={styles.userPage__deletePinButton} type="button" onClick={() => handleDeleteActivePin(pin)}>×</button>}
                                        <img className={styles.userPage__pin} src={imagePinUrls[index]} />
                                    </div>
                                );
                            })}
                            <div className={styles.userPage__activePinsEdit}>
                                <button className={styles.userPage__editPinButton} type="button" onClick={() => {setDeletingPins(!deletingPins), setEditingPins(!editingPins || addingPins)}}>×</button>
                                {editingPins && <button className={styles.userPage__confirmEditPinButton} type="button" onClick={() => { }}>✔</button>}
                                <button className={styles.userPage__editPinButton} type="button" onClick={() => {setAddingPins(!addingPins), setEditingPins(!editingPins || deletingPins)}}>+</button>
                            </div>
                        </div>
                    </div>

                    {imageBackgroundUrl && <a target="_blank" className={styles.userPage__aBackgroundImage}>
                        <div className={styles.userPage__backgroundImage}>
                            <img
                                src={imageBackgroundUrl}
                            />
                        </div>
                    </a>}
                    <a href={`/users/update.html?userId=${user.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                        <button className={styles.updateButton}>
                            <img src="/icons/icon-edit.svg" alt="Editar" />
                        </button>
                    </a>
                    {addingPins && (
                        <div className={styles.pinSelector}>
                            <button className={styles.userPage__closePinSelectorButton} type="button" onClick={() => {setAddingPins(!addingPins), setEditingPins(!editingPins || deletingPins)}}>×</button>
                            <p>{dictionary[lang]?.selectUserActivePin}</p>
                            <ul>
                                {availablePins.map(pin => {
                                    const pinImageBlob = base64ToBlob(pin.image as unknown as string);
                                    const pinImageUrl = URL.createObjectURL(pinImageBlob);
                                    return (
                                        <li key={pin.id} onClick={() => handleAddActivePin(pin.id)}>
                                            <img src={pinImageUrl} alt={pin.name} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className={styles.leftColumn}>
                        <div className={styles.component1}>
                            <a target="_blank" className={styles.userPage__aImage}
                               href={lang === defaultLang ? `/users/user.html?userId=${user.id}` : `/users/user.html?userId=${user.id}&lang=${lang}`}>
                                <div className={styles.userPage__image}>
                                    <img
                                        src={imageUrl || getDefaultUserImage()}
                                        style={!imageUrl ? randomColourFilter : {}}
                                    />
                                </div>
                                {imageFrameUrl &&
                                    <a target="_blank" className={styles.userPage__aImageFrame}
                                       href={lang === defaultLang ? `/users/user.html?userId=${user.id}` : `/users/user.html?userId=${user.id}&lang=${lang}`}>
                                        <div className={styles.userPage__imageFrame}>
                                            <img
                                                src={imageFrameUrl}
                                            />
                                        </div>
                                    </a>}
                            </a>

                            <a target="_blank" className={styles.userPage__aTitle}>
                                {title &&
                                    <div className={styles.userPage__title} style={{ background: title.primaryColour, color: title.secondaryColour }}>
                                        {title.name}
                                        <div className={detailsStyles.digitalProductDetails__shine}></div>
                                    </div>}
                            </a>
                        </div>
                        <div className={styles.component4}>
                            <div className={styles.selectedElements}>
                                {sortedRoles.map((collaRole, index) => {
                                    const [roleName, collaId] = collaRole.split('-');
                                    const colla = colles.find((colla) => colla.id === collaId);
                                    return colla && (
                                        <div key={index} className={styles.selectedElementCombined}>
                                            <span className={styles.selectedRole} style={getRolesAdditionalStyle(roleName)}>
                                                {dictionary[lang]?.[roleName]} </span>
                                            <span className={styles.selectedColla} style={{ backgroundColor: colla.primaryColour, color: getContrastColour(colla.primaryColour) }}>
                                                {colla?.name} </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightColumn}>
                        <div className={styles.topRow}>
                            <div className={styles.component2}>
                                <div className={styles.userPage__nickname} style={customTheme}>@{nickname} </div>
                                <p className={styles.userPage__names}>{name + " " + firstSurname + " " + secondSurname}</p>
                            </div>
                            <div className={styles.component3}>
                                <div className={styles.userPage__coinsCount}>
                                    <span>{coins}</span>
                                    <img className={styles.userPage__iconCountImg} src="/icons/icon-coin.svg" alt="C" />
                                </div>
                                <div className={styles.userPage__inventoryCount}>
                                    <span>{user.digitalProducts.split(',').length}</span>
                                    <img className={styles.userPage__iconCountImg} src="/icons/icon-inventory.svg" alt="C" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.component5}>
                            <div className={styles.userPage__activePins}>
                                {visibleActivePins.map((pin, index) => {
                                    const digitalProduct = digitalProducts.find((dp) => dp.id === pin);
                                    if (!digitalProduct) return null;
                                    return (
                                        <div key={pin}>
                                            {deletingPins && <button className={styles.userPage__deletePinButton} type="button" onClick={() => handleDeleteActivePin(pin)}>×</button>}
                                            <img className={styles.userPage__pin} src={imagePinUrls[index]} />
                                        </div>
                                    );
                                })}
                                <div className={styles.userPage__activePinsEdit}>
                                    <button className={styles.userPage__editPinButton} type="button" onClick={() => {setDeletingPins(!deletingPins), setEditingPins(!editingPins || addingPins)}}>×</button>
                                    {editingPins && <button className={styles.userPage__confirmEditPinButton} type="button" onClick={() => { }}>✔</button>}
                                    <button className={styles.userPage__editPinButton} type="button" onClick={() => {setAddingPins(!addingPins), setEditingPins(!editingPins || deletingPins)}}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {imageBackgroundUrl && <a target="_blank" className={styles.userPage__aBackgroundImage}>
                        <div className={styles.userPage__backgroundImage}>
                            <img
                                src={imageBackgroundUrl}
                            />
                        </div>
                    </a>}
                    <a href={`/users/update.html?userId=${user.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                        <button className={styles.updateButton}>
                            <img src="/icons/icon-edit.svg" alt="Editar" />
                        </button>
                    </a>
                    {addingPins && (
                        <div className={styles.pinSelector}>
                            <button className={styles.userPage__closePinSelectorButton} type="button" onClick={() => {setAddingPins(!addingPins), setEditingPins(!editingPins || deletingPins)}}>×</button>
                            <p>{dictionary[lang]?.selectUserActivePin}</p>
                            <ul>
                                {availablePins.map(pin => {
                                    const pinImageBlob = base64ToBlob(pin.image as unknown as string);
                                    const pinImageUrl = URL.createObjectURL(pinImageBlob);
                                    return (
                                        <li key={pin.id} onClick={() => handleAddActivePin(pin.id)}>
                                            <img src={pinImageUrl} alt={pin.name} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
