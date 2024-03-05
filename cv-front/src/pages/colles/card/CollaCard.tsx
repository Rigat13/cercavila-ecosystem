import {Colla} from "@/modules/colles/domain/Colla";
import styles from "./CollaCard.module.scss";

export function CollaCard({ colla } : { colla: Colla }) {
    return (
        <div className={styles.collaCard}>
            <h3 className={styles.collaCard__name}>{colla.name}</h3>
            <h6 className={styles.collaCard__entity}>{colla.entity}</h6>
            <p className={styles.collaCard__foundationYear}>{colla.foundationYear}</p>
        </div>
    );
}