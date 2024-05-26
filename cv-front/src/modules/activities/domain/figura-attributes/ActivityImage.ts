export const IMAGE_MAX_MBS = 5; // 5MB

export function isActivityImageValid(image: File | null): boolean {
    if (!image) return false;
    const fileSizeInMB = image.size / (1024 * 1024);
    return fileSizeInMB <= IMAGE_MAX_MBS;
}

export function ActivityImageNotValidError(image: File | null): Error {
    return new Error(`La imatge de l'activitat no és vàlida. Ha de tenir un pes inferior a ${IMAGE_MAX_MBS}MB.`);
}