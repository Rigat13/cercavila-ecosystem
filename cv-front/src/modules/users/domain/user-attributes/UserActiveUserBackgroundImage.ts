export const ACTIVE_USER_BACKGROUND_IMAGE_ERROR_MESSAGE = `La imatge de fons activa no és vàlida.`;

export function isUserActiveUserBackgroundImageValid(activeUserBackgroundImage: string): boolean {
    if (activeUserBackgroundImage == null || activeUserBackgroundImage.length == 0) return true;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(activeUserBackgroundImage);
}

export function UserActiveUserBackgroundImageNotValidError(activeUserBackgroundImage: string): Error {
    return new Error(ACTIVE_USER_BACKGROUND_IMAGE_ERROR_MESSAGE);
}