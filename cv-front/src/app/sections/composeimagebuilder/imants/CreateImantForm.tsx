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

const initialState = {
    logo: null as File | null,
    secondaryImage: null as File | null,
    backgroundImage: null as File | null,
    giantName: "",
}

export let isLogoValid = false;
export let isSecondaryImageValid = false;
export let isBackgroundImageValid = false;

const lang = defaultLang;

// Define resolution parameters for the downloaded image
const downloadImageWidth = 591; // Width of the downloaded image
const downloadImageHeight = 591; // Height of the downloaded image

export function CreateImantForm({ lang }: { lang: string }) {
    const { formData, resetForm } = useCollaFormData(initialState);
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

    const [selectedFigures] = useState([]);

    lang = lang;

    useEffect(() => {
        if (logoPreview && secondaryImagePreview && backgroundImagePreview) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (ctx) {
                const logoImg = new Image();
                const secondaryImg = new Image();
                const backgroundImg = new Image();

                logoImg.src = logoPreview;
                secondaryImg.src = secondaryImagePreview;
                backgroundImg.src = backgroundImagePreview;

                logoImg.onload = () => {
                    canvas.width = downloadImageWidth;
                    canvas.height = downloadImageHeight;

                    ctx.drawImage(backgroundImg, 0, 0, downloadImageWidth, downloadImageHeight);
                    secondaryImg.onload = () => {
                        ctx.drawImage(secondaryImg, 0, 0, downloadImageWidth, downloadImageHeight);
                        backgroundImg.onload = () => {
                            ctx.drawImage(logoImg, 0, 0, downloadImageWidth, downloadImageHeight);

                            // Add text to the canvas
                            if (giantName) {
                                ctx.font = 'bold 90px Josefin Sans'; // Adjust font size and style
                                ctx.fillStyle = 'black'; // Adjust text color as needed
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom'; // Align text to bottom
                                ctx.fillText(giantName.toUpperCase(), canvas.width / 2, canvas.height - 20); // Display uppercase text
                            }

                            const mergedImageUrl = canvas.toDataURL('image/png');
                            setDownloadUrl(mergedImageUrl);
                        };
                    };
                };
            }
        }
    }, [logoPreview, secondaryImagePreview, backgroundImagePreview, giantName]);


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
        setGiantName(ev.target.value);
        validateFormData({ ...formData, giantName: ev.target.value });
    };

    const validateFormData = ({ logo, secondaryImage, backgroundImage, giantName }) => {
        // Perform validation based on the provided data
        if (!isLogoAlreadyValid) isLogoValid = isCollaLogoValid(logo);
        if (!isSecondaryImageAlreadyValid) isSecondaryImageValid = isCollaLogoValid(secondaryImage);
        if (!isBackgroundImageAlreadyValid) isBackgroundImageValid = isCollaLogoValid(backgroundImage);
        setLogoAlreadyValid(isLogoValid);
        setSecondaryImageAlreadyValid(isSecondaryImageValid);
        setBackgroundImageAlreadyValid(isBackgroundImageValid);

        setErrors({
            logo: null,
            secondaryImage: null,
            backgroundImage: null,
            giantName: giantName.length > 0 ? null : "Giant name is required",
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isLogoValid || !isSecondaryImageValid || !isBackgroundImageValid || !giantName) { return; }

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
                        <button
                            className={styles.actionButton}
                            type="submit"
                            disabled={!isLogoValid || !isSecondaryImageValid || !isBackgroundImageValid || !giantName}
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
