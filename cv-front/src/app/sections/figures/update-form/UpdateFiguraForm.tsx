import React, {useEffect, useState} from "react";
import {FormStatus, useUpdateFiguraForm} from "@/app/sections/figures/update-form/useUpdateFiguraForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useUpdateFiguraFormData} from "@/app/sections/figures/update-form/useUpdateFiguraFormData";
import {useFiguresContext} from "@/app/sections/figures/FiguresContext";
import styles from "@/app/sections/figures/form/FiguraForm.module.scss";
import {defaultLang, dictionary} from "@/content";

import {isFiguraNameValid, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from "@/modules/figures/domain/figura-attributes/FiguraName";
import {isFiguraYearValid, YEAR_MIN, YEAR_MAX} from "@/modules/figures/domain/figura-attributes/FiguraYear";
import {isFiguraTypeValid,TYPE_MAX_LENGTH,TYPE_MIN_LENGTH,figuraTypes} from "@/modules/figures/domain/figura-attributes/FiguraType";
import {isFiguraImageValid, IMAGE_MAX_MBS} from "@/modules/figures/domain/figura-attributes/FiguraImage";
import {isFiguraWebUrlValid} from "@/modules/figures/domain/figura-attributes/FiguraWebUrl";

const initialState = {
    id: "",
    name: "",
    year: "",
    type: "",
    image: null as File | null,
    webUrl: "",
}
export let isNameValid, isYearValid, isTypeValid, isImageValid  = false;
const lang = defaultLang;
export let isWebUrlValid = true; // Optional fields

export function UpdateFiguraForm({figuraId, lang}: {figuraId: string; lang: string}) {
    const { formData, updateForm, resetForm } = useUpdateFiguraFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useUpdateFiguraForm();
    const [errors, setErrors] = useState(initialState);
    const [isDeleted, setIsDeleted] = useState(false);
    const { figures } = useFiguresContext();

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
                    let originalMimeType = blob.type || 'image/avif';
                    const fileName = `image${getFileExtension(originalMimeType)}`
                    imageFile = new File([blob], fileName, { type: originalMimeType });
                }



                updateForm({
                    id: figuraData.id,
                    name: figuraData.name,
                    year: figuraData.year+"",
                    type: figuraData.type,
                    image: imageFile,
                    webUrl: figuraData.webUrl,
                });

                const syntheticEvent: { target: { files: any[] } } = {
                    target: {
                        files: [imageFile]
                    }
                };

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

    const handleYearChange = (ev) => {
        const newYear = Number(ev.target.value);
        updateForm({ year: newYear+"" });
        validateFormData({ ...formData, year: newYear });
    };

    const handleTypeChange = (ev) => {
        const newType = ev.target.value;
        updateForm({ type: newType });
        validateFormData({ ...formData, type: newType });
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

    const handleWebUrlChange = (ev) => {
        const newWebUrl = ev.target.value;
        updateForm({ webUrl: newWebUrl });
        validateFormData({ ...formData, webUrl: newWebUrl });
    }

    const validateFormData = ({ id, name, year, type, image, webUrl }) => {
        // Perform validation based on the provided data
        isNameValid = isFiguraNameValid(name);
        isYearValid = isFiguraYearValid(year);
        isTypeValid = isFiguraTypeValid(type, dictionary[lang]?.selectFiguraType+"");
        if (!isImageAlreadyValid) isImageValid = isFiguraImageValid(image);
        setImageAlreadyValid(isImageValid);
        isWebUrlValid = isFiguraWebUrlValid(webUrl) || webUrl === ""; // Optional field

        setErrors({
            id: "",
            name: isNameValid ? "" : dictionary[lang]?.figuraNameInvalid + NAME_MIN_LENGTH + " - " +NAME_MAX_LENGTH,
            year: isYearValid ? "" : dictionary[lang]?.figuraYearInvalid + YEAR_MIN + " - " + YEAR_MAX,
            type: isTypeValid ? "" : dictionary[lang]?.figuraTypeInvalid + " " + TYPE_MIN_LENGTH + " - " + TYPE_MAX_LENGTH,
            image: null,
            webUrl: isWebUrlValid ? "" : dictionary[lang]?.figuraWebUrlInvalid + "",
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isNameValid || !isYearValid || !isTypeValid || !isImageValid || !isWebUrlValid) { return; }

        const formDataWithImage = { ...formData };
        if (image) { formDataWithImage.image = image; }

        ev.preventDefault();
        submitForm({
            id: formData.id,
            name: formData.name,
            year: Number(formData.year),
            type: formData.type,
            image: formDataWithImage.image,
            webUrl: formData.webUrl,
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
                            <label htmlFor="year">{dictionary[lang]?.figuraYear}</label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleYearChange}
                            />
                            {formData.year && errors.year && (
                                <div style={{ color: "tomato" }}>{errors.year}</div>
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
                                accept="image/*,.avif" // Specify accepted file types (images)
                                onChange={handleImageChange}
                            />
                            {imageSize > IMAGE_MAX_MBS && (
                                <p style={{ color: 'red' }}>
                                    {`File size (${imageSize.toFixed(2)} MB) exceeds the maximum allowed size of ${IMAGE_MAX_MBS} MB`}
                                </p>
                            )}
                            <p>{dictionary[lang]?.maxFileSize + IMAGE_MAX_MBS + "MB"}</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="webUrl">{dictionary[lang]?.figuraWebUrl}</label>
                            <input
                                type="text"
                                id="webUrl"
                                name="webUrl"
                                value={formData.webUrl}
                                onChange={handleWebUrlChange}
                            />
                            {formData.webUrl && errors.webUrl && (
                                <div style={{ color: "tomato" }}>{errors.webUrl}</div>
                            )}
                        </div>

                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isNameValid || !isYearValid || !isTypeValid || !isImageValid || !isWebUrlValid}
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
    return new Blob([bytes], { type: 'image/avif' });
}

function getFileExtension(mimeType) {
    switch (mimeType) {
        case 'image/jpeg':
            return '.jpg';
        case 'image/png':
            return '.png';
        case 'image/gif':
            return '.gif';
        case 'image/avif':
            return '.avif';
        default:
            return '.jpg'; // Default to .jpg if MIME type is unknown or not supported
    }
}