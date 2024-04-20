'use client';

import React, {useEffect, useState} from "react";
import {FormStatus, useCollaForm} from "@/app/sections/colles/form/useCollaForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useCollaFormData} from "@/app/sections/colles/form/useCollaFormData";
import styles from "@/app/sections/colles/form/CollaForm.module.scss";
import {defaultLang, dictionary} from "@/content";

import {isCollaNameValid, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaName";
import {isCollaEntityValid, ENTITY_MIN_LENGTH, ENTITY_MAX_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaEntity";
import {isCollaFoundationYearValid, FOUNDATION_YEAR_MIN, FOUNDATION_YEAR_MAX} from "@/modules/colles/domain/colla-attributes/CollaFoundationYear";
import {isCollaDescriptionValid, DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaDescription";
import {isCollaNeighbourhoodValid, NEIGHBOURHOOD_MAX_LENGTH, NEIGHBOURHOOD_MIN_LENGTH, neighbourhoods} from "@/modules/colles/domain/colla-attributes/CollaNeighbourhood";
import {isCollaTypeValid, TYPE_MAX_LENGTH, TYPE_MIN_LENGTH, collaTypes} from "@/modules/colles/domain/colla-attributes/CollaType";
import {isCollaLogoValid, LOGO_MAX_MBS} from "@/modules/colles/domain/colla-attributes/CollaLogo";

const initialState = {
    name: "",
    entity: "",
    foundationYear: "",
    description: "",
    type: "",
    neighbourhood: "",
    logo: null as File | null,
}
export let isNameValid, isEntityValid, isFoundationYearValid, isDescriptionValid, isTypeValid, isNeighbourhoodValid, isLogoValid = false;
const lang = defaultLang;

export function CreateCollaForm({ lang }: { lang: string }) {
    const { formData, updateForm, resetForm } = useCollaFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useCollaForm();
    const [errors, setErrors] = useState(initialState);
    const [logo, setImage] = useState<File | null>(null);
    const [logoSize, setLogoSize] = useState(0);
    lang = lang;

    useEffect(() => {

    }, [formData]);

    const handleNameChange = (ev) => {
        const newName = ev.target.value;
        updateForm({ name: newName });
        validateFormData({ ...formData, name: newName });
    };

    const handleEntityChange = (ev) => {
        const newEntity = ev.target.value;
        updateForm({ entity: newEntity });
        validateFormData({ ...formData, entity: newEntity });
    };

    const handleFoundationYearChange = (ev) => {
        const newFoundationYear = Number(ev.target.value);
        updateForm({ foundationYear: newFoundationYear+"" });
        validateFormData({ ...formData, foundationYear: newFoundationYear });
    };

    const handleDescriptionChange = (ev) => {
        const newDescription = ev.target.value;
        updateForm({ description: newDescription });
        validateFormData({ ...formData, description: newDescription });
    };

    const handleTypeChange = (ev) => {
        const newType = ev.target.value;
        updateForm({ type: newType });
        validateFormData({ ...formData, type: newType });
    }

    const handleNeighbourhoodChange = (ev) => {
        const newNeighbourhood = ev.target.value;
        updateForm({ neighbourhood: newNeighbourhood });
        validateFormData({ ...formData, neighbourhood: newNeighbourhood });
    }

    const handleLogoChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files?.[0];
        if (file !== undefined) setImage(file);
        else setImage(null);

        const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
        setLogoSize(fileSizeInMB);

        validateFormData({ ...formData, logo: file });
    };

    const validateFormData = ({ name, entity, foundationYear, description, type, neighbourhood, logo }) => {
        // Perform validation based on the provided data
        isNameValid = isCollaNameValid(name);
        isEntityValid = isCollaEntityValid(entity);
        isFoundationYearValid = !isNaN(foundationYear) && isCollaFoundationYearValid(foundationYear);
        isDescriptionValid = isCollaDescriptionValid(description);
        isTypeValid = isCollaTypeValid(type);
        isNeighbourhoodValid = isCollaNeighbourhoodValid(neighbourhood);
        isLogoValid = isCollaLogoValid(logo);

        setErrors({
            name: isNameValid ? "" : dictionary[lang]?.collesNameInvalid + NAME_MIN_LENGTH + " - " +NAME_MAX_LENGTH,
            entity: isEntityValid ? "" : dictionary[lang]?.collesEntityInvalid + ENTITY_MIN_LENGTH + " - " + ENTITY_MAX_LENGTH,
            foundationYear: isFoundationYearValid ? "" : dictionary[lang]?.collesFoundationYearInvalid + FOUNDATION_YEAR_MIN + " - " + FOUNDATION_YEAR_MAX,
            description: isDescriptionValid ? "" : dictionary[lang]?.collesDescriptionInvalid + " " + DESCRIPTION_MIN_LENGTH + " - " + DESCRIPTION_MAX_LENGTH,
            type: isTypeValid ? "" : dictionary[lang]?.collesTypeInvalid + " " + TYPE_MIN_LENGTH + " - " + TYPE_MAX_LENGTH,
            neighbourhood: isNeighbourhoodValid ? "" : dictionary[lang]?.collesNeighbourhoodInvalid + " " + NEIGHBOURHOOD_MIN_LENGTH + " - " + NEIGHBOURHOOD_MAX_LENGTH,
            logo: null,
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        const formDataWithImage = { ...formData };
        if (logo) {
            formDataWithImage.logo = logo;
        }

        if (!isNameValid || !isEntityValid || !isFoundationYearValid || !isDescriptionValid || !isTypeValid || !isNeighbourhoodValid || !isLogoValid) { return; }
        ev.preventDefault();
        submitForm({
            name: formData.name,
            entity: formData.entity,
            foundationYear: Number(formData.foundationYear),
            description: formData.description,
            type: formData.type,
            neighbourhood: formData.neighbourhood,
            logo: formDataWithImage.logo,
        });
    };

    switch (formStatus) {
        case FormStatus.Loading:
            return <Spinner />;
        case FormStatus.Success:
            return (
                <SuccessNotification lang={lang}
                    resetForm={() => {
                        resetForm();
                        resetFormStatus();
                    }}
                />
        );
        case FormStatus.Error:
            return <ErrorNotification lang={lang} resetForm={resetFormStatus} />;
        case FormStatus.Initial:
            return (
                <section id="order" className={styles.collaForm}>
                    <h2>{dictionary[lang]?.createCollaTitle}</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="name">{dictionary[lang]?.collaName}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleNameChange}
                            />
                            {formData.name && errors.name && (
                                <div style={{ color: "tomato" }}>{errors.name}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="entity">{dictionary[lang]?.collaEntity}</label>
                            <input
                                type="text"
                                id="entity"
                                name="entity"
                                value={formData.entity}
                                onChange={handleEntityChange}
                            />
                            {formData.entity && errors.entity && (
                                <div style={{ color: "tomato" }}>{errors.entity}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="foundationYear">{dictionary[lang]?.collaFoundationYear}</label>
                            <input
                                type="number"
                                id="foundationYear"
                                name="foundationYear"
                                value={formData.foundationYear}
                                onChange={handleFoundationYearChange}
                            />
                            {formData.foundationYear && errors.foundationYear && (
                                <div style={{ color: "tomato" }}>{errors.foundationYear}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="description">{dictionary[lang]?.collaDescription}</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleDescriptionChange}
                            />
                            {formData.description && errors.description && (
                                <div style={{ color: "tomato" }}>{errors.description}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="type">{dictionary[lang]?.collaType}</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleTypeChange}
                            >
                                <option value="">{dictionary[lang]?.selectCollaType}</option>
                                {collaTypes.map(option => (
                                    <option key={option.labelKey} value={option.labelKey}>
                                        {dictionary[lang]?.[option.labelKey]}
                                    </option>
                                ))}
                            </select>
                            {formData.type && errors.type && (
                                <div style={{ color: "tomato" }}>{errors.type}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="neighbourhood">{dictionary[lang]?.collaNeighbourhood}</label>
                            <select
                                id="neighbourhood"
                                name="neighbourhood"
                                value={formData.neighbourhood}
                                onChange={handleNeighbourhoodChange}
                            >
                                <option value="">{dictionary[lang]?.selectNeighbourhood}</option>
                                {neighbourhoods.map(option => (
                                    <option key={option.labelKey} value={option.labelKey}>
                                        {dictionary[lang]?.[option.labelKey]}
                                    </option>
                                ))}
                            </select>
                            {formData.neighbourhood && errors.neighbourhood && (
                                <div style={{ color: "tomato" }}>{errors.neighbourhood}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="logo">{dictionary[lang]?.collaLogo}</label>
                            <input
                                type="file"
                                id="logo"
                                name="logo"
                                accept="image/*" // Specify accepted file types (images)
                                onChange={handleLogoChange}
                            />
                            {logoSize > LOGO_MAX_MBS && (
                                <p style={{ color: 'red' }}>
                                    {`File size (${logoSize.toFixed(2)} MB) exceeds the maximum allowed size of ${LOGO_MAX_MBS} MB`}
                                </p>
                            )}
                            <p htmlFor="logo">{dictionary[lang]?.maxFileSize + LOGO_MAX_MBS + "MB"}</p>
                        </div>

                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isNameValid || !isEntityValid || !isFoundationYearValid || !isDescriptionValid || !isTypeValid || !isNeighbourhoodValid || !isLogoValid}
                        >
                            {dictionary[lang]?.createCollaButton}
                        </button>
                    </form>
                </section>
            );
        default:
            assertUnreachable(formStatus);
    }
}

function SuccessNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.collaForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successCreateCollaMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.createAnotherCollaButton}</button>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.collaForm}>
            <h2 className={styles.h2error}>{dictionary[lang]?.errorCreateCollaMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.retryCreateCollaButton}</button>
        </section>
    );
}

function assertUnreachable(x: never): never {
    throw new Error("No s'esperava arribar aquí");
}