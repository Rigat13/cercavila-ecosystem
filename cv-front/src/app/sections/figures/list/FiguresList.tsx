import { useEffect, useState } from 'react';
import { FiguraCard } from "@/app/sections/figures/card/FiguraCard";
import { useFiguresContext } from "@/app/sections/figures/FiguresContext";
import styles from "./FiguresList.module.scss";
import { dictionary } from "@/content";

export function FiguresList({ lang }: { lang: string }) {
    const { figuresNoImage, figures } = useFiguresContext();
    const [loadedFigures, setLoadedFigures] = useState([]);
    const [isFiguresImagesLoaded, setIsFiguresImagesLoaded] = useState(false);

    useEffect(() => {
        if (figures.length > 0) {
            // Map loaded figures using the existing figures and their IDs
            const mappedLoadedFigures = figures.map((figure) => {
                // Find the corresponding figure in figuresNoImage using the figure ID
                const existingFigure = figuresNoImage.find((fig) => fig.id === figure.id);
                // If the corresponding figure exists in figuresNoImage, return it with loaded image data
                if (existingFigure) {
                    return { ...existingFigure, ...figure };
                }
                // If the corresponding figure doesn't exist in figuresNoImage, return the original figure
                return figure;
            });
            setLoadedFigures(mappedLoadedFigures);
            setIsFiguresImagesLoaded(true);
        }
    }, [figures, figuresNoImage]);


    return (
        <section>
            <h2 className={styles.h2}>{dictionary[lang]?.figuresTitle}</h2>
            <div className={styles.list}>
                {/* Render figures with no images */}
                {!isFiguresImagesLoaded && figuresNoImage.map((figura) => (
                    <FiguraCard key={figura.id} figura={figura} lang={lang}/>
                ))}
                {/* Render loaded figures with images */}
                {isFiguresImagesLoaded && loadedFigures.map((loadedFigure) => (
                    <FiguraCard key={loadedFigure.id} figura={loadedFigure} lang={lang}/>
                ))}
            </div>
        </section>
    )
}
