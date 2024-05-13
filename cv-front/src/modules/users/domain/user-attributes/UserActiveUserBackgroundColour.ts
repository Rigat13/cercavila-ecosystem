export const ACTIVE_USER_BACKGROUND_COLOUR_ERROR_MESSAGE = `El color de fons actiu no és vàlid.`;

export function isUserActiveUserBackgroundColourValid(activeUserBackgroundColour: string): boolean {
    if (activeUserBackgroundColour == null || activeUserBackgroundColour.length == 0) return true;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(activeUserBackgroundColour);
}

export function UserActiveUserBackgroundColourNotValidError(activeUserBackgroundColour: string): Error {
    return new Error(ACTIVE_USER_BACKGROUND_COLOUR_ERROR_MESSAGE);
}