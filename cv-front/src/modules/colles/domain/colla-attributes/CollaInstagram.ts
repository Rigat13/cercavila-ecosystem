export const INSTAGRAM_MIN_LENGTH = 3;
export const INSTAGRAM_MAX_LENGTH = 120;
export const INSTAGRAM_ERROR_MESSAGE = `L'usuari d'Instagram no és vàlid. Ha de tenir entre ${INSTAGRAM_MIN_LENGTH} i ${INSTAGRAM_MAX_LENGTH} caràcters vàlids.`;

export function isCollaInstagramValid(instagram: string): boolean {
    if (!instagram || instagram.length <= INSTAGRAM_MIN_LENGTH || instagram.length > INSTAGRAM_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(instagram);
}

export function CollaInstagramNotValidError(instagram: string): Error {
    return new Error(INSTAGRAM_ERROR_MESSAGE);
}