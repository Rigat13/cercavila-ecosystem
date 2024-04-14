import React, {useEffect, useState} from "react";
import {isCollaNameValid, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaName";
import {isCollaEntityValid, ENTITY_MIN_LENGTH, ENTITY_MAX_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaEntity";
import {isCollaFoundationYearValid, FOUNDATION_YEAR_MIN, FOUNDATION_YEAR_MAX} from "@/modules/colles/domain/colla-attributes/CollaFoundationYear";
import {FormStatus, useUpdateCollaForm} from "@/app/sections/colles/update-form/useUpdateCollaForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useUpdateCollaFormData} from "@/app/sections/colles/update-form/useUpdateCollaFormData";
import {useCollesContext} from "@/app/sections/colles/CollesContext";
import styles from "@/app/sections/colles/form/CollaForm.module.scss";
const initialState = {
    id: "",
    name: "",
    entity: "",
    foundationYear: "",
}
export let isNameValid, isEntityValid, isFoundationYearValid = false;

export function UpdateCollaForm({collaId}) {
    const { formData, updateForm, resetForm } = useUpdateCollaFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useUpdateCollaForm();
    const [errors, setErrors] = useState(initialState);
    const [isDeleted, setIsDeleted] = useState(false);
    const { colles } = useCollesContext();


    useEffect(() => {
        const fetchCollaData = async () => {
            try {
                const collaData = colles.find((colla) => colla.id === collaId);
                if (!collaData) {
                    throw new Error(`No s'ha trobat cap colla amb l'ID ${collaId}`);
                }
                updateForm({
                    id: collaData.id,
                    name: collaData.name,
                    entity: collaData.entity,
                    foundationYear: collaData.foundationYear+""
                });
            } catch (error) {
                console.error("Error en obtenir la informació de la colla:", error);
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
            name: isNameValid ? "" : `El nom no és vàlid. Ha de contenir caràcters vàlids i tenir entre ${NAME_MIN_LENGTH} i ${NAME_MAX_LENGTH} caràcters`,
            entity: isEntityValid ? "" : `L'entitat no és vàlida. Ha de començar en majúscula i tenir entre ${ENTITY_MIN_LENGTH} i ${ENTITY_MAX_LENGTH} caràcters`,
            foundationYear: isFoundationYearValid ? "" : `L'any de fundació no és vàlid. Ha de ser un número entre ${FOUNDATION_YEAR_MIN} i ${FOUNDATION_YEAR_MAX}`,
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
        });
    };

    const validateForm = () => {
        isNameValid = isCollaNameValid(formData.name);
        isEntityValid = isCollaEntityValid(formData.entity);
        isFoundationYearValid = isCollaFoundationYearValid(parseInt(formData.foundationYear));

        setErrors({
            id: "",
            name: isNameValid ? "" : `El nom no és vàlid. Ha de contenir caràcters vàlids i tenir entre ${NAME_MIN_LENGTH} i ${NAME_MAX_LENGTH} caràcters`,
            entity: isEntityValid ? "" : `L'entitat no és vàlida. Ha de començar en majúscula i tenir entre ${ENTITY_MIN_LENGTH} i ${ENTITY_MAX_LENGTH} caràcters`,
            foundationYear: isFoundationYearValid ? "" : `L'any de fundació no és vàlid. Ha de ser un número entre ${FOUNDATION_YEAR_MIN} i ${FOUNDATION_YEAR_MAX}`,
        });

        // Return validation result
        return isNameValid && isEntityValid && isFoundationYearValid;
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
                <h2 className={styles.h2}>Colla esborrada amb èxit</h2>
                <a href={`/colles`} className={styles.h2}>
                    <button className={styles.actionButton}> Colles </button>
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
                <p>The colla has been deleted successfully.</p>
            </div>
        );
    }
    // ---------------- END DELETE COLLA ----------------


    switch (formStatus) {
        case FormStatus.Loading:
            return <Spinner />;
        case FormStatus.Success:
            return (
                <SuccessNotification/>
        );
        case FormStatus.Error:
            return <ErrorNotification resetForm={resetFormStatus} />;
        case FormStatus.Initial:
            return (
                <section id="order" className={styles.collaForm}>
                    <h2>Edita la colla</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Nom</label>
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
                            <label htmlFor="entity">Entitat</label>
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
                            <label htmlFor="foundationYear">Any de fundació</label>
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
                            Edita la colla
                        </button>
                    </form>
                    <a href={`/colles`}>
                        <button className={styles.actionButton}> Colles </button>
                    </a>

                    {/* "Delete" Button */}
                    <button className={styles.deleteButton} onClick={handleDeleteClick} >Esborrar</button>
                    {/* Confirmation Dialog */}
                    {isConfirmOpen && (
                        <div className={styles.collaForm}>
                            <p className={styles.warningMessage}>Voleu esborrar la colla de manera permanent? No es pot desfer aquesta acció.</p>
                            <button className={styles.actionButton} onClick={handleCancelDelete}>Cancel·lar</button>
                            <button className={styles.deleteButton} onClick={handleConfirmDelete}>Esborrar permanentment</button>
                        </div>
                    )}
                </section>
            );
        default:
            assertUnreachable(formStatus);
    }
}

function SuccessNotification() {
    return (
        <section className={styles.collaForm}>
            <h2 className={styles.h2}>Colla editada amb èxit</h2>
            <a href={`/colles`} className={styles.h2}>
                <button className={styles.actionButton}> Colles </button>
            </a>
        </section>
    );
}

function ErrorNotification({ resetForm }: { resetForm: () => void }) {
    return (
        <section className={styles.collaForm}>
            <h2 className={styles.h2error}>Hi ha hagut un error</h2>
            <button className={styles.actionButton} onClick={resetForm}>Tornar a intentar</button>
        </section>
    );
}

function assertUnreachable(x: never): never {
    throw new Error("No s'esperava arribar aquí");
}