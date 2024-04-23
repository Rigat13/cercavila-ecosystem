import React, {useEffect, useState} from "react";
import {FormStatus, useUpdateFiguraForm} from "@/app/sections/figures/update-form/useUpdateFiguraForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useUpdateFiguraFormData} from "@/app/sections/figures/update-form/useUpdateFiguraFormData";
import {useFiguresContext} from "@/app/sections/figures/FiguresContext";
import styles from "@/app/sections/figures/form/FiguraForm.module.scss";
import {defaultLang, dictionary} from "@/content";

import {isFiguraNameValid, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from "@/modules/figures/domain/figura-attributes/FiguraName";
import {isFiguraEntityValid, ENTITY_MIN_LENGTH, ENTITY_MAX_LENGTH} from "@/modules/figures/domain/figura-attributes/FiguraEntity";
import {isFiguraFoundationYearValid, FOUNDATION_YEAR_MIN, FOUNDATION_YEAR_MAX} from "@/modules/figures/domain/figura-attributes/FiguraFoundationYear";
import {isFiguraDescriptionValid, DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH} from "@/modules/figures/domain/figura-attributes/FiguraDescription";
import {isFiguraTypeValid,TYPE_MAX_LENGTH,TYPE_MIN_LENGTH,figuraTypes} from "@/modules/figures/domain/figura-attributes/FiguraType";
import {isFiguraNeighbourhoodValid, NEIGHBOURHOOD_MAX_LENGTH, NEIGHBOURHOOD_MIN_LENGTH, neighbourhoods} from "@/modules/figures/domain/figura-attributes/FiguraNeighbourhood";
import {isFiguraColourValid} from "@/modules/figures/domain/figura-attributes/FiguraColours";
import {isFiguraImageValid, LOGO_MAX_MBS} from "@/modules/figures/domain/figura-attributes/FiguraImage";
import ColourPicker from "@/app/sections/shared/ColourPicker";
import {isFiguraMusicValid, musics} from "@/modules/figures/domain/figura-attributes/FiguraMusic";
import {isFiguraEmailValid} from "@/modules/figures/domain/figura-attributes/FiguraEmail";
import {isFiguraInstagramValid} from "@/modules/figures/domain/figura-attributes/FiguraInstagram";

const initialState = {
    id: "",
    name: "",
    entity: "",
    foundationYear: "",
    description: "",
    type: "",
    neighbourhood: "",
    primaryColour: "",
    secondaryColour: "",
    image: null as File | null,
    music: "",
    email: "",
    instagram: "",
}
export let isNameValid, isEntityValid, isFoundationYearValid, isDescriptionValid, isTypeValid, isNeighbourhoodValid,
    isPrimaryColourValid, isSecondaryColourValid, isImageValid, isMusicValid, isEmailValid  = false;
const lang = defaultLang;
export let isInstagramValid = true; // Optional fields

export function UpdateFiguraForm({figuraId, lang}: {figuraId: string; lang: string}) {
    const { formData, updateForm, resetForm } = useUpdateFiguraFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useUpdateFiguraForm();
    const [errors, setErrors] = useState(initialState);
    const [isDeleted, setIsDeleted] = useState(false);
    const { figures } = useFiguresContext();

    const [isPrimaryColourPickerOpen, setIsPrimaryColourPickerOpen] = useState(false);
    const [isSecondaryColourPickerOpen, setIsSecondaryColourPickerOpen] = useState(false);
    const [primaryColour, setPrimaryColour] = useState('#FFFFFF');
    const [secondaryColour, setSecondaryColour] = useState('#FFFFFF');

    const [image, setImage] = useState<File | null>(null);
    const [imageSize, setImageSize] = useState(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isImageAlreadyValid, setImageAlreadyValid] = useState(false);
    const [isFirstTimeValidation, setIsFirstTimeValidation] = useState(true);

    lang = lang;

    useEffect(() => {

        const fetchFiguraData = async () => {
            try {
                const figuraData = figures.find((figura) => figura.id === figuraId);
                if (!figuraData) {
                    throw new Error(dictionary[lang]?.figuraNotFoundWithId + figuraId);
                }

                let imageFile;
                if (figuraData.image) {
                    const blob = base64ToBlob(figuraData.image as unknown as string);
                    imageFile = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                }

                updateForm({
                    id: figuraData.id,
                    name: figuraData.name,
                    entity: figuraData.entity,
                    foundationYear: figuraData.foundationYear+"",
                    description: figuraData.description,
                    type: figuraData.type,
                    neighbourhood: figuraData.neighbourhood,
                    primaryColour: figuraData.primaryColour,
                    secondaryColour: figuraData.secondaryColour,
                    image: imageFile,
                    music: figuraData.music,
                    email: figuraData.email,
                    instagram: figuraData.instagram,
                });

                const syntheticEvent: { target: { files: any[] } } = {
                    target: {
                        files: [imageFile]
                    }
                };
                setPrimaryColour(figuraData.primaryColour);
                setSecondaryColour(figuraData.secondaryColour);

                handleImageChange(syntheticEvent);
                setIsFirstTimeValidation(false);
            } catch (error) {
                console.error(dictionary[lang]?.errorRetrievingFiguraMessage + figuraId);
            }
        };
        fetchFiguraData();
    }, [figuraId, figures]);



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

    const handleImageChange = (ev: React.ChangeEvent<HTMLInputElement> | { target: { files: any[] } }) => {
        setImageAlreadyValid(false);
        const file = ev.target.files?.[0];
        if (file !== undefined) setImage(file);
        else setImage(null);

        const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
        setImageSize(fileSizeInMB);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
        if(!isFirstTimeValidation) validateFormData({ ...formData, image: file });
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

    const validateFormData = ({ id, name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour, image, music, email, instagram }) => {
        // Perform validation based on the provided data
        isNameValid = isFiguraNameValid(name);
        isEntityValid = isFiguraEntityValid(entity);
        isFoundationYearValid = isFiguraFoundationYearValid(foundationYear);
        isDescriptionValid = isFiguraDescriptionValid(description);
        isTypeValid = isFiguraTypeValid(type, dictionary[lang]?.selectFiguraType+"");
        isNeighbourhoodValid = isFiguraNeighbourhoodValid(neighbourhood, dictionary[lang]?.selectNeighbourhood+"");
        isPrimaryColourValid = isFiguraColourValid(primaryColour);
        isSecondaryColourValid = isFiguraColourValid(secondaryColour);
        if (!isImageAlreadyValid) isImageValid = isFiguraImageValid(image);
        setImageAlreadyValid(isImageValid);
        isMusicValid = isFiguraMusicValid(music, dictionary[lang]?.selectMusic+"");
        isEmailValid = isFiguraEmailValid(email);
        isInstagramValid = isFiguraInstagramValid(instagram) || instagram === ""; // Optional field

        setErrors({
            id: "",
            name: isNameValid ? "" : dictionary[lang]?.figuresNameInvalid + NAME_MIN_LENGTH + " - " +NAME_MAX_LENGTH,
            entity: isEntityValid ? "" : dictionary[lang]?.figuresEntityInvalid + ENTITY_MIN_LENGTH + " - " + ENTITY_MAX_LENGTH,
            foundationYear: isFoundationYearValid ? "" : dictionary[lang]?.figuresFoundationYearInvalid + FOUNDATION_YEAR_MIN + " - " + FOUNDATION_YEAR_MAX,
            description: isDescriptionValid ? "" : dictionary[lang]?.figuresDescriptionInvalid + " " + DESCRIPTION_MIN_LENGTH + " - " + DESCRIPTION_MAX_LENGTH,
            type: isTypeValid ? "" : dictionary[lang]?.figuresTypeInvalid + " " + TYPE_MIN_LENGTH + " - " + TYPE_MAX_LENGTH,
            neighbourhood: isNeighbourhoodValid ? "" : dictionary[lang]?.figuresNeighbourhoodInvalid + " " + NEIGHBOURHOOD_MIN_LENGTH + " - " + NEIGHBOURHOOD_MAX_LENGTH,
            primaryColour: isPrimaryColourValid ? "" : dictionary[lang]?.figuresPrimaryColourInvalid + "",
            secondaryColour: isSecondaryColourValid ? "" : dictionary[lang]?.figuresSecondaryColourInvalid + "",
            image: null,
            music: isMusicValid ? "" : dictionary[lang]?.figuresMusicInvalid + "",
            email: isEmailValid ? "" : dictionary[lang]?.figuresEmailInvalid + "",
            instagram: isInstagramValid ? "" : dictionary[lang]?.figuresInstagramInvalid + "",
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isNameValid || !isEntityValid || !isFoundationYearValid || !isDescriptionValid || !isTypeValid || !isNeighbourhoodValid ||
            !isPrimaryColourValid || !isSecondaryColourValid || !isImageValid || !isMusicValid || !isEmailValid || !isInstagramValid) { return; }

        const formDataWithImage = { ...formData };
        if (image) { formDataWithImage.image = image; }

        ev.preventDefault();
        submitForm({
            id: formData.id,
            name: formData.name,
            entity: formData.entity,
            foundationYear: Number(formData.foundationYear),
            description: formData.description,
            type: formData.type,
            neighbourhood: formData.neighbourhood,
            primaryColour: formData.primaryColour,
            secondaryColour: formData.secondaryColour,
            image: formDataWithImage.image,
            music: formData.music,
            email: formData.email,
            instagram: formData.instagram,
        });
    };

    // ------------------ DELETE COLLA ------------------
    const { deleteFigura } = useFiguresContext();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isGoToFiguresVisible, setGoToFiguresVisible] = useState(true);
    const [isDeleteFiguraVisible, setDeleteFiguraVisible] = useState(true);

    const handleDeleteClick = () => {
        setGoToFiguresVisible(false);
        setDeleteFiguraVisible(false);
        setIsConfirmOpen(true);
    };
    if (isDeleted) {
        return (
            <section className={styles.figuraForm}>
                <h2 className={styles.h2}>{dictionary[lang]?.successDeleteFiguraMessage}</h2>
                <a href={lang === defaultLang ? "/figures.html" : `/figures.html?lang=${lang}`} className={styles.h2}>
                    <button className={styles.actionButton}>{dictionary[lang]?.goToFiguresButton}</button>
                </a>
            </section>
        );
    }

    const handleConfirmDelete = () => {
        deleteFigura(figuraId);
        setIsDeleted(true);
        setIsConfirmOpen(false);
    };

    const handleCancelDelete = () => {
        setIsConfirmOpen(false);
        setGoToFiguresVisible(true);
        setDeleteFiguraVisible(true);
    };

    if (isDeleted) {
        return (
            <div>
                <p>{dictionary[lang]?.successDeleteFiguraMessage}</p>
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
                <section id="order" className={styles.figuraForm}>
                    <h2>{dictionary[lang]?.updateFiguraTitle}</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="name">{dictionary[lang]?.figuraName}</label>
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
                            <label htmlFor="entity">{dictionary[lang]?.figuraEntity}</label>
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
                            <label htmlFor="foundationYear">{dictionary[lang]?.figuraFoundationYear}</label>
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
                            <label htmlFor="description">{dictionary[lang]?.figuraDescription}</label>
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
                            <label htmlFor="type">{dictionary[lang]?.figuraType}</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleTypeChange}
                            >
                                <option value="">{dictionary[lang]?.selectFiguraType}</option>
                                {figuraTypes.map(option => (
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
                            <label htmlFor="neighbourhood">{dictionary[lang]?.figuraNeighbourhood}</label>
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
                            <label htmlFor="primaryColour">{dictionary[lang]?.figuraPrimaryColour}</label>
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
                            <label htmlFor="secondaryColour">{dictionary[lang]?.figuraSecondaryColour}</label>
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
                            <label htmlFor="image">{dictionary[lang]?.figuraImage}</label>
                            <div className={styles.imagePreviewContainer}>
                                {imagePreview && (
                                    <div className={styles.imagePreview}>
                                        <img src={imagePreview} alt="Image Preview" />
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*" // Specify accepted file types (images)
                                onChange={handleImageChange}
                            />
                            {imageSize > LOGO_MAX_MBS && (
                                <p style={{ color: 'red' }}>
                                    {`File size (${imageSize.toFixed(2)} MB) exceeds the maximum allowed size of ${LOGO_MAX_MBS} MB`}
                                </p>
                            )}
                            <p>{dictionary[lang]?.maxFileSize + LOGO_MAX_MBS + "MB"}</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="music">{dictionary[lang]?.figuraMusic}</label>
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
                            <label htmlFor="email">{dictionary[lang]?.figuraEmail}</label>
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
                            <label htmlFor="instagram">{dictionary[lang]?.figuraInstagram}</label>
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

                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isNameValid || !isEntityValid || !isFoundationYearValid || !isDescriptionValid || !isTypeValid || !isNeighbourhoodValid ||
                                !isPrimaryColourValid || !isSecondaryColourValid || (imageSize > LOGO_MAX_MBS) || !isMusicValid || !isEmailValid || !isInstagramValid}
                        >
                            {dictionary[lang]?.updateFiguraButton}
                        </button>
                    </form>
                    {isGoToFiguresVisible && (
                        <a href={lang === defaultLang ? "/figures.html" : `/figures.html?lang=${lang}`}>
                            <button className={styles.actionButton}>{dictionary[lang]?.goToFiguresButton}</button>
                        </a>
                    )}
                    {isDeleteFiguraVisible && (
                        <button className={styles.deleteButton} onClick={handleDeleteClick} >{dictionary[lang]?.deleteFiguraButton}</button>
                    )}
                    {isConfirmOpen && (
                        <div className={styles.figuraForm}>
                            <p className={styles.warningMessage}>{dictionary[lang]?.warningDeleteFiguraMessage}</p>
                            <button className={styles.actionButton} onClick={handleCancelDelete}>{dictionary[lang]?.cancelDeleteFiguraButton}</button>
                            <button className={styles.deleteButton} onClick={handleConfirmDelete}>{dictionary[lang]?.confirmDeleteFiguraButton}</button>
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
        <section className={styles.figuraForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successUpdateFiguraMessage}</h2>
            <a href={lang === defaultLang ? "/figures.html" : `/figures.html?lang=${lang}`}>
                <button className={styles.actionButton}>{dictionary[lang]?.goToFiguresButton}</button>
            </a>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.figuraForm}>
            <h2 className={styles.h2error}>{dictionary[lang]?.errorFound}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.retry}</button>
        </section>
    );
}

function assertUnreachable(x: never): never {
    throw new Error(""+dictionary[lang]?.unreachablePage);
}

function base64ToBlob(base64: string): Blob {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: 'image/jpeg' });
}
