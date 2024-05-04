import { useEffect, useState } from 'react';
import { DigitalProductCard } from "@/app/sections/digitalproducts/card/DigitalProductCard";
import { useDigitalProductsContext } from "@/app/sections/digitalproducts/DigitalProductsContext";
import styles from "./DigitalProductsList.module.scss";
import { dictionary } from "@/content";

export function DigitalProductsList({ lang }: { lang: string }) {
    const { digitalProductsNoImage, digitalProducts } = useDigitalProductsContext();
    const [loadedDigitalProducts, setLoadedDigitalProducts] = useState([]);
    const [isDigitalProductsImagesLoaded, setIsDigitalProductsImagesLoaded] = useState(false);

    useEffect(() => {
        if (digitalProducts.length > 0) {
            const mappedLoadedDigitalProducts = digitalProducts.map((digitalProduct) => {
                const existingDigitalProduct = digitalProductsNoImage.find((fig) => fig.id === digitalProduct.id);
                if (existingDigitalProduct) {
                    return { ...existingDigitalProduct, ...digitalProduct };
                }
                return digitalProduct;
            });
            setLoadedDigitalProducts(mappedLoadedDigitalProducts);
            setIsDigitalProductsImagesLoaded(true);
        }
    }, [digitalProducts, digitalProductsNoImage]);


    return (
        <section>
            <h2 className={styles.h2}>{dictionary[lang]?.digitalProductsTitle}</h2>
            <div className={styles.list}>
                {/* Render digitalProducts with no images */}
                {!isDigitalProductsImagesLoaded && digitalProductsNoImage.map((digitalProduct) => (
                    <DigitalProductCard key={digitalProduct.id} digitalProduct={digitalProduct} lang={lang}/>
                ))}
                {/* Render loaded digitalProducts with images */}
                {isDigitalProductsImagesLoaded && loadedDigitalProducts.map((loadedDigitalProduct) => (
                    <DigitalProductCard key={loadedDigitalProduct.id} digitalProduct={loadedDigitalProduct} lang={lang}/>
                ))}
            </div>
        </section>
    )
}
