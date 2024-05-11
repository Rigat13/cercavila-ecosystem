import React, { useState } from 'react';
import { CollaCard } from '@/app/sections/colles/card/CollaCard';
import { useUsersContext } from '@/app/sections/users/UsersContext';
import styles from './FilteredCollesList.module.scss';
import { dictionary } from '@/content';
import {userCollaRoles, getRolesAdditionalStyle} from "@/modules/users/domain/user-attributes/UserRoles";
import {collaIsCCGM} from "@/modules/colles/domain/Colla";
import {getRoleColles} from "@/modules/users/domain/User";
import {getContrastColour} from "@/app/sections/shared/getContrastColour";

export function FilteredUsersList({ lang }: { lang: string }) {
    const { colles } = useUsersContext();
    const { users } = useUsersContext();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [filterRole, setFilterRole] = useState<string>('');

    const [selectedCollesId, setSelectedCollesIds] = useState<string[]>([]);
    const [filterColla, setFilterColla] = useState<string>('');

    const handleNameSearch = (event: React.ChangeEvent<HTMLInputElement>) => { setSearchTerm(event.target.value); };

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setFilterRole(event.target.value); };
    const handleAddRole = () => { if (filterRole && !selectedRoles.includes(filterRole)) { setSelectedRoles([...selectedRoles, filterRole]); } };

    const handleCollaChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setFilterColla(event.target.value); };
    const handleAddColla = () => { if (filterColla && !selectedCollesId.includes(filterColla)) { setSelectedCollesIds([...selectedCollesId, filterColla]); } };

    const handleRemoveFilter = (role: string, category: string) => {
        switch (category) {
            case 'role': setSelectedRoles(selectedRoles.filter(t => t !== role)); break;
            case 'colla': setSelectedCollesIds(selectedCollesId.filter(n => n !== role)); break;
            default: console.error(`Invalid category: ${category}`); break;
        }
    };

    const getCollaAdditionalStyle = (collaId: string) => {
        let backgroundColor: React.CSSProperties  = "#000000";
        let color: React.CSSProperties = "#FFFFFF";

        const colla = colles.find(colla => colla.id === collaId);
        backgroundColor = colla ? colla.primaryColour : '';
        color = getContrastColour(backgroundColor);
        return { backgroundColor, color };
    }

    const getAdditionalStyle = (value: string, category: string) => {
        switch (category) {
            case 'role': return getRolesAdditionalStyle(value);
            case 'colla': return getCollaAdditionalStyle(value);
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
                                role="text"
                                id="name"
                                name="name"
                                value={searchTerm}
                                onChange={handleNameSearch}
                                placeholder={dictionary[lang]?.collaFilterWriteName}
                            />
                        </div>
                    </div>
                    <div className={styles.filterSection}>
                        <label className={styles.filterTitle} htmlFor="role">{dictionary[lang]?.userFilterByRole}</label>
                        <div className={styles.filterInnerSection}>
                            <select id="role" name="role" value={filterRole} onChange={handleRoleChange} >
                                <option value="">{dictionary[lang]?.userFilterSelectRole}</option>
                                {userCollaRoles.map(option => (
                                    <option
                                        key={option.labelKey}
                                        value={option.labelKey}
                                        disabled={selectedRoles.includes(option.labelKey)}
                                    > {dictionary[lang]?.[option.labelKey]} </option>
                                ))}
                            </select>
                            <button className={styles.addFilterButton} onClick={handleAddRole}>+</button>
                        </div>
                    </div>
                    <div className={styles.filterSection}>
                        <label className={styles.filterTitle} htmlFor="colla">{dictionary[lang]?.userFilterByColla}</label>
                        <div className={styles.filterInnerSection}>
                            <select id="colla" name="colla" value={filterColla} onChange={handleCollaChange} >
                                <option value="">{dictionary[lang]?.userFilterSelectColla}</option>
                                {colles.map(option => (
                                    <option
                                        key={option.id}
                                        value={option.name}
                                        disabled={selectedCollesId.includes(option.id)}
                                    > {option.name} </option>
                                ))}
                            </select>
                            <button className={styles.addFilterButton} onClick={handleAddColla}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------------------------------------------------- SELECTED TYPES -------------------------------------------------*/}
            <div className={styles.selectedFilters}>
                {[
                    ...selectedRoles.map(role => ({ role, category: 'role' })),
                    ...selectedCollesId.map(colla => ({ role: colla, category: 'colla' })),
                ].map(({ role, category }) => (
                    <div key={`${category}-${role}`} className={styles.selectedFilter}  style={getAdditionalStyle(role, category)} >
                        <span> {dictionary[lang]?.[role]} </span>
                        <button className={styles.selectedFilterButton} onClick={() => handleRemoveFilter(role, category)} >×</button>
                    </div>
                ))}
            </div>

            {/* -----------------------------------------------------------------------------------------------------------------*/}
            {/* ------------------------------------------------- COLLES RESULT -------------------------------------------------*/}
            {/* -----------------------------------------------------------------------------------------------------------------*/}
            <h2 className={styles.h2}>{dictionary[lang]?.collesTitle}</h2>
            <div className={styles.list}>
                {users
                    .filter(user =>
                        (searchTerm.trim() === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
                        // Check one any of the selectedRoles matches any of the user roles
                        (selectedRoles.length === 0 || selectedRoles.some(role => user.roles.includes(role))) &&
                        // Check one any of the selectedColles matches any of the user colles
                        (selectedCollesId.length === 0 || selectedCollesId.some(collaId => getRoleColles(user).includes(collaId)))
                    ).map(user => (
                        <UserCard key={user.id} user={user} lang={lang} />
                    ))}
            </div>
        </section>
    );
}
