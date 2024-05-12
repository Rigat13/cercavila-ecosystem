import React from "react";
import styles from "./UserCard.module.scss";
import { User } from "@/modules/users/domain/User";

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const {
        name,
        nickname,
        firstSurname,
        secondSurname,
        email,
        coins,
        roles,
        digitalProducts,
        activeUserImage,
        activeUserImageFrame,
        activeUserBackgroundImage,
        activeUserTitle,
        activeUserBackgroundColour,
        activePins,
    } = user;

    return (
        <div className={styles.userCard}>
            <h3 className={styles.userCard__name}>{name}</h3>
            <p className={styles.userCard__nickname}>@{nickname}</p>
            <p className={styles.userCard__email}>{email}</p>
            <p className={styles.userCard__coins}>Coins: {coins}</p>
            <p className={styles.userCard__firstSurname}>First Surname: {firstSurname}</p>
            <p className={styles.userCard__secondSurname}>Second Surname: {secondSurname}</p>
            <p className={styles.userCard__roles}>Roles: {roles.join(", ")}</p>
            <p className={styles.userCard__digitalProducts}>
                Digital Products: {digitalProducts.join(", ")}
            </p>
            {/* Include other user details you want to display */}
        </div>
    );
};

export default UserCard;
