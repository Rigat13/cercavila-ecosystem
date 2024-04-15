'use client';

import React, {useEffect, useState} from "react";
import {isCollaNameValid, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaName";
import {isCollaEntityValid, ENTITY_MIN_LENGTH, ENTITY_MAX_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaEntity";
import {isCollaFoundationYearValid, FOUNDATION_YEAR_MIN, FOUNDATION_YEAR_MAX} from "@/modules/colles/domain/colla-attributes/CollaFoundationYear";
import {FormStatus, useCollaForm} from "@/app/sections/colles/form/useCollaForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useCollaFormData} from "@/app/sections/colles/form/useCollaFormData";
import styles from "@/app/sections/colles/form/CollaForm.module.scss";
import {defaultLang, dictionary} from "@/content";
const initialState = {
    name: "",
    entity: "",
    foundationYear: "",
}
export let isNameValid, isEntityValid, isFoundationYearValid = false;
const lang = defaultLang;

export function CreateCollaForm({ lang }: { lang: string }) {
    const { formData, updateForm, resetForm } = useCollaFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useCollaForm();
    const [errors, setErrors] = useState(initialState);
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

    const validateFormData = ({ name, entity, foundationYear }) => {
        // Perform validation based on the provided data
        isNameValid = isCollaNameValid(name);
        isEntityValid = isCollaEntityValid(entity);
        isFoundationYearValid = !isNaN(foundationYear) && isCollaFoundationYearValid(foundationYear);

        setErrors({
            name: isNameValid ? "" : dictionary[lang]?.collesNameInvalid + NAME_MIN_LENGTH + " - " +NAME_MAX_LENGTH,
            entity: isEntityValid ? "" : dictionary[lang]?.collesEntityInvalid + ENTITY_MIN_LENGTH + " - " + ENTITY_MAX_LENGTH,
            foundationYear: isFoundationYearValid ? "" : dictionary[lang]?.collesFoundationYearInvalid + FOUNDATION_YEAR_MIN + " - " + FOUNDATION_YEAR_MAX,
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isNameValid || !isEntityValid || !isFoundationYearValid) { return; }
        ev.preventDefault();
        submitForm({
            name: formData.name,
            entity: formData.entity,
            foundationYear: Number(formData.foundationYear),
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

                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isNameValid || !isEntityValid || !isFoundationYearValid}
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