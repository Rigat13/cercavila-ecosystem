export const ACTIVE_USER_TITLE_ERROR_MESSAGE = `El títol actiu d'usuari no és vàlid.`;

export function isUserActiveUserTitleValid(activeUserTitle: string): boolean {
    if (activeUserTitle == null || activeUserTitle.length == 0) return true;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(activeUserTitle);
}

export function UserActiveUserTitleNotValidError(activeUserTitle: string): Error {
    return new Error(ACTIVE_USER_TITLE_ERROR_MESSAGE);
}