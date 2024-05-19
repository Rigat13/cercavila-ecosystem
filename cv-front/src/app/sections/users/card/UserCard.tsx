import React from "react";
import styles from "./UserCard.module.scss";
import digiProductStyles from "@/app/sections/digitalProducts/card/DigitalProductCard.module.scss";
import { User } from "@/modules/users/domain/User";
import {defaultLang, dictionary} from "@/content";
import {Figura} from "@/modules/figures/domain/Figura";
import {getRolesAdditionalStyle} from "@/modules/users/domain/user-attributes/UserRoles";
import {getContrastColour} from "@/app/sections/shared/getContrastColour";
import {useUsersContext} from "@/app/sections/users/UsersContext";

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


                <div className={styles.selectedElements}>
                    {user.roles.toString().split(',')
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
