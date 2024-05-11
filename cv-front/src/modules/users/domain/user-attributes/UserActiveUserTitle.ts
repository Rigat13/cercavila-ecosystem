export const ACTIVE_USER_TITLE_ERROR_MESSAGE = `El títol actiu d'usuari no és vàlid.`;

export function isUserActiveUserTitleValid(activeUserTitle: string): boolean {
    if (activeUserTitle == null) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(activeUserTitle);
}

export function UserActiveUserTitleValidError(activeUserTitle: string): Error {
    return new Error(ACTIVE_USER_TITLE_ERROR_MESSAGE);
}