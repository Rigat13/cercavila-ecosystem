import React from "react";
import { User } from "@/modules/users/domain/User";
import styles from "./UserPage.module.scss"; // Import SCSS module for styles

interface UserPageProps {
    user: User;
}

const UserPage: React.FC<UserPageProps> = ({ user }) => {
    const {
        nickname,
        name,
        firstSurname,
        secondSurname,
        email,
        roles,
        coins,
        digitalProducts,
        activeUserImage,
        activeUserBackgroundImage,
        activeUserTitle,
    } = user;

    return (
        <div className={styles.userPage}>
            {/* User Information Display */}
            <h1 className={styles.userPage__name}>{`${name} ${firstSurname} ${secondSurname}`}</h1>
            <p className={styles.userPage__nickname}>@{nickname}</p>
            <p className={styles.userPage__email}>{email}</p>
            <p className={styles.userPage__roles}>Roles: {roles.join(", ")}</p>
            <p className={styles.userPage__coins}>Coins: {coins}</p>
            <p className={styles.userPage__digitalProducts}>
                Digital Products: {digitalProducts.join(", ")}
            </p>

            {/* Display user image */}
            {activeUserImage && (
                <img className={styles.userPage__image} src={activeUserImage} alt={`Profile of ${nickname}`} />
            )}

            {/* Display user background image */}
            {activeUserBackgroundImage && (
                <div
                    className={styles.userPage__backgroundImage}
                    style={{ backgroundImage: `url(${activeUserBackgroundImage})` }}
                />
            )}

            {/* Display user title */}
            <p className={styles.userPage__title}>{activeUserTitle}</p>
        </div>
    );
};

export default UserPage;
