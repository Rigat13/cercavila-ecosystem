'use client';
import React, {useEffect, useState} from "react";
import {FormStatus, useUserForm} from "@/app/sections/users/form/useUserForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useUserFormData} from "@/app/sections/users/form/useUserFormData";
import styles from "@/app/sections/users/form/UserForm.module.scss";
import {defaultLang, dictionary} from "@/content";

import {useUsersContext} from "@/app/sections/users/UsersContext";

import {isUserNameValid, NAME_MAX_LENGTH, NAME_MIN_LENGTH} from "@/modules/users/domain/user-attributes/UserName";
import {isUserSecondSurnameValid, SECOND_SURNAME_MAX_LENGTH, SECOND_SURNAME_MIN_LENGTH} from "@/modules/users/domain/user-attributes/UserSecondSurname";
import {alreadyExistingNickname, isUserNicknameValid, NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH} from "@/modules/users/domain/user-attributes/UserNickname";
import {isUserFirstSurnameValid, FIRST_SURNAME_MAX_LENGTH, FIRST_SURNAME_MIN_LENGTH} from "@/modules/users/domain/user-attributes/UserFirstSurname";
import {isUserEmailValid, EMAIL_MAX_LENGTH, EMAIL_MIN_LENGTH, alreadyExistingEmail} from "@/modules/users/domain/user-attributes/UserEmail";
import {isUserPasswordValid, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from "@/modules/users/domain/user-attributes/UserPassword";
import {areUserRolesValid, getRolesAdditionalStyle, userCollaRoles} from "@/modules/users/domain/user-attributes/UserRoles";
import {isUserDigitalProductsValid, concatenateUserDigitalProducts} from "@/modules/users/domain/user-attributes/UserDigitalProducts";
import {isUserActiveUserImageValid} from "@/modules/users/domain/user-attributes/UserActiveUserImage";
import {isUserActiveUserImageFrameValid} from "@/modules/users/domain/user-attributes/UserActiveUserImageFrame";
import {isUserActiveUserBackgroundImageValid} from "@/modules/users/domain/user-attributes/UserActiveUserBackgroundImage";
import {isUserActiveUserTitleValid} from "@/modules/users/domain/user-attributes/UserActiveUserTitle";
import {isUserActiveUserBackgroundColourValid} from "@/modules/users/domain/user-attributes/UserActiveUserBackgroundColour";
import {isUserActivePinsValid} from "@/modules/users/domain/user-attributes/UserActivePins";
import {isUserCoinsValid} from "@/modules/users/domain/user-attributes/UserCoins";

import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {digitalProductTypesFixed} from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductType";
import {getContrastColour} from "@/app/sections/shared/getContrastColour";
import PasswordStrengthDisplay from "@/app/sections/shared/PasswordStrengthDisplay";

const initialState = {
    nickname: "",
    email: "",
    password: "",
}

export let isNicknameValid, isNicknameUnique, isEmailValid, isEmailUnique, isPasswordValid;

let nicknameErrorMessage = "";
let emailErrorMessage = "";

const lang = defaultLang;

export function SimpleRegisterUserForm({ lang }: { lang: string }) {
    const { formData, updateForm, resetForm } = useUserFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useUserForm();
    const [errors, setErrors] = useState(initialState);
    const { userNicknames } = useUsersContext();
    const { userEmails } = useUsersContext();

    lang = lang;

    useEffect(() => {

    }, [formData]);

    const handleNicknameChange = (ev) => {
        const newNickname = ev.target.value;
        updateForm({ nickname: newNickname });
        validateFormData({ ...formData, nickname: newNickname });
    }

    const handleEmailChange = (ev) => {
        const newEmail = ev.target.value;
        updateForm({ email: newEmail });
        validateFormData({ ...formData, email: newEmail });
    };

    const handlePasswordChange = (ev) => {
        const newPassword = ev.target.value;
        updateForm({ password: newPassword });
        validateFormData({ ...formData, password: newPassword });
    };

    const validateFormData = ({ nickname, email, password }) => {
        // Perform validation based on the provided data
        isNicknameValid = isUserNicknameValid(nickname);
        isNicknameUnique = !alreadyExistingNickname(nickname, userNicknames, "");
        isEmailValid = isUserEmailValid(email);
        isEmailUnique = !alreadyExistingEmail(email, userEmails);
        isPasswordValid = isUserPasswordValid(password);

        nicknameErrorMessage = isNicknameValid ? "" : dictionary[lang]?.userNicknameInvalid + NICKNAME_MIN_LENGTH + " - " + NICKNAME_MAX_LENGTH,
        nicknameErrorMessage = isNicknameUnique ? nicknameErrorMessage : dictionary[lang]?.userNicknameNotUnique,

        emailErrorMessage = isEmailValid ? "" : dictionary[lang]?.userEmailInvalid + EMAIL_MIN_LENGTH + " - " + EMAIL_MAX_LENGTH,
        emailErrorMessage = isEmailUnique ? emailErrorMessage : dictionary[lang]?.userEmailNotUnique;

        setErrors({
            nickname: nicknameErrorMessage,
            email: emailErrorMessage,
            password: isPasswordValid ? "" : dictionary[lang]?.userPasswordInvalid + PASSWORD_MIN_LENGTH + " - " + PASSWORD_MAX_LENGTH,
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        if (!isNicknameValid || !isEmailValid || !isEmailUnique || !isPasswordValid) { return; }

        submitForm({
            nickname: formData.nickname,
            name: "",
            firstSurname: "",
            secondSurname: "",
            email: formData.email,
            password: formData.password,
            roles: [],
            coins: 0,
            digitalProducts: [],
            activeUserImage: "",
            activeUserImageFrame: "",
            activeUserBackgroundImage: "",
            activeUserBackgroundColour: "",
            activeUserTitle: "",
            activePins: []
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
                <section id="order" className={styles.userForm}>
                    <h2>{dictionary[lang]?.createUserTitle}</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >
                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- NICKNAME */}
                            <label htmlFor="nickname">{dictionary[lang]?.userNickname}</label>
                            <input
                                type="text"
                                id="nickname"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleNicknameChange}
                            />
                            {formData.nickname && errors.nickname && (
                                <div style={{ color: "tomato" }}>{errors.nickname}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- EMAIL */}
                            <label htmlFor="email">{dictionary[lang]?.userEmail}</label>
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

                        <div className={styles.formGroup}> {/* ------------------------------------------------------------------- PASSWORD */}
                            <label htmlFor="password">{dictionary[lang]?.userPassword}</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handlePasswordChange}
                            />
                            <PasswordStrengthDisplay password={formData.password} lang={lang} />
                            {formData.password && errors.password && (<div style={{ color: "tomato" }}>{errors.password}</div>)}
                        </div>

                        {/* -------------------------------------------------------------------------------------------------------- SUBMIT BUTTON */}
                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isNicknameValid || !isNicknameUnique || !isEmailValid || !isEmailUnique || !isPasswordValid }
                        >

                            {dictionary[lang]?.createUserButton}
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
        <section className={styles.userForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successCreateUserMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.createAnotherUserButton}</button>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.userForm}>
            <h2 className={styles.h2error}>{dictionary[lang]?.errorCreateUserMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.retryCreateUserButton}</button>
        </section>
    );
}

function assertUnreachable(x: never): never {
    throw new Error("No s'esperava arribar aquí");
}