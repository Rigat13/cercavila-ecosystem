export const COLOUR_ERROR_MESSAGE = `El color no és vàlid. El color ha de seguir el format hexadecimal.`;

export function isCollaColourValid(colour: string): boolean {
    const regexExp =/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/gmu;
    return regexExp.test(colour);
}

export function CollaColourNotValidError(colour: string): Error {
    return new Error(COLOUR_ERROR_MESSAGE);
}