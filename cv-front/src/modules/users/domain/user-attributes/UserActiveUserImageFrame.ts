export const ACTIVE_USER_IMAGE_FRAME_ERROR_MESSAGE = `El marc d'imatge actiu no és vàlid.`;

export function isUserActiveUserImageFrameValid(activeUserImageFrame: string): boolean {
    if (activeUserImageFrame == null || activeUserImageFrame.length == 0) return true;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(activeUserImageFrame);
}

export function UserActiveUserImageFrameNotValidError(activeUserImageFrame: string): Error {
    return new Error(ACTIVE_USER_IMAGE_FRAME_ERROR_MESSAGE);
}