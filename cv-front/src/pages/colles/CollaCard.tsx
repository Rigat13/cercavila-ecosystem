import {Colla} from "@/modules/colles/domain/Colla";
import styles from "./CollaCard.scss";

export function CollaCard({ colla } : { colla: Colla }) {
    return (
        <div className={styles.collaCard}>
            <h3 className="colla-card__name">{colla.name}</h3>
            <h6 className="colla-card__entity">{colla.entity}</h6>
            <p className="colla-card__foundation-year">{colla.foundationYear}</p>
        </div>
    );
}