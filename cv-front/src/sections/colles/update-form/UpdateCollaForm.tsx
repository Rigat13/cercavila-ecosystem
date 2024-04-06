import React, {useEffect, useState} from "react";
import {isCollaNameValid, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaName";
import {isCollaEntityValid, ENTITY_MIN_LENGTH, ENTITY_MAX_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaEntity";
import {isCollaFoundationYearValid, FOUNDATION_YEAR_MIN, FOUNDATION_YEAR_MAX} from "@/modules/colles/domain/colla-attributes/CollaFoundationYear";
import {FormStatus, useUpdateCollaForm} from "@/sections/colles/update-form/useUpdateCollaForm";
import { Spinner } from "@/sections/shared/Spinner";
import {useUpdateCollaFormData} from "@/sections/colles/update-form/useUpdateCollaFormData";
import {useCollesContext} from "@/sections/colles/CollesContext";

const initialState = {
    id: "",
    name: " ",
    entity: " ",
    foundationYear: 2024,
}
export let isNameValid, isEntityValid, isFoundationYearValid = false;

export let userEnteredData = false;

export function UpdateCollaForm({collaId}) {
    const { formData, updateForm, resetForm } = useUpdateCollaFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useUpdateCollaForm();
    const [errors, setErrors] = useState(initialState);
    const { colles } = useCollesContext();


    useEffect(() => {
        const fetchCollaData = async () => {
            try {
                const collaData = colles.find((colla) => colla.id === collaId);

                updateForm({
                    id: collaData.id,
                    name: collaData.name,
                    entity: collaData.entity,
                    foundationYear: collaData.foundationYear
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
        updateForm({ foundationYear: newFoundationYear });
        validateFormData({ ...formData, foundationYear: newFoundationYear });
    };

    const validateFormData = ({ id, name, entity, foundationYear }) => {
        // Perform validation based on the provided data
        const isNameValid = isCollaNameValid(name);
        const isEntityValid = isCollaEntityValid(entity);
        const isFoundationYearValid = isCollaFoundationYearValid(foundationYear);

        setErrors({
            id: "",
            name: isNameValid ? "" : `El nom no és vàlid. Ha de contenir caràcters vàlids i tenir entre ${NAME_MIN_LENGTH} i ${NAME_MAX_LENGTH} caràcters`,
            entity: isEntityValid ? "" : `L'entitat no és vàlida. Ha de començar en majúscula i tenir entre ${ENTITY_MIN_LENGTH} i ${ENTITY_MAX_LENGTH} caràcters`,
            foundationYear: isFoundationYearValid ? 0 : FOUNDATION_YEAR_MIN,
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isNameValid || !isEntityValid || !isFoundationYearValid) { return; }
        ev.preventDefault();
        submitForm(formData);
        userEnteredData = false;
    };

    switch (formStatus) {
        case FormStatus.Loading:
            return <Spinner />;
        case FormStatus.Success:
            return (
                <SuccessNotification
                    resetForm={() => {
                        resetForm();
                        resetFormStatus();
                    }}
                />
        );
        case FormStatus.Error:
            return <ErrorNotification resetForm={resetFormStatus} />;
        case FormStatus.Initial:
            return (
                <section id="order" className="">
                    <h2>Crea una nova colla</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >
                        <div className="form-group">
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

                        <div className="form-group">
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

                        <div className="form-group">
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

                        <button type="submit">Edita la colla</button>
                    </form>
                </section>
            );
        default:
            assertUnreachable(formStatus);
    }
}

function SuccessNotification({ resetForm }: { resetForm: () => void }) {
    return (
        <section>
            <h2>Colla editar amb èxit</h2>
            <button onClick={resetForm}>Tornar a editar</button>
        </section>
    );
}

function ErrorNotification({ resetForm }: { resetForm: () => void }) {
    return (
        <section>
            <h2>Hi ha hagut un error</h2>
            <button onClick={resetForm}>Tornar a intentar</button>
        </section>
    );
}

function assertUnreachable(x: never): never {
    throw new Error("No s'esperava arribar aquí");
}