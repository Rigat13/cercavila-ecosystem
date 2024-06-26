export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 120;
export const NAME_ERROR_MESSAGE = `El nom no és vàlid. El nom ha de tenir entre ${NAME_MIN_LENGTH} i ${NAME_MAX_LENGTH} caràcters vàlids.`;

export function isUserNameValid(name: string): boolean {
    if (name == null || name.length == 0) return true; // Optional field
    if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(name);
}

export function UserNameNotValidError(name: string): Error {
    return new Error(NAME_ERROR_MESSAGE);
}
