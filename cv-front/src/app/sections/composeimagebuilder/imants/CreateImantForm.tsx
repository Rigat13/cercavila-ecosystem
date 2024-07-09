'use client';

import React, { useEffect, useState } from "react";
import { FormStatus, useCollaForm } from "@/app/sections/colles/form/useCollaForm";
import { Spinner } from "@/app/sections/shared/Spinner";
import { useCollaFormData } from "@/app/sections/colles/form/useCollaFormData";
import styles from "@/app/sections/composeimagebuilder/imants/ImantForm.module.scss";
import { defaultLang, dictionary } from "@/content";
import "@/app/globals.css";

import { isCollaLogoValid, LOGO_MAX_MBS } from "@/modules/colles/domain/colla-attributes/CollaLogo";
import { concatenateFigures } from "@/modules/colles/domain/colla-attributes/CollaFigures";
import { useCollesContext } from "@/app/sections/colles/CollesContext";
import {isCollaColourValid} from "@/modules/colles/domain/colla-attributes/CollaColours";
import {isNameValid, isPrimaryColourValid} from "@/app/sections/colles/form/CreateCollaForm";
import ColourPicker from "@/app/sections/shared/ColourPicker";
import {isCollaNameValid, NAME_MAX_LENGTH, NAME_MIN_LENGTH} from "@/modules/colles/domain/colla-attributes/CollaName";
import {update} from "immutable";

const initialState = {
    logo: null as File | null,
    secondaryImage: null as File | null,
    backgroundImage: null as File | null,
    giantName: "",
    colour: "",
    imantNumber: "",
}

export let isLogoValid, isSecondaryImageValid, isBackgroundImageValid, isGiantNameValid, isColourValid, isImantNumberValid = false;


const lang = defaultLang;

// Define resolution parameters for the downloaded image
const downloadImageWidth = 591; // Width of the downloaded image
const downloadImageHeight = 591; // Height of the downloaded image

