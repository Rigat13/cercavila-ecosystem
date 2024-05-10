export const ACTIVE_USER_IMAGE_ERROR_MESSAGE = `La imatge activa no és vàlida.`;

export function isUserActiveUserImageValid(activeUserImage: string): boolean {
    if (activeUserImage == null) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(activeUserImage);
}

export function UserActiveUserImageNotValidError(activeUserImage: string): Error {
    return new Error(ACTIVE_USER_IMAGE_ERROR_MESSAGE);
}