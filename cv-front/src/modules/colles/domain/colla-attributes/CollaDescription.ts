export const DESCRIPTION_MIN_LENGTH = 0;
export const DESCRIPTION_MAX_LENGTH = 500;
export const DESCRIPTION_ERROR_MESSAGE = `La descripció no és vàlida. Ha de tenir entre ${DESCRIPTION_MIN_LENGTH} i ${DESCRIPTION_MAX_LENGTH} caràcters vàlids.`;

export function isCollaDescriptionValid(name: string): boolean {
    if (name.length <= DESCRIPTION_MIN_LENGTH || name.length > DESCRIPTION_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.'-]+$/gmu;
    return regexExp.test(name);
}

export function CollaDescriptionNotValidError(name: string): Error {
    return new Error(DESCRIPTION_ERROR_MESSAGE);
}