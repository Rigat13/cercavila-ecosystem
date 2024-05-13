export const FIRST_SURNAME_MIN_LENGTH = 3;
export const FIRST_SURNAME_MAX_LENGTH = 120;
export const FIRST_SURNAME_ERROR_MESSAGE = `El nom no és vàlid. El nom ha de tenir entre ${FIRST_SURNAME_MIN_LENGTH} i ${FIRST_SURNAME_MAX_LENGTH} caràcters vàlids.`;

export function isUserFirstSurnameValid(name: string): boolean {
    if (name == null || name.length == 0) return true; // Optional field
    if (name.length < FIRST_SURNAME_MIN_LENGTH || name.length > FIRST_SURNAME_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(name);
}

export function UserFirstSurnameNotValidError(name: string): Error {
    return new Error(FIRST_SURNAME_ERROR_MESSAGE);
}