import {Colla} from "@/modules/colles/domain/Colla";
import styles from "./CollaCard.module.scss";
import {defaultLang} from "@/content";

export function CollaCard({ colla, lang } : { colla: Colla; lang: string }) {
    return (
        <div className={styles.collaCard}>
            <a href={`colles/update.html?collaId=${colla.id}${lang === defaultLang ? '' : `&lang=${lang}`}`} >
            <button className={styles.updateButton}>
                    <img src="/icons/edit.svg" alt="Editar" />
                </button>
            </a>
            <h3 className={styles.collaCard__name}>{colla.name}</h3>
            <h6 className={styles.collaCard__entity}>{colla.entity}</h6>
            <p className={styles.collaCard__foundationYear}>{colla.foundationYear}</p>
        </div>
    );
}