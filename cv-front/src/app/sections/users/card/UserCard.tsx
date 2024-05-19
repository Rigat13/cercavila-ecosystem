import React from "react";
import styles from "./UserCard.module.scss";
import digiProductStyles from "@/app/sections/digitalProducts/card/DigitalProductCard.module.scss";
import { User } from "@/modules/users/domain/User";
import {defaultLang} from "@/content";
import {Figura} from "@/modules/figures/domain/Figura";

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

    return (
        <div className={styles.userCard}>
            <div className={styles.userCard__info}>
                <a href={`/users/update.html?userId=${user.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                    <button className={styles.updateButton}>
                        <img src="/icons/icon-edit.svg" alt="Editar" />
                    </button>
                </a>
                <h3 className={styles.userCard__nickname}>@{nickname}</h3>
                <p className={styles.userCard__name}>{name}</p>
                <p className={styles.userCard__surnames}>{firstSurname+" "+secondSurname}</p>
                {/* Include <p className={styles.userCard__roles}>Roles: {roles.join(", ")}</p>
            <p className={styles.userCard__digitalProducts}>
                Digital Products: {digitalProducts.join(", ")}
            </p>
            {/* Include other user details you want to display */}
            </div>
        </div>
    );
};

export default UserCard;
