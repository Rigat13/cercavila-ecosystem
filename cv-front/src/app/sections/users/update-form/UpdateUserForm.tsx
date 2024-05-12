'use client';
import React, {useEffect, useState} from "react";
import {FormStatus, useUserForm} from "@/app/sections/users/form/useUserForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import styles from "@/app/sections/users/form/UserForm.module.scss";
import {defaultLang, dictionary} from "@/content";

import {useUsersContext} from "@/app/sections/users/UsersContext";
import {useUpdateUserForm} from "@/app/sections/users/update-form/useUpdateUserForm";
import {useUpdateUserFormData} from "@/app/sections/users/update-form/useUpdateUserFormData";

import {isUserNameValid, NAME_MAX_LENGTH, NAME_MIN_LENGTH} from "@/modules/users/domain/user-attributes/UserName";
import {isUserSecondSurnameValid, SECOND_SURNAME_MAX_LENGTH, SECOND_SURNAME_MIN_LENGTH } from "@/modules/users/domain/user-attributes/UserSecondSurname";
import {isUserNicknameValid, NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH } from "@/modules/users/domain/user-attributes/UserNickname";
import {isUserFirstSurnameValid, FIRST_SURNAME_MAX_LENGTH, FIRST_SURNAME_MIN_LENGTH} from "@/modules/users/domain/user-attributes/UserFirstSurname";
import {isUserEmailValid, EMAIL_MAX_LENGTH, EMAIL_MIN_LENGTH} from "@/modules/users/domain/user-attributes/UserEmail";
import {isUserPasswordValid, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/modules/users/domain/user-attributes/UserPassword";
import {areUserRolesValid, userCollaRoles} from "@/modules/users/domain/user-attributes/UserRoles";
import {isUserDigitalProductsValid, concatenateUserDigitalProducts} from "@/modules/users/domain/user-attributes/UserDigitalProducts";
import {isUserActiveUserImageValid} from "@/modules/users/domain/user-attributes/UserActiveUserImage";
import {isUserActiveUserImageFrameValid} from "@/modules/users/domain/user-attributes/UserActiveUserImageFrame";
import {isUserActiveUserBackgroundImageValid} from "@/modules/users/domain/user-attributes/UserActiveUserBackgroundImage";
import {isUserActiveUserTitleValid} from "@/modules/users/domain/user-attributes/UserActiveUserTitle";
import {isUserActiveUserBackgroundColourValid} from "@/modules/users/domain/user-attributes/UserActiveUserBackgroundColour";
import {isUserActivePinsValid} from "@/modules/users/domain/user-attributes/UserActivePins";
import {isUserCoinsValid} from "@/modules/users/domain/user-attributes/UserCoins";

import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {Figura} from "@/modules/digitalProducts/domain/Figura";

const initialState = {
    id: "",
    nickname: "",
    name: "",
    firstSurname: "",
    secondSurname: "",
    email: "",
    password: "",
    roles: "",
    coins: "",
    digitalProducts: "",
    activeUserImage: "",
    activeUserImageFrame: "",
    activeUserBackgroundImage: "",
    activeUserTitle: "",
    activeUserBackgroundColour: "",
    activePins: "",
}
export let isNicknameValid, isNameValid, isFirstSurnameValid, isSecondSurnameValid, isEmailValid, isPasswordValid, isRolesValid,
    isCoinsValid, isDigitalProductsValid, isActiveUserImageValid, isActiveUserImageFrameValid, isActiveUserBackgroundImageValid,
    isActiveUserTitleValid, isActiveUserBackgroundColourValid, isActivePinsValid;
const lang = defaultLang;

export function UpdateUserForm({userId, lang}: {userId: string; lang: string}) {
    const { formData, updateForm, resetForm } = useUpdateUserFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useUpdateUserForm();
    const [errors, setErrors] = useState(initialState);
    const [isDeleted, setIsDeleted] = useState(false);
    const { userNicknames } = useUsersContext();
    const { users } = useUsersContext();

    const { digitalProducts } = useUsersContext();
    const [selectedDigitalProducts, setSelectedDigitalProducts] = useState([]);

    lang = lang;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = users.find((user) => user.id === userId);
                if (!userData) { throw new Error(dictionary[lang]?.userNotFoundWithId + userId); }

                updateForm({
                    id: userData.id,
                    nickname: userData.nickname,
                    name: userData.name,
                    firstSurname: userData.firstSurname,
                    secondSurname: userData.secondSurname,
                    email: userData.email,
                    password: userData.password,
                    //roles: userData.roles.toString(),
                    coins: userData.coins+"",
                    digitalProducts: userData.digitalProducts.toString(),
                    /*activeUserImage: userData.activeUserImage,
                    activeUserImageFrame: userData.activeUserImageFrame,
                    activeUserBackgroundImage: userData.activeUserBackgroundImage,
                    activeUserTitle: userData.activeUserTitle,
                    activeUserBackgroundColour: userData.activeUserBackgroundColour,
                    activePins: userData.activePins.toString(),*/
                });
                const digitalProductIds = userData.digitalProducts;
                const selectedDigitalProducts: DigitalProduct[] = digitalProductIds.map(digitalProductId => {
                    return digitalProducts.find(digitalProduct => digitalProduct.id === digitalProductId);
                }).filter((digitalProduct): digitalProduct is DigitalProduct => !!digitalProduct);

                setSelectedDigitalProducts(selectedDigitalProducts as DigitalProduct[]);
            } catch (error) {
                throw new Error(error);

                console.error(dictionary[lang]?.errorRetrievingUserMessage + userId);
            }
        };
        fetchUserData();
    }, [userId, users]);



    const handleNicknameChange = (ev) => {
        const newNickname = ev.target.value;
        updateForm({ nickname: newNickname });
        validateFormData({ ...formData, nickname: newNickname });
    }

    const handleNameChange = (ev) => {
        const newName = ev.target.value;
        updateForm({ name: newName });
        validateFormData({ ...formData, name: newName });
    };

    const handleFirstSurnameChange = (ev) => {
        const newFirstSurname = ev.target.value;
        updateForm({ firstSurname: newFirstSurname });
        validateFormData({ ...formData, firstSurname: newFirstSurname });
    };

    const handleSecondSurnameChange = (ev) => {
        const newSecondSurname = ev.target.value;
        updateForm({ secondSurname: newSecondSurname });
        validateFormData({ ...formData, secondSurname: newSecondSurname });
    };

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

    const handleRolesChange = (ev) => {
        const newRoles = ev.target.value;
        updateForm({ roles: newRoles });
        validateFormData({ ...formData, roles: newRoles });
    };

    const handleCoinsChange = (ev) => {
        const newCoins = ev.target.value;
        updateForm({ coins: newCoins });
        validateFormData({ ...formData, coins: newCoins });
    };

    const handleDigitalProductsChange = (ev) => {
        const selectedId = ev.target.value;
        const selectedDigitalProduct = digitalProducts.find(option => option.id === selectedId);
        (selectedDigitalProducts as DigitalProduct[]).push(selectedDigitalProduct as DigitalProduct);
        if (selectedDigitalProduct) {
            setSelectedDigitalProducts(selectedDigitalProducts);
            const newDigitalProducts = concatenateUserDigitalProducts([...selectedDigitalProducts, selectedDigitalProduct]);
            updateForm({ digitalProducts: newDigitalProducts });
            validateFormData({ ...formData, digitalProducts: newDigitalProducts });
        }
    };

    const handleDeleteDigitalProduct = (index) => {
        setSelectedDigitalProducts((prevSelectedDigitalProducts) => {
            const newSelectedDigitalProducts = [...prevSelectedDigitalProducts];
            newSelectedDigitalProducts.splice(index, 1);
            const newDigitalProducts = concatenateUserDigitalProducts(newSelectedDigitalProducts);
            updateForm({ digitalProducts: newDigitalProducts });
            validateFormData({ ...formData, digitalProducts: newDigitalProducts });
            return newSelectedDigitalProducts;
        });
    };

    const handleActiveUserImageChange = (ev) => {
        const newActiveUserImage = ev.target.value;
        updateForm({ activeUserImage: newActiveUserImage });
        validateFormData({ ...formData, activeUserImage: newActiveUserImage });
    };

    const handleActiveUserImageFrameChange = (ev) => {
        const newActiveUserImageFrame = ev.target.value;
        updateForm({ activeUserImageFrame: newActiveUserImageFrame });
        validateFormData({ ...formData, activeUserImageFrame: newActiveUserImageFrame });
    };

    const handleActiveUserBackgroundImageChange = (ev) => {
        const newActiveUserBackgroundImage = ev.target.value;
        updateForm({ activeUserBackgroundImage: newActiveUserBackgroundImage });
        validateFormData({ ...formData, activeUserBackgroundImage: newActiveUserBackgroundImage });
    };

    const handleActiveUserTitleChange = (ev) => {
        const newActiveUserTitle = ev.target.value;
        updateForm({ activeUserTitle: newActiveUserTitle });
        validateFormData({ ...formData, activeUserTitle: newActiveUserTitle });
    };

    const handleActiveUserBackgroundColourChange = (ev) => {
        const newActiveUserBackgroundColour = ev.target.value;
        updateForm({ activeUserBackgroundColour: newActiveUserBackgroundColour });
        validateFormData({ ...formData, activeUserBackgroundColour: newActiveUserBackgroundColour });
    };

    const handleActivePinsChange = (ev) => {
        const newActivePins = ev.target.value;
        updateForm({ activePins: newActivePins });
        validateFormData({ ...formData, activePins: newActivePins });
    };

    const validateFormData = ({ id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                                  activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins }) => {
        // Perform validation based on the provided data
        isNicknameValid = isUserNicknameValid(nickname, userNicknames);
        isNameValid = isUserNameValid(name);
        isFirstSurnameValid = isUserFirstSurnameValid(firstSurname);
        isSecondSurnameValid = isUserSecondSurnameValid(secondSurname);
        isEmailValid = isUserEmailValid(email);
        isPasswordValid = isUserPasswordValid(password);
        isRolesValid = areUserRolesValid(roles);
        isCoinsValid = isUserCoinsValid(coins);
        isDigitalProductsValid = isUserDigitalProductsValid(digitalProducts);
        isActiveUserImageValid = isUserActiveUserImageValid(activeUserImage);
        isActiveUserImageFrameValid = isUserActiveUserImageFrameValid(activeUserImageFrame);
        isActiveUserBackgroundImageValid = isUserActiveUserBackgroundImageValid(activeUserBackgroundImage);
        isActiveUserTitleValid = isUserActiveUserTitleValid(activeUserTitle);
        isActiveUserBackgroundColourValid = isUserActiveUserBackgroundColourValid(activeUserBackgroundColour);
        isActivePinsValid = isUserActivePinsValid(activePins);

        setErrors({
            id: "",
            nickname: isNicknameValid ? "" : dictionary[lang]?.userNicknameInvalid + NICKNAME_MIN_LENGTH + " - " + NICKNAME_MAX_LENGTH,
            name: isNameValid ? "" : dictionary[lang]?.userNameInvalid + NAME_MIN_LENGTH + " - " +NAME_MAX_LENGTH,
            firstSurname: isFirstSurnameValid ? "" : dictionary[lang]?.userFirstSurnameInvalid + FIRST_SURNAME_MIN_LENGTH + " - " + FIRST_SURNAME_MAX_LENGTH,
            secondSurname: isSecondSurnameValid ? "" : dictionary[lang]?.userSecondSurnameInvalid + SECOND_SURNAME_MIN_LENGTH + " - " + SECOND_SURNAME_MAX_LENGTH,
            email: isEmailValid ? "" : dictionary[lang]?.userEmailInvalid + EMAIL_MIN_LENGTH + " - " + EMAIL_MAX_LENGTH,
            password: isPasswordValid ? "" : dictionary[lang]?.userPasswordInvalid + PASSWORD_MIN_LENGTH + " - " + PASSWORD_MAX_LENGTH,
            roles: isRolesValid ? "" : dictionary[lang]?.userRolesInvalid,
            coins: isCoinsValid ? "" : dictionary[lang]?.userCoinsInvalid,
            digitalProducts: isDigitalProductsValid ? "" : dictionary[lang]?.userDigitalProductsInvalid,
            activeUserImage: isActiveUserImageValid ? "" : dictionary[lang]?.userActiveUserImageInvalid,
            activeUserImageFrame: isActiveUserImageFrameValid ? "" : dictionary[lang]?.userActiveUserImageFrameInvalid,
            activeUserBackgroundImage: isActiveUserBackgroundImageValid ? "" : dictionary[lang]?.userActiveUserBackgroundImageInvalid,
            activeUserTitle: isActiveUserTitleValid ? "" : dictionary[lang]?.userActiveUserTitleInvalid,
            activeUserBackgroundColour: isActiveUserBackgroundColourValid ? "" : dictionary[lang]?.userActiveUserBackgroundColourInvalid,
            activePins: isActivePinsValid ? "" : dictionary[lang]?.userActivePinsInvalid,
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isNicknameValid || !isNameValid || !isFirstSurnameValid || !isSecondSurnameValid || !isEmailValid || !isPasswordValid ||// !isRolesValid ||
            !isCoinsValid || !isDigitalProductsValid //|| !isActiveUserImageValid || !isActiveUserImageFrameValid || !isActiveUserBackgroundImageValid ||
            //!isActiveUserTitleValid || !isActiveUserBackgroundColourValid || !isActivePinsValid
        ) { return; }

        ev.preventDefault();
        submitForm({
            id: formData.id,
            nickname: formData.nickname,
            name: formData.name,
            firstSurname: formData.firstSurname,
            secondSurname: formData.secondSurname,
            email: formData.email,
            password: formData.password,
            roles: formData.roles.split(',').map(role => role.trim()),
            coins: parseFloat(formData.coins),
            digitalProducts: formData.digitalProducts.split(',').map(digitalProduct => digitalProduct.trim()),
            activeUserImage: formData.activeUserImage,
            activeUserImageFrame: formData.activeUserImageFrame,
            activeUserBackgroundImage: formData.activeUserBackgroundImage,
            activeUserTitle: formData.activeUserTitle,
            activeUserBackgroundColour: formData.activeUserBackgroundColour,
            activePins: formData.activePins.split(',').map(pin => pin.trim()),
        });
    };

    // ------------------ DELETE COLLA ------------------
    const { deleteUser } = useUsersContext();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isGoToUsersVisible, setGoToUsersVisible] = useState(true);
    const [isDeleteUserVisible, setDeleteUserVisible] = useState(true);

    const handleDeleteClick = () => {
        setGoToUsersVisible(false);
        setDeleteUserVisible(false);
        setIsConfirmOpen(true);
    };
    if (isDeleted) {
        return (
            <section className={styles.userForm}>
                <h2 className={styles.h2}>{dictionary[lang]?.successDeleteUserMessage}</h2>
                <a href={lang === defaultLang ? "/users.html" : `/users.html?lang=${lang}`} className={styles.h2}>
                    <button className={styles.actionButton}>{dictionary[lang]?.goToUsersButton}</button>
                </a>
            </section>
        );
    }

    const handleConfirmDelete = () => {
        deleteUser(userId);
        setIsDeleted(true);
        setIsConfirmOpen(false);
    };

    const handleCancelDelete = () => {
        setIsConfirmOpen(false);
        setGoToUsersVisible(true);
        setDeleteUserVisible(true);
    };

    if (isDeleted) {
        return (
            <div>
                <p>{dictionary[lang]?.successDeleteUserMessage}</p>
            </div>
        );
    }
    // ---------------- END DELETE COLLA ----------------


    switch (formStatus) {
        case FormStatus.Loading:
            return <Spinner />;
        case FormStatus.Success:
            return (
                <SuccessNotification lang={lang} userId={userId}/>
        );
        case FormStatus.Error:
            return <ErrorNotification lang={lang} resetForm={resetFormStatus} />;
        case FormStatus.Initial:
            return (
                <section id="order" className={styles.userForm}>
                    <h2>{dictionary[lang]?.updateUserTitle}</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >
                        <div className={styles.formGroup}>
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

                        <div className={styles.formGroup}>
                            <label htmlFor="name">{dictionary[lang]?.userName}</label>
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
                            <label htmlFor="firstSurname">{dictionary[lang]?.userFirstSurname}</label>
                            <input
                                type="text"
                                id="firstSurname"
                                name="firstSurname"
                                value={formData.firstSurname}
                                onChange={handleFirstSurnameChange}
                            />
                            {formData.firstSurname && errors.firstSurname && (
                                <div style={{ color: "tomato" }}>{errors.firstSurname}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="secondSurname">{dictionary[lang]?.userSecondSurname}</label>
                            <input
                                type="text"
                                id="secondSurname"
                                name="secondSurname"
                                value={formData.secondSurname}
                                onChange={handleSecondSurnameChange}
                            />
                            {formData.secondSurname && errors.secondSurname && (
                                <div style={{ color: "tomato" }}>{errors.secondSurname}</div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
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

                        <div className={styles.formGroup}>
                            <label htmlFor="password">{dictionary[lang]?.userPassword}</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handlePasswordChange}
                            />
                            {formData.password && errors.password && (
                                <div style={{ color: "tomato" }}>{errors.password}</div>
                            )}
                        </div>

                        {"// TODO 3 Add Roles: 1. Populating with roles options; 2. Combining with all colles available in the system"}
                        <div className={styles.formGroup}>
                            <label htmlFor="roles">{dictionary[lang]?.userRoles}</label>
                            <select
                                id="roles"
                                name="roles"
                                value={formData.roles}
                                onChange={handleRolesChange}
                            >
                                <option value="">{dictionary[lang]?.selectUserCollaRole}</option>
                                {userCollaRoles.map(option => (
                                    <option key={option.labelKey} value={option.labelKey}>
                                        {dictionary[lang]?.[option.labelKey]}
                                    </option>
                                ))}
                            </select>
                            {formData.roles && errors.roles && (
                                <div style={{ color: "tomato" }}>{errors.roles}</div>
                            )}
                        </div>


                        <div className={styles.formGroup}>
                            <label htmlFor="coins">{dictionary[lang]?.userCoins}</label>
                            <input
                                type="number"
                                id="coins"
                                name="coins"
                                value={formData.coins}
                                onChange={handleCoinsChange}
                            />
                            {formData.coins && errors.coins && (
                                <div style={{ color: "tomato" }}>{errors.coins}</div>
                            )}


                            {"// TODO 2: Populate aciveX options with Digital Products corresponding the type"}

                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="digitalProducts">{dictionary[lang]?.userDigitalProducts}</label>
                            <select
                                id="digitalProducts"
                                name="digitalProducts"
                                value={formData.digitalProducts}
                                onChange={handleDigitalProductsChange}
                            >
                                <option value="">{dictionary[lang]?.selectUserDigitalProduct}</option>
                                {digitalProducts.map(option => (
                                    <option
                                        key={option.id}
                                        value={option.id}
                                        disabled={selectedDigitalProducts.some(digitalProduct => (digitalProduct as DigitalProduct).id === option.id)}
                                    > {option.name} </option>
                                ))}
                            </select>
                            {formData.digitalProducts && errors.digitalProducts && (
                                <div style={{ color: "tomato" }}>{errors.digitalProducts}</div>
                            )}
                        </div>
                        <div className={styles.selectedElements}>
                            {selectedDigitalProducts.map((digitalProduct, index) => (
                                <div key={(digitalProduct as DigitalProduct).id} className={styles.selectedElement}>
                                    <span>{(digitalProduct as DigitalProduct).name}</span>
                                    <button onClick={() => handleDeleteDigitalProduct(index)}>×</button>
                                </div>
                            ))}
                        </div>

                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isNicknameValid || !isNameValid || !isFirstSurnameValid || !isSecondSurnameValid || !isEmailValid || !isPasswordValid || !isRolesValid ||
                                !isCoinsValid || !isDigitalProductsValid } >{"|| !isActiveUserImageValid || !isActiveUserImageFrameValid || !isActiveUserBackgroundImageValid ||"}
                            {"!isActiveUserTitleValid || !isActiveUserBackgroundColourValid || !isActivePinsValid}>"}

                            {dictionary[lang]?.updateUserButton}
                        </button>
                    </form>
                    {isGoToUsersVisible && (
                        <a href={lang === defaultLang ? "/users.html" : `/users.html?lang=${lang}`}>
                            <button className={styles.actionButton}>{dictionary[lang]?.goToUsersButton}</button>
                        </a>
                    )}
                    {isGoToUsersVisible && (
                        <a href={lang === defaultLang ? `/users/user.html?userId=${userId}` : `/users/user.html?userId=${userId}&lang=${lang}`}>
                            <button className={styles.actionButton}>{dictionary[lang]?.goToUserPageButton}</button>
                        </a>
                    )}
                    {isDeleteUserVisible && (
                        <button className={styles.deleteButton} onClick={handleDeleteClick} >{dictionary[lang]?.deleteUserButton}</button>
                    )}
                    {isConfirmOpen && (
                        <div className={styles.userForm}>
                            <p className={styles.warningMessage}>{dictionary[lang]?.warningDeleteUserMessage}</p>
                            <button className={styles.actionButton} onClick={handleCancelDelete}>{dictionary[lang]?.cancelDeleteUserButton}</button>
                            <button className={styles.deleteButton} onClick={handleConfirmDelete}>{dictionary[lang]?.confirmDeleteUserButton}</button>
                        </div>
                    )}
                </section>
            );
        default:
            assertUnreachable(formStatus);
    }
}

function SuccessNotification({ lang, userId }: { lang: string, userId: string}) {
    return (
        <section className={styles.userForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successUpdateUserMessage}</h2>
            <a href={lang === defaultLang ? "/users.html" : `/users.html?lang=${lang}`}>
                <button className={styles.actionButton}>{dictionary[lang]?.goToUsersButton}</button>
            </a>
            <a href={lang === defaultLang ? `/users/user.html?userId=${userId}` : `/users/user.html?userId=${userId}&lang=${lang}`}>
                <button className={styles.actionButton}>{dictionary[lang]?.goToUserPageButton}</button>
            </a>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.userForm}>
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