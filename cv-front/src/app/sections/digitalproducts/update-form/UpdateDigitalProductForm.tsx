import React, {useEffect, useState} from "react";
import {FormStatus, useUpdateDigitalProductForm} from "@/app/sections/digitalproducts/update-form/useUpdateDigitalProductForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import {useUpdateDigitalProductFormData} from "@/app/sections/digitalproducts/update-form/useUpdateDigitalProductFormData";
import {useDigitalProductsContext} from "@/app/sections/digitalproducts/DigitalProductsContext";
import styles from "@/app/sections/digitalproducts/form/DigitalProductForm.module.scss";
import {defaultLang, dictionary} from "@/content";

import {isDigitalProductNameValid, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductName";
import {isDigitalProductTypeValid,TYPE_MAX_LENGTH,TYPE_MIN_LENGTH,digitalProductTypes} from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductType";
import {isDigitalProductImageValid, IMAGE_MAX_MBS} from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductImage";
import { DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH, isDigitalProductDescriptionValid } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductDescription";

import { isDigitalProductColourValid } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductColours";
import { isDigitalProductPriceValid } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductPrice";
import ColourPicker from "@/app/sections/shared/ColourPicker";

const initialState = {
    id: "",
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

export function UpdateDigitalProductForm({digitalProductId, lang}: {digitalProductId: string; lang: string}) {
    const { formData, updateForm, resetForm } = useUpdateDigitalProductFormData(initialState);
    const { formStatus, submitForm, resetFormStatus } = useUpdateDigitalProductForm();
    const [errors, setErrors] = useState(initialState);
    const [isDeleted, setIsDeleted] = useState(false);
    const { digitalProducts } = useDigitalProductsContext();

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

        const fetchDigitalProductData = async () => {
            try {
                const digitalProductData = digitalProducts.find((digitalProduct) => digitalProduct.id === digitalProductId);
                if (!digitalProductData) {
                    throw new Error(dictionary[lang]?.digitalProductNotFoundWithId + digitalProductId);
                }

                let imageFile;
                if (digitalProductData.image) {
                    const blob = base64ToBlob(digitalProductData.image as unknown as string);
                    let originalMimeType = blob.type || 'image/avif';
                    const fileName = `image${getFileExtension(originalMimeType)}`
                    imageFile = new File([blob], fileName, { type: originalMimeType });
                }

                updateForm({
                    id: digitalProductData.id,
                    name: digitalProductData.name,
                    description: digitalProductData.description,
                    image: imageFile,
                    primaryColour: digitalProductData.primaryColour,
                    secondaryColour: digitalProductData.secondaryColour,
                    price: digitalProductData.price+"",
                    type: digitalProductData.type,
                });

                const syntheticEvent: { target: { files: any[] } } = {
                    target: {
                        files: [imageFile]
                    }
                };

                setPrimaryColour(digitalProductData.primaryColour);
                setSecondaryColour(digitalProductData.secondaryColour);

                handleImageChange(syntheticEvent);
                setIsFirstTimeValidation(false);
            } catch (error) {
                console.error(dictionary[lang]?.errorRetrievingDigitalProductMessage + digitalProductId);
            }
        };
        fetchDigitalProductData();
    }, [digitalProductId, digitalProducts]);

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

    const validateFormData = ({ id, name, description, image, primaryColour, secondaryColour, price, type }) => {
        isNameValid = isDigitalProductNameValid(name);
        isDescriptionValid = isDigitalProductDescriptionValid(description);
        if (!isImageAlreadyValid) isImageValid = isDigitalProductImageValid(image);
        setImageAlreadyValid(isImageValid);
        isPrimaryColourValid = isDigitalProductColourValid(primaryColour);
        isSecondaryColourValid = isDigitalProductColourValid(secondaryColour);
        isPriceValid = isDigitalProductPriceValid(price);
        isTypeValid = isDigitalProductTypeValid(type, dictionary[lang]?.selectDigitalProductType+"");

        setErrors({
            id: "",
            name: isNameValid ? "" : dictionary[lang]?.digitalProductNameInvalid + NAME_MIN_LENGTH + " - " + NAME_MAX_LENGTH,
            description: isDescriptionValid ? "" : dictionary[lang]?.digitalProductDescriptionInvalid + DESCRIPTION_MIN_LENGTH + " - " + DESCRIPTION_MAX_LENGTH,
            image: null,
            primaryColour: isPrimaryColourValid ? "" : dictionary[lang]?.digitalProductPrimaryColourInvalid + "",
            secondaryColour: isSecondaryColourValid ? "" : dictionary[lang]?.digitalProductSecondaryColourInvalid + "",
            price: isPriceValid ? "" : dictionary[lang]?.digitalProductPriceInvalid + "",
            type: isTypeValid ? "" : dictionary[lang]?.digitalProductTypeInvalid + " " + TYPE_MIN_LENGTH + " - " + TYPE_MAX_LENGTH,
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isNameValid || !isDescriptionValid || !isImageValid || !isPrimaryColourValid || !isSecondaryColourValid || !isPriceValid || !isTypeValid) { return; }

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
            price: Number(formData.price),
            type: formData.type,
        });
    };

    // ------------------ DELETE COLLA ------------------
    const { deleteDigitalProduct } = useDigitalProductsContext();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isGoToDigitalProductsVisible, setGoToDigitalProductsVisible] = useState(true);
    const [isDeleteDigitalProductVisible, setDeleteDigitalProductVisible] = useState(true);

    const handleDeleteClick = () => {
        setGoToDigitalProductsVisible(false);
        setDeleteDigitalProductVisible(false);
        setIsConfirmOpen(true);
    };
    if (isDeleted) {
        return (
            <section className={styles.digitalProductForm}>
                <h2 className={styles.h2}>{dictionary[lang]?.successDeleteDigitalProductMessage}</h2>
                <a href={lang === defaultLang ? "/digitalproducts.html" : `/digitalproducts.html?lang=${lang}`} className={styles.h2}>
                    <button className={styles.actionButton}>{dictionary[lang]?.goToDigitalProductsButton}</button>
                </a>
            </section>
        );
    }

    const handleConfirmDelete = () => {
        deleteDigitalProduct(digitalProductId);
        setIsDeleted(true);
        setIsConfirmOpen(false);
    };

    const handleCancelDelete = () => {
        setIsConfirmOpen(false);
        setGoToDigitalProductsVisible(true);
        setDeleteDigitalProductVisible(true);
    };

    if (isDeleted) {
        return (
            <div>
                <p>{dictionary[lang]?.successDeleteDigitalProductMessage}</p>
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
                <section id="order" className={styles.digitalProductForm}>
                    <h2>{dictionary[lang]?.updateDigitalProductTitle}</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="name">{dictionary[lang]?.digitalProductName}</label>
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
                            <label htmlFor="description">{dictionary[lang]?.digitalProductDescription}</label>
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
                            <label htmlFor="image">{dictionary[lang]?.digitalProductImage}</label>
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
                            <label htmlFor="primaryColour">{dictionary[lang]?.digitalProductPrimaryColour}</label>
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
                            <label htmlFor="secondaryColour">{dictionary[lang]?.digitalProductSecondaryColour}</label>
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
                            <label htmlFor="price">{dictionary[lang]?.digitalProductPrice}</label>
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
                            <label htmlFor="type">{dictionary[lang]?.digitalProductType}</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleTypeChange}
                            >
                                <option value="">{dictionary[lang]?.selectDigitalProductType}</option>
                                {digitalProductTypes.map(option => (
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
                            {dictionary[lang]?.updateDigitalProductButton}
                        </button>
                    </form>
                    {isGoToDigitalProductsVisible && (
                        <a href={lang === defaultLang ? "/digitalproducts.html" : `/digitalproducts.html?lang=${lang}`}>
                            <button className={styles.actionButton}>{dictionary[lang]?.goToDigitalProductsButton}</button>
                        </a>
                    )}
                    {isDeleteDigitalProductVisible && (
                        <button className={styles.deleteButton} onClick={handleDeleteClick} >{dictionary[lang]?.deleteDigitalProductButton}</button>
                    )}
                    {isConfirmOpen && (
                        <div className={styles.digitalProductForm}>
                            <p className={styles.warningMessage}>{dictionary[lang]?.warningDeleteDigitalProductMessage}</p>
                            <button className={styles.actionButton} onClick={handleCancelDelete}>{dictionary[lang]?.cancelDeleteDigitalProductButton}</button>
                            <button className={styles.deleteButton} onClick={handleConfirmDelete}>{dictionary[lang]?.confirmDeleteDigitalProductButton}</button>
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
        <section className={styles.digitalProductForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successUpdateDigitalProductMessage}</h2>
            <a href={lang === defaultLang ? "/digitalproducts.html" : `/digitalproducts.html?lang=${lang}`}>
                <button className={styles.actionButton}>{dictionary[lang]?.goToDigitalProductsButton}</button>
            </a>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.digitalProductForm}>
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