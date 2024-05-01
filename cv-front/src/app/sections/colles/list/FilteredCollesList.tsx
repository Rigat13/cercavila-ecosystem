import { useState } from 'react';
import { CollaCard } from '@/app/sections/colles/card/CollaCard';
import { useCollesContext } from '@/app/sections/colles/CollesContext';
import styles from './FilteredCollesList.module.scss';
import { dictionary } from '@/content';

export function FilteredCollesList({ lang }: { lang: string }) {
    const { colles } = useCollesContext();
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [filterType, setFilterType] = useState<string>(''); // State to hold selected filter type

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(event.target.value);
    };

    const handleAddType = () => {
        if (filterType && !selectedTypes.includes(filterType)) {
            setSelectedTypes([...selectedTypes, filterType]);
        }
    };

    const handleRemoveType = (type: string) => {
        setSelectedTypes(selectedTypes.filter(t => t !== type));
    };

    return (
        <section>
            <div className={styles.filter}>
                <label htmlFor="type">{dictionary[lang]?.collaFilterByType}</label>
                <select
                    id="type"
                    name="type"
                    value={filterType}
                    onChange={handleTypeChange}
                >
                    <option value="">{dictionary[lang]?.collaFilterSelectType}</option>
                    {/* Assuming colles is an array of objects with 'type' property */}
                    {colles.map(colla => (
                        <option key={colla.id} value={colla.type}>
                            {colla.type}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddType}>Add Filter</button>
            </div>

            <h2 className={styles.h2}>{dictionary[lang]?.collesTitle}</h2>
            <div className={styles.list}>
                {colles
                    .filter(colla => selectedTypes.length === 0 || selectedTypes.includes(colla.type))
                    .map(colla => (
                        <CollaCard key={colla.id} colla={colla} lang={lang} />
                    ))}
            </div>

            <div className={styles.selectedTypes}>
                {selectedTypes.map(type => (
                    <div key={type} className={styles.selectedType}>
                        <span>{type}</span>
                        <button onClick={() => handleRemoveType(type)}>×</button>
                    </div>
                ))}
            </div>
        </section>
    );
}
