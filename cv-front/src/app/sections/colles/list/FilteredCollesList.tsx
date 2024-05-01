import React, { useState } from 'react';
import { CollaCard } from '@/app/sections/colles/card/CollaCard';
import { useCollesContext } from '@/app/sections/colles/CollesContext';
import styles from './FilteredCollesList.module.scss';
import { dictionary } from '@/content';
import {musics} from "@/modules/colles/domain/colla-attributes/CollaMusic";
import {collaTypes} from "@/modules/colles/domain/colla-attributes/CollaType";
import {Figura} from "@/modules/figures/domain/Figura";

export function FilteredCollesList({ lang }: { lang: string }) {
    const { colles } = useCollesContext();
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [filterType, setFilterType] = useState<string>('');

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setFilterType(event.target.value); };
    const handleAddType = () => { if (filterType && !selectedTypes.includes(filterType)) { setSelectedTypes([...selectedTypes, filterType]); } };
    const handleRemoveType = (type: string) => { setSelectedTypes(selectedTypes.filter(t => t !== type)); };

    return (
        <section>
            {/* ------------------------------------------------- TYPE SELECTOR -------------------------------------------------*/}
            <div className={styles.filter}>
                <div className={styles.filtersWrapper}>
                    <div className={styles.filterSection}>
                        <label className={styles.filterTitle} htmlFor="type">{dictionary[lang]?.collaFilterByType}</label>
                        <div className={styles.filterInnerSection}>
                            <select id="type" name="type" value={filterType} onChange={handleTypeChange} >
                                <option value="">{dictionary[lang]?.collaFilterSelectType}</option>
                                {collaTypes.map(option => (
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
            {/* ------------------------------------------------- SELECTED TYPES -------------------------------------------------*/}
            <div className={styles.selectedFilters}>
                {selectedTypes.map(type => (
                    <div key={type} className={styles.selectedFilter}>
                        <span>{dictionary[lang]?.[type]}</span>
                        <button className={styles.selectedFilterButton} onClick={() => handleRemoveType(type)}>×</button>
                    </div>
                ))}
            </div>
            {/* -----------------------------------------------------------------------------------------------------------------*/}
            {/* ------------------------------------------------- COLLES RESULT -------------------------------------------------*/}
            {/* -----------------------------------------------------------------------------------------------------------------*/}
            <h2 className={styles.h2}>{dictionary[lang]?.collesTitle}</h2>
            <div className={styles.list}>
                {colles
                    .filter(colla => selectedTypes.length === 0 || selectedTypes.includes(colla.type))
                    .map(colla => (
                        <CollaCard key={colla.id} colla={colla} lang={lang} />
                    ))}
            </div>
        </section>
    );
}
