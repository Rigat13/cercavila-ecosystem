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
    frameImage: null as File | null,
    giantImage: null as File | null,
    backgroundImage: null as File | null,
    giantName: "",
    colour: "",
    imantNumber: "",
}

export let isframeImageValid, isGiantImageValid, isBackgroundImageValid, isGiantNameValid, isColourValid, isImantNumberValid = false;


const lang = defaultLang;

// Define resolution parameters for the downloaded image
const downloadImageWidth = 591; // Width of the downloaded image
const downloadImageHeight = 591; // Height of the downloaded image

export function CreateImantForm({ lang }: { lang: string }) {
    const { formData, updateForm, resetForm } = useCollaFormData(initialState);
    const { formStatus, resetFormStatus } = useCollaForm();
    const [errors, setErrors] = useState(initialState);

    const [frameImage, setframeImage] = useState<File | null>(null);
    const [frameImageSize, setframeImageSize] = useState(0);
    const [frameImagePreview, setframeImagePreview] = useState<string | null>(null);
    const [isframeImageAlreadyValid, setframeImageAlreadyValid] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const [giantImage, setGiantImage] = useState<File | null>(null);
    const [giantImageSize, setGiantImageSize] = useState(0);
    const [giantImagePreview, setGiantImagePreview] = useState<string | null>(null);
    const [isGiantImageAlreadyValid, setGiantImageAlreadyValid] = useState(false);

    const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
    const [backgroundImageSize, setBackgroundImageSize] = useState(0);
    const [backgroundImagePreview, setBackgroundImagePreview] = useState<string | null>(null);
    const [isBackgroundImageAlreadyValid, setBackgroundImageAlreadyValid] = useState(false);

    const [giantName, setGiantName] = useState("");
    const [imantNumber, setImantNumber] = useState("");

    const [selectedFigures] = useState([]);

    const [isColourPickerOpen, setIsColourPickerOpen] = useState(false);
    const [colour, setColour] = useState('#FFFFFF');

    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);


    lang = lang;

    useEffect(() => {
        initialiseHardcodedImages();

        if (frameImagePreview && giantImagePreview && backgroundImagePreview) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (ctx) {
                const frameImageImg = new Image();
                const giantImg = new Image();
                const backgroundImg = new Image();

                // Set sources for images
                frameImageImg.src = frameImagePreview;
                giantImg.src = giantImagePreview;
                backgroundImg.src = backgroundImagePreview;

                // Ensure all images are loaded before processing
                Promise.all([loadImage(frameImageImg), loadImage(giantImg), loadImage(backgroundImg)])
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
                        tempCtx.fillStyle = colour; // Use the colour from the form
                        tempCtx.fillRect(0, 0, downloadImageWidth, downloadImageHeight);

                        // Reset composite operation and draw the multiplied result onto the main canvas
                        ctx.globalCompositeOperation = 'source-over';
                        ctx.drawImage(tempCanvas, 0, 0, downloadImageWidth, downloadImageHeight);

                        // Draw the background image again as a mask to preserve transparency
                        ctx.globalCompositeOperation = 'destination-in';
                        ctx.drawImage(backgroundImg, 0, 0, downloadImageWidth, downloadImageHeight);

                        // Draw the giant image on top
                        ctx.globalCompositeOperation = 'source-over';
                        ctx.drawImage(giantImg, 0, 0, downloadImageWidth, downloadImageHeight);

                        // Draw the frameImage image on top
                        ctx.drawImage(frameImageImg, 0, 0, downloadImageWidth, downloadImageHeight);

                        // Add text to the canvas - giantName with background color
                        if (giantName) {
                            let nameSize = 42;
                            let nameX = canvas.width / 2;
                            let nameY = canvas.height - 25;

                            // Measure text width to set background size
                            ctx.font = 'bold ' + nameSize + 'px Josefin Sans';
                            const textWidth = ctx.measureText(giantName.toUpperCase()).width;

                            const padding = 15; // Padding around text
                            const cornerRadius = 27; // Radius for rounded corners
                            const rectX = nameX - textWidth / 2 - padding;
                            const rectY = nameY - nameSize - 11;
                            const rectWidth = textWidth + 2 * padding;
                            const rectHeight = nameSize + 14;

                            // Draw rounded rectangle with rounded top corners
                            drawRoundedRect(ctx, rectX, rectY, rectWidth, rectHeight, cornerRadius, colour);

                            ctx.fillStyle = colour; // Use the colour from the form
                            ctx.fill();
                            // Old rect: // ctx.fillRect(nameX - textWidth / 2 - padding, nameY - nameSize - 10, textWidth + 2 * padding, nameSize + 11);

                            // Draw text
                            ctx.fillStyle = 'white';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText(giantName.toUpperCase(), nameX, nameY);
                        }

                        // Add text to the canvas - imantNumber
                        if (imantNumber) {
                            let imantNumberSize = 30;
                            let numberX = canvas.width - 35;
                            let numberY = canvas.height - 16;

                            // Calculate x position dynamically based on number of digits
                            const numDigits = imantNumber.toString().length;
                            let x;
                            if (numDigits === 1) {
                            } else if (numDigits === 2) {
                            } else if (numDigits === 3) {
                                imantNumberSize = 22;
                                numberY = canvas.height - 21;
                            }
                            ctx.font = 'bold ' + imantNumberSize + 'px Josefin Sans'; // Adjust font size and style
                            ctx.fillStyle = 'black'; // Adjust text color as needed
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom'; // Align text to bottom

                            ctx.fillText(imantNumber, numberX, numberY); // Display text at bottom right
                        }

                        // Add a white background to the entire canvas
                        ctx.globalCompositeOperation = 'destination-over'; // Draw behind existing content
                        ctx.fillStyle = '#ffffff'; // White color
                        ctx.fillRect(0, 0, canvas.width, canvas.height);

                        const mergedImageUrl = canvas.toDataURL('image/png');
                        setDownloadUrl(mergedImageUrl);
                        setPreviewImageUrl(mergedImageUrl);
                    })
                    .catch(error => {
                        console.error('Error loading images:', error);
                    });
            }
        }
    }, [frameImagePreview, giantImagePreview, backgroundImagePreview, giantName, imantNumber, colour]);


    function drawRoundedRect(ctx, x, y, width, height, cornerRadius, color) {
        ctx.beginPath();
        ctx.moveTo(x + cornerRadius, y);
        ctx.lineTo(x + width - cornerRadius, y);
        ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y + cornerRadius);
        ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
        ctx.closePath();

        ctx.fillStyle = color;
        ctx.fill();
    }

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


    function initialiseHardcodedImages() {
        setframeImage(new File([""], "imants_frame_top.png", { type: "image/png" }));
        setframeImagePreview("/composefiles/imants_frame_top.png");

        //setframeImage(new File([""], "proves.png", { type: "image/png" })); // TEST ONLY
        //setframeImagePreview("/composefiles/proves.png"); // TEST ONLY

        setBackgroundImage(new File([""], "imants_background.png", { type: "image/png" }));
        setBackgroundImagePreview("/composefiles/imants_background.png");
    }




    const handleframeImageChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setframeImageAlreadyValid(false);
        const file = ev.target.files?.[0];
        if (file === undefined) { validateFormData({ ...formData, frameImage: file }); return; }

        setframeImage(file);
        const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
        setframeImageSize(fileSizeInMB);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setframeImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
        validateFormData({ ...formData, frameImage: file });
    };

    const handleGiantImageChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setGiantImageAlreadyValid(false);
        const file = ev.target.files?.[0];
        if (file === undefined) { validateFormData({ ...formData, giantImage: file }); return; }

        setGiantImage(file);
        const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
        setGiantImageSize(fileSizeInMB);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setGiantImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
        validateFormData({ ...formData, giantImage: file });
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

    const validateFormData = ({ frameImage, giantImage, backgroundImage, giantName, colour, imantNumber }) => {
        // Perform validation based on the provided data
        const formDataWithImage = { ...formData };
        if (frameImage) { formDataWithImage.frameImage = frameImage; }
        if (giantImage) { formDataWithImage.giantImage = giantImage; }
        if (backgroundImage) { formDataWithImage.backgroundImage = backgroundImage; }

        if (!isframeImageAlreadyValid) isframeImageValid = isCollaLogoValid(frameImage);
        if (!isGiantImageAlreadyValid) isGiantImageValid = isCollaLogoValid(giantImage);
        if (!isBackgroundImageAlreadyValid) isBackgroundImageValid = isCollaLogoValid(backgroundImage);
        setframeImageAlreadyValid(isframeImageValid);
        setGiantImageAlreadyValid(isGiantImageValid);
        setBackgroundImageAlreadyValid(isBackgroundImageValid);
        isColourValid = isCollaColourValid(colour);
        isGiantNameValid = isCollaNameValid(giantName);
        isImantNumberValid = imantNumber > 0;

        setErrors({
            frameImage: formDataWithImage.frameImage,
            giantImage: formDataWithImage.giantImage,
            backgroundImage: formDataWithImage.backgroundImage,
            giantName: isGiantNameValid ? "" : dictionary[lang]?.collesNameInvalid + NAME_MIN_LENGTH + " - " +NAME_MAX_LENGTH,
            colour: isColourValid ? "" : dictionary[lang]?.collesPrimaryColourInvalid + "",
            imantNumber: isImantNumberValid ? "" : dictionary[lang]?.imantNumberInvalid + "",
        });
    };

    const handleSubmit = (ev: React.FormEvent) => {
        if (!isframeImageValid || !isGiantImageValid || !isBackgroundImageValid || !isGiantNameValid || !isColourValid || !isImantNumberValid) { return; }

        const formDataWithImage = { ...formData };
        if (frameImage) { formDataWithImage.frameImage = frameImage; }
        if (giantImage) { formDataWithImage.giantImage = giantImage; }
        if (backgroundImage) { formDataWithImage.backgroundImage = backgroundImage; }
        ev.preventDefault();
        const concatenatedFigures = concatenateFigures(selectedFigures);
        //submitForm({
        //  frameImage: formDataWithImage.frameImage,
        //  giantImage: formDataWithImage.giantImage,
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
                    <h2>{dictionary[lang]?.createImantTitle}</h2>

                    <form
                        onSubmit={(ev) => {
                            handleSubmit(ev);
                        }}
                    >

                        <div className={styles.formGroup}>
                            <label htmlFor="giantImage">{dictionary[lang]?.figuraImage}</label>
                            <div className={styles.imagePreviewContainer}>
                                {giantImagePreview && (
                                    <div className={styles.imagePreview}>
                                        <img src={giantImagePreview} alt="Giant Image Preview" />
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="giantImage"
                                name="giantImage"
                                accept="image/*,.avif" // Specify accepted file types (images)
                                onChange={handleGiantImageChange}
                            />
                            {giantImageSize > LOGO_MAX_MBS && (
                                <p style={{ color: 'red' }}>
                                    {`File size (${giantImageSize.toFixed(2)} MB) exceeds the maximum allowed size of ${LOGO_MAX_MBS} MB`}
                                </p>
                            )}
                            <p>{dictionary[lang]?.maxFileSize + LOGO_MAX_MBS + "MB"}</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="giantName">{dictionary[lang]?.figuraName}</label>
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
                        {downloadUrl && (
                            <button
                                type="button"
                                className={styles.downloadButton}
                                onClick={handleDownload}
                                disabled={!isframeImageValid || !isGiantImageValid || !isBackgroundImageValid || !isGiantNameValid || !isColourValid || !isImantNumberValid}
                            >
                                {dictionary[lang]?.downloadImageButton}
                            </button>
                        )}
                    </form>

                    {previewImageUrl && (
                        <div className={styles.ImagePreview}>
                            <h3>{dictionary[lang]?.preview}:</h3>
                            <img src={previewImageUrl} alt={dictionary[lang]?.preview} />
                        </div>
                    )}
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


/* TO ADD IF NEEDED TO MODIFY FRONT AND BACK IMAGE ON THE GO * /

<div className={styles.formGroup}>
                            <label htmlFor="frameImage">{dictionary[lang]?.collaframeImage}</label>
                            <div className={styles.imagePreviewContainer}>
                                {frameImagePreview && (
                                    <div className={styles.imagePreview}>
                                        <img src={frameImagePreview} alt="frameImage Preview" />
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="frameImage"
                                name="frameImage"
                                accept="image/*,.avif" // Specify accepted file types (images)
                                onChange={handleframeImageChange}
                            />
                            {frameImageSize > LOGO_MAX_MBS && (
                                <p style={{ color: 'red' }}>
                                    {`File size (${frameImageSize.toFixed(2)} MB) exceeds the maximum allowed size of ${LOGO_MAX_MBS} MB`}
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
 */