import {CollaCard} from "@/app/sections/colles/card/CollaCard";
import {useCollesContext} from "@/app/sections/colles/CollesContext";
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