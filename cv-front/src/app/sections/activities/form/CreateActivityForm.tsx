'use client';

import React, {useEffect, useState} from "react";
import {FormStatus, useActivityForm} from "@/app/sections/activities/form/useActivityForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useActivityFormData} from "@/app/sections/activities/form/useActivityFormData";
import styles from "@/app/sections/activities/form/ActivityForm.module.scss";
import {defaultLang, dictionary} from "@/content";

import {isActivityQuestionValid, QUESTION_MAX_LENGTH, QUESTION_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivityQuestion";
import {isActivityTypeValid,TYPE_MAX_LENGTH,TYPE_MIN_LENGTH,activityTypes} from "@/modules/activities/domain/activity-attributes/ActivityType";
import {isActivityImageValid, IMAGE_MAX_MBS} from "@/modules/activities/domain/activity-attributes/ActivityImage";
import {isActivityAnswerValid, CORRECT_ANSWER_MAX_LENGTH, CORRECT_ANSWER_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivityCorrectAnswer";
import {FIRST_INCORRECT_ANSWER_MAX_LENGTH, FIRST_INCORRECT_ANSWER_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivityFirstIncorrectAnswer";
import {SECOND_INCORRECT_ANSWER_MAX_LENGTH, SECOND_INCORRECT_ANSWER_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivitySecondIncorrectAnswer";

const initialState = {
    question: "",
    type: "",
    image: null as File | null,
    correctAnswer: "",
    firstIncorrectAnswer: "",
    secondIncorrectAnswer: "",
}

export let isQuestionValid, isTypeValid, isImageValid, isCorrectAnswerValid, isFirstIncorrectAnswerValid, isSecondIncorrectAnswerValid = false;
const lang = defaultLang;

export function CreateActivityForm({ lang }: { lang: string }) {
    const { formData, updateForm, resetForm } = useActivityFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useActivityForm();
    const [errors, setErrors] = useState(initialState);

    const [image, setImage] = useState<File | null>(null);
    const [imageSize, setImageSize] = useState(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isImageAlreadyValid, setImageAlreadyValid] = useState(false);

    lang = lang;

    useEffect(() => {

    }, [formData]);

    const handleQuestionChange = (ev) => {
        const newQuestion = ev.target.value;
        updateForm({ question: newQuestion });
        validateFormData({ ...formData, question: newQuestion });
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

    const handleCorrectAnswerChange = (ev) => {
        const newCorrectAnswer = ev.target.value;
        updateForm({ correctAnswer: newCorrectAnswer });
        validateFormData({ ...formData, correctAnswer: newCorrectAnswer });
    };

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

    const validateFormData = ({ question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer }) => {
        // Perform validation based on the provided data
        isQuestionValid = isActivityQuestionValid(question);
        isTypeValid = isActivityTypeValid(type, dictionary[lang]?.selectActivityType+"");
        if (!isImageAlreadyValid) isImageValid = isActivityImageValid(image);
        setImageAlreadyValid(isImageValid);
        isCorrectAnswerValid = isActivityAnswerValid(correctAnswer);
        isFirstIncorrectAnswerValid = isActivityAnswerValid(firstIncorrectAnswer);
        isSecondIncorrectAnswerValid = isActivityAnswerValid(secondIncorrectAnswer);

        setErrors({
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
            question: formData.question,
            type: formData.type,
            image: formDataWithImage.image,
            correctAnswer: formData.correctAnswer,
            firstIncorrectAnswer: formData.firstIncorrectAnswer,
            secondIncorrectAnswer: formData.secondIncorrectAnswer,
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
                <section id="order" className={styles.activityForm}>
                    <h2>{dictionary[lang]?.createActivityTitle}</h2>

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
                                question="question"
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
                                question="type"
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
                                question="image"
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
                                question="correctAnswer"
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
                                question="firstIncorrectAnswer"
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
                                question="secondIncorrectAnswer"
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
                            {dictionary[lang]?.createActivityButton}
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
        <section className={styles.activityForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successCreateActivityMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.createAnotherActivityButton}</button>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.activityForm}>
            <h2 className={styles.h2error}>{dictionary[lang]?.errorCreateActivityMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.retryCreateActivityButton}</button>
        </section>
    );
}

function assertUnreachable(x: never): never {
    throw new Error("No s'esperava arribar aquí");
}