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
import {isCollaTypeValid,TYPE_MAX_LENGTH,TYPE_MIN_LENGTH,collaTypes} from "@/modules/colles/domain/colla-attributes/CollaType";
import {isCollaNeighbourhoodValid, NEIGHBOURHOOD_MAX_LENGTH, NEIGHBOURHOOD_MIN_LENGTH, neighbourhoods} from "@/modules/colles/domain/colla-attributes/CollaNeighbourhood";
import {isCollaColourValid} from "@/modules/colles/domain/colla-attributes/CollaColours";
import {isCollaLogoValid, LOGO_MAX_MBS} from "@/modules/colles/domain/colla-attributes/CollaLogo";
import ColourPicker from "@/app/sections/shared/ColourPicker";
import {isCollaMusicValid, musics} from "@/modules/colles/domain/colla-attributes/CollaMusic";
import {isCollaEmailValid} from "@/modules/colles/domain/colla-attributes/CollaEmail";
import {isCollaInstagramValid} from "@/modules/colles/domain/colla-attributes/CollaInstagram";
import {isCollaFiguresValid, concatenateFigures} from "@/modules/colles/domain/colla-attributes/CollaFigures";
import {useCollesContext} from "@/app/sections/colles/CollesContext";

const initialState = {
    name: "",
    entity: "",
    foundationYear: "",
    description: "",
    type: "",
    neighbourhood: "",
    primaryColour: "",
    secondaryColour: "",
    logo: null as File | null,
    music: "",
    email: "",
    instagram: "",
    figures: "",
}

export let isNameValid, isEntityValid, isFoundationYearValid, isDescriptionValid, isTypeValid, isNeighbourhoodValid,
    isPrimaryColourValid, isSecondaryColourValid, isLogoValid, isMusicValid, isEmailValid, isFiguresValid = false;
export let isInstagramValid = true; // Optional fields

const lang = defaultLang;

