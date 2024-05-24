import React, { useEffect, useState } from 'react';
import { DigitalProductCard } from "@/app/sections/digitalproducts/card/DigitalProductCard";
import { useDigitalProductsContext } from "@/app/sections/digitalproducts/DigitalProductsContext";
import styles from "./FilteredDigitalProductsList.module.scss";
import { dictionary } from "@/content";
import { digitalProductTypes } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductType";

export function FilteredDigitalProductsList({ lang, isStore }: { lang: string, isStore: boolean }) {
    const { digitalProductsNoImage, digitalProducts, users } = useDigitalProductsContext();
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

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [filterType, setFilterType] = useState<string>('');

    const handleNameSearch = (event: React.ChangeEvent<HTMLInputElement>) => { setSearchTerm(event.target.value); };
    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setFilterType(event.target.value); };
    const handleAddType = () => { if (filterType && !selectedTypes.includes(filterType)) { setSelectedTypes([...selectedTypes, filterType]); } };

    const handleRemoveFilter = (type: string, category: string) => {
        switch (category) {
            case 'type': setSelectedTypes(selectedTypes.filter(t => t !== type)); break;
            default: console.error(`Invalid category: ${category}`); break;
        }
    };

    const getAdditionalStyle = (value: string, category: string) => {
        let backgroundColor = "#111111"; let color = "#FFFFFF";
        switch (category) {
            case 'type':
                return { backgroundColor, color };
            default: return {};
        }
    }

    // Retrieve current user's digital products from local storage
    const getCurrentUserDigitalProducts = () => {
        if (!localStorage) return [];
        const username = localStorage.getItem('username');
        const user = users.find(user => user.nickname === username);
        return user?.digitalProducts || [];
    };

    const userDigitalProducts = getCurrentUserDigitalProducts();

    return (
        <section>
            {/* ------------------------------------------------- TYPE SELECTOR -------------------------------------------------*/}
            <div className={styles.filter}>
                <div className={styles.filtersWrapper}>
                    <div className={styles.filterSection}>
                        <label className={styles.filterTitle} htmlFor="name">{dictionary[lang]?.collaFilterByName}</label>
                        <div className={styles.filterInnerSection}>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={searchTerm}
                                onChange={handleNameSearch}
                                placeholder={dictionary[lang]?.collaFilterWriteName}
                            />
                        </div>
                    </div>
                    <div className={styles.filterSection}>
                        <label className={styles.filterTitle} htmlFor="type">{dictionary[lang]?.collaFilterByType}</label>
                        <div className={styles.filterInnerSection}>
                            <select id="type" name="type" value={filterType} onChange={handleTypeChange} >
                                <option value="">{dictionary[lang]?.collaFilterByType}</option>
                                {digitalProductTypes.map(option => (
                                    <option
                                        key={option.labelKey}
                                        value={option.labelKey}
                                        disabled={selectedTypes.includes(option.labelKey)}
                                    > {dictionary[lang]?.[option.labelKey]} </option>
                                ))}
                            </select>
                            <button className={styles.addFilterButton} onClick={handleAddType}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------------------------------------------------- SELECTED ROLES-COLLES -------------------------------------------------*/}
            <div className={styles.selectedFilters}>
                {[
                    ...selectedTypes.map(type => ({ value: type, category: 'type' })),
                ].map(({ value, category }) => {
                    const itemName = dictionary[lang]?.[value];
                    return (
                        <div key={`${category}-${value}`} className={styles.selectedFilter}
                             style={getAdditionalStyle(value, category)}>
                            <span> {itemName} </span>
                            <button className={styles.selectedFilterButton} onClick={() => handleRemoveFilter(value, category)}>×</button>
                        </div>
                    );
                })}
            </div>
            {/* -----------------------------------------------------------------------------------------------------------------*/}
            {/* ------------------------------------------------ PRODUCTS RESULT ------------------------------------------------*/}
            {/* -----------------------------------------------------------------------------------------------------------------*/}
            {isStore && <h2 className={styles.h2}>{dictionary[lang]?.storeTitle}</h2>}
            {!isStore && <h2 className={styles.h2}>{dictionary[lang]?.digitalProductsTitle}</h2>}
            <div className={styles.list}>

                {/* Render digitalProducts with no images */}
                {!isDigitalProductsImagesLoaded && digitalProductsNoImage
                    .filter(digitalProduct =>
                        (searchTerm.trim() === ''
                            || digitalProduct.name.toLowerCase().includes(searchTerm.toLowerCase())
                            || digitalProduct.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
                        (selectedTypes.length === 0 || selectedTypes.some(type => digitalProduct.type.localeCompare(type) === 0))
                    ).map((digitalProduct) => (
                        <DigitalProductCard key={digitalProduct.id} digitalProduct={digitalProduct} isBuyable={isStore} lang={lang}
                            alreadyObtained={userDigitalProducts.includes(digitalProduct.id)} // Check if the product is obtained
                        />
                    ))}

                {/* Render loaded digitalProducts with images */}
                {isDigitalProductsImagesLoaded && loadedDigitalProducts
                    .filter(digitalProduct =>
                        (searchTerm.trim() === ''
                            || digitalProduct.name.toLowerCase().includes(searchTerm.toLowerCase())
                            || digitalProduct.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
                        (selectedTypes.length === 0 || selectedTypes.some(type => digitalProduct.type.localeCompare(type) === 0))
                    ).map((loadedDigitalProduct) => (
                        <DigitalProductCard key={loadedDigitalProduct.id} digitalProduct={loadedDigitalProduct} isBuyable={isStore} lang={lang}
                            alreadyObtained={userDigitalProducts.includes(loadedDigitalProduct.id)} // Check if the product is obtained
                        />
                    ))}
            </div>
        </section>
    )
}
