import React, {useEffect, useState} from "react";
import { User } from "@/modules/users/domain/User";
import styles from "./UserPage.module.scss";
import {defaultLang, dictionary} from "@/content";
import useMediaQuery, {base64ToBlob, generateRandomColorFilter, getDefaultUserImage} from "@/app/sections/shared/Utilities";
import {getRolesAdditionalStyle, roleOrderMap} from "@/modules/users/domain/user-attributes/UserRoles";
import {getContrastColour} from "@/app/sections/shared/getContrastColour";
import {useUsersContext} from "@/app/sections/users/UsersContext";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct"; // Import SCSS module for styles
import { useUpdateUserForm, FormStatus } from "@/app/sections/users/update-form/useUpdateUserForm";

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
    const [visibleActivePins, setVisibleActivePins] = useState<string[]>(activePins.toString().split(","));
    const { submitForm, formStatus } = useUpdateUserForm();

    const sortedRoles = roles.toString().split(',').sort((a, b) => {
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
            const pinUrls: string[] = activePins.toString().split(",").map((pin) => {
                const digitalProduct = digitalProducts.find((dp) => dp.id === pin);
                if (digitalProduct) {
                    const blob = base64ToBlob(digitalProduct.image as unknown as string);
                    return URL.createObjectURL(blob);
                }
                return "";
            }).filter(url => url !== "");
            setImagePinUrls(pinUrls);
            setVisibleActivePins(activePins.toString().split(","));
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
    const handleUpdateActivePins = () => {
        submitForm({
            id: user.id,
            nickname: user.nickname,
            name: user.name,
            firstSurname: user.firstSurname,
            secondSurname: user.secondSurname,
            email: user.email,
            password: user.password,
            roles: user.roles.toString().split(','),
            coins: user.coins,
            digitalProducts: user.digitalProducts.toString().split(','),
            activeUserImage: user.activeUserImage,
            activeUserImageFrame: user.activeUserImageFrame,
            activeUserBackgroundImage: user.activeUserBackgroundImage,
            activeUserTitle: user.activeUserTitle,
            activeUserBackgroundColour: user.activeUserBackgroundColour,
            activePins: visibleActivePins,
        });
    };


    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className={styles.userPage} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={customTheme}>
            {isMobile ? (
                <>
                    <div className={styles.row}>
                        <div className={styles.component1}>
                            <a target="_blank" className={styles.userPage__aImage}>
                                <div className={styles.userPage__image}>
                                    <img
                                        src={imageUrl || getDefaultUserImage()}
                                        style={!imageUrl ? randomColourFilter : {}}
                                    />
                                </div>
                                {imageFrameUrl &&
                                    <a target="_blank" className={styles.userPage__aImageFrame}>
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
                                        <div className={styles.userPage__shine}></div>
                                    </div>}
                            </a>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.component2}>
                                <div className={styles.userPage__nickname} style={customTheme}>@{nickname} </div>
                                <p className={styles.userPage__names} style={customTheme}>{name + " " + firstSurname + " " + secondSurname}</p>
                            </div>
                            <div className={styles.component3}>
                                <div className={styles.userPage__coinsCount}>
                                    <span>{coins}</span>
                                    <img className={styles.userPage__iconCountImg} src="/icons/icon-coin.svg" alt="C" />
                                </div>
                                <div className={styles.userPage__inventoryCount}>
                                    <span>{user.digitalProducts.toString().split(',').length}</span>
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
                                <button className={styles.userPage__editPinButton} type="button" onClick={() => {setDeletingPins(!deletingPins), setEditingPins(!editingPins || addingPins || !deletingPins)}}>×</button>
                                {editingPins && <button className={styles.userPage__confirmEditPinButton} type="button" onClick={handleUpdateActivePins}>✔</button>}
                                {formStatus === FormStatus.Loading && <p className={styles.userPage__updateUserStatusLoading} >{dictionary[lang]?.loading}</p>}
                                {formStatus === FormStatus.Success && <p className={styles.userPage__updateUserStatusSuccess} >{dictionary[lang]?.successUpdate}</p>}
                                {formStatus === FormStatus.Error && <p className={styles.userPage__updateUserStatusError} >{dictionary[lang]?.errorUpdate}</p>}
                                <button className={styles.userPage__editPinButton} type="button" onClick={() => {setAddingPins(!addingPins), setEditingPins(!editingPins || deletingPins || !addingPins)}}>+</button>
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
                        <div className={styles.popupOverlay}>
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
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className={styles.leftColumn}>
                        <div className={styles.component1}>
                            <a target="_blank" className={styles.userPage__aImage}>
                                <div className={styles.userPage__image}>
                                    <img
                                        src={imageUrl || getDefaultUserImage()}
                                        style={!imageUrl ? randomColourFilter : {}}
                                    />
                                </div>
                                {imageFrameUrl &&
                                    <a target="_blank" className={styles.userPage__aImageFrame}>
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
                                        <div className={styles.userPage__shine}></div>
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
                                <p className={styles.userPage__names} style={customTheme}>{name + " " + firstSurname + " " + secondSurname}</p>
                            </div>
                            <div className={styles.component3}>
                                <div className={styles.userPage__coinsCount}>
                                    <span>{coins}</span>
                                    <img className={styles.userPage__iconCountImg} src="/icons/icon-coin.svg" alt="C" />
                                </div>
                                <div className={styles.userPage__inventoryCount}>
                                    <span>{user.digitalProducts.toString().split(',').length}</span>
                                    <img className={styles.userPage__iconCountImg} src="/icons/icon-inventory.svg" alt="C" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.component5}>
                            <div className={styles.userPage__activePins}>
                                {visibleActivePins.map((pin, index) => {
                                    const digitalProduct = digitalProducts.find((dp) => dp.id === pin);
                                    if (!digitalProduct) return null;
                                    let isSpecialEditionMagnet = digitalProduct.name.includes('-E-');
                                    return (
                                        <div key={pin} className={styles.userPage__pinContainer}>
                                            {deletingPins && <button className={styles.userPage__deletePinButton} type="button" onClick={() => handleDeleteActivePin(pin)}>×</button>}
                                            <img className={styles.userPage__pin} src={imagePinUrls[index]}
                                            />
                                            {isSpecialEditionMagnet && <div className={styles.userPage__goldenShine}></div>}
                                        </div>
                                    );
                                })}
                                <div className={styles.userPage__activePinsEdit}>
                                    <button className={styles.userPage__editPinButton} type="button" onClick={() => {setDeletingPins(!deletingPins), setEditingPins(!editingPins || addingPins || !deletingPins)}}>×</button>
                                    {editingPins && <button className={styles.userPage__confirmEditPinButton} type="button" onClick={handleUpdateActivePins}>✔</button>}
                                    {formStatus === FormStatus.Loading && <p className={styles.userPage__updateUserStatusLoading} >{dictionary[lang]?.loading}</p>}
                                    {formStatus === FormStatus.Success && <p className={styles.userPage__updateUserStatusSuccess} >{dictionary[lang]?.successUpdate}</p>}
                                    {formStatus === FormStatus.Error && <p className={styles.userPage__updateUserStatusError} >{dictionary[lang]?.errorUpdate}</p>}
                                    <button className={styles.userPage__editPinButton} type="button" onClick={() => {setAddingPins(!addingPins), setEditingPins(!editingPins || deletingPins || !addingPins)}}>+</button>
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
                        <div className={styles.popupOverlay}>
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
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
