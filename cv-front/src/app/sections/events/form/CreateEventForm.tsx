'use client';

import React, {useEffect, useState} from "react";
import {FormStatus, useEventForm} from "@/app/sections/events/form/useEventForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useEventFormData} from "@/app/sections/events/form/useEventFormData";
import styles from "@/app/sections/events/form/EventForm.module.scss";
import {defaultLang, dictionary} from "@/content";

import { isEventNameValid, NAME_MIN_LENGTH, NAME_MAX_LENGTH } from "@/modules/events/domain/events-attributes/EventName";
import { isEventTypeValid,TYPE_MAX_LENGTH,TYPE_MIN_LENGTH,eventTypes } from "@/modules/events/domain/events-attributes/EventType";
import { isEventImageValid, IMAGE_MAX_MBS } from "@/modules/events/domain/events-attributes/EventImage";
import { DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH, isEventDescriptionValid } from "@/modules/events/domain/events-attributes/EventDescription";
import { isEventColourValid } from "@/modules/events/domain/events-attributes/EventColours";
import { isEventPriceValid } from "@/modules/events/domain/events-attributes/EventPrice";
import ColourPicker from "@/app/sections/shared/ColourPicker";

const initialState = {
    name: "",
    description: "",
    image: null as File | null,
    primaryColour: "",
    secondaryColour: "",
    price: "",
    type: "",
}

export let isNameValid, isDescriptionValid, isImageValid, isPrimaryColourValid, isSecondaryColourValid, isPriceValid, isTypeValid = false;

const lang = defaultLang;

export function CreateEventForm({ lang }: { lang: string }) {
    const { formData, updateForm, resetForm } = useEventFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useEventForm();
    const [errors, setErrors] = useState(initialState);

    const [isPrimaryColourPickerOpen, setIsPrimaryColourPickerOpen] = useState(false);
    const [isSecondaryColourPickerOpen, setIsSecondaryColourPickerOpen] = useState(false);
    const [primaryColour, setPrimaryColour] = useState('#FFFFFF');
    const [secondaryColour, setSecondaryColour] = useState('#FFFFFF');

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

    const handleDescriptionChange = (ev) => {
        const newDescription = ev.target.value;
        updateForm({ description: newDescription });
        validateFormData({ ...formData, description: newDescription });
    }

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

    const handlePriceChange = (ev) => {
        const newPrice = ev.target.value;
        updateForm({ price: newPrice+"" });
        validateFormData({ ...formData, price: Number(newPrice) });
    }

    const handleTypeChange = (ev) => {
        const newType = ev.target.value;
        updateForm({ type: newType });
        validateFormData({ ...formData, type: newType });
    }

    const validateFormData = ({ name, description, image, primaryColour, secondaryColour, price, type }) => {
        isNameValid = isEventNameValid(name);
        isDescriptionValid = isEventDescriptionValid(description);
        if (!isImageAlreadyValid) isImageValid = isEventImageValid(image);
        setImageAlreadyValid(isImageValid);
        isPrimaryColourValid = isEventColourValid(primaryColour);
        isSecondaryColourValid = isEventColourValid(secondaryColour);
        isPriceValid = isEventPriceValid(price);
        isTypeValid = isEventTypeValid(type, dictionary[lang]?.selectEventType+"");

        setErrors({
            name: isNameValid ? "" : dictionary[lang]?.eventNameInvalid + NAME_MIN_LENGTH + " - " + NAME_MAX_LENGTH,
            description: isDescriptionValid ? "" : dictionary[lang]?.eventDescriptionInvalid + DESCRIPTION_MIN_LENGTH + " - " + DESCRIPTION_MAX_LENGTH,
            image: null,
            primaryColour: isPrimaryColourValid ? "" : dictionary[lang]?.eventPrimaryColourInvalid + "",
            secondaryColour: isSecondaryColourValid ? "" : dictionary[lang]?.eventSecondaryColourInvalid + "",
            price: isPriceValid ? "" : dictionary[lang]?.eventPriceInvalid + "",
            type: isTypeValid ? "" : dictionary[lang]?.eventTypeInvalid + " " + TYPE_MIN_LENGTH + " - " + TYPE_MAX_LENGTH,
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isNameValid || !isDescriptionValid || !isImageValid || !isPrimaryColourValid || !isSecondaryColourValid || !isPriceValid || !isTypeValid) { return; }

        const formDataWithImage = { ...formData };
        if (image) { formDataWithImage.image = image; }
        ev.preventDefault();
        submitForm({
            name: formData.name,
            description: formData.description,
            image: formDataWithImage.image,
            primaryColour: formData.primaryColour,
            secondaryColour: formData.secondaryColour,
            price: Number(formData.price),
            type: formData.type,
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
                <section id="order" className={styles.eventForm}>
                    <h2>{dictionary[lang]?.createEventTitle}</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="name">{dictionary[lang]?.eventName}</label>
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
                            <label htmlFor="description">{dictionary[lang]?.eventDescription}</label>
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
                            <label htmlFor="image">{dictionary[lang]?.eventImage}</label>
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
                            <label htmlFor="price">{dictionary[lang]?.eventPrice}</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handlePriceChange}
                            /> {" " + dictionary[lang]?.coinAcronym}
                            {formData.price && errors.price && (
                                <div style={{ color: "tomato" }}>{errors.price}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="type">{dictionary[lang]?.eventType}</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleTypeChange}
                            >
                                <option value="">{dictionary[lang]?.selectEventType}</option>
                                {eventTypes.map(option => (
                                    <option key={option.labelKey} value={option.labelKey}>
                                        {dictionary[lang]?.[option.labelKey]}
                                    </option>
                                ))}
                            </select>
                            {formData.type && errors.type && (
                                <div style={{ color: "tomato" }}>{errors.type}</div>
                            )}
                        </div>

                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isNameValid || !isDescriptionValid || !isImageValid || !isPrimaryColourValid || !isSecondaryColourValid || !isPriceValid || !isTypeValid}
                        >
                            {dictionary[lang]?.createEventButton}
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
        <section className={styles.eventForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successCreateEventMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.createAnotherEventButton}</button>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.eventForm}>
            <h2 className={styles.h2error}>{dictionary[lang]?.errorCreateEventMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.retryCreateEventButton}</button>
        </section>
    );
}

function assertUnreachable(x: never): never {
    throw new Error("No s'esperava arribar aquí");
}