export function CreateImantForm({ lang }: { lang: string }) {
    const { formData, updateForm, resetForm } = useCollaFormData(initialState);
    const { formStatus, resetFormStatus } = useCollaForm();
    const [errors, setErrors] = useState(initialState);

    const [logo, setLogo] = useState<File | null>(null);
    const [logoSize, setLogoSize] = useState(0);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isLogoAlreadyValid, setLogoAlreadyValid] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const [secondaryImage, setSecondaryImage] = useState<File | null>(null);
    const [secondaryImageSize, setSecondaryImageSize] = useState(0);
    const [secondaryImagePreview, setSecondaryImagePreview] = useState<string | null>(null);
    const [isSecondaryImageAlreadyValid, setSecondaryImageAlreadyValid] = useState(false);

    const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
    const [backgroundImageSize, setBackgroundImageSize] = useState(0);
    const [backgroundImagePreview, setBackgroundImagePreview] = useState<string | null>(null);
    const [isBackgroundImageAlreadyValid, setBackgroundImageAlreadyValid] = useState(false);

    const [giantName, setGiantName] = useState("");
    const [imantNumber, setImantNumber] = useState("");

    const [selectedFigures] = useState([]);

    const [isColourPickerOpen, setIsColourPickerOpen] = useState(false);
    const [colour, setColour] = useState('#FFFFFF');

    lang = lang;

    useEffect(() => {
        if (logoPreview && secondaryImagePreview && backgroundImagePreview) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (ctx) {
                const logoImg = new Image();
                const secondaryImg = new Image();
                const backgroundImg = new Image();

                // Set sources for images
                logoImg.src = logoPreview;
                secondaryImg.src = secondaryImagePreview;
                backgroundImg.src = backgroundImagePreview;

                // Ensure all images are loaded before processing
                Promise.all([loadImage(logoImg), loadImage(secondaryImg), loadImage(backgroundImg)])
                    .then(() => {
                        canvas.width = downloadImageWidth;
                        canvas.height = downloadImageHeight;

                        // Create a temporary canvas to apply the color multiplication
                        const tempCanvas = document.createElement('canvas');
                        const tempCtx = tempCanvas.getContext('2d');
                        tempCanvas.width = downloadImageWidth;
                        tempCanvas.height = downloadImageHeight;

                        // Draw background image onto temporary canvas
                        tempCtx.drawImage(backgroundImg, 0, 0, downloadImageWidth, downloadImageHeight);

                        // Apply color multiplication to the temporary canvas
                        tempCtx.globalCompositeOperation = 'multiply';
                        tempCtx.fillStyle = colour;
                        tempCtx.fillRect(0, 0, downloadImageWidth, downloadImageHeight);

                        // Reset composite operation and draw the multiplied result onto the main canvas
                        ctx.globalCompositeOperation = 'source-over';
                        ctx.drawImage(tempCanvas, 0, 0, downloadImageWidth, downloadImageHeight);

                        // Draw the background image again as a mask to preserve transparency
                        ctx.globalCompositeOperation = 'destination-in';
                        ctx.drawImage(backgroundImg, 0, 0, downloadImageWidth, downloadImageHeight);

                        // Draw the secondary image on top
                        ctx.globalCompositeOperation = 'source-over';
                        ctx.drawImage(secondaryImg, 0, 0, downloadImageWidth, downloadImageHeight);

                        // Draw the logo image on top
                        ctx.drawImage(logoImg, 0, 0, downloadImageWidth, downloadImageHeight);

                        // Add text to the canvas - giantName
                        if (giantName) {
                            ctx.font = 'bold 90px Josefin Sans'; // Adjust font size and style
                            ctx.fillStyle = 'black'; // Adjust text color as needed
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom'; // Align text to bottom
                            ctx.fillText(giantName.toUpperCase(), canvas.width / 2, canvas.height - 20); // Display uppercase text
                        }

                        // Add text to the canvas - imantNumber
                        if (imantNumber) {
                            ctx.font = 'bold 40px Josefin Sans'; // Adjust font size and style
                            ctx.fillStyle = 'black'; // Adjust text color as needed
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'bottom'; // Align text to bottom
                            ctx.fillText(imantNumber, canvas.width - 20, canvas.height - 20); // Display text at bottom right
                        }

                        // Add a white background to the entire canvas
                        ctx.globalCompositeOperation = 'destination-over'; // Draw behind existing content
                        ctx.fillStyle = '#ffffff'; // White color
                        ctx.fillRect(0, 0, canvas.width, canvas.height);

                        const mergedImageUrl = canvas.toDataURL('image/png');
                        setDownloadUrl(mergedImageUrl);
                    })
                    .catch(error => {
                        console.error('Error loading images:', error);
                    });
            }
        }
    }, [logoPreview, secondaryImagePreview, backgroundImagePreview, giantName, imantNumber, colour]);


