import {FiguraCard} from "@/app/sections/figures/card/FiguraCard";
import {useFiguresContext} from "@/app/sections/figures/FiguresContext";
import styles from "./FiguresList.module.scss";
import {dictionary} from "@/content";

export function FiguresList({ lang }: { lang: string }) {
    const { figures } = useFiguresContext();
    return (
        <section>
            <h2 className={styles.h2}>{dictionary[lang]?.figuresTitle}</h2>
            <div className={styles.list}>
                {figures.map((figura) => (
                    <FiguraCard key={figura.id} figura={figura} lang={lang}/>
                ))}
            </div>
        </section>
    )
}