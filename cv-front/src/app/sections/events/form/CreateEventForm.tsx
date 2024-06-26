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
import ColourPicker from "@/app/sections/shared/ColourPicker";
import {isEventStartDateValid} from "@/modules/events/domain/events-attributes/EventStartDate";
import {
    concatenateCercatrivies,
    isEventCercatriviesValid
} from "@/modules/events/domain/events-attributes/EventCercatrivies";
import {isEventFirstCoinsRewardValid} from "@/modules/events/domain/events-attributes/EventFirstCoinsReward";
import {isEventFirstDigitalProductsRewardValid} from "@/modules/events/domain/events-attributes/EventFirstDigitalProductsReward";
import {isEventSecondCoinsRewardValid} from "@/modules/events/domain/events-attributes/EventSecondCoinsReward";
import {isEventSecondDigitalProductsRewardValid} from "@/modules/events/domain/events-attributes/EventSecondDigitalProductsReward";
import {isEventThirdCoinsRewardValid} from "@/modules/events/domain/events-attributes/EventThirdCoinsReward";
import {isEventThirdDigitalProductsRewardValid} from "@/modules/events/domain/events-attributes/EventThirdDigitalProductsReward";
import {isEventFourthTenthCoinsRewardValid} from "@/modules/events/domain/events-attributes/EventFourthTenthCoinsReward";
import {isEventFourthTenthDigitalProductsRewardValid} from "@/modules/events/domain/events-attributes/EventFourthTenthDigitalProductsReward";
import {isEventAllCoinsRewardValid} from "@/modules/events/domain/events-attributes/EventAllCoinsReward";
import {isEventAllDigitalProductsRewardValid} from "@/modules/events/domain/events-attributes/EventAllDigitalProductsReward";
import {useEventsContext} from "@/app/sections/events/EventsContext";
import {isEventEndDateValid} from "@/modules/events/domain/events-attributes/EventEndDate";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {concatenateUserDigitalProducts} from "@/modules/users/domain/user-attributes/UserDigitalProducts";
import {Activity} from "@/modules/activities/domain/Activity";

const initialState = {
    name: "",
    description: "",
    image: null as File | null,
    primaryColour: "",
    secondaryColour: "",
    type: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
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
    isStartDateValid, isStartTimeValid, isEndDateValid, isEndTimeValid, isCercatriviesValid, isFirstCoinsRewardValid, isFirstDigitalProductsRewardValid,
    isSecondCoinsRewardValid, isSecondDigitalProductsRewardValid, isThirdCoinsRewardValid, isThirdDigitalProductsRewardValid,
    isFourthTenthCoinsRewardValid, isFourthTenthDigitalProductsRewardValid, isAllCoinsRewardValid, isAllDigitalProductsRewardValid = false;

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

    const { cercatrivies } = useEventsContext();
    const [selectedCercatrivies, setSelectedCercatrivies] = useState([]);

    const { digitalProducts } = useEventsContext();
    const [selectedDigitalProductsFirst, setSelectedDigitalProductsFirst] = useState([]);
    const [selectedDigitalProductsSecond, setSelectedDigitalProductsSecond] = useState([]);
    const [selectedDigitalProductsThird, setSelectedDigitalProductsThird] = useState([]);
    const [selectedDigitalProductsFourthTenth, setSelectedDigitalProductsFourthTenth] = useState([]);
    const [selectedDigitalProductsAll, setSelectedDigitalProductsAll] = useState([]);

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

    const handleStartTimeChange = (ev) => {
        const newStartTime = ev.target.value;
        updateForm({ startTime: newStartTime });
        validateFormData({ ...formData, startTime: newStartTime });
    }

    const handleEndDateChange = (ev) => {
        const newEndDate = ev.target.value;
        updateForm({ endDate: newEndDate });
        validateFormData({ ...formData, endDate: newEndDate });
    }

    const handleEndTimeChange = (ev) => {
        const newEndTime = ev.target.value;
        updateForm({ endTime: newEndTime });
        validateFormData({ ...formData, endTime: newEndTime });
    }

    const handleCercatriviesChange = (ev) => {
        const selectedId = ev.target.value;
        const selectedCercatrivia = cercatrivies.find(option => option.id === selectedId);
        (selectedCercatrivies as Activity[]).push(selectedCercatrivia as Activity);
        if (selectedCercatrivia) {
            setSelectedCercatrivies(selectedCercatrivies);
            const newCercatrivies = concatenateCercatrivies(selectedCercatrivies);
            updateForm({cercatrivies: newCercatrivies});
            validateFormData({...formData, cercatrivies: newCercatrivies});
        }
    };

    const handleDeleteCercatrivia = (index) => {
        setSelectedCercatrivies((prevSelectedCercatrivies) => {
            const newSelectedCercatrivies = [...prevSelectedCercatrivies];
            newSelectedCercatrivies.splice(index, 1);
            const newCercatrivies = concatenateCercatrivies(newSelectedCercatrivies);
            updateForm({ cercatrivies: newCercatrivies });
            validateFormData({ ...formData, cercatrivies: newCercatrivies });
            return newSelectedCercatrivies;
        });
    };

    const handleFirstDigitalProductsRewardChange = (ev) => {
        const selectedId = ev.target.value;
        const selectedDigitalProduct = digitalProducts.find(option => option.id === selectedId);
        (selectedDigitalProductsFirst as DigitalProduct[]).push(selectedDigitalProduct as DigitalProduct);
        if (selectedDigitalProduct) {
            setSelectedDigitalProductsFirst(selectedDigitalProductsFirst);
            const newFirstDigitalProductsReward = concatenateUserDigitalProducts(selectedDigitalProductsFirst);
            updateForm({ firstDigitalProductsReward: newFirstDigitalProductsReward });
            validateFormData({ ...formData, firstDigitalProductsReward: newFirstDigitalProductsReward });
        }
    };

    const handleDeleteFirstDigitalProduct = (index) => {
        setSelectedDigitalProductsFirst((prevSelectedDigitalProductsFirst) => {
            const newSelectedDigitalProductsFirst = [...prevSelectedDigitalProductsFirst];
            newSelectedDigitalProductsFirst.splice(index, 1);
            const newFirstDigitalProductsReward = concatenateUserDigitalProducts(newSelectedDigitalProductsFirst);
            updateForm({ firstDigitalProductsReward: newFirstDigitalProductsReward });
            validateFormData({ ...formData, firstDigitalProductsReward: newFirstDigitalProductsReward });
            return newSelectedDigitalProductsFirst;
        });
    };

    const handleSecondDigitalProductsRewardChange = (ev) => {
        const selectedId = ev.target.value;
        const selectedDigitalProduct = digitalProducts.find(option => option.id === selectedId);
        (selectedDigitalProductsSecond as DigitalProduct[]).push(selectedDigitalProduct as DigitalProduct);
        if (selectedDigitalProduct) {
            setSelectedDigitalProductsSecond(selectedDigitalProductsSecond);
            const newSecondDigitalProductsReward = concatenateUserDigitalProducts(selectedDigitalProductsSecond);
            updateForm({ secondDigitalProductsReward: newSecondDigitalProductsReward });
            validateFormData({ ...formData, secondDigitalProductsReward: newSecondDigitalProductsReward });
        }
    };

    const handleDeleteSecondDigitalProduct = (index) => {
        setSelectedDigitalProductsSecond((prevSelectedDigitalProductsSecond) => {
            const newSelectedDigitalProductsSecond = [...prevSelectedDigitalProductsSecond];
            newSelectedDigitalProductsSecond.splice(index, 1);
            const newSecondDigitalProductsReward = concatenateUserDigitalProducts(newSelectedDigitalProductsSecond);
            updateForm({ secondDigitalProductsReward: newSecondDigitalProductsReward });
            validateFormData({ ...formData, secondDigitalProductsReward: newSecondDigitalProductsReward });
            return newSelectedDigitalProductsSecond;
        });
    };

    const handleThirdDigitalProductsRewardChange = (ev) => {
        const selectedId = ev.target.value;
        const selectedDigitalProduct = digitalProducts.find(option => option.id === selectedId);
        (selectedDigitalProductsThird as DigitalProduct[]).push(selectedDigitalProduct as DigitalProduct);
        if (selectedDigitalProduct) {
            setSelectedDigitalProductsThird(selectedDigitalProductsThird);
            const newThirdDigitalProductsReward = concatenateUserDigitalProducts(selectedDigitalProductsThird);
            updateForm({ thirdDigitalProductsReward: newThirdDigitalProductsReward });
            validateFormData({ ...formData, thirdDigitalProductsReward: newThirdDigitalProductsReward });
        }
    };

    const handleDeleteThirdDigitalProduct = (index) => {
        setSelectedDigitalProductsThird((prevSelectedDigitalProductsThird) => {
            const newSelectedDigitalProductsThird = [...prevSelectedDigitalProductsThird];
            newSelectedDigitalProductsThird.splice(index, 1);
            const newThirdDigitalProductsReward = concatenateUserDigitalProducts(newSelectedDigitalProductsThird);
            updateForm({ thirdDigitalProductsReward: newThirdDigitalProductsReward });
            validateFormData({ ...formData, thirdDigitalProductsReward: newThirdDigitalProductsReward });
            return newSelectedDigitalProductsThird;
        });
    };

    const handleFourthTenthDigitalProductsRewardChange = (ev) => {
        const selectedId = ev.target.value;
        const selectedDigitalProduct = digitalProducts.find(option => option.id === selectedId);
        (selectedDigitalProductsFourthTenth as DigitalProduct[]).push(selectedDigitalProduct as DigitalProduct);
        if (selectedDigitalProduct) {
            setSelectedDigitalProductsFourthTenth(selectedDigitalProductsFourthTenth);
            const newFourthTenthDigitalProductsReward = concatenateUserDigitalProducts(selectedDigitalProductsFourthTenth);
            updateForm({ fourthTenthDigitalProductsReward: newFourthTenthDigitalProductsReward });
            validateFormData({ ...formData, fourthTenthDigitalProductsReward: newFourthTenthDigitalProductsReward });
        }
    };

    const handleDeleteFourthTenthDigitalProduct = (index) => {
        setSelectedDigitalProductsFourthTenth((prevSelectedDigitalProductsFourthTenth) => {
            const newSelectedDigitalProductsFourthTenth = [...prevSelectedDigitalProductsFourthTenth];
            newSelectedDigitalProductsFourthTenth.splice(index, 1);
            const newFourthTenthDigitalProductsReward = concatenateUserDigitalProducts(newSelectedDigitalProductsFourthTenth);
            updateForm({ fourthTenthDigitalProductsReward: newFourthTenthDigitalProductsReward });
            validateFormData({ ...formData, fourthTenthDigitalProductsReward: newFourthTenthDigitalProductsReward });
            return newSelectedDigitalProductsFourthTenth;
        });
    };

    const handleAllDigitalProductsRewardChange = (ev) => {
        const selectedId = ev.target.value;
        const selectedDigitalProduct = digitalProducts.find(option => option.id === selectedId);
        (selectedDigitalProductsAll as DigitalProduct[]).push(selectedDigitalProduct as DigitalProduct);
        if (selectedDigitalProduct) {
            setSelectedDigitalProductsAll(selectedDigitalProductsAll);
            const newAllDigitalProductsReward = concatenateUserDigitalProducts(selectedDigitalProductsAll);
            updateForm({ allDigitalProductsReward: newAllDigitalProductsReward });
            validateFormData({ ...formData, allDigitalProductsReward: newAllDigitalProductsReward });
        }
    };

    const handleDeleteAllDigitalProduct = (index) => {
        setSelectedDigitalProductsAll((prevSelectedDigitalProductsAll) => {
            const newSelectedDigitalProductsAll = [...prevSelectedDigitalProductsAll];
            newSelectedDigitalProductsAll.splice(index, 1);
            const newAllDigitalProductsReward = concatenateUserDigitalProducts(newSelectedDigitalProductsAll);
            updateForm({ allDigitalProductsReward: newAllDigitalProductsReward });
            validateFormData({ ...formData, allDigitalProductsReward: newAllDigitalProductsReward });
            return newSelectedDigitalProductsAll;
        });
    };

    const handleFirstCoinsRewardChange = (ev) => {
        const newFirstCoinsReward = ev.target.value;
        updateForm({ firstCoinsReward: newFirstCoinsReward });
        validateFormData({ ...formData, firstCoinsReward: newFirstCoinsReward });
    }

    const handleSecondCoinsRewardChange = (ev) => {
        const newSecondCoinsReward = ev.target.value;
        updateForm({ secondCoinsReward: newSecondCoinsReward });
        validateFormData({ ...formData, secondCoinsReward: newSecondCoinsReward });
    }

    const handleThirdCoinsRewardChange = (ev) => {
        const newThirdCoinsReward = ev.target.value;
        updateForm({ thirdCoinsReward: newThirdCoinsReward });
        validateFormData({ ...formData, thirdCoinsReward: newThirdCoinsReward });
    }

    const handleFourthTenthCoinsRewardChange = (ev) => {
        const newFourthTenthCoinsReward = ev.target.value;
        updateForm({ fourthTenthCoinsReward: newFourthTenthCoinsReward });
        validateFormData({ ...formData, fourthTenthCoinsReward: newFourthTenthCoinsReward });
    }

    const handleAllCoinsRewardChange = (ev) => {
        const newAllCoinsReward = ev.target.value;
        updateForm({ allCoinsReward: newAllCoinsReward });
        validateFormData({ ...formData, allCoinsReward: newAllCoinsReward });
    }

    const validateFormData = ({ name, description, image, primaryColour, secondaryColour, type, startDate, startTime, endDate, endTime, cercatrivies,
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
        isStartDateValid = isEventStartDateValid(startDate+" "+startTime);
        isStartTimeValid = isStartDateValid;
        isEndDateValid = isEventEndDateValid((startDate+" "+startTime), (endDate+" "+endTime));
        isEndTimeValid = isEndDateValid;
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
            name: isNameValid ? "" : dictionary[lang]?.eventNameInvalid + NAME_MIN_LENGTH + " - " + NAME_MAX_LENGTH,
            description: isDescriptionValid ? "" : dictionary[lang]?.eventDescriptionInvalid + DESCRIPTION_MIN_LENGTH + " - " + DESCRIPTION_MAX_LENGTH,
            image: null,
            primaryColour: isPrimaryColourValid ? "" : dictionary[lang]?.eventPrimaryColourInvalid + "",
            secondaryColour: isSecondaryColourValid ? "" : dictionary[lang]?.eventSecondaryColourInvalid + "",
            type: isTypeValid ? "" : dictionary[lang]?.eventTypeInvalid + " " + TYPE_MIN_LENGTH + " - " + TYPE_MAX_LENGTH,
            startDate: isStartDateValid ? "" : dictionary[lang]?.eventStartDateInvalid,
            startTime: isStartTimeValid ? "" : dictionary[lang]?.eventStartDateInvalid,
            endDate: isEndDateValid ? "" : dictionary[lang]?.eventEndDateInvalid,
            endTime: isEndTimeValid ? "" : dictionary[lang]?.eventEndDateInvalid,
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
            || !isStartDateValid || !isStartTimeValid || !isEndDateValid || !isEndTimeValid || !isCercatriviesValid || !isFirstCoinsRewardValid || !isFirstDigitalProductsRewardValid
            || !isSecondCoinsRewardValid || !isSecondDigitalProductsRewardValid || !isThirdCoinsRewardValid || !isThirdDigitalProductsRewardValid
            || !isFourthTenthCoinsRewardValid || !isFourthTenthDigitalProductsRewardValid || !isAllCoinsRewardValid || !isAllDigitalProductsRewardValid) { return; }

        const formDataWithImage = { ...formData };
        if (image) { formDataWithImage.image = image; }
        ev.preventDefault();
        submitForm({
            name: formData.name,
            description: formData.description,
            image: formDataWithImage.image,
            primaryColour: formData.primaryColour,
            secondaryColour: formData.secondaryColour,
            type: formData.type,
            startDate: formData.startDate,
            startTime: formData.startTime,
            endDate: formData.endDate,
            endTime: formData.endTime,
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
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleStartTimeChange}
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
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleEndTimeChange}
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
                                            disabled={selectedCercatrivies.some(cercatrivia => (cercatrivia as Activity).id === option.id)}
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
                        <div className={styles.selectedElements}>
                            {selectedCercatrivies.map((cercatrivia, index) => (
                                <div key={(cercatrivia as Activity).id} className={styles.selectedElement}>
                                    <span>{(cercatrivia as Activity).question}</span>
                                    <button type="button" onClick={() => handleDeleteCercatrivia(index)}>×</button>
                                </div>
                            ))}
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
                                            disabled={selectedDigitalProductsFirst.some(digitalProduct => (digitalProduct as DigitalProduct).id === option.id)}
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
                        <div className={styles.selectedElements}>
                            {selectedDigitalProductsFirst.map((digitalProduct, index) => (
                                <div key={(digitalProduct as DigitalProduct).id} className={styles.selectedElement}>
                                    <span>{(digitalProduct as DigitalProduct).name}</span>
                                    <button type="button" onClick={() => handleDeleteFirstDigitalProduct(index)}>×</button>
                                </div>
                            ))}
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
                                            disabled={selectedDigitalProductsSecond.some(digitalProduct => (digitalProduct as DigitalProduct).id === option.id)}
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
                        <div className={styles.selectedElements}>
                            {selectedDigitalProductsSecond.map((digitalProduct, index) => (
                                <div key={(digitalProduct as DigitalProduct).id} className={styles.selectedElement}>
                                    <span>{(digitalProduct as DigitalProduct).name}</span>
                                    <button type="button" onClick={() => handleDeleteSecondDigitalProduct(index)}>×</button>
                                </div>
                            ))}
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
                                            disabled={selectedDigitalProductsThird.some(digitalProduct => (digitalProduct as DigitalProduct).id === option.id)}
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
                        <div className={styles.selectedElements}>
                            {selectedDigitalProductsThird.map((digitalProduct, index) => (
                                <div key={(digitalProduct as DigitalProduct).id} className={styles.selectedElement}>
                                    <span>{(digitalProduct as DigitalProduct).name}</span>
                                    <button type="button" onClick={() => handleDeleteThirdDigitalProduct(index)}>×</button>
                                </div>
                            ))}
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
                                            disabled={selectedDigitalProductsFourthTenth.some(digitalProduct => (digitalProduct as DigitalProduct).id === option.id)}
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
                        <div className={styles.selectedElements}>
                            {selectedDigitalProductsFourthTenth.map((digitalProduct, index) => (
                                <div key={(digitalProduct as DigitalProduct).id} className={styles.selectedElement}>
                                    <span>{(digitalProduct as DigitalProduct).name}</span>
                                    <button type="button" onClick={() => handleDeleteFourthTenthDigitalProduct(index)}>×</button>
                                </div>
                            ))}
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
                                            disabled={selectedDigitalProductsAll.some(digitalProduct => (digitalProduct as DigitalProduct).id === option.id)}
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
                        <div className={styles.selectedElements}>
                            {selectedDigitalProductsAll.map((digitalProduct, index) => (
                                <div key={(digitalProduct as DigitalProduct).id} className={styles.selectedElement}>
                                    <span>{(digitalProduct as DigitalProduct).name}</span>
                                    <button type="button" onClick={() => handleDeleteAllDigitalProduct(index)}>×</button>
                                </div>
                            ))}
                        </div>

                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isNameValid || !isDescriptionValid || !isImageValid || !isPrimaryColourValid || !isSecondaryColourValid || !isTypeValid
                                || !isStartDateValid || !isStartTimeValid || !isEndDateValid || !isEndTimeValid || !isCercatriviesValid || !isFirstCoinsRewardValid || !isFirstDigitalProductsRewardValid
                                || !isSecondCoinsRewardValid || !isSecondDigitalProductsRewardValid || !isThirdCoinsRewardValid || !isThirdDigitalProductsRewardValid
                                || !isFourthTenthCoinsRewardValid || !isFourthTenthDigitalProductsRewardValid || !isAllCoinsRewardValid || !isAllDigitalProductsRewardValid}
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