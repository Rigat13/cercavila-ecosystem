import React, { useState } from 'react';
import { CollaCard } from '@/app/sections/colles/card/CollaCard';
import { useCollesContext } from '@/app/sections/colles/CollesContext';
import styles from './FilteredCollesList.module.scss';
import { dictionary } from '@/content';
import {getMusicAdditionalStyle, musics} from "@/modules/colles/domain/colla-attributes/CollaMusic";
import {collaTypes, getTypeAdditionalStyle} from "@/modules/colles/domain/colla-attributes/CollaType";
import {Figura} from "@/modules/figures/domain/Figura";
import {neighbourhoods} from "@/modules/colles/domain/colla-attributes/CollaNeighbourhood";
import {collaIsCCGM} from "@/modules/colles/domain/Colla";

export function FilteredCollesList({ lang }: { lang: string }) {
    const { colles } = useCollesContext();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [filterType, setFilterType] = useState<string>('');

    const [selectedNeighbourhoods, setSelectedNeighbourhoods] = useState<string[]>([]);
    const [filterNeighbourhood, setFilterNeighbourhood] = useState<string>('');

    const [selectedMusicTypes, setSelectedMusicTypes] = useState<string[]>([]);
    const [filterMusic, setFilterMusic] = useState<string>('');

    const handleNameSearch = (event: React.ChangeEvent<HTMLInputElement>) => { setSearchTerm(event.target.value); };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setFilterType(event.target.value); };
    const handleAddType = () => { if (filterType && !selectedTypes.includes(filterType)) { setSelectedTypes([...selectedTypes, filterType]); } };

    const handleNeighbourhoodChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setFilterNeighbourhood(event.target.value); };
    const handleAddNeighbourhood = () => { if (filterNeighbourhood && !selectedNeighbourhoods.includes(filterNeighbourhood)) { setSelectedNeighbourhoods([...selectedNeighbourhoods, filterNeighbourhood]); } };

    const handleMusicChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setFilterMusic(event.target.value); };
    const handleAddMusic = () => { if (filterMusic && !selectedMusicTypes.includes(filterMusic)) { setSelectedMusicTypes([...selectedMusicTypes, filterMusic]); } };

    const handleRemoveFilter = (type: string, category: string) => {
        switch (category) {
            case 'type': setSelectedTypes(selectedTypes.filter(t => t !== type)); break;
            case 'neighbourhood': setSelectedNeighbourhoods(selectedNeighbourhoods.filter(n => n !== type)); break;
            case 'musicType': setSelectedMusicTypes(selectedMusicTypes.filter(m => m !== type)); break;
            default: console.error(`Invalid category: ${category}`); break;
        }
    };

    const getAdditionalStyle = (type: string, category: string) => {
        switch (category) {
            case 'type': return getTypeAdditionalStyle(type);
            case 'neighbourhood': return {backgroundColor: "#000088", color: "#f8f1f1"};
            case 'musicType': return getMusicAdditionalStyle(type);
            default: return {};
        }
    }

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
                    <div className={styles.filterSection}>
                        <label className={styles.filterTitle} htmlFor="neighbourhood">{dictionary[lang]?.collaFilterByNeighbourhood}</label>
                        <div className={styles.filterInnerSection}>
                            <select id="neighbourhood" name="neighbourhood" value={filterNeighbourhood} onChange={handleNeighbourhoodChange} >
                                <option value="">{dictionary[lang]?.collaFilterSelectNeighbourhood}</option>
                                {neighbourhoods.map(option => (
                                    <option
                                        key={option.labelKey}
                                        value={option.labelKey}
                                        disabled={selectedNeighbourhoods.includes(option.labelKey)}
                                    > {dictionary[lang]?.[option.labelKey]} </option>
                                ))}
                            </select>
                            <button className={styles.addFilterButton} onClick={handleAddNeighbourhood}>+</button>
                        </div>
                    </div>
                    <div className={styles.filterSection}>
                        <label className={styles.filterTitle} htmlFor="music">{dictionary[lang]?.collaFilterByMusic}</label>
                        <div className={styles.filterInnerSection}>
                            <select id="music" name="music" value={filterMusic} onChange={handleMusicChange} >
                                <option value="">{dictionary[lang]?.collaFilterSelectMusic}</option>
                                {musics.map(option => (
                                    <option
                                        key={option.labelKey}
                                        value={option.labelKey}
                                        disabled={selectedMusicTypes.includes(option.labelKey)}
                                    > {dictionary[lang]?.[option.labelKey]} </option>
                                ))}
                            </select>
                            <button className={styles.addFilterButton} onClick={handleAddMusic}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------------------------------------------------- SELECTED TYPES -------------------------------------------------*/}
            <div className={styles.selectedFilters}>
                {[
                    ...selectedTypes.map(type => ({ type, category: 'type' })),
                    ...selectedNeighbourhoods.map(neighbourhood => ({ type: neighbourhood, category: 'neighbourhood' })),
                    ...selectedMusicTypes.map(musicType => ({ type: musicType, category: 'musicType' }))
                ].map(({ type, category }) => (
                    <div key={`${category}-${type}`} className={styles.selectedFilter}  style={getAdditionalStyle(type, category)} >
                        <span> {dictionary[lang]?.[type]} </span>
                        <button className={styles.selectedFilterButton} onClick={() => handleRemoveFilter(type, category)} >×</button>
                    </div>
                ))}
            </div>

            {/* -----------------------------------------------------------------------------------------------------------------*/}
            {/* ------------------------------------------------- COLLES RESULT -------------------------------------------------*/}
            {/* -----------------------------------------------------------------------------------------------------------------*/}
            <h2 className={styles.h2}>{dictionary[lang]?.collesTitle}</h2>
            <div className={styles.list}>
                {colles
                    .filter(colla =>
                        (!collaIsCCGM(colla.id)) &&
                        (searchTerm.trim() === '' || colla.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
                        (selectedTypes.length === 0 || selectedTypes.includes(colla.type)) &&
                        (selectedNeighbourhoods.length === 0 || selectedNeighbourhoods.includes(colla.neighbourhood)) &&
                        (selectedMusicTypes.length === 0 || selectedMusicTypes.includes(colla.music))
                    ).map(colla => (
                        <CollaCard key={colla.id} colla={colla} lang={lang} />
                    ))}
            </div>
        </section>
    );
}