// Function to ensure image is loaded properly
    function loadImage(image) {
        return new Promise((resolve, reject) => {
            if (image.complete) {
                resolve(image);
            } else {
                image.onload = () => resolve(image);
                image.onerror = reject;
            }
        });
    }







    const handleLogoChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setLogoAlreadyValid(false);
        const file = ev.target.files?.[0];
        if (file === undefined) { validateFormData({ ...formData, logo: file }); return; }

        setLogo(file);
        const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
        setLogoSize(fileSizeInMB);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setLogoPreview(result);
            };
            reader.readAsDataURL(file);
        }
        validateFormData({ ...formData, logo: file });
    };

    const handleSecondaryImageChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setSecondaryImageAlreadyValid(false);
        const file = ev.target.files?.[0];
        if (file === undefined) { validateFormData({ ...formData, secondaryImage: file }); return; }

        setSecondaryImage(file);
        const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
        setSecondaryImageSize(fileSizeInMB);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setSecondaryImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
        validateFormData({ ...formData, secondaryImage: file });
    };

    const handleBackgroundImageChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundImageAlreadyValid(false);
        const file = ev.target.files?.[0];
        if (file === undefined) { validateFormData({ ...formData, backgroundImage: file }); return; }

        setBackgroundImage(file);
        const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
        setBackgroundImageSize(fileSizeInMB);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setBackgroundImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
        validateFormData({ ...formData, backgroundImage: file });
    };

    const handleGiantNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const newGiantName = ev.target.value;
        setGiantName(newGiantName);
        updateForm({ giantName: newGiantName });
        validateFormData({ ...formData, giantName:newGiantName });
    };

    const handleColourChange = (ev) => {
        const newColour = ev.target.value;
        setColour(newColour);
        updateForm({ colour: newColour });
        validateFormData({ ...formData, colour: newColour });
    }

    const handleNumberChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const newNumberField = parseInt(ev.target.value, 10);
        setImantNumber(newNumberField+"");
        updateForm({ imantNumber: newNumberField+"" });
        validateFormData({ ...formData, imantNumber: newNumberField });
    };

    const validateFormData = ({ logo, secondaryImage, backgroundImage, giantName, colour, imantNumber }) => {
        // Perform validation based on the provided data
        const formDataWithImage = { ...formData };
        if (logo) { formDataWithImage.logo = logo; }
        if (secondaryImage) { formDataWithImage.secondaryImage = secondaryImage; }
        if (backgroundImage) { formDataWithImage.backgroundImage = backgroundImage; }

        if (!isLogoAlreadyValid) isLogoValid = isCollaLogoValid(logo);
        if (!isSecondaryImageAlreadyValid) isSecondaryImageValid = isCollaLogoValid(secondaryImage);
        if (!isBackgroundImageAlreadyValid) isBackgroundImageValid = isCollaLogoValid(backgroundImage);
        setLogoAlreadyValid(isLogoValid);
        setSecondaryImageAlreadyValid(isSecondaryImageValid);
        setBackgroundImageAlreadyValid(isBackgroundImageValid);
        isColourValid = isCollaColourValid(colour);
        isGiantNameValid = isCollaNameValid(giantName);
        isImantNumberValid = imantNumber > 0;

        setErrors({
            logo: formDataWithImage.logo,
            secondaryImage: formDataWithImage.secondaryImage,
            backgroundImage: formDataWithImage.backgroundImage,
            giantName: isGiantNameValid ? "" : dictionary[lang]?.collesNameInvalid + NAME_MIN_LENGTH + " - " +NAME_MAX_LENGTH,
            colour: isColourValid ? "" : dictionary[lang]?.collesPrimaryColourInvalid + "",
            imantNumber: isImantNumberValid ? "" : dictionary[lang]?.imantNumberInvalid + "",
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isLogoValid || !isSecondaryImageValid || !isBackgroundImageValid || !isGiantNameValid || !isColourValid || !isImantNumberValid) { return; }

        const formDataWithImage = { ...formData };
        if (logo) { formDataWithImage.logo = logo; }
        if (secondaryImage) { formDataWithImage.secondaryImage = secondaryImage; }
        if (backgroundImage) { formDataWithImage.backgroundImage = backgroundImage; }
        ev.preventDefault();
        const concatenatedFigures = concatenateFigures(selectedFigures);
        //submitForm({
        //  logo: formDataWithImage.logo,
        //  secondaryImage: formDataWithImage.secondaryImage,
        //  backgroundImage: formDataWithImage.backgroundImage,
        //  giantName: giantName,
        //});
    };

    const handleDownload = () => {
        if (downloadUrl) {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'merged_image_with_text.png'; // Ensure the downloaded file extension matches the content
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
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
                <section id="order" className={styles.collaForm}>
                    <h2>{dictionary[lang]?.createCollaTitle}</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="logo">{dictionary[lang]?.collaLogo}</label>
                            <div className={styles.imagePreviewContainer}>
                                {logoPreview && (
                                    <div className={styles.imagePreview}>
                                        <img src={logoPreview} alt="Logo Preview" />
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="logo"
                                name="logo"
                                accept="image/*,.avif" // Specify accepted file types (images)
                                onChange={handleLogoChange}
                            />
                            {logoSize > LOGO_MAX_MBS && (
                                <p style={{ color: 'red' }}>
                                    {`File size (${logoSize.toFixed(2)} MB) exceeds the maximum allowed size of ${LOGO_MAX_MBS} MB`}
                                </p>
                            )}
                            <p>{dictionary[lang]?.maxFileSize + LOGO_MAX_MBS + "MB"}</p>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="secondaryImage">{dictionary[lang]?.collaSecondaryImage}</label>
                            <div className={styles.imagePreviewContainer}>
                                {secondaryImagePreview && (
                                    <div className={styles.imagePreview}>
                                        <img src={secondaryImagePreview} alt="Secondary Image Preview" />
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="secondaryImage"
                                name="secondaryImage"
                                accept="image/*,.avif" // Specify accepted file types (images)
                                onChange={handleSecondaryImageChange}
                            />
                            {secondaryImageSize > LOGO_MAX_MBS && (
                                <p style={{ color: 'red' }}>
                                    {`File size (${secondaryImageSize.toFixed(2)} MB) exceeds the maximum allowed size of ${LOGO_MAX_MBS} MB`}
                                </p>
                            )}
                            <p>{dictionary[lang]?.maxFileSize + LOGO_MAX_MBS + "MB"}</p>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="backgroundImage">{dictionary[lang]?.collaBackgroundImage}</label>
                            <div className={styles.imagePreviewContainer}>
                                {backgroundImagePreview && (
                                    <div className={styles.imagePreview}>
                                        <img src={backgroundImagePreview} alt="Background Image Preview" />
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="backgroundImage"
                                name="backgroundImage"
                                accept="image/*,.avif" // Specify accepted file types (images)
                                onChange={handleBackgroundImageChange}
                            />
                            {backgroundImageSize > LOGO_MAX_MBS && (
                                <p style={{ color: 'red' }}>
                                    {`File size (${backgroundImageSize.toFixed(2)} MB) exceeds the maximum allowed size of ${LOGO_MAX_MBS} MB`}
                                </p>
                            )}
                            <p>{dictionary[lang]?.maxFileSize + LOGO_MAX_MBS + "MB"}</p>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="giantName">{dictionary[lang]?.giantName}</label>
                            <input
                                type="text"
                                id="giantName"
                                name="giantName"
                                value={giantName}
                                onChange={handleGiantNameChange}
                            />
                            {errors.giantName && (
                                <p style={{ color: 'red' }}>{errors.giantName}</p>
                            )}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="colour">{dictionary[lang]?.collaPrimaryColour}</label>
                            <button
                                className={styles.colourPreviewButton}
                                type="button"
                                id="colourPreviewButton"
                                style={{ backgroundColor: colour }}
                                onClick={(event) => { event.preventDefault(); setIsColourPickerOpen(!isColourPickerOpen); }}/>
                            {isColourPickerOpen && (
                                <ColourPicker
                                    id="colour"
                                    name="colour"
                                    value={formData.colour}
                                    onChange={handleColourChange}
                                />
                            )}
                            {errors.colour && (
                                <div style={{ color: "tomato" }}>{errors.colour}</div>
                            )}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="number">{dictionary[lang]?.imantNumber}</label>
                            <input
                                type="number"
                                id="imantNumber"
                                name="imantNumber"
                                value={imantNumber}
                                onChange={handleNumberChange}
                            />
                            {errors.imantNumber && (
                                <p style={{ color: 'red' }}>{errors.imantNumber}</p>
                            )}
                        </div>
                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isLogoValid || !isSecondaryImageValid || !isBackgroundImageValid || !isGiantNameValid || !isColourValid || !isImantNumberValid}
                        >
                            {dictionary[lang]?.createCollaButton}
                        </button>
                        {downloadUrl && (
                            <button
                                type="button"
                                className={styles.downloadButton}
                                onClick={handleDownload}
                            >
                                {dictionary[lang]?.downloadImageButton}
                            </button>
                        )}
                    </form>
                </section>
            );
        default:
            assertUnreachable(formStatus);
    }
}

function SuccessNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.collaForm}>
            <h2 className={styles.h2}>{dictionary[lang]?.successCreateCollaMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.createAnotherCollaButton}</button>
        </section>
    );
}

function ErrorNotification({ lang, resetForm }: { lang: string; resetForm: () => void }) {
    return (
        <section className={styles.collaForm}>
            <h2 className={styles.h2error}>{dictionary[lang]?.errorCreateCollaMessage}</h2>
            <button className={styles.actionButton} onClick={resetForm}>{dictionary[lang]?.retryCreateCollaButton}</button>
        </section>
    );
}

function assertUnreachable(x: never): never {
    throw new Error("No s'esperava arribar aquí");
}
