export const COLOUR_ERROR_MESSAGE = `El color no és vàlid. El color ha de seguir el format hexadecimal.`;

export function isDigitalProductColourValid(colour: string): boolean {
    if (!colour || colour.localeCompare("")) return true; // Field is optional
    const regexExp =/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/gmu;
    return regexExp.test(colour);
}

export function DigitalProductColourNotValidError(colour: string): Error {
    return new Error(COLOUR_ERROR_MESSAGE);
}