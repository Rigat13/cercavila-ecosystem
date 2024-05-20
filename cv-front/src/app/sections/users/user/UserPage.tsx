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
        activeUserImage,
        activeUserImageFrame,
        activeUserBackgroundImage,
        activeUserTitle,
        activeUserBackgroundColour,
    } = user;
    const { colles } = useUsersContext();
    const {digitalProducts } = useUsersContext();

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageFrameUrl, setImageFrameUrl] = useState<string | null>(null);
    const [imageBackgroundUrl, setImageBackgroundUrl] = useState<string | null>(null);
    const [title, setTitle] = useState<DigitalProduct | null>(null);
    const [theme, setTheme] = useState<DigitalProduct | null>(null);
    const [randomColourFilter] = useState(generateRandomColorFilter());

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

    }, [activeUserImage, activeUserImageFrame, activeUserBackgroundImage, digitalProducts]);

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => { setIsHovered(true); };
    const handleMouseLeave = () => { setIsHovered(false); };
    const customTheme = activeUserBackgroundColour && theme ? {
        backgroundColor: theme.primaryColour,
        color: theme.secondaryColour,
        transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
    } : {};

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
                                <p className={styles.userPage__names}>{name+" "+firstSurname+" "+secondSurname}</p>
                            </div>
                            <div className={styles.component3}>Component 3</div>
                        </div>
                    </div>
                    <div className={styles.component4}>
                        <div className={styles.selectedElements}>
                            {sortedRoles.toString().split(',')
                                .map((collaRole, index) => {
                                    const [roleName, collaId] = collaRole.split('-');
                                    const colla = colles.find((colla) => colla.id === collaId);
                                    return colla &&(
                                        <div key={index} className={styles.selectedElementCombined}>
                                        <span className={styles.selectedRole} style={ getRolesAdditionalStyle(roleName) }>
                                            {dictionary[lang]?.[roleName]} </span>
                                            <span className={styles.selectedColla} style={{ backgroundColor: colla.primaryColour, color: getContrastColour(colla.primaryColour) }}>
                                            {colla?.name} </span>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className={styles.component5}>Component 5</div>
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
                                {sortedRoles.toString().split(',')
                                    .map((collaRole, index) => {
                                        const [roleName, collaId] = collaRole.split('-');
                                        const colla = colles.find((colla) => colla.id === collaId);
                                        return colla &&(
                                            <div key={index} className={styles.selectedElementCombined}>
                                        <span className={styles.selectedRole} style={ getRolesAdditionalStyle(roleName) }>
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
                                <p className={styles.userPage__names}>{name+" "+firstSurname+" "+secondSurname}</p>
                            </div>
                            <div className={styles.component3}>Component 3</div>
                        </div>
                        <div className={styles.component5}>Component 5</div>
                    </div>
                </>
            )}
        </div>
        /*<div className={styles.userPage}>
            <div className={styles.userPage__info}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={customTheme}>
                <div className={styles.userPage__topLeftPanel}>
                    <div className={styles.userPage__topLeftPanel__container}>



                    </div>
                </div>

                <div className={styles.userPage__topRightPanel}>
                    <div className={styles.userPage__topRightPanel__container}>

                    </div>
                </div>

                {imageBackgroundUrl && <a target="_blank" className={classNames(detailsStyles.digitalProductDetails__aBackgroundImage, styles.userPage__aBackgroundImage)}>
                    <div className={classNames(detailsStyles.digitalProductDetails__backgroundImage, styles.userPage__backgroundImage)}>
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

            </div>
        </div>*/
    );
};
