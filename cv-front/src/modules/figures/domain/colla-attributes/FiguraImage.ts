export const IMAGE_MAX_MBS = 2; // 2MB

export function isFiguraImageValid(image: File | null): boolean {
    if (!image) return false;
    const fileSizeInMB = image.size / (1024 * 1024);
    return fileSizeInMB <= IMAGE_MAX_MBS;
}

export function FiguraImageNotValidError(image: File | null): Error {
    return new Error(`La imatge de la figura no és vàlid. Ha de tenir un pes inferior a ${IMAGE_MAX_MBS}MB.`);
}