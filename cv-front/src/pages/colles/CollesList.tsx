import {CollaCard} from "@/pages/colles/CollaCard";
import {useCollesContext} from "@/pages/colles/CollesContext";
import styles from "./CollesList.module.scss";

export function CollesList() {
    const { colles } = useCollesContext();
    return (
        <section>
            <h2>Colles registrades</h2>
            <div className={styles.list}>
                {colles.map((colla) => (
                    <CollaCard key={colla.id} colla={colla} />
                ))}
            </div>
        </section>
    )
}