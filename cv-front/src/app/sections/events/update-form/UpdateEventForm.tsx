import React, {useEffect, useState} from "react";
import {FormStatus, useUpdateEventForm} from "@/app/sections/events/update-form/useUpdateEventForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useUpdateEventFormData} from "@/app/sections/events/update-form/useUpdateEventFormData";
import {useEventsContext} from "@/app/sections/events/EventsContext";
import styles from "@/app/sections/events/form/EventForm.module.scss";
import {defaultLang, dictionary} from "@/content";

import {isEventNameValid, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from "@/modules/events/domain/events-attributes/EventName";
import {isEventTypeValid,TYPE_MAX_LENGTH,TYPE_MIN_LENGTH,eventTypes} from "@/modules/events/domain/events-attributes/EventType";
import {isEventImageValid, IMAGE_MAX_MBS} from "@/modules/events/domain/events-attributes/EventImage";
import { DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH, isEventDescriptionValid } from "@/modules/events/domain/events-attributes/EventDescription";

import { isEventColourValid } from "@/modules/events/domain/events-attributes/EventColours";
import { isEventPriceValid } from "@/modules/events/domain/events-attributes/EventPrice";
import ColourPicker from "@/app/sections/shared/ColourPicker";
import {isEventStartDateValid} from "../../../../modules/events/domain/digitalproducts-attributes/EventStartDate";
import {isEventCercatriviesValid} from "../../../../modules/events/domain/digitalproducts-attributes/EventCercatrivies";
import {
    isEventFirstCoinsRewardValid
} from "../../../../modules/events/domain/digitalproducts-attributes/EventFirstCoinsReward";
import {
    isEventFirstDigitalProductsRewardValid
} from "../../../../modules/events/domain/digitalproducts-attributes/EventFirstDigitalProductsReward";
import {
    isEventSecondCoinsRewardValid
} from "../../../../modules/events/domain/digitalproducts-attributes/EventSecondCoinsReward";
import {
    isEventSecondDigitalProductsRewardValid
} from "../../../../modules/events/domain/digitalproducts-attributes/EventSecondDigitalProductsReward";
import {
    isEventFourthTenthCoinsRewardValid
} from "../../../../modules/events/domain/digitalproducts-attributes/EventFourthTenthCoinsReward";
import {
    isEventAllCoinsRewardValid
} from "../../../../modules/events/domain/digitalproducts-attributes/EventAllCoinsReward";
import {
    isEventFourthTenthDigitalProductsRewardValid
} from "../../../../modules/events/domain/digitalproducts-attributes/EventFourthTenthDigitalProductsReward";
import {
    isEventThirdCoinsRewardValid
} from "../../../../modules/events/domain/digitalproducts-attributes/EventThirdCoinsReward";
import {
    isEventThirdDigitalProductsRewardValid
} from "../../../../modules/events/domain/digitalproducts-attributes/EventThirdDigitalProductsReward";
import {
    isEventAllDigitalProductsRewardValid
} from "../../../../modules/events/domain/digitalproducts-attributes/EventAllDigitalProductsReward";

const initialState = {
    id: "",
    name: "",
    description: "",
    image: null as File | null,
    primaryColour: "",
    secondaryColour: "",
    type: "",
    startDate: "",
    endDate: "",
    cercatrivies: "",
    firstCoinsReward: "",
    firstDigitalProductsReward: "",
    secondCoinsReward: "",
    secondDigitalProductsReward: "",
    thirdCoinsReward: "",
    thirdDigitalProductsReward: "",
    fourthTenthCoinsReward: "",
    fourthTenthDigitalProductsReward: "",
    allCoinsReward: "",
    allDigitalProductsReward: "",
};

export let isNameValid, isDescriptionValid, isImageValid, isPrimaryColourValid, isSecondaryColourValid, isTypeValid,
    isStartDateValid, isEndDateValid, isCercatriviesValid, isFirstCoinsRewardValid, isFirstDigitalProductsRewardValid,
    isSecondCoinsRewardValid, isSecondDigitalProductsRewardValid, isThirdCoinsRewardValid, isThirdDigitalProductsRewardValid,
    isFourthTenthCoinsRewardValid, isFourthTenthDigitalProductsRewardValid, isAllCoinsRewardValid, isAllDigitalProductsRewardValid = false;
const lang = defaultLang;

export function UpdateEventForm({eventId, lang}: {eventId: string; lang: string}) {
    const { formData, updateForm, resetForm } = useUpdateEventFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useUpdateEventForm();
    const [errors, setErrors] = useState(initialState);
    const [isDeleted, setIsDeleted] = useState(false);
    const { events } = useEventsContext();

    const [isPrimaryColourPickerOpen, setIsPrimaryColourPickerOpen] = useState(false);
    const [isSecondaryColourPickerOpen, setIsSecondaryColourPickerOpen] = useState(false);
    const [primaryColour, setPrimaryColour] = useState('#FFFFFF');
    const [secondaryColour, setSecondaryColour] = useState('#FFFFFF');

    const [image, setImage] = useState<File | null>(null);
    const [imageSize, setImageSize] = useState(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isImageAlreadyValid, setImageAlreadyValid] = useState(false);
    const [isFirstTimeValidation, setIsFirstTimeValidation] = useState(true);

    const { cercatrivies } = useEventsContext();
    const { digitalProducts } = useEventsContext();

    lang = lang;

    useEffect(() => {

        const fetchEventData = async () => {
            try {
                const eventData = events.find((event) => event.id === eventId);
                if (!eventData) {
                    throw new Error(dictionary[lang]?.eventNotFoundWithId + eventId);
                }

                let imageFile;
                if (eventData.image) {
                    const blob = base64ToBlob(eventData.image as unknown as string);
                    let originalMimeType = blob.type || 'image/avif';
                    const fileName = `image${getFileExtension(originalMimeType)}`
                    imageFile = new File([blob], fileName, { type: originalMimeType });
                }

                updateForm({
                    id: eventData.id,
                    name: eventData.name,
                    description: eventData.description,
                    image: imageFile,
                    primaryColour: eventData.primaryColour,
                    secondaryColour: eventData.secondaryColour,
                    type: eventData.type,
                    startDate: eventData.startDate,
                    endDate: eventData.endDate,
                    cercatrivies: eventData.cercatrivies.toString(),
                    firstCoinsReward: eventData.firstCoinsReward+"",
                    firstDigitalProductsReward: eventData.firstDigitalProductsReward.toString(),
                    secondCoinsReward: eventData.secondCoinsReward+"",
                    secondDigitalProductsReward: eventData.secondDigitalProductsReward.toString(),
                    thirdCoinsReward: eventData.thirdCoinsReward+"",
                    thirdDigitalProductsReward: eventData.thirdDigitalProductsReward.toString(),
                    fourthTenthCoinsReward: eventData.fourthTenthCoinsReward+"",
                    fourthTenthDigitalProductsReward: eventData.fourthTenthDigitalProductsReward.toString(),
                    allCoinsReward: eventData.allCoinsReward+"",
                    allDigitalProductsReward: eventData.allDigitalProductsReward.toString(),
                });

                const syntheticEvent: { target: { files: any[] } } = {
                    target: {
                        files: [imageFile]
                    }
                };

                setPrimaryColour(eventData.primaryColour);
                setSecondaryColour(eventData.secondaryColour);

                handleImageChange(syntheticEvent);
                setIsFirstTimeValidation(false);
            } catch (error) {
                console.error(dictionary[lang]?.errorRetrievingEventMessage + eventId);
            }
        };
        fetchEventData();
    }, [eventId, events]);

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

    const handleTypeChange = (ev) => {
        const newType = ev.target.value;
        updateForm({ type: newType });
        validateFormData({ ...formData, type: newType });
    }

    const handleStartDateChange = (ev) => {
        const newStartDate = ev.target.value;
        updateForm({ startDate: newStartDate });
        validateFormData({ ...formData, startDate: newStartDate });
    }

    const handleEndDateChange = (ev) => {
        const newEndDate = ev.target.value;
        updateForm({ endDate: newEndDate });
        validateFormData({ ...formData, endDate: newEndDate });
    }

    const handleCercatriviesChange = (ev) => {
        const newCercatrivies = ev.target.value;
        updateForm({ cercatrivies: newCercatrivies });
        validateFormData({ ...formData, cercatrivies: newCercatrivies });
    }

    const handleFirstCoinsRewardChange = (ev) => {
        const newFirstCoinsReward = ev.target.value;
        updateForm({ firstCoinsReward: newFirstCoinsReward });
        validateFormData({ ...formData, firstCoinsReward: newFirstCoinsReward });
    }

    const handleFirstDigitalProductsRewardChange = (ev) => {
        const newFirstDigitalProductsReward = ev.target.value;
        updateForm({ firstDigitalProductsReward: newFirstDigitalProductsReward });
        validateFormData({ ...formData, firstDigitalProductsReward: newFirstDigitalProductsReward });
    }

    const handleSecondCoinsRewardChange = (ev) => {
        const newSecondCoinsReward = ev.target.value;
        updateForm({ secondCoinsReward: newSecondCoinsReward });
        validateFormData({ ...formData, secondCoinsReward: newSecondCoinsReward });
    }

    const handleSecondDigitalProductsRewardChange = (ev) => {
        const newSecondDigitalProductsReward = ev.target.value;
        updateForm({ secondDigitalProductsReward: newSecondDigitalProductsReward });
        validateFormData({ ...formData, secondDigitalProductsReward: newSecondDigitalProductsReward });
    }

    const handleThirdCoinsRewardChange = (ev) => {
        const newThirdCoinsReward = ev.target.value;
        updateForm({ thirdCoinsReward: newThirdCoinsReward });
        validateFormData({ ...formData, thirdCoinsReward: newThirdCoinsReward });
    }

    const handleThirdDigitalProductsRewardChange = (ev) => {
        const newThirdDigitalProductsReward = ev.target.value;
        updateForm({ thirdDigitalProductsReward: newThirdDigitalProductsReward });
        validateFormData({ ...formData, thirdDigitalProductsReward: newThirdDigitalProductsReward });
    }

    const handleFourthTenthCoinsRewardChange = (ev) => {
        const newFourthTenthCoinsReward = ev.target.value;
        updateForm({ fourthTenthCoinsReward: newFourthTenthCoinsReward });
        validateFormData({ ...formData, fourthTenthCoinsReward: newFourthTenthCoinsReward });
    }

    const handleFourthTenthDigitalProductsRewardChange = (ev) => {
        const newFourthTenthDigitalProductsReward = ev.target.value;
        updateForm({ fourthTenthDigitalProductsReward: newFourthTenthDigitalProductsReward });
        validateFormData({ ...formData, fourthTenthDigitalProductsReward: newFourthTenthDigitalProductsReward });
    }

    const handleAllCoinsRewardChange = (ev) => {
        const newAllCoinsReward = ev.target.value;
        updateForm({ allCoinsReward: newAllCoinsReward });
        validateFormData({ ...formData, allCoinsReward: newAllCoinsReward });
    }

    const handleAllDigitalProductsRewardChange = (ev) => {
        const newAllDigitalProductsReward = ev.target.value;
        updateForm({ allDigitalProductsReward: newAllDigitalProductsReward });
        validateFormData({ ...formData, allDigitalProductsReward: newAllDigitalProductsReward });
    }

    const validateFormData = ({ id, name, description, image, primaryColour, secondaryColour, type, startDate, endDate, cercatrivies,
                                  firstCoinsReward, firstDigitalProductsReward, secondCoinsReward, secondDigitalProductsReward,
                                  thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward,
                                  allCoinsReward, allDigitalProductsReward }) => {
        isNameValid = isEventNameValid(name);
        isDescriptionValid = isEventDescriptionValid(description);
        if (!isImageAlreadyValid) isImageValid = isEventImageValid(image);
        setImageAlreadyValid(isImageValid);
        isPrimaryColourValid = isEventColourValid(primaryColour);
        isSecondaryColourValid = isEventColourValid(secondaryColour);
        isTypeValid = isEventTypeValid(type, dictionary[lang]?.selectEventType+"");
        isStartDateValid = isEventStartDateValid(startDate);
        isEndDateValid = isEventStartDateValid(endDate);
        isCercatriviesValid = isEventCercatriviesValid(cercatrivies);
        isFirstCoinsRewardValid = isEventFirstCoinsRewardValid(firstCoinsReward);
        isFirstDigitalProductsRewardValid = isEventFirstDigitalProductsRewardValid(firstDigitalProductsReward);
        isSecondCoinsRewardValid = isEventSecondCoinsRewardValid(secondCoinsReward);
        isSecondDigitalProductsRewardValid = isEventSecondDigitalProductsRewardValid(secondDigitalProductsReward);
        isThirdCoinsRewardValid = isEventThirdCoinsRewardValid(thirdCoinsReward);
        isThirdDigitalProductsRewardValid = isEventThirdDigitalProductsRewardValid(thirdDigitalProductsReward);
        isFourthTenthCoinsRewardValid = isEventFourthTenthCoinsRewardValid(fourthTenthCoinsReward);
        isFourthTenthDigitalProductsRewardValid = isEventFourthTenthDigitalProductsRewardValid(fourthTenthDigitalProductsReward);
        isAllCoinsRewardValid = isEventAllCoinsRewardValid(allCoinsReward);
        isAllDigitalProductsRewardValid = isEventAllDigitalProductsRewardValid(allDigitalProductsReward);

        setErrors({
            id: "",
            name: isNameValid ? "" : dictionary[lang]?.eventNameInvalid + NAME_MIN_LENGTH + " - " + NAME_MAX_LENGTH,
            description: isDescriptionValid ? "" : dictionary[lang]?.eventDescriptionInvalid + DESCRIPTION_MIN_LENGTH + " - " + DESCRIPTION_MAX_LENGTH,
            image: null,
            primaryColour: isPrimaryColourValid ? "" : dictionary[lang]?.eventPrimaryColourInvalid + "",
            secondaryColour: isSecondaryColourValid ? "" : dictionary[lang]?.eventSecondaryColourInvalid + "",
            type: isTypeValid ? "" : dictionary[lang]?.eventTypeInvalid + " " + TYPE_MIN_LENGTH + " - " + TYPE_MAX_LENGTH,
            startDate: isStartDateValid ? "" : dictionary[lang]?.eventStartDateInvalid,
            endDate: isEndDateValid ? "" : dictionary[lang]?.eventEndDateInvalid,
            cercatrivies: isCercatriviesValid ? "" : dictionary[lang]?.eventCercatriviesInvalid,
            firstCoinsReward: isFirstCoinsRewardValid ? "" : dictionary[lang]?.eventFirstCoinsRewardInvalid,
            firstDigitalProductsReward: isFirstDigitalProductsRewardValid ? "" : dictionary[lang]?.eventFirstDigitalProductsRewardInvalid,
            secondCoinsReward: isSecondCoinsRewardValid ? "" : dictionary[lang]?.eventSecondCoinsRewardInvalid,
            secondDigitalProductsReward: isSecondDigitalProductsRewardValid ? "" : dictionary[lang]?.eventSecondDigitalProductsRewardInvalid,
            thirdCoinsReward: isThirdCoinsRewardValid ? "" : dictionary[lang]?.eventThirdCoinsRewardInvalid,
            thirdDigitalProductsReward: isThirdDigitalProductsRewardValid ? "" : dictionary[lang]?.eventThirdDigitalProductsRewardInvalid,
            fourthTenthCoinsReward: isFourthTenthCoinsRewardValid ? "" : dictionary[lang]?.eventFourthTenthCoinsRewardInvalid,
            fourthTenthDigitalProductsReward: isFourthTenthDigitalProductsRewardValid ? "" : dictionary[lang]?.eventFourthTenthDigitalProductsRewardInvalid,
            allCoinsReward: isAllCoinsRewardValid ? "" : dictionary[lang]?.eventAllCoinsRewardInvalid,
            allDigitalProductsReward: isAllDigitalProductsRewardValid ? "" : dictionary[lang]?.eventAllDigitalProductsRewardInvalid,
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isNameValid || !isDescriptionValid || !isImageValid || !isPrimaryColourValid || !isSecondaryColourValid || !isTypeValid
            || !isStartDateValid || !isEndDateValid || !isCercatriviesValid || !isFirstCoinsRewardValid || !isFirstDigitalProductsRewardValid
            || !isSecondCoinsRewardValid || !isSecondDigitalProductsRewardValid || !isThirdCoinsRewardValid || !isThirdDigitalProductsRewardValid
            || !isFourthTenthCoinsRewardValid || !isFourthTenthDigitalProductsRewardValid || !isAllCoinsRewardValid || !isAllDigitalProductsRewardValid) { return; }

        const formDataWithImage = { ...formData };
        if (image) { formDataWithImage.image = image; }

        ev.preventDefault();
        submitForm({
            id: formData.id,
            name: formData.name,
            description: formData.description,
            image: formDataWithImage.image,
            primaryColour: formData.primaryColour,
            secondaryColour: formData.secondaryColour,
            type: formData.type,
            startDate: formData.startDate,
            endDate: formData.endDate,
            cercatrivies: formData.cercatrivies.split(",").map(id => id.trim()).filter(id => id),
            firstCoinsReward: parseFloat(formData.firstCoinsReward),
            firstDigitalProductsReward: formData.firstDigitalProductsReward.split(",").map(id => id.trim()).filter(id => id),
            secondCoinsReward: parseFloat(formData.secondCoinsReward),
            secondDigitalProductsReward: formData.secondDigitalProductsReward.split(",").map(id => id.trim()).filter(id => id),
            thirdCoinsReward: parseFloat(formData.thirdCoinsReward),
            thirdDigitalProductsReward: formData.thirdDigitalProductsReward.split(",").map(id => id.trim()).filter(id => id),
            fourthTenthCoinsReward: parseFloat(formData.fourthTenthCoinsReward),
            fourthTenthDigitalProductsReward: formData.fourthTenthDigitalProductsReward.split(",").map(id => id.trim()).filter(id => id),
            allCoinsReward: parseFloat(formData.allCoinsReward),
            allDigitalProductsReward: formData.allDigitalProductsReward.split(",").map(id => id.trim()).filter(id => id),
        });
    };

    // ------------------ DELETE COLLA ------------------
    const { deleteEvent } = useEventsContext();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isGoToEventsVisible, setGoToEventsVisible] = useState(true);
    const [isDeleteEventVisible, setDeleteEventVisible] = useState(true);

    const handleDeleteClick = () => {
        setGoToEventsVisible(false);
        setDeleteEventVisible(false);
        setIsConfirmOpen(true);
    };
    if (isDeleted) {
        return (
            <section className={styles.eventForm}>
                <h2 className={styles.h2}>{dictionary[lang]?.successDeleteEventMessage}</h2>
                <a href={lang === defaultLang ? "/events.html" : `/events.html?lang=${lang}`} className={styles.h2}>
                    <button className={styles.actionButton}>{dictionary[lang]?.goToEventsButton}</button>
                </a>
            </section>
        );
    }

    const handleConfirmDelete = () => {
        deleteEvent(eventId);
        setIsDeleted(true);
        setIsConfirmOpen(false);
    };

    const handleCancelDelete = () => {
        setIsConfirmOpen(false);
        setGoToEventsVisible(true);
        setDeleteEventVisible(true);
    };

    if (isDeleted) {
        return (
            <div>
                <p>{dictionary[lang]?.successDeleteEventMessage}</p>
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
                <section id="order" className={styles.eventForm}>
                    <h2>{dictionary[lang]?.updateEventTitle}</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >
                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- NAME */}
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

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- DESCRIPTION */}
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

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- IMAGE */}
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

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- PRIMARY COLOUR */}
                            <label htmlFor="primaryColour">{dictionary[lang]?.eventPrimaryColour}</label>
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

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- SECONDARY COLOUR */}
                            <label htmlFor="secondaryColour">{dictionary[lang]?.eventSecondaryColour}</label>
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

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- TYPE */}
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

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- START DATE */}
                            <label htmlFor="startDate">{dictionary[lang]?.eventStartDate}</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleStartDateChange}
                            />
                            {formData.startDate && errors.startDate && (
                                <div style={{ color: "tomato" }}>{errors.startDate}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- END DATE */}
                            <label htmlFor="endDate">{dictionary[lang]?.eventEndDate}</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleEndDateChange}
                            />
                            {formData.endDate && errors.endDate && (
                                <div style={{ color: "tomato" }}>{errors.endDate}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- CERCATRIVIES */}
                            <label htmlFor="cercatrivies">{dictionary[lang]?.eventCercatrivies}</label>
                            <select
                                id="cercatrivies"
                                name="cercatrivies"
                                value={formData.cercatrivies}
                                onChange={handleCercatriviesChange}
                            >
                                <option value="">{dictionary[lang]?.selectEventCercatrivies}</option>
                                {Array.isArray(cercatrivies) ? (
                                    cercatrivies.map(option => (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                            disabled={cercatrivies.some(cercatrivia => cercatrivia.id === cercatrivia.id)}
                                        >
                                            {option.question}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>{dictionary[lang]?.loading}</option>
                                )}
                            </select>
                            {formData.cercatrivies && errors.cercatrivies && (
                                <div style={{ color: "tomato" }}>{errors.cercatrivies}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- FIRST COINS REWARD */}
                            <label htmlFor="firstCoinsReward">{dictionary[lang]?.eventFirstCoinsReward}</label>
                            <input
                                type="number"
                                id="firstCoinsReward"
                                name="firstCoinsReward"
                                value={formData.firstCoinsReward}
                                onChange={handleFirstCoinsRewardChange}
                            />
                            {formData.firstCoinsReward && errors.firstCoinsReward && (
                                <div style={{ color: "tomato" }}>{errors.firstCoinsReward}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- FIRST DIGITAL PRODUCTS REWARD */}
                            <label htmlFor="firstDigitalProductsReward">{dictionary[lang]?.eventFirstDigitalProductsReward}</label>
                            <select
                                id="firstDigitalProductsReward"
                                name="firstDigitalProductsReward"
                                value={formData.firstDigitalProductsReward}
                                onChange={handleFirstDigitalProductsRewardChange}
                            >
                                <option value="">{dictionary[lang]?.selectEventFirstDigitalProductsReward}</option>
                                {Array.isArray(digitalProducts) ? (
                                    digitalProducts.map(option => (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                            disabled={digitalProducts.some(digitalProduct => digitalProduct.id === digitalProduct.id)}
                                        >
                                            {option.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>{dictionary[lang]?.loading}</option>
                                )}
                            </select>
                            {formData.firstDigitalProductsReward && errors.firstDigitalProductsReward && (
                                <div style={{ color: "tomato" }}>{errors.firstDigitalProductsReward}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- SECOND COINS REWARD */}
                            <label htmlFor="secondCoinsReward">{dictionary[lang]?.eventSecondCoinsReward}</label>
                            <input
                                type="number"
                                id="secondCoinsReward"
                                name="secondCoinsReward"
                                value={formData.secondCoinsReward}
                                onChange={handleSecondCoinsRewardChange}
                            />
                            {formData.secondCoinsReward && errors.secondCoinsReward && (
                                <div style={{ color: "tomato" }}>{errors.secondCoinsReward}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- SECOND DIGITAL PRODUCTS REWARD */}
                            <label htmlFor="secondDigitalProductsReward">{dictionary[lang]?.eventSecondDigitalProductsReward}</label>
                            <select
                                id="secondDigitalProductsReward"
                                name="secondDigitalProductsReward"
                                value={formData.secondDigitalProductsReward}
                                onChange={handleSecondDigitalProductsRewardChange}
                            >
                                <option value="">{dictionary[lang]?.selectEventSecondDigitalProductsReward}</option>
                                {Array.isArray(digitalProducts) ? (
                                    digitalProducts.map(option => (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                            disabled={digitalProducts.some(digitalProduct => digitalProduct.id === digitalProduct.id)}
                                        >
                                            {option.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>{dictionary[lang]?.loading}</option>
                                )}
                            </select>
                            {formData.secondDigitalProductsReward && errors.secondDigitalProductsReward && (
                                <div style={{ color: "tomato" }}>{errors.secondDigitalProductsReward}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- THIRD COINS REWARD */}
                            <label htmlFor="thirdCoinsReward">{dictionary[lang]?.eventThirdCoinsReward}</label>
                            <input
                                type="number"
                                id="thirdCoinsReward"
                                name="thirdCoinsReward"
                                value={formData.thirdCoinsReward}
                                onChange={handleThirdCoinsRewardChange}
                            />
                            {formData.thirdCoinsReward && errors.thirdCoinsReward && (
                                <div style={{ color: "tomato" }}>{errors.thirdCoinsReward}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- THIRD DIGITAL PRODUCTS REWARD */}
                            <label htmlFor="thirdDigitalProductsReward">{dictionary[lang]?.eventThirdDigitalProductsReward}</label>
                            <select
                                id="thirdDigitalProductsReward"
                                name="thirdDigitalProductsReward"
                                value={formData.thirdDigitalProductsReward}
                                onChange={handleThirdDigitalProductsRewardChange}
                            >
                                <option value="">{dictionary[lang]?.selectEventThirdDigitalProductsReward}</option>
                                {Array.isArray(digitalProducts) ? (
                                    digitalProducts.map(option => (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                            disabled={digitalProducts.some(digitalProduct => digitalProduct.id === digitalProduct.id)}
                                        >
                                            {option.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>{dictionary[lang]?.loading}</option>
                                )}
                            </select>
                            {formData.thirdDigitalProductsReward && errors.thirdDigitalProductsReward && (
                                <div style={{ color: "tomato" }}>{errors.thirdDigitalProductsReward}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- FOURTH-TENTH COINS REWARD */}
                            <label htmlFor="fourthTenthCoinsReward">{dictionary[lang]?.eventFourthTenthCoinsReward}</label>
                            <input
                                type="number"
                                id="fourthTenthCoinsReward"
                                name="fourthTenthCoinsReward"
                                value={formData.fourthTenthCoinsReward}
                                onChange={handleFourthTenthCoinsRewardChange}
                            />
                            {formData.fourthTenthCoinsReward && errors.fourthTenthCoinsReward && (
                                <div style={{ color: "tomato" }}>{errors.fourthTenthCoinsReward}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- FOURTH-TENTH DIGITAL PRODUCTS REWARD */}
                            <label htmlFor="fourthTenthDigitalProductsReward">{dictionary[lang]?.eventFourthTenthDigitalProductsReward}</label>
                            <select
                                id="fourthTenthDigitalProductsReward"
                                name="fourthTenthDigitalProductsReward"
                                value={formData.fourthTenthDigitalProductsReward}
                                onChange={handleFourthTenthDigitalProductsRewardChange}
                            >
                                <option value="">{dictionary[lang]?.selectEventFourthTenthDigitalProductsReward}</option>
                                {Array.isArray(digitalProducts) ? (
                                    digitalProducts.map(option => (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                            disabled={digitalProducts.some(digitalProduct => digitalProduct.id === digitalProduct.id)}
                                        >
                                            {option.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>{dictionary[lang]?.loading}</option>
                                )}
                            </select>
                            {formData.fourthTenthDigitalProductsReward && errors.fourthTenthDigitalProductsReward && (
                                <div style={{ color: "tomato" }}>{errors.fourthTenthDigitalProductsReward}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- ALL COINS REWARD */}
                            <label htmlFor="allCoinsReward">{dictionary[lang]?.eventAllCoinsReward}</label>
                            <input
                                type="number"
                                id="allCoinsReward"
                                name="allCoinsReward"
                                value={formData.allCoinsReward}
                                onChange={handleAllCoinsRewardChange}
                            />
                            {formData.allCoinsReward && errors.allCoinsReward && (
                                <div style={{ color: "tomato" }}>{errors.allCoinsReward}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- ALL DIGITAL PRODUCTS REWARD */}
                            <label htmlFor="allDigitalProductsReward">{dictionary[lang]?.eventAllDigitalProductsReward}</label>
                            <select
                                id="allDigitalProductsReward"
                                name="allDigitalProductsReward"
                                value={formData.allDigitalProductsReward}
                                onChange={handleAllDigitalProductsRewardChange}
                            >
                                <option value="">{dictionary[lang]?.selectEventAllDigitalProductsReward}</option>
                                {Array.isArray(digitalProducts) ? (
                                    digitalProducts.map(option => (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                            disabled={digitalProducts.some(digitalProduct => digitalProduct.id === digitalProduct.id)}
                                        >
                                            {option.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>{dictionary[lang]?.loading}</option>
                                )}
                            </select>
                            {formData.allDigitalProductsReward && errors.allDigitalProductsReward && (
                                <div style={{ color: "tomato" }}>{errors.allDigitalProductsReward}</div>
                            )}
                        </div>


                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isNameValid || !isDescriptionValid || !isImageValid || !isPrimaryColourValid || !isSecondaryColourValid || !isTypeValid
                                || !isStartDateValid || !isEndDateValid || !isCercatriviesValid || !isFirstCoinsRewardValid || !isFirstDigitalProductsRewardValid
                                || !isSecondCoinsRewardValid || !isSecondDigitalProductsRewardValid || !isThirdCoinsRewardValid || !isThirdDigitalProductsRewardValid
                                || !isFourthTenthCoinsRewardValid || !isFourthTenthDigitalProductsRewardValid || !isAllCoinsRewardValid || !isAllDigitalProductsRewardValid}
                        >
                            {dictionary[lang]?.updateEventButton}
                        </button>
                    </form>
                    {isGoToEventsVisible && (
                        <a href={lang === defaultLang ? "/events.html" : `/events.html?lang=${lang}`}>
                            <button className={styles.actionButton}>{dictionary[lang]?.goToEventsButton}</button>
                        </a>
                    )}
                    {isDeleteEventVisible && (
                        <button className={styles.deleteButton} onClick={handleDeleteClick} >{dictionary[lang]?.deleteEventButton}</button>
                    )}
                    {isConfirmOpen && (
                        <div className={styles.eventForm}>
                            <p className={styles.warningMessage}>{dictionary[lang]?.warningDeleteEventMessage}</p>
                            <button className={styles.actionButton} onClick={handleCancelDelete}>{dictionary[lang]?.cancelDeleteEventButton}</button>
                            <button className={styles.deleteButton} onClick={handleConfirmDelete}>{dictionary[lang]?.confirmDeleteEventButton}</button>
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
        <section className={styles.eventForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successUpdateEventMessage}</h2>
            <a href={lang === defaultLang ? "/events.html" : `/events.html?lang=${lang}`}>
                <button className={styles.actionButton}>{dictionary[lang]?.goToEventsButton}</button>
            </a>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.eventForm}>
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