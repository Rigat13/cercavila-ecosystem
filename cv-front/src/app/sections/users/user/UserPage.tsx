import React from "react";
import { User } from "@/modules/users/domain/User";
import styles from "./UserPage.module.scss";
import {Colla} from "@/modules/colles/domain/Colla"; // Import SCSS module for styles

export function UserPage({ user, lang }: { user: User; lang: string }) {

    return (
        <div className={styles.userPage}>
            {/* User Information Display */}
            <h1 className={styles.userPage__name}>{`${name} ${user.firstSurname} ${user.secondSurname}`}</h1>
            <p className={styles.userPage__nickname}>@{user.nickname}</p>
            <p className={styles.userPage__email}>{user.email}</p>
            <p className={styles.userPage__roles}>Roles: {user.roles.join(", ")}</p>
            <p className={styles.userPage__coins}>Coins: {user.coins}</p>
            <p className={styles.userPage__digitalProducts}>
                Digital Products: {user.digitalProducts.join(", ")}
            </p>

            {/* Display user image */}
            {user.activeUserImage && (
                <img className={styles.userPage__image} src={user.activeUserImage} alt={`Profile of ${user.nickname}`} />
            )}

            {/* Display user background image */}
            {user.activeUserBackgroundImage && (
                <div
                    className={styles.userPage__backgroundImage}
                    style={{ backgroundImage: `url(${user.activeUserBackgroundImage})` }}
                />
            )}

            {/* Display user title */}
            <p className={styles.userPage__title}>{user.activeUserTitle}</p>
        </div>
    );
};
