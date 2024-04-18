import React, {useEffect, useState} from "react";
import {isCollaNameValid, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaName";
import {isCollaEntityValid, ENTITY_MIN_LENGTH, ENTITY_MAX_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaEntity";
import {isCollaFoundationYearValid, FOUNDATION_YEAR_MIN, FOUNDATION_YEAR_MAX} from "@/modules/colles/domain/colla-attributes/CollaFoundationYear";
import {FormStatus, useUpdateCollaForm} from "@/app/sections/colles/update-form/useUpdateCollaForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useUpdateCollaFormData} from "@/app/sections/colles/update-form/useUpdateCollaFormData";
import {useCollesContext} from "@/app/sections/colles/CollesContext";
import styles from "@/app/sections/colles/form/CollaForm.module.scss";
import {defaultLang, dictionary} from "@/content";
const initialState = {
    id: "",
    name: "",
    entity: "",
    foundationYear: "",
}
export let isNameValid, isEntityValid, isFoundationYearValid = false;
const lang = defaultLang;

export function UpdateCollaForm({collaId, lang}: {collaId: string; lang: string}) {
    const { formData, updateForm, resetForm } = useUpdateCollaFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useUpdateCollaForm();
    const [errors, setErrors] = useState(initialState);
    const [isDeleted, setIsDeleted] = useState(false);
    const { colles } = useCollesContext();
    lang = lang;

    useEffect(() => {
        const fetchCollaData = async () => {
            try {
                const collaData = colles.find((colla) => colla.id === collaId);
                if (!collaData) {
                    throw new Error(dictionary[lang]?.collaNotFoundWithId + collaId);
                }
                updateForm({
                    id: collaData.id,
                    name: collaData.name,
                    entity: collaData.entity,
                    foundationYear: collaData.foundationYear+""
                });
            } catch (error) {
                console.error(dictionary[lang]?.errorRetreivingCollaMessage + collaId);
            }
        };
        fetchCollaData();
    }, [collaId, colles]);

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

    const validateFormData = ({ id, name, entity, foundationYear }) => {
        // Perform validation based on the provided data
        isNameValid = isCollaNameValid(name);
        isEntityValid = isCollaEntityValid(entity);
        isFoundationYearValid = isCollaFoundationYearValid(foundationYear);

        setErrors({
            id: "",
            name: isNameValid ? "" : dictionary[lang]?.collesNameInvalid + NAME_MIN_LENGTH + " - " +NAME_MAX_LENGTH,
            entity: isEntityValid ? "" : dictionary[lang]?.collesEntityInvalid + ENTITY_MIN_LENGTH + " - " + ENTITY_MAX_LENGTH,
            foundationYear: isFoundationYearValid ? "" : dictionary[lang]?.collesFoundationYearInvalid + FOUNDATION_YEAR_MIN + " - " + FOUNDATION_YEAR_MAX,
        });
    };

    const handleSubmit = (ev) => {
        if (!isNameValid || !isEntityValid || !isFoundationYearValid) { return; }
        ev.preventDefault();
        submitForm({
            id: formData.id,
            name: formData.name,
            entity: formData.entity,
            foundationYear: Number(formData.foundationYear),
            description: "",
        });
    };

    // ------------------ DELETE COLLA ------------------
    const { deleteColla } = useCollesContext();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsConfirmOpen(true);
    };
    if (isDeleted) {
        return (
            <section className={styles.collaForm}>
                <h2 className={styles.h2}>{dictionary[lang]?.successUpdateCollaMessage}</h2>
                <a href={lang === defaultLang ? "/colles.html" : `/colles.html?lang=${lang}`} className={styles.h2}>
                    <button className={styles.actionButton}>{dictionary[lang]?.goToCollesButton}</button>
                </a>
            </section>
        );
    }

    const handleConfirmDelete = () => {
        deleteColla(collaId);
        setIsDeleted(true);
        setIsConfirmOpen(false);
    };

    const handleCancelDelete = () => {
        setIsConfirmOpen(false);
    };

    if (isDeleted) {
        return (
            <div>
                <p>{dictionary[lang]?.successDeleteCollaMessage}</p>
            </div>
        );
    }
    // ---------------- END DELETE COLLA ----------------


    switch (formStatus) {
        case FormStatus.Loading:
            return <Spinner />;
        case FormStatus.Success:
            return (
                <SuccessNotification lang={lang}/>
        );
        case FormStatus.Error:
            return <ErrorNotification lang={lang} resetForm={resetFormStatus} />;
        case FormStatus.Initial:
            return (
                <section id="order" className={styles.collaForm}>
                    <h2>{dictionary[lang]?.updateCollaTitle}</h2>

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
                            {dictionary[lang]?.updateCollaButton}
                        </button>
                    </form>
                    <a href={lang === defaultLang ? "/colles.html" : `/colles.html?lang=${lang}`}>
                        <button className={styles.actionButton}>{dictionary[lang]?.goToCollesButton}</button>
                    </a>

                    {/* "Delete" Button */}
                    <button className={styles.deleteButton} onClick={handleDeleteClick} >{dictionary[lang]?.deleteCollaButton}</button>
                    {/* Confirmation Dialog */}
                    {isConfirmOpen && (
                        <div className={styles.collaForm}>
                            <p className={styles.warningMessage}>{dictionary[lang]?.warningDeleteCollaMessage}</p>
                            <button className={styles.actionButton} onClick={handleCancelDelete}>{dictionary[lang]?.cancelDeleteCollaButton}</button>
                            <button className={styles.deleteButton} onClick={handleConfirmDelete}>{dictionary[lang]?.confirmDeleteCollaButton}</button>
                        </div>
                    )}
                </section>
            );
        default:
            assertUnreachable(formStatus);
    }
}

function SuccessNotification({ lang }: { lang: string}) {
    return (
        <section className={styles.collaForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successUpdateCollaMessage}</h2>
            <a href={lang === defaultLang ? "/colles.html" : `/colles.html?lang=${lang}`}>
                <button className={styles.actionButton}>{dictionary[lang]?.goToCollesButton}</button>
            </a>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.collaForm}>
            <h2 className={styles.h2error}>{dictionary[lang]?.errorFound}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.retry}</button>
        </section>
    );
}

function assertUnreachable(x: never): never {
    throw new Error(""+dictionary[lang]?.unreachablePage);
}