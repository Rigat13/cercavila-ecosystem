export const IMAGE_MAX_MBS = 5; // 5MB

export function isDigitalProductImageValid(image: File | null): boolean {
    if (!image) return true; // Field is optional
    const fileSizeInMB = image.size / (1024 * 1024);
    return fileSizeInMB <= IMAGE_MAX_MBS;
}

export function DigitalProductImageNotValidError(image: File | null): Error {
    return new Error(`La imatge no és vàlida. Ha de tenir un pes inferior a ${IMAGE_MAX_MBS}MB.`);
}