export function CreateCollaForm({ lang }: { lang: string }) {
    const { formData, updateForm, resetForm } = useCollaFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useCollaForm();
    const [errors, setErrors] = useState(initialState);

    const [isPrimaryColourPickerOpen, setIsPrimaryColourPickerOpen] = useState(false);
    const [isSecondaryColourPickerOpen, setIsSecondaryColourPickerOpen] = useState(false);
    const [primaryColour, setPrimaryColour] = useState('#FFFFFF');
    const [secondaryColour, setSecondaryColour] = useState('#FFFFFF');

    const [logo, setImage] = useState<File | null>(null);
    const [logoSize, setLogoSize] = useState(0);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isLogoAlreadyValid, setLogoAlreadyValid] = useState(false);

    const { figuresNoImage } = useCollesContext();
    const [selectedFigures, setSelectedFigures] = useState([]);


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

    const handlePrimaryColourChange = (ev) => {
        const newPrimaryColour = ev.target.value;
        setPrimaryColour(newPrimaryColour);
        updateForm({ primaryColour: newPrimaryColour });
        validateFormData({ ...formData, primaryColour: newPrimaryColour });
    }

    const handleSecondaryColourChange = (ev) => {
        const newSecondaryColour = ev.target.value;
        setSecondaryColour(newSecondaryColour);
        updateForm({ secondaryColour: newSecondaryColour });
        validateFormData({ ...formData, secondaryColour: newSecondaryColour });
    }

    const handleLogoChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setLogoAlreadyValid(false);
        const file = ev.target.files?.[0];
        if (file == undefined) { validateFormData({ ...formData, logo: file }); return; }

        setImage(file);
        const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
        setLogoSize(fileSizeInMB);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setLogoPreview(result);
            };
            reader.readAsDataURL(file);
        }
        validateFormData({ ...formData, logo: file });
    };

    const handleMusicChange = (ev) => {
        const newMusic = ev.target.value;
        updateForm({ music: newMusic });
        validateFormData({ ...formData, music: newMusic });
    }

    const handleEmailChange = (ev) => {
        const newEmail = ev.target.value;
        updateForm({ email: newEmail });
        validateFormData({ ...formData, email: newEmail });
    }

    const handleInstagramChange = (ev) => {
        const newInstagram = ev.target.value;
        updateForm({ instagram: newInstagram });
        validateFormData({ ...formData, instagram: newInstagram });
    }

    const handleFiguresChange = (ev) => {
        const selectedId = ev.target.value;
        const selectedFigure = figuresNoImage.find(option => option.id === selectedId);
        if (selectedFigure) {
            setSelectedFigures([...selectedFigures, selectedFigure]);
            const newFigures = [...selectedFigures, selectedFigure].toString();
            updateForm({ figures: newFigures });
            validateFormData({ ...formData, figures: newFigures });
        }
    }

    const handleDeleteFigure = (ev, id) => {
        ev.preventDefault();
        setSelectedFigures(selectedFigures.filter(figure => figure.id !== id));
    };

    const validateFormData = ({ name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour, logo, music, email, instagram, figures }) => {
        // Perform validation based on the provided data
        isNameValid = isCollaNameValid(name);
        isEntityValid = isCollaEntityValid(entity);
        isFoundationYearValid = !isNaN(foundationYear) && isCollaFoundationYearValid(foundationYear);
        isDescriptionValid = isCollaDescriptionValid(description);
        isTypeValid = isCollaTypeValid(type, dictionary[lang]?.selectCollaType+"");
        isNeighbourhoodValid = isCollaNeighbourhoodValid(neighbourhood, dictionary[lang]?.selectNeighbourhood+"");
        isPrimaryColourValid = isCollaColourValid(primaryColour);
        isSecondaryColourValid = isCollaColourValid(secondaryColour);
        if (!isLogoAlreadyValid) isLogoValid = isCollaLogoValid(logo);
        setLogoAlreadyValid(isLogoValid);
        isMusicValid = isCollaMusicValid(music, dictionary[lang]?.selectMusic+"");
        isEmailValid = isCollaEmailValid(email);
        isInstagramValid = isCollaInstagramValid(instagram) || instagram === "" || instagram == null; // Optional field
        isFiguresValid = isCollaFiguresValid(figures);

        setErrors({
            name: isNameValid ? "" : dictionary[lang]?.collesNameInvalid + NAME_MIN_LENGTH + " - " +NAME_MAX_LENGTH,
            entity: isEntityValid ? "" : dictionary[lang]?.collesEntityInvalid + ENTITY_MIN_LENGTH + " - " + ENTITY_MAX_LENGTH,
            foundationYear: isFoundationYearValid ? "" : dictionary[lang]?.collesFoundationYearInvalid + FOUNDATION_YEAR_MIN + " - " + FOUNDATION_YEAR_MAX,
            description: isDescriptionValid ? "" : dictionary[lang]?.collesDescriptionInvalid + " " + DESCRIPTION_MIN_LENGTH + " - " + DESCRIPTION_MAX_LENGTH,
            type: isTypeValid ? "" : dictionary[lang]?.collesTypeInvalid + " " + TYPE_MIN_LENGTH + " - " + TYPE_MAX_LENGTH,
            neighbourhood: isNeighbourhoodValid ? "" : dictionary[lang]?.collesNeighbourhoodInvalid + " " + NEIGHBOURHOOD_MIN_LENGTH + " - " + NEIGHBOURHOOD_MAX_LENGTH,
            primaryColour: isPrimaryColourValid ? "" : dictionary[lang]?.collesPrimaryColourInvalid + "",
            secondaryColour: isSecondaryColourValid ? "" : dictionary[lang]?.collesSecondaryColourInvalid + "",
            logo: null,
            music: isMusicValid ? "" : dictionary[lang]?.collesMusicInvalid + "",
            email: isEmailValid ? "" : dictionary[lang]?.collesEmailInvalid + "",
            instagram: isInstagramValid ? "" : dictionary[lang]?.collesInstagramInvalid + "",
            figures: isFiguresValid ? "" : dictionary[lang]?.collesFiguresInvalid + "",
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isNameValid || !isEntityValid || !isFoundationYearValid || !isDescriptionValid || !isTypeValid || !isNeighbourhoodValid ||
            !isPrimaryColourValid || !isSecondaryColourValid || !isLogoValid || !isMusicValid || !isEmailValid || !isInstagramValid || !isFiguresValid) { return; }

        const formDataWithImage = { ...formData };
        if (logo) { formDataWithImage.logo = logo; }
        ev.preventDefault();
        const concatenatedFigures = concatenateFigures(selectedFigures);
        submitForm({
            name: formData.name,
            entity: formData.entity,
            foundationYear: Number(formData.foundationYear),
            description: formData.description,
            type: formData.type,
            neighbourhood: formData.neighbourhood,
            primaryColour: formData.primaryColour,
            secondaryColour: formData.secondaryColour,
            logo: formDataWithImage.logo,
            music: formData.music,
            email: formData.email,
            instagram: formData.instagram,
            figures: concatenatedFigures,
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
                            <label htmlFor="primaryColour">{dictionary[lang]?.collaPrimaryColour}</label>
                            <button
                                className={styles.colourPreviewButton}
                                id="primaryColourPreviewButton"
                                style={{ backgroundColor: primaryColour }}
                                onClick={(event) => { event.preventDefault(); setIsPrimaryColourPickerOpen(!isPrimaryColourPickerOpen); }}/>
                            {isPrimaryColourPickerOpen && (
                                <ColourPicker
                                    id="primaryColour"
                                    name="primaryColour"
                                    value={formData.primaryColour}
                                    onChange={handlePrimaryColourChange}
                                />
                            )}
                            {errors.primaryColour && (
                                <div style={{ color: "tomato" }}>{errors.primaryColour}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="secondaryColour">{dictionary[lang]?.collaSecondaryColour}</label>
                            <button
                                className={styles.colourPreviewButton}
                                id="secondaryColourPreviewButton"
                                style={{ backgroundColor: secondaryColour }}
                                onClick={(event) => { event.preventDefault(); setIsSecondaryColourPickerOpen(!isSecondaryColourPickerOpen); }}/>
                            {isSecondaryColourPickerOpen && (
                                <ColourPicker
                                    id="secondaryColour"
                                    name="secondaryColour"
                                    value={formData.secondaryColour}
                                    onChange={handleSecondaryColourChange}
                                />
                            )}
                            {errors.secondaryColour && (
                                <div style={{ color: "tomato" }}>{errors.secondaryColour}</div>
                            )}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="logo">{dictionary[lang]?.collaLogo}</label>
                            <div className={styles.imagePreviewContainer}>
                                {logoPreview && (
                                    <div className={styles.imagePreview}>
                                        <img src={logoPreview} alt="Logo Preview" />
                                    </div>
                                )}
                            </div>
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
                            <p>{dictionary[lang]?.maxFileSize + LOGO_MAX_MBS + "MB"}</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="music">{dictionary[lang]?.collaMusic}</label>
                            <select
                                id="music"
                                name="music"
                                value={formData.music}
                                onChange={handleMusicChange}
                            >
                                <option value="">{dictionary[lang]?.selectMusic}</option>
                                {musics.map(option => (
                                    <option key={option.labelKey} value={option.labelKey}>
                                        {dictionary[lang]?.[option.labelKey]}
                                    </option>
                                ))}
                            </select>
                            {formData.music && errors.music && (
                                <div style={{ color: "tomato" }}>{errors.music}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">{dictionary[lang]?.collaEmail}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleEmailChange}
                            />
                            {formData.email && errors.email && (
                                <div style={{ color: "tomato" }}>{errors.email}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="instagram">{dictionary[lang]?.collaInstagram}</label>
                            <input
                                type="text"
                                id="instagram"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleInstagramChange}
                            />
                            {formData.instagram && errors.instagram && (
                                <div style={{ color: "tomato" }}>{errors.instagram}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="figures">{dictionary[lang]?.collaFigures}</label>
                            <input
                                type="text"
                                id="figures"
                                name="figures"
                                value={formData.figures}
                                onChange={handleFiguresChange}
                            />
                            {formData.figures && errors.figures && (
                                <div style={{ color: "tomato" }}>{errors.figures}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="figures">{dictionary[lang]?.collaFigures}</label>
                            <select
                                id="figures"
                                name="figures"
                                value={formData.figures}
                                onChange={handleFiguresChange}
                            >
                                <option value="">{dictionary[lang]?.selectFigures}</option>
                                {figuresNoImage.map(option => (
                                    <option key={option.id} value={option.id}> {option.name} </option>
                                ))}
                            </select>
                            {formData.figures && errors.figures && (
                                <div style={{ color: "tomato" }}>{errors.figures}</div>
                            )}
                        </div>
                        <div className={styles.selectedFigures}>
                            {selectedFigures.map((figure, index) => (
                                <div key={figure.id} className={styles.selectedFigure}>
                                    <span>{figure.name}</span>
                                    <button onClick={(ev) => handleDeleteFigure(ev, index)}>×</button>
                                </div>
                            ))}
                        </div>

                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isNameValid || !isEntityValid || !isFoundationYearValid || !isDescriptionValid || !isTypeValid || !isNeighbourhoodValid ||
                                !isPrimaryColourValid || !isSecondaryColourValid || !isLogoValid || !isMusicValid || !isEmailValid || !isInstagramValid || !isFiguresValid}
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