import React, {useEffect, useState} from "react";
import {FormStatus, useUpdateActivityForm} from "@/app/sections/activities/update-form/useUpdateActivityForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useUpdateActivityFormData} from "@/app/sections/activities/update-form/useUpdateActivityFormData";
import {useActivitiesContext} from "@/app/sections/activities/ActivitiesContext";
import styles from "@/app/sections/activities/form/ActivityForm.module.scss";
import {defaultLang, dictionary} from "@/content";

import {isActivityQuestionValid, QUESTION_MAX_LENGTH, QUESTION_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivityQuestion";
import {isActivityTypeValid,TYPE_MAX_LENGTH,TYPE_MIN_LENGTH,activityTypes} from "@/modules/activities/domain/activity-attributes/ActivityType";
import {isActivityImageValid, IMAGE_MAX_MBS} from "@/modules/activities/domain/activity-attributes/ActivityImage";
import {isActivityCorrectAnswerValid} from "@/modules/activities/domain/activity-attributes/ActivityCorrectAnswer";
import {CORRECT_ANSWER_MAX_LENGTH, CORRECT_ANSWER_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivityCorrectAnswer";
import {FIRST_INCORRECT_ANSWER_MAX_LENGTH, FIRST_INCORRECT_ANSWER_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivityFirstIncorrectAnswer";
import {SECOND_INCORRECT_ANSWER_MAX_LENGTH, SECOND_INCORRECT_ANSWER_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivitySecondIncorrectAnswer";

const initialState = {
    id: "",
    question: "",
    type: "",
    image: null as File | null,
    correctAnswer: "",
    firstIncorrectAnswer: "",
    secondIncorrectAnswer: "",
}
export let isQuestionValid, isTypeValid, isImageValid, isCorrectAnswerValid, isFirstIncorrectAnswerValid, isSecondIncorrectAnswerValid = false;
const lang = defaultLang;

export function UpdateActivityForm({activityId, lang}: {activityId: string; lang: string}) {
    const { formData, updateForm, resetForm } = useUpdateActivityFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useUpdateActivityForm();
    const [errors, setErrors] = useState(initialState);
    const [isDeleted, setIsDeleted] = useState(false);
    const { activities } = useActivitiesContext();

    const [image, setImage] = useState<File | null>(null);
    const [imageSize, setImageSize] = useState(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isImageAlreadyValid, setImageAlreadyValid] = useState(false);
    const [isFirstTimeValidation, setIsFirstTimeValidation] = useState(true);

    lang = lang;

    useEffect(() => {

        const fetchActivityData = async () => {
            try {
                const activityData = activities.find((activity) => activity.id === activityId);
                if (!activityData) {
                    throw new Error(dictionary[lang]?.activityNotFoundWithId + activityId);
                }

                let imageFile;
                if (activityData.image) {
                    const blob = base64ToBlob(activityData.image as unknown as string);
                    let originalMimeType = blob.type || 'image/avif';
                    const fileName = `image${getFileExtension(originalMimeType)}`
                    imageFile = new File([blob], fileName, { type: originalMimeType });
                }
                
                updateForm({
                    id: activityData.id,
                    question: activityData.question,
                    type: activityData.type,
                    image: imageFile,
                    correctAnswer: activityData.correctAnswer,
                    firstIncorrectAnswer: activityData.firstIncorrectAnswer,
                    secondIncorrectAnswer: activityData.secondIncorrectAnswer,
                });

                const syntheticEvent: { target: { files: any[] } } = {
                    target: {
                        files: [imageFile]
                    }
                };

                handleImageChange(syntheticEvent);
                setIsFirstTimeValidation(false);
            } catch (error) {
                console.error(dictionary[lang]?.errorRetrievingActivityMessage + activityId);
            }
        };
        fetchActivityData();
    }, [activityId, activities]);



    const handleQuestionChange = (ev) => {
        const newQuestion = ev.target.value;
        updateForm({ question: newQuestion });
        validateFormData({ ...formData, question: newQuestion });
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

    const handleCorrectAnswerChange = (ev) => {
        const newCorrectAnswer = ev.target.value;
        updateForm({ correctAnswer: newCorrectAnswer });
        validateFormData({ ...formData, correctAnswer: newCorrectAnswer });
    }

    const handleFirstIncorrectAnswerChange = (ev) => {
        const newFirstIncorrectAnswer = ev.target.value;
        updateForm({ firstIncorrectAnswer: newFirstIncorrectAnswer });
        validateFormData({ ...formData, firstIncorrectAnswer: newFirstIncorrectAnswer });
    }

    const handleSecondIncorrectAnswerChange = (ev) => {
        const newSecondIncorrectAnswer = ev.target.value;
        updateForm({ secondIncorrectAnswer: newSecondIncorrectAnswer });
        validateFormData({ ...formData, secondIncorrectAnswer: newSecondIncorrectAnswer });
    }

    const validateFormData = ({ id, question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer }) => {
        // Perform validation based on the provided data
        isQuestionValid = isActivityQuestionValid(question);
        isTypeValid = isActivityTypeValid(type, dictionary[lang]?.selectActivityType+"");
        if (!isImageAlreadyValid) isImageValid = isActivityImageValid(image);
        setImageAlreadyValid(isImageValid);
        isCorrectAnswerValid = isActivityCorrectAnswerValid(correctAnswer);
        isFirstIncorrectAnswerValid = isActivityCorrectAnswerValid(firstIncorrectAnswer);
        isSecondIncorrectAnswerValid = isActivityCorrectAnswerValid(secondIncorrectAnswer);

        setErrors({
            id: "",
            question: isQuestionValid ? "" : dictionary[lang]?.activityQuestionInvalid + QUESTION_MIN_LENGTH + " - " + QUESTION_MAX_LENGTH,
            type: isTypeValid ? "" : dictionary[lang]?.activityTypeInvalid + " " + TYPE_MIN_LENGTH + " - " + TYPE_MAX_LENGTH,
            image: null,
            correctAnswer: isCorrectAnswerValid ? "" : dictionary[lang]?.activityCorrectAnswerInvalid + CORRECT_ANSWER_MIN_LENGTH + " - " + CORRECT_ANSWER_MAX_LENGTH,
            firstIncorrectAnswer: isFirstIncorrectAnswerValid ? "" : dictionary[lang]?.activityFirstIncorrectAnswerInvalid + FIRST_INCORRECT_ANSWER_MIN_LENGTH + " - " + FIRST_INCORRECT_ANSWER_MAX_LENGTH,
            secondIncorrectAnswer: isSecondIncorrectAnswerValid ? "" : dictionary[lang]?.activitySecondIncorrectAnswerInvalid + SECOND_INCORRECT_ANSWER_MIN_LENGTH + " - " + SECOND_INCORRECT_ANSWER_MAX_LENGTH,
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isQuestionValid || !isTypeValid || !isImageValid || !isCorrectAnswerValid || !isFirstIncorrectAnswerValid || !isSecondIncorrectAnswerValid) { return; }

        const formDataWithImage = { ...formData };
        if (image) { formDataWithImage.image = image; }

        ev.preventDefault();
        submitForm({
            id: formData.id,
            question: formData.question,
            type: formData.type,
            image: formDataWithImage.image,
            correctAnswer: formData.correctAnswer,
            firstIncorrectAnswer: formData.firstIncorrectAnswer,
            secondIncorrectAnswer: formData.secondIncorrectAnswer,
        });
    };

    // ------------------ DELETE COLLA ------------------
    const { deleteActivity } = useActivitiesContext();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isGoToActivitiesVisible, setGoToActivitiesVisible] = useState(true);
    const [isDeleteActivityVisible, setDeleteActivityVisible] = useState(true);

    const handleDeleteClick = () => {
        setGoToActivitiesVisible(false);
        setDeleteActivityVisible(false);
        setIsConfirmOpen(true);
    };
    if (isDeleted) {
        return (
            <section className={styles.activityForm}>
                <h2 className={styles.h2}>{dictionary[lang]?.successDeleteActivityMessage}</h2>
                <a href={lang === defaultLang ? "/activities.html" : `/activities.html?lang=${lang}`} className={styles.h2}>
                    <button className={styles.actionButton}>{dictionary[lang]?.goToActivitiesButton}</button>
                </a>
            </section>
        );
    }

    const handleConfirmDelete = () => {
        deleteActivity(activityId);
        setIsDeleted(true);
        setIsConfirmOpen(false);
    };

    const handleCancelDelete = () => {
        setIsConfirmOpen(false);
        setGoToActivitiesVisible(true);
        setDeleteActivityVisible(true);
    };

    if (isDeleted) {
        return (
            <div>
                <p>{dictionary[lang]?.successDeleteActivityMessage}</p>
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
                <section id="order" className={styles.activityForm}>
                    <h2>{dictionary[lang]?.updateActivityTitle}</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="question">{dictionary[lang]?.activityQuestion}</label>
                            <input
                                type="text"
                                id="question"
                                name="question"
                                value={formData.question}
                                onChange={handleQuestionChange}
                            />
                            {formData.question && errors.question && (
                                <div style={{ color: "tomato" }}>{errors.question}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="type">{dictionary[lang]?.activityType}</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleTypeChange}
                            >
                                <option value="">{dictionary[lang]?.selectActivityType}</option>
                                {activityTypes.map(option => (
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
                            <label htmlFor="image">{dictionary[lang]?.activityImage}</label>
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
                            <label htmlFor="correctAnswer">{dictionary[lang]?.activityCorrectAnswer}</label>
                            <input
                                type="text"
                                id="correctAnswer"
                                name="correctAnswer"
                                value={formData.correctAnswer}
                                onChange={handleCorrectAnswerChange}
                            />
                            {formData.correctAnswer && errors.correctAnswer && (
                                <div style={{ color: "tomato" }}>{errors.correctAnswer}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="firstIncorrectAnswer">{dictionary[lang]?.activityFirstIncorrectAnswer}</label>
                            <input
                                type="text"
                                id="firstIncorrectAnswer"
                                name="firstIncorrectAnswer"
                                value={formData.firstIncorrectAnswer}
                                onChange={handleFirstIncorrectAnswerChange}
                            />
                            {formData.firstIncorrectAnswer && errors.firstIncorrectAnswer && (
                                <div style={{ color: "tomato" }}>{errors.firstIncorrectAnswer}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="secondIncorrectAnswer">{dictionary[lang]?.activitySecondIncorrectAnswer}</label>
                            <input
                                type="text"
                                id="secondIncorrectAnswer"
                                name="secondIncorrectAnswer"
                                value={formData.secondIncorrectAnswer}
                                onChange={handleSecondIncorrectAnswerChange}
                            />
                            {formData.secondIncorrectAnswer && errors.secondIncorrectAnswer && (
                                <div style={{ color: "tomato" }}>{errors.secondIncorrectAnswer}</div>
                            )}
                        </div>

                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isQuestionValid || !isTypeValid || !isImageValid || !isCorrectAnswerValid || !isFirstIncorrectAnswerValid || !isSecondIncorrectAnswerValid}
                        >
                            {dictionary[lang]?.updateActivityButton}
                        </button>
                    </form>
                    {isGoToActivitiesVisible && (
                        <a href={lang === defaultLang ? "/activities.html" : `/activities.html?lang=${lang}`}>
                            <button className={styles.actionButton}>{dictionary[lang]?.goToActivitiesButton}</button>
                        </a>
                    )}
                    {isDeleteActivityVisible && (
                        <button className={styles.deleteButton} onClick={handleDeleteClick} >{dictionary[lang]?.deleteActivityButton}</button>
                    )}
                    {isConfirmOpen && (
                        <div className={styles.activityForm}>
                            <p className={styles.warningMessage}>{dictionary[lang]?.warningDeleteActivityMessage}</p>
                            <button className={styles.actionButton} onClick={handleCancelDelete}>{dictionary[lang]?.cancelDeleteActivityButton}</button>
                            <button className={styles.deleteButton} onClick={handleConfirmDelete}>{dictionary[lang]?.confirmDeleteActivityButton}</button>
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
        <section className={styles.activityForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successUpdateActivityMessage}</h2>
            <a href={lang === defaultLang ? "/activities.html" : `/activities.html?lang=${lang}`}>
                <button className={styles.actionButton}>{dictionary[lang]?.goToActivitiesButton}</button>
            </a>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.activityForm}>
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