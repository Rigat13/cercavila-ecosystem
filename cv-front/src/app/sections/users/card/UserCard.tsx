import React, {useEffect, useState} from "react";
import styles from "./UserCard.module.scss";
import detailsStyles from "@/app/sections/shared/DigitalProductDetails.module.scss";
import { User } from "@/modules/users/domain/User";
import {defaultLang, dictionary} from "@/content";
import {getRolesAdditionalStyle} from "@/modules/users/domain/user-attributes/UserRoles";
import {getContrastColour} from "@/app/sections/shared/getContrastColour";
import {useUsersContext} from "@/app/sections/users/UsersContext";
import {base64ToBlob} from "@/app/sections/shared/Utilities";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import classNames from 'classnames';

interface UserCardProps {
    user: User;
}

export function UserCard({ user, lang }: { user: User; lang: string }) {
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
        boxShadow: isHovered ? 'inset 0 0 0rem 0.6rem ' + theme.secondaryColour : '',
        transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
    } : {};

    return (
        <div className={styles.userCard}>
            <div className={styles.userCard__info}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={customTheme}>
                <a target="_blank" className={classNames(detailsStyles.digitalProductDetails__aImage, styles.userCard__aImage)}
                   href={lang === defaultLang ? `/users/user.html?userId=${user.id}` : `/users/user.html?userId=${user.id}&lang=${lang}`}>
                    <div className={classNames(detailsStyles.digitalProductDetails__image, styles.userCard__image)}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${name}`}
                        />
                    </div>
                </a>
                <a target="_blank" className={classNames(detailsStyles.digitalProductDetails__aImageFrame, styles.userCard__aImageFrame)}
                   href={lang === defaultLang ? `/users/user.html?userId=${user.id}` : `/users/user.html?userId=${user.id}&lang=${lang}`}>
                    <div className={classNames(detailsStyles.digitalProductDetails__imageFrame, styles.userCard__imageFrame)}>
                        <img
                            src={imageFrameUrl}
                            alt={`Imatge de ${name}`}
                        />
                    </div>
                </a>
                <a target="_blank" className={classNames(detailsStyles.digitalProductDetails__aBackgroundImage, styles.userCard__aBackgroundImage)}>
                    <div className={classNames(detailsStyles.digitalProductDetails__backgroundImage, styles.userCard__backgroundImage)}>
                        <img
                            src={imageBackgroundUrl}
                            alt={`Imatge de ${name}`}
                        />
                    </div>
                </a>

                <a target="_blank" className={classNames(detailsStyles.digitalProductDetails__aTitle, styles.userCard__aTitle)}>
                    {title && <div className={classNames(detailsStyles.digitalProductDetails__title, styles.userCard__title)}
                         style={{ background: title.primaryColour, color: title.secondaryColour }}>
                        {title.name}
                        <div className={detailsStyles.digitalProductDetails__shine}></div>
                    </div>}
                </a>

                <a href={`/users/update.html?userId=${user.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                    <button className={styles.updateButton}>
                        <img src="/icons/icon-edit.svg" alt="Editar" />
                    </button>
                </a>
                <h3 className={styles.userCard__nickname}>@{nickname}</h3>
                <p className={styles.userCard__name}>{name}</p>
                <p className={styles.userCard__surnames}>{firstSurname+" "+secondSurname}</p>


                <div className={styles.selectedElements}>
                    {roles.toString().split(',')
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
    );
};

export default UserCard;
