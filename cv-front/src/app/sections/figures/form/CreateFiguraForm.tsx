'use client';

import React, {useEffect, useState} from "react";
import {FormStatus, useFiguraForm} from "@/app/sections/figures/form/useFiguraForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useFiguraFormData} from "@/app/sections/figures/form/useFiguraFormData";
import styles from "@/app/sections/figures/form/FiguraForm.module.scss";
import {defaultLang, dictionary} from "@/content";

import {isFiguraNameValid, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from "@/modules/figures/domain/figura-attributes/FiguraName";
import {isFiguraYearValid, YEAR_MIN, YEAR_MAX} from "@/modules/figures/domain/figura-attributes/FiguraYear";
import {isFiguraTypeValid,TYPE_MAX_LENGTH,TYPE_MIN_LENGTH,figuraTypes} from "@/modules/figures/domain/figura-attributes/FiguraType";
import {isFiguraImageValid, IMAGE_MAX_MBS} from "@/modules/figures/domain/figura-attributes/FiguraImage";
import {isFiguraWebUrlValid} from "@/modules/figures/domain/figura-attributes/FiguraWebUrl";

const initialState = {
    name: "",
    year: "",
    type: "",
    image: null as File | null,
    webUrl: "",
}

export let isNameValid, isYearValid, isTypeValid, isImageValid = false;
export let isWebUrlValid = true; // Optional fields

const lang = defaultLang;

export function CreateFiguraForm({ lang }: { lang: string }) {
    const { formData, updateForm, resetForm } = useFiguraFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useFiguraForm();
    const [errors, setErrors] = useState(initialState);

    const [image, setImage] = useState<File | null>(null);
    const [imageSize, setImageSize] = useState(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isImageAlreadyValid, setImageAlreadyValid] = useState(false);

    lang = lang;

    useEffect(() => {

    }, [formData]);

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
    };

    const handleImageChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setImageAlreadyValid(false);
        const file = ev.target.files?.[0];
        if (file == undefined) { validateFormData({ ...formData, image: file }); return; }

        setImage(file);
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
        validateFormData({ ...formData, image: file });
    };

    const handleWebUrlChange = (ev) => {
        const newWebUrl = ev.target.value;
        updateForm({ webUrl: newWebUrl });
        validateFormData({ ...formData, webUrl: newWebUrl });
    };

    const validateFormData = ({ name, year, type, image, webUrl }) => {
        // Perform validation based on the provided data
        isNameValid = isFiguraNameValid(name);
        isYearValid = !isNaN(year) && isFiguraYearValid(year);
        isTypeValid = isFiguraTypeValid(type, dictionary[lang]?.selectFiguraType+"");
        if (!isImageAlreadyValid) isImageValid = isFiguraImageValid(image);
        setImageAlreadyValid(isImageValid);
        isWebUrlValid = isFiguraWebUrlValid(webUrl) || webUrl === "" || webUrl == null; // Optional field

        setErrors({
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
            name: formData.name,
            year: Number(formData.year),
            type: formData.type,
            image: formDataWithImage.image,
            webUrl: formData.webUrl,
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
                <section id="order" className={styles.figuraForm}>
                    <h2>{dictionary[lang]?.createFiguraTitle}</h2>

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
                                accept="image/*" // Specify accepted file types (images)
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
                            {dictionary[lang]?.createFiguraButton}
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
        <section className={styles.figuraForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successCreateFiguraMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.createAnotherFiguraButton}</button>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.figuraForm}>
            <h2 className={styles.h2error}>{dictionary[lang]?.errorCreateFiguraMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.retryCreateFiguraButton}</button>
        </section>
    );
}

function assertUnreachable(x: never): never {
    throw new Error("No s'esperava arribar aquí");
}