export const SECOND_SURNAME_MIN_LENGTH = 3;
export const SECOND_SURNAME_MAX_LENGTH = 120;
export const SECOND_SURNAME_ERROR_MESSAGE = `El nom no és vàlid. El nom ha de tenir entre ${SECOND_SURNAME_MIN_LENGTH} i ${SECOND_SURNAME_MAX_LENGTH} caràcters vàlids.`;

export function isUserSecondSurnameValid(name: string): boolean {
    if (name.length < SECOND_SURNAME_MIN_LENGTH || name.length > SECOND_SURNAME_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(name);
}

export function UserSecondSurnameNotValidError(name: string): Error {
    return new Error(SECOND_SURNAME_ERROR_MESSAGE);